'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { TextStreamChatTransport } from 'ai'
import { AnimatePresence, motion } from 'framer-motion'
import { ChatMessage } from './ChatMessage'

const GREETING = "Hi! I'm Alex from Claim Anchor. Were you recently in an accident? I can help you find out if you qualify for a free legal review."

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasAutoOpened, setHasAutoOpened] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new TextStreamChatTransport({ api: '/api/chat' }),
  })

  const [inputValue, setInputValue] = useState('')
  const isLoading = status === 'streaming' || status === 'submitted'

  // Auto-open triggers
  useEffect(() => {
    if (hasAutoOpened) return

    const exitHandler = (e: MouseEvent) => {
      if (e.clientY < 50 && !hasAutoOpened) {
        setHasAutoOpened(true)
        setIsOpen(true)
      }
    }

    const timer = setTimeout(() => {
      if (!hasAutoOpened) {
        setHasAutoOpened(true)
        setIsOpen(true)
      }
    }, 45000)

    document.addEventListener('mouseleave', exitHandler)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', exitHandler)
    }
  }, [hasAutoOpened])

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const text = inputValue.trim()
    if (!text || isLoading) return
    setInputValue('')
    await sendMessage({ text })
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-[320px] h-[480px] bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1B3A6B] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <img src="/claim-anchor-icon.svg" alt="" width={18} height={18} style={{ filter: 'brightness(0) invert(1)' }} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Alex</p>
                  <p className="text-white/60 text-xs">Claim Anchor Intake</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Greeting */}
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed bg-[#F8F9FC] text-[#1A1A2E] border border-[#E5E7EB]">
                  {GREETING}
                </div>
              </div>

              {messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 bg-[#6B7280] rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-[#E5E7EB] flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1 text-sm px-3 py-2 rounded-xl border border-[#E5E7EB] focus:border-[#1B3A6B] outline-none disabled:opacity-50 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-9 h-9 flex-shrink-0 rounded-xl bg-[#1B3A6B] text-white flex items-center justify-center hover:bg-[#163060] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Send"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-[#1B3A6B] text-white shadow-lg flex items-center justify-center hover:bg-[#163060] transition-colors"
        aria-label={isOpen ? 'Close chat' : 'Chat with us'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </motion.svg>
          ) : (
            <motion.img
              key="anchor"
              src="/claim-anchor-icon.svg"
              alt=""
              width={28}
              height={28}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
