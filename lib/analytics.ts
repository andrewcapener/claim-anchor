'use client'

export function trackEvent(name: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return

  // Google Analytics
  if (typeof (window as unknown as { gtag?: Function }).gtag === 'function') {
    ;(window as unknown as { gtag: Function }).gtag('event', name, props)
  }

  // Vercel Analytics is handled via the <Analytics /> component
}

export function trackFormStep(step: number) {
  trackEvent('lead_form_step', { step })
}

export function trackLeadSubmit(state: string) {
  trackEvent('lead_submitted', { state })

  // Fire conversion event for ad platforms
  if (typeof window !== 'undefined') {
    const w = window as unknown as { dataLayer?: unknown[] }
    if (!w.dataLayer) w.dataLayer = []
    w.dataLayer.push({
      event: 'lead_conversion',
      lead_state: state,
    })
  }
}
