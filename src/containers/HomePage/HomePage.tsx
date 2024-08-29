import { ChatMessages } from '@/components/ChatMessages'
import { MessageBar } from '@/components/MessageBar'
import { Search } from '@/components/Search'
import { ChatLayout } from '@/layouts/ChatLayout/Chat.layout'
import { useSearch } from '@/queries/useSearch'
import { ApiChatMessage, chatApi } from '@/services/api'
import { populateDirs } from '@/utils/populateDirs.util'
import React, { useEffect, useMemo, useState } from 'react'

export type HomePageProps = React.HTMLProps<HTMLDivElement>

const CHAT_SESSIONS_KEY = 'chatSessions' // Key for storing sessions in local storage

export const HomePage: React.FC<HomePageProps> = ({ className, ...props }) => {
  const [query, setQuery] = useState('')
  const [prompt, setPrompt] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [messages, setMessages] = useState<ApiChatMessage[]>([])
  const [generating, setGenerating] = useState(false)
  const [editingMessage, setEditingMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null) // State to track errors
  const [sessions, setSessions] = useState<Record<string, ApiChatMessage[]>>({})

  const search = useSearch(
    { query },
    {
      cacheTime: 0,
      enabled: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  const fileList = useMemo(
    () => populateDirs(search.data?.files || []),
    [search.data],
  )

  useEffect(() => {
    // Load sessions from local storage if available
    if (typeof window !== 'undefined') {
      const savedSessions = localStorage.getItem(CHAT_SESSIONS_KEY)
      if (savedSessions) {
        setSessions(JSON.parse(savedSessions))
      }
    }
  }, [])

  const onSearch = async () => {
    try {
      search.refetch()
    } catch (e) {
      setError('Error fetching search results. Please try again.')
      console.error('Search error:', e)
    }
  }

  const onPrompt = async (prompt: string) => {
    setGenerating(true)
    setError(null) // Clear previous errors

    try {
      let newMessages = [...messages]

      if (editingMessage !== null) {
        // Update existing message
        newMessages = newMessages.map((msg) =>
          msg.message === editingMessage ? { ...msg, message: prompt } : msg,
        )

        setMessages(newMessages)

        // Perform the same functionality as sending a new message
        const { message } = await chatApi({
          prompt,
          files: fileList.filter((f) => selectedFiles.includes(f.id)),
          history: newMessages,
        })

        newMessages = [...newMessages, message]
        setMessages(newMessages)
        setEditingMessage(null) // Reset editing state
      } else {
        // Add new message
        newMessages.push({
          role: 'user',
          message: prompt,
        })

        setMessages(newMessages)

        const { message } = await chatApi({
          prompt,
          files: fileList.filter((f) => selectedFiles.includes(f.id)),
          history: newMessages,
        })

        newMessages = [...newMessages, message]
        setMessages(newMessages)
      }

      // Save updated messages to local storage after state is updated
      if (typeof window !== 'undefined') {
        const sessionId = `session-${Date.now()}` // Generate a unique session ID
        const updatedSessions = { ...sessions, [sessionId]: newMessages }
        localStorage.setItem(CHAT_SESSIONS_KEY, JSON.stringify(updatedSessions))
        setSessions(updatedSessions)
      }
    } catch (e) {
      setError('Error sending message. Please try again.')
      console.error('Message sending error:', e)
    } finally {
      setGenerating(false)
      setPrompt('')
    }
  }

  const handleEditMessage = (message: string) => {
    setEditingMessage(message)
    setPrompt(message) // Pre-fill the MessageBar with the message to be edited
  }

  const loadSession = (sessionId: string) => {
    // Load a session from local storage
    setMessages(sessions[sessionId])
  }

  const clearSessions = () => {
    // Clear all sessions
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CHAT_SESSIONS_KEY)
    }
    setSessions({})
  }

  useEffect(() => {
    setSelectedFiles([])
  }, [search.data])

  useEffect(() => {
    onSearch()
  }, [])

  return (
    <ChatLayout
      messageBar={
        <MessageBar
          hide={selectedFiles.length === 0}
          prompt={prompt}
          onPromptChange={setPrompt}
          onSubmit={(prompt) => onPrompt(prompt)}
          loading={generating}
          disabled={generating}
          editing={Boolean(editingMessage)}
          onCancelEdit={() => setEditingMessage(null)}
        />
      }
    >
      {error && <div className="text-red-500 mb-4">{error}</div>}{' '}
      {/* Display errors */}
      <Search
        compact={messages.length > 0}
        searching={search.isFetching}
        query={query}
        onQueryChange={(v) => setQuery(v)}
        onSearch={onSearch}
        results={fileList}
        onSelect={(selected) => setSelectedFiles(selected)}
        selectedFiles={selectedFiles}
      />
      <ChatMessages
        className="py-[20px]"
        data={messages.map((msg) => ({
          role: msg.role,
          message: msg.message,
        }))}
        onEditMessage={handleEditMessage}
      />
    </ChatLayout>
  )
}
