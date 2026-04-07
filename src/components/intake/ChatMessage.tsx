import { cn } from '@/lib/utils/cn'
import type { IntakeMessage } from '@/types/intake'

interface ChatMessageProps {
  message: IntakeMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100">
          <img src="/favicon.png" alt="" className="h-4 w-4" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 text-sm',
          isUser
            ? 'bg-primary-600 text-white rounded-br-md'
            : 'bg-primary-50 text-primary-800 rounded-bl-md'
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.photos && message.photos.length > 0 && (
          <div className="mt-2 flex gap-2">
            {message.photos.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Upload ${i + 1}`}
                className="h-20 w-20 rounded-lg object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
