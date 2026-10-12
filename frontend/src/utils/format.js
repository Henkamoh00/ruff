import { siteConfig } from '@/config/site'

// يعرض السعر بالعملة المحددة، مثل: DZD 3,500
// نحيط النص بعلامتي عزل اتجاه (LRI/PDI) كي لا تتبدل أجزاؤه داخل نص عربي
export function formatPrice(value, currency) {
  const code = currency || siteConfig.defaultCurrency
  const amount = Number(value)
  let text
  try {
    text = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      currencyDisplay: 'code',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    text = `${amount.toLocaleString('en-US')} ${code}`
  }
  return `\u2066${text}\u2069`
}

export function hasDiscount(product) {
  return product.originalPrice != null && product.originalPrice > product.price
}

export function discountPercent(price, originalPrice) {
  return Math.round((1 - price / originalPrice) * 100)
}

// يتطلب رقمًا بالصيغة الدولية (يبدأ بـ + أو 00). غير ذلك يعيد null.
export function whatsappLink(number) {
  if (!number) return null
  const raw = String(number).trim()
  let digits = raw.replace(/\D/g, '')
  if (!digits) return null
  if (raw.startsWith('+')) {
    // جاهز
  } else if (digits.startsWith('00')) {
    digits = digits.slice(2)
  } else {
    return null
  }
  return digits ? `https://wa.me/${digits}` : null
}