export const VNDFormat = (input) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  })

  return formatter.format(input)
}
