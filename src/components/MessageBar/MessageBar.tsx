import { Button, TextAreaProps, Textarea } from '@nextui-org/react'
import clsx from 'clsx'
import React, { memo, useState } from 'react'
import { SendIcon } from '../icons/SendIcon'

export type MessageBarProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  'onSubmit'
> & {
  hide?: boolean
  disabled?: boolean
  loading?: boolean
  prompt?: string
  onSubmit?: (prompt: string) => void
  onPromptChange?: (prompt: string) => void
  editing?: boolean
  onCancelEdit?: () => void
  textareaProps?: TextAreaProps
}

export const MessageBar: React.FC<MessageBarProps> = memo(
  ({
    prompt: externalPrompt,
    hide,
    disabled = false,
    loading = false,
    onPromptChange,
    onSubmit,
    editing = false,
    onCancelEdit,
    textareaProps = {},
    ...props
  }) => {
    // Internal state for prompt
    const [prompt, setPrompt] = useState(externalPrompt || '')

    // Update the prompt when the external prompt changes
    React.useEffect(() => {
      setPrompt(externalPrompt || '')
    }, [externalPrompt])

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (prompt && onSubmit) {
        onSubmit(prompt)
      }
    }

    const handlePromptChange = (value: string) => {
      setPrompt(value)
      onPromptChange?.(value)
    }

    const handleCancelEdit = () => {
      setPrompt('') // Clear the prompt
      onCancelEdit?.()
    }

    return (
      <div
        {...props}
        className={clsx(
          'pb-2',
          'transition',
          'translate-y-0',
          'opacity-100',
          hide && ['opacity-0', 'invisible', 'translate-y-full'],
          props.className,
        )}
      >
        <form className="flex flex-row gap-2 items-end" onSubmit={onFormSubmit}>
          <Textarea
            size="lg"
            minRows={1}
            maxRows={8}
            value={prompt}
            variant="bordered"
            placeholder="Type a message..."
            classNames={{
              inputWrapper: 'border-gray-100 hover:border-gray-100',
            }}
            onValueChange={handlePromptChange}
            isDisabled={disabled || loading}
            {...textareaProps}
            className={clsx(textareaProps.className)}
          />
          <Button
            className=""
            isIconOnly
            color="primary"
            size="lg"
            type="submit"
            isDisabled={
              disabled ||
              loading ||
              prompt.replaceAll('\n', '').trim().length === 0
            }
            isLoading={loading}
          >
            <SendIcon className="fill-white" />
          </Button>
          {editing && (
            <Button
              auto
              flat
              size="lg"
              color="danger"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          )}
        </form>
      </div>
    )
  },
)
