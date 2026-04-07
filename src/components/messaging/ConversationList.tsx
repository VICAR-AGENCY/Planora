interface Conversation {
  id: string
  supplierName: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

interface ConversationListProps {
  conversations: Conversation[]
  selectedId?: string
  onSelect: (id: string) => void
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  if (conversations.length === 0) {
    return <p className="p-4 text-sm text-neutral-400">Geen gesprekken</p>
  }

  return (
    <div className="divide-y divide-neutral-200">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          className={`w-full px-4 py-3 text-left hover:bg-neutral-50 ${
            selectedId === conv.id ? 'bg-primary-50' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-900">{conv.supplierName}</span>
            <span className="text-xs text-neutral-400">{conv.timestamp}</span>
          </div>
          <p className="mt-1 truncate text-sm text-neutral-500">{conv.lastMessage}</p>
          {conv.unread && (
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary-600" />
          )}
        </button>
      ))}
    </div>
  )
}
