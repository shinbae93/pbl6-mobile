import moment from 'moment'

export const FormatDatetime = (datetime) => {
  return moment(datetime).format('DD/MM/YYYY')
}
