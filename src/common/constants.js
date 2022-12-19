// Color
export const PRIMARY_COLOR_HEX = '#5F9DF7'
export const PRIMARY_COLOR = 'rgba(95, 157, 247)'
export const PRIMARY_UNDERLAY_COLOR = 'rgba(95, 157, 247, 0.6)'
export const PRIMARY_LIGHT_COLOR = 'rgba(95, 157, 247, 0.8)'
export const ERROR_COLOR_HEX = '#F74360'
export const SUCCESS_COLOR_HEX = '#3AB500'
export const WARNING_COLOR_HEX = '#FCE0A2'

// API
export const USER_BASE_API =
  'https://user-service-prod-pbl6-4jcro6.mo1.mogenius.io/api/v1'
export const BOOKING_BASE_API =
  'https://pbl6-prod-pbl-dspnq9.mo6.mogenius.io/api'
export const BASE_API =
  'https://gateway-prod-gateway-0ix8cn.mo4.mogenius.io/api'

// Role
export const CLIENT_ROLE_ID = '636723d347707eeadf80eb59'

// Booking statuses

// Approved: #4ade80
// Pending: #facc15
// Reject: #f87171
// Success: #c084fc
// OverDuePayment: #f472b6
// ExtendDueBooking: #fb923c
// Done: #000

// Approved: 1
// Pending: 2
// Reject: 3
// Success: 4
// OverDuePayment: 5
// ExtendDueBooking: 6
// Done: 7

export const BOOKING_STATUSES = {
  APPROVED: {
    id: 1,
    name: 'Approved',
    color: '#4ade80',
  },
  PENDING: {
    id: 2,
    name: 'Pending',
    color: '#facc15',
  },
  REJECT: {
    id: 3,
    name: 'Reject',
    color: '#f87171',
  },
  SUCCESS: {
    id: 4,
    name: 'Success',
    color: '#c084fc',
  },
  OVERDUEPAYMENT: {
    id: 5,
    name: 'OverDuePayment',
    color: '#f472b6',
  },
  EXTENDDUEPAYMENT: {
    id: 6,
    name: 'ExtendDueBooking',
    color: '#fb923c',
  },
  DONE: {
    id: 7,
    name: 'Done',
    color: '#000000',
  },
}
