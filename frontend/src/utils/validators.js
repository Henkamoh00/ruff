// تحقق أولي في الواجهة فقط. التحقق المعتمد سيكون في الخلفية.
// كل دالة تعيد نص الخطأ بالعربية، أو نصًا فارغًا إن كانت القيمة صالحة.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateName(value) {
  const name = value.trim()
  if (!name) return 'أدخل اسمك.'
  if (name.length < 2) return 'الاسم قصير جدًا.'
  if (name.length > 80) return 'الاسم طويل جدًا (80 حرفًا كحد أقصى).'
  return ''
}

export function validateEmail(value) {
  const email = value.trim()
  if (!email) return 'أدخل بريدك الإلكتروني.'
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return 'صيغة البريد الإلكتروني غير صحيحة.'
  }
  return ''
}

// في تسجيل الدخول نتحقق من الوجود فقط، ولا نكشف قواعد كلمة المرور
export function validateLoginPassword(value) {
  if (!value) return 'أدخل كلمة المرور.'
  return ''
}

export function validateNewPassword(value) {
  if (!value) return 'أدخل كلمة مرور.'
  if (value.length < 8) return 'كلمة المرور يجب ألا تقل عن 8 أحرف.'
  if (value.length > 128) return 'كلمة المرور طويلة جدًا (128 حرفًا كحد أقصى).'
  if (!value.trim()) return 'كلمة المرور لا يمكن أن تكون مسافات فقط.'
  return ''
}

export function validatePasswordConfirm(password, confirmation) {
  if (!confirmation) return 'أعد كتابة كلمة المرور.'
  if (password !== confirmation) return 'كلمتا المرور غير متطابقتين.'
  return ''
}