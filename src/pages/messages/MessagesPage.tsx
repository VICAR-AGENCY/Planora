import { useState } from 'react'
import { ArrowLeft, Send, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

// Mock conversations for MVP
const mockConversations = [
  {
    id: '1',
    supplierName: 'EcoWarm Solutions',
    lastMessage: 'We kunnen volgende week langskomen voor een plaatsbezoek.',
    timestamp: '14:32',
    unread: true,
  },
  {
    id: '2',
    supplierName: 'Warmte Expert Antwerpen',
    lastMessage: 'De offerte is onderweg, verwacht deze morgen.',
    timestamp: 'Gisteren',
    unread: false,
  },
  {
    id: '3',
    supplierName: 'GreenHeat Belgium',
    lastMessage: 'Bedankt voor uw interesse! We nemen snel contact op.',
    timestamp: 'Ma',
    unread: false,
  },
]

const mockMessages = [
  { id: '1', sender: 'supplier', content: 'Goedemiddag! Bedankt voor uw interesse in onze diensten.', time: '14:00' },
  { id: '2', sender: 'user', content: 'Hallo, ik heb een vraag over de offerte die ik ontvangen heb.', time: '14:15' },
  { id: '3', sender: 'supplier', content: 'Natuurlijk, wat wilt u graag weten?', time: '14:20' },
  { id: '4', sender: 'user', content: 'Is vloerverwarming inbegrepen in de prijs?', time: '14:25' },
  { id: '5', sender: 'supplier', content: 'We kunnen volgende week langskomen voor een plaatsbezoek. Dan kunnen we alles in detail bespreken en een aangepaste offerte maken.', time: '14:32' },
]

export function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState('')

  const selectedConversation = mockConversations.find((c) => c.id === selectedId)

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-0 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden rounded-xl border border-neutral-100 bg-white mx-0 sm:mx-0 lg:mx-0">
      {/* Conversation list */}
      <div className={cn(
        'w-full border-r border-neutral-100 md:w-80 md:block',
        selectedId ? 'hidden md:block' : 'block'
      )}>
        <div className="border-b border-neutral-100 p-4">
          <h2 className="text-lg font-semibold text-neutral-900">Berichten</h2>
        </div>
        {mockConversations.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
              <MessageCircle className="h-6 w-6 text-primary-400" />
            </div>
            <p className="mt-3 text-sm text-neutral-500">Nog geen berichten.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-50">
            {mockConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={cn(
                  'w-full p-4 text-left hover:bg-neutral-50 transition-colors',
                  selectedId === conv.id && 'bg-primary-50'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn('text-sm font-semibold', conv.unread ? 'text-neutral-900' : 'text-neutral-700')}>
                    {conv.supplierName}
                  </span>
                  <span className="text-xs text-neutral-400">{conv.timestamp}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-sm text-neutral-500 truncate">{conv.lastMessage}</p>
                  {conv.unread && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Message thread */}
      <div className={cn(
        'flex flex-1 flex-col',
        !selectedId ? 'hidden md:flex' : 'flex'
      )}>
        {selectedConversation ? (
          <>
            {/* Thread header */}
            <div className="flex items-center gap-3 border-b border-neutral-100 p-4">
              <button
                onClick={() => setSelectedId(null)}
                className="md:hidden p-1"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <p className="font-semibold text-neutral-900">{selectedConversation.supplierName}</p>
                <p className="text-xs text-neutral-400">Warmtepomp project — Antwerpen</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((msg) => (
                <div key={msg.id} className={cn('flex', msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm',
                      msg.sender === 'user'
                        ? 'bg-primary-600 text-white rounded-br-md'
                        : 'bg-neutral-100 text-neutral-900 rounded-bl-md'
                    )}
                  >
                    <p>{msg.content}</p>
                    <p className={cn('mt-1 text-xs', msg.sender === 'user' ? 'text-primary-200' : 'text-neutral-400')}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-neutral-100 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setMessageInput('')
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Typ je bericht..."
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="rounded-xl bg-primary-600 p-2.5 text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-neutral-200" />
              <p className="mt-3 text-neutral-400">Selecteer een gesprek</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
