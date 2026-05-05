import type { LeadPayload } from '@/types/lead'
import type { SubmitLeadInput } from './schema'

export async function postLeadToWebhook(
  data: SubmitLeadInput,
  ipAddress: string,
  userAgent: string,
  pageUrl: string
): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL
  const webhookSecret = process.env.LEAD_WEBHOOK_SECRET

  if (!webhookUrl) {
    console.error('[submit-lead] LEAD_WEBHOOK_URL is not configured')
    return { success: false, error: 'Webhook not configured' }
  }

  const payload: LeadPayload = {
    source: 'claim-anchor',
    timestamp: new Date().toISOString(),
    trustedform_cert_url: data.trustedformCertUrl ?? '',
    utm: {
      source: data.utmSource,
      medium: data.utmMedium,
      campaign: data.utmCampaign,
    },
    lead: {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone.replace(/\D/g, ''),
      email: data.email,
      state: data.state,
      ip_address: ipAddress,
      user_agent: userAgent,
      page_url: pageUrl,
    },
    qualification: {
      was_injured: data.wasInjured,
      accident_type: data.accidentType,
      accident_timeframe: data.accidentTimeframe,
      received_medical_treatment: data.medicalTreatment === 'yes',
      at_fault: data.faultStatus,
      has_attorney: data.hasAttorney,
    },
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (webhookSecret) {
    headers['Authorization'] = `Bearer ${webhookSecret}`
  }

  let lastError: string | undefined

  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) {
      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 500))
    }

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        console.log(`[submit-lead] Webhook delivered on attempt ${attempt + 1}`)
        return { success: true }
      }

      lastError = `Webhook returned ${res.status}`
      console.warn(`[submit-lead] Attempt ${attempt + 1} failed: ${lastError}`)
    } catch (err) {
      lastError = err instanceof Error ? err.message : 'Network error'
      console.warn(`[submit-lead] Attempt ${attempt + 1} error: ${lastError}`)
    }
  }

  return { success: false, error: lastError }
}
