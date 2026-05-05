export type AccidentType =
  | 'car_accident'
  | 'truck_commercial'
  | 'motorcycle'
  | 'pedestrian_bicycle'
  | 'slip_fall'
  | 'other'

export type AccidentTimeframe =
  | 'within_30_days'
  | '1_6_months'
  | '6_12_months'
  | 'over_1_year'

export type MedicalTreatment = 'yes' | 'not_yet' | 'no'

export type FaultStatus = 'other_party' | 'partial' | 'self'

export interface LeadFormData {
  // Step 1
  wasInjured: boolean
  // Step 2
  accidentType: AccidentType
  accidentTimeframe: AccidentTimeframe
  medicalTreatment: MedicalTreatment
  // Step 3
  faultStatus: FaultStatus
  hasAttorney: boolean
  // Step 4
  firstName: string
  lastName: string
  phone: string
  email: string
  state: string
  tcpaConsent: true
}

export interface LeadPayload {
  source: 'claim-anchor'
  timestamp: string
  trustedform_cert_url: string
  utm: {
    source?: string
    medium?: string
    campaign?: string
  }
  lead: {
    first_name: string
    last_name: string
    phone: string
    email: string
    state: string
    ip_address: string
    user_agent: string
    page_url: string
  }
  qualification: {
    was_injured: boolean
    accident_type: AccidentType
    accident_timeframe: AccidentTimeframe
    received_medical_treatment: boolean
    at_fault: FaultStatus
    has_attorney: boolean
  }
}

export interface SubmitLeadRequest extends LeadFormData {
  trustedformCertUrl?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}
