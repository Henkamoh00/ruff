// تحقق أولي في الواجهة فقط. التحقق المعتمد سيكون في الخلفية.
import { discountPercent } from '@/utils/format'

const MAX_PRICE = 99999999

// يعيد عددًا صحيحًا أو null. الأرقام اللاتينية 0-9 فقط.
export function parseMoney(value) {
  const v = String(value).trim()
  if (!/^[0-9]+$/.test(v)) return null
  const n = Number(v)
  return Number.isSafeInteger(n) ? n : null
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
    errors.price = 'السعر يجب أن يكون عددًا صحيحًا بالأرقام 0-9 فقط، بلا فواصل أو كسور.'
  } else if (price > MAX_PRICE) {
    errors.price = 'السعر كبير جدًا.'
  }

  const originalRaw = form.originalPrice.trim()
  if (originalRaw) {
    const original = parseMoney(form.originalPrice)
    if (original === null) {
      errors.originalPrice = 'السعر الأصلي يجب أن يكون عددًا صحيحًا بالأرقام 0-9 فقط.'
    } else if (original > MAX_PRICE) {
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