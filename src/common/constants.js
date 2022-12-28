// Color
export const PRIMARY_COLOR_HEX = '#5F9DF7'
export const PRIMARY_COLOR = 'rgba(95, 157, 247)'
export const PRIMARY_UNDERLAY_COLOR = 'rgba(95, 157, 247, 0.6)'
export const PRIMARY_LIGHT_COLOR = 'rgba(95, 157, 247, 0.8)'
export const ERROR_COLOR_HEX = '#F74360'
export const SUCCESS_COLOR_HEX = '#3AB500'
export const WARNING_COLOR_HEX = '#FCE0A2'
export const SILVER_COLOR_HEX = '#797875'

export const BOOKING_STATUS_COLORS = {
  Approved: '#4ade80',
  Pending: '#facc15',
  Reject: '#f87171',
  Success: '#c084fc',
  OverDuePayment: '#f472b6',
  ExtendDueBooking: '#fb923c',
  Done: '#000000',
}

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
  ALL: {
    id: null,
    name: 'All',
  },
  PENDING: {
    id: 1,
    name: 'Pending',
  },
  APPROVED: {
    id: 2,
    name: 'Approved',
  },
  REJECT: {
    id: 3,
    name: 'Reject',
  },
  SUCCESS: {
    id: 4,
    name: 'Success',
  },
  OVERDUEPAYMENT: {
    id: 5,
    name: 'OverDuePayment',
  },
  EXTENDDUEPAYMENT: {
    id: 6,
    name: 'ExtendDueBooking',
  },
  DONE: {
    id: 7,
    name: 'Done',
  },
}

export const DEFAULT_IMG =
  'https://csm-global-files-staging.enouvo.com/1669283320929-download456.jpg'
