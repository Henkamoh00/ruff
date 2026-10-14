// تحقق أولي في الواجهة فقط. التحقق المعتمد سيكون في الخلفية.
import { discountPercent } from '@/utils/format'

// أكبر مبلغ مسموح: 99,999,999.99 بالسنتيمات
const MAX_PRICE_CENTS = 9999999999
const MONEY_PATTERN = /^[0-9]+(\.[0-9]{1,2})?$/

const MONEY_FORMAT_ERROR =
  'استخدم الأرقام 0-9 فقط، مع نقطة عشرية واحدة وخانتين عشريتين على الأكثر، مثل: 97.50'

// يعيد المبلغ بالسنتيمات (عددًا صحيحًا) أو null إن كانت الصيغة غير صالحة.
// نعمل بالسنتيمات لتجنب أخطاء الفاصلة العائمة عند المقارنة.
export function parseMoney(value) {
  const v = String(value).trim()
  if (!MONEY_PATTERN.test(v)) return null
  const [whole, fraction = ''] = v.split('.')
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0'))
}

export function validateProductForm(form) {
  const errors = {}

  const name = form.name.trim()
  if (!name) errors.name = 'أدخل اسم المنتج.'
  else if (name.length < 2) errors.name = 'اسم المنتج قصير جدًا.'
  else if (name.length > 100) errors.name = 'اسم المنتج طويل جدًا (100 حرف كحد أقصى).'

  if (form.description.trim().length > 300) {
    errors.description = 'الوصف طويل جدًا (300 حرف كحد أقصى).'
  }

  if (form.category.trim().length > 40) {
    errors.category = 'اسم الفئة طويل جدًا (40 حرفًا كحد أقصى).'
  }

  const priceRaw = form.price.trim()
  const price = parseMoney(form.price)
  if (!priceRaw) {
    errors.price = 'أدخل السعر.'
  } else if (price === null) {
    errors.price = MONEY_FORMAT_ERROR
  } else if (price > MAX_PRICE_CENTS) {
    errors.price = 'السعر كبير جدًا.'
  }

  const originalRaw = form.originalPrice.trim()
  if (originalRaw) {
    const original = parseMoney(form.originalPrice)
    if (original === null) {
      errors.originalPrice = MONEY_FORMAT_ERROR
    } else if (original > MAX_PRICE_CENTS) {
      errors.originalPrice = 'السعر الأصلي كبير جدًا.'
    } else if (price !== null && !errors.price && original <= price) {
      errors.originalPrice = 'السعر الأصلي يجب أن يكون أعلى من السعر الحالي.'
    }
  }

  return errors
}

// نسبة التخفيض إن كان السعران صالحين، وإلا null
export function previewDiscount(form) {
  const price = parseMoney(form.price)
  const original = parseMoney(form.originalPrice)
  if (price === null || original === null || original <= price) return null
  return discountPercent(price, original)
}