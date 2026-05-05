// In-memory duplicate detection (persists for process lifetime).
// On Vercel, use Vercel KV for cross-instance persistence.
const recentLeads = new Map<string, number>()

const TTL_MS = 24 * 60 * 60 * 1000

function prune() {
  const now = Date.now()
  for (const [key, ts] of recentLeads) {
    if (now - ts > TTL_MS) recentLeads.delete(key)
  }
}

export function isDuplicate(phone: string, email: string): boolean {
  prune()
  const phoneKey = `phone:${phone.replace(/\D/g, '')}`
  const emailKey = `email:${email.toLowerCase()}`
  return recentLeads.has(phoneKey) || recentLeads.has(emailKey)
}

export function recordLead(phone: string, email: string): void {
  const now = Date.now()
  recentLeads.set(`phone:${phone.replace(/\D/g, '')}`, now)
  recentLeads.set(`email:${email.toLowerCase()}`, now)
}
