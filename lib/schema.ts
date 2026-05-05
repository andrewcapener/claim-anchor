import { z } from 'zod'

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50)
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50)
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),
  phone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Enter a valid US phone number'),
  email: z.string().email('Enter a valid email address'),
  state: z.string().length(2, 'Please select your state'),
  tcpaConsent: z.literal(true, {
    error: () => ({ message: 'You must agree to continue' }),
  }),
})

export const submitLeadSchema = contactSchema.extend({
  wasInjured: z.boolean(),
  accidentType: z.enum([
    'car_accident',
    'truck_commercial',
    'motorcycle',
    'pedestrian_bicycle',
    'slip_fall',
    'other',
  ]),
  accidentTimeframe: z.enum([
    'within_30_days',
    '1_6_months',
    '6_12_months',
    'over_1_year',
  ]),
  medicalTreatment: z.enum(['yes', 'not_yet', 'no']),
  faultStatus: z.enum(['other_party', 'partial', 'self']),
  hasAttorney: z.boolean(),
  trustedformCertUrl: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
})

export type SubmitLeadInput = z.infer<typeof submitLeadSchema>
