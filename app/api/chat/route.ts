import { NextRequest } from 'next/server'
import { streamText, convertToModelMessages, stepCountIs } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { z } from 'zod'

const SYSTEM_PROMPT = `You are Alex, a helpful intake specialist for Claim Anchor, a free legal case review service.
Your job is to have a warm, empathetic conversation with someone who may have been in an accident,
collect their information, and determine if they qualify for a free legal review.

Tone: Calm, caring, professional. Never pushy. Never use scary legal jargon.
Never give legal advice. Never promise outcomes.

Your intake flow:
1. Warm greeting — ask if they were in an accident
2. Ask what type of accident and when
3. Ask if they saw a doctor
4. Ask if they currently have an attorney
5. If they qualify: collect name, phone, email, state
6. Confirm you'll have a specialist reach out shortly

When you have all contact info, call the submitLead function.
If they don't qualify (have attorney, own fault, no accident), be gracious and wish them well.
Keep responses SHORT — 1-3 sentences max. This is a chat, not an essay.`

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'AI chat not configured' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const anthropic = createAnthropic({ apiKey })

  const rawMessages = (body as { messages?: unknown[] })?.messages ?? []
  const messages = await convertToModelMessages(
    rawMessages as Parameters<typeof convertToModelMessages>[0]
  )

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'),
    system: SYSTEM_PROMPT,
    messages,
    tools: {
      submitLead: {
        description: 'Submit a qualified lead for attorney follow-up',
        inputSchema: z.object({
          name: z.string().describe('Full name of the claimant'),
          phone: z.string().describe('Phone number'),
          email: z.string().describe('Email address'),
          state: z.string().describe('US state abbreviation'),
          accidentType: z.string().describe('Type of accident'),
          hasAttorney: z.boolean().describe('Whether they already have an attorney'),
        }),
        execute: async (args) => {
          try {
            const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
            await fetch(`${baseUrl}/api/submit-lead`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                firstName: args.name.split(' ')[0] ?? args.name,
                lastName: args.name.split(' ').slice(1).join(' ') || 'Unknown',
                phone: args.phone,
                email: args.email,
                state: args.state.toUpperCase().slice(0, 2),
                wasInjured: true,
                accidentType: args.accidentType.toLowerCase().includes('truck') ? 'truck_commercial'
                  : args.accidentType.toLowerCase().includes('motor') ? 'motorcycle'
                  : args.accidentType.toLowerCase().includes('pedestrian') || args.accidentType.toLowerCase().includes('bike') ? 'pedestrian_bicycle'
                  : args.accidentType.toLowerCase().includes('slip') ? 'slip_fall'
                  : 'car_accident',
                accidentTimeframe: 'within_30_days',
                medicalTreatment: 'yes',
                faultStatus: 'other_party',
                hasAttorney: args.hasAttorney,
                tcpaConsent: true,
                utmSource: 'ai_chat',
              }),
            })
          } catch {
            // don't block the chat on webhook failure
          }
          return { submitted: true }
        },
      },
    },
    stopWhen: stepCountIs(5),
  })

  return result.toTextStreamResponse()
}
