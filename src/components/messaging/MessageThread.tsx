import { cn } from '@/lib/utils/cn'

interface Message {
  id: string
  content: string
  sender_id: string
  created_at: string
}

interface MessageThreadProps {
  messages: Message[]
  currentUserId: string
}

export function MessageThread({ messages, currentUserId }: MessageThreadProps) {
  return (
    <div className="space-y-3 p-4">
      {messages.map((msg) => {
        const isOwn = msg.sender_id === currentUserId
        return (
          <div key={msg.id} className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'max-w-[70%] rounded-2xl px-4 py-2 text-sm',
                isOwn
                  ? 'bg-primary-600 text-white rounded-br-md'
                  : 'bg-neutral-100 text-neutral-900 rounded-bl-md'
              )}
            >
              {msg.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
