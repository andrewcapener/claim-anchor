import { NextRequest } from 'next/server'
import { submitLeadSchema } from '@/lib/schema'
import { isDuplicate, recordLead } from '@/lib/lead-store'
import { postLeadToWebhook } from '@/lib/submit-lead'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = submitLeadSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const data = parsed.data

  if (!data.tcpaConsent) {
    return Response.json({ error: 'TCPA consent required' }, { status: 422 })
  }

  // Duplicate check — return success but don't fire webhook
  if (isDuplicate(data.phone, data.email)) {
    console.log(`[submit-lead] Duplicate suppressed: ${data.email}`)
    return Response.json({ success: true })
  }

  const ipAddress =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  const userAgent = request.headers.get('user-agent') ?? 'unknown'
  const pageUrl =
    request.headers.get('referer') ?? process.env.NEXT_PUBLIC_SITE_URL ?? ''

  const result = await postLeadToWebhook(data, ipAddress, userAgent, pageUrl)

  if (result.success) {
    recordLead(data.phone, data.email)
    return Response.json({ success: true })
  }

  // Log failure but still return success to user
  console.error('[submit-lead] Webhook delivery failed:', result.error)
  return Response.json({ success: true })
}
