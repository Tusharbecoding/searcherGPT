import { Avatar, Button } from '@nextui-org/react'
import clsx from 'clsx'
import React from 'react'
import { useAnimatedText } from '../AnimatedText'

export type ChatMessageProps = Omit<React.HTMLProps<HTMLDivElement>, 'role'> & {
  message: string
  role: 'user' | 'assistant'
  disableAnimation?: boolean
  onEdit?: () => void // New prop to handle the edit button click
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  role,
  disableAnimation = false,
  onEdit,
  ...props
}) => {
  const content = useAnimatedText(message, {
    maxTime: 1000,
    disabled: role === 'user' || disableAnimation,
  })

  return (
    <div
      {...props}
      className={clsx('relative group', props.className)} // Added 'group' class here
    >
      <div className="flex flex-row gap-4 items-start">
        <Avatar
          className="flex-shrink-0"
          showFallback
          color={role === 'assistant' ? 'primary' : 'default'}
          name={role === 'assistant' ? 'A' : ''}
          classNames={{
            name: 'text-[16px]',
          }}
        />
        <div className="flex-grow border border-gray-200 rounded-lg p-4 text-md bg-white shadow-sm mt-[-4px] relative">
          <div
            className="whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        {role === 'user' && (
          <Button
            auto
            flat
            size="xs"
            onClick={onEdit}
            className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-1 right-2"
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  )
}
