export function formatPrice(value) {
  return `${Number(value).toLocaleString('en-US')} دج`
}

export function hasDiscount(product) {
  return product.originalPrice != null && product.originalPrice > product.price
}

export function discountPercent(price, originalPrice) {
  return Math.round((1 - price / originalPrice) * 100)
}

export function whatsappLink(number) {
  if (!number) return null
  let digits = String(number).replace(/\D/g, '')
  if (digits.startsWith('00')) digits = digits.slice(2)
  else if (digits.startsWith('0')) digits = '213' + digits.slice(1)
  return digits ? `https://wa.me/${digits}` : null
}