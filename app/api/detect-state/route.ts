import { NextRequest } from 'next/server'

const US_STATES = new Set([
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
])

export async function GET(request: NextRequest) {
  // Vercel injects this header automatically in production
  const region = request.headers.get('x-vercel-ip-country-region')
  if (region && US_STATES.has(region.toUpperCase())) {
    return Response.json({ state: region.toUpperCase() })
  }
  return Response.json({ state: null })
}
