import type { UIMessage } from 'ai'

interface ChatMessageProps {
  message: UIMessage
}

function getTextContent(message: UIMessage): string {
  return message.parts
    .filter((p) => p.type === 'text')
    .map((p) => (p as { type: 'text'; text: string }).text)
    .join('')
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const text = getTextContent(message)

  if (!text) return null

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-[#1B3A6B] text-white rounded-br-sm'
            : 'bg-[#F8F9FC] text-[#1A1A2E] rounded-bl-sm border border-[#E5E7EB]'
        }`}
      >
        {text}
      </div>
    </div>
  )
}
