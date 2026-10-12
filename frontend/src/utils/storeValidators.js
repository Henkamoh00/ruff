// تحقق أولي في الواجهة فقط. التحقق المعتمد سيكون في الخلفية.
import { currencyCodes } from '@/utils/currencies'

export const storeCategories = [
  'ملابس',
  'أحذية',
  'حقائب',
  'حلويات',
  'أثاث وديكور',
  'إلكترونيات',
  'أخرى',
]

const PHONE_PATTERN = /^\+?\d{8,15}$/
const INTERNATIONAL_PATTERN = /^(\+|00)\d{8,15}$/

function cleanPhone(value) {
  return value.replace(/[\s\-.()]/g, '')
}

function validatePhone(value) {
  const v = value.trim()
  if (!v) return ''
  return PHONE_PATTERN.test(cleanPhone(v)) ? '' : 'رقم الهاتف غير صحيح.'
}

function validateWhatsapp(value) {
  const v = value.trim()
  if (!v) return ''
  return INTERNATIONAL_PATTERN.test(cleanPhone(v))
    ? ''
    : 'أدخل رقم واتساب بالصيغة الدولية مع رمز الدولة، مثال: +213555000000.'
}

function validateOptionalUrl(value) {
  const v = value.trim()
  if (!v) return ''
  try {
    const url = new URL(v)
    if (url.protocol === 'http:' || url.protocol === 'https:') return ''
  } catch {
    // يسقط إلى رسالة الخطأ أدناه
  }
  return 'الرابط غير صحيح، ابدأه بـ https://'
}

export function validateStoreForm(form) {
  const errors = {}

  const name = form.name.trim()
  if (!name) errors.name = 'أدخل اسم المتجر.'
  else if (name.length < 2) errors.name = 'اسم المتجر قصير جدًا.'
  else if (name.length > 80) errors.name = 'اسم المتجر طويل جدًا (80 حرفًا كحد أقصى).'

  if (form.description.trim().length > 300) {
    errors.description = 'الوصف طويل جدًا (300 حرف كحد أقصى).'
  }

  if (!form.category) errors.category = 'اختر نشاط المتجر.'

  if (!currencyCodes.includes(form.currency)) errors.currency = 'اختر عملة المتجر.'

  if (!form.city.trim()) errors.city = 'أدخل المدينة.'
  else if (form.city.trim().length > 60) errors.city = 'اسم المدينة طويل جدًا.'

  if (form.address.trim().length > 150) errors.address = 'العنوان طويل جدًا (150 حرفًا كحد أقصى).'

  const phoneError = validatePhone(form.phone)
  if (phoneError) errors.phone = phoneError
  const whatsappError = validateWhatsapp(form.whatsapp)
  if (whatsappError) errors.whatsapp = whatsappError
  if (!form.phone.trim() && !form.whatsapp.trim()) {
    errors.phone = 'أدخل رقم هاتف أو واتساب على الأقل.'
  }

  for (const field of ['instagram', 'facebook', 'website']) {
    const urlError = validateOptionalUrl(form[field])
    if (urlError) errors[field] = urlError
  }

  return errors
}