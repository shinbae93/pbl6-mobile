import moment from 'moment'

export const FormatDatetime = (datetime) => {
  return moment(datetime).format('DD/MM/YYYY')
}

export const MaxDate = (date1, date2) => {
  return moment(date1).isAfter(date2) ? date1 : date2
}
