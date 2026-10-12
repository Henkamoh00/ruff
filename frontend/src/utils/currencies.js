// قائمة العملات المتاحة لاختيار المتجر. أضف عملات أخرى بنفس الصيغة عند الحاجة.
export const currencies = [
  { value: 'DZD', label: 'DZD — دينار جزائري' },
  { value: 'MAD', label: 'MAD — درهم مغربي' },
  { value: 'TND', label: 'TND — دينار تونسي' },
  { value: 'EGP', label: 'EGP — جنيه مصري' },
  { value: 'SAR', label: 'SAR — ريال سعودي' },
  { value: 'AED', label: 'AED — درهم إماراتي' },
  { value: 'QAR', label: 'QAR — ريال قطري' },
  { value: 'TRY', label: 'TRY — ليرة تركية' },
  { value: 'EUR', label: 'EUR — يورو' },
  { value: 'USD', label: 'USD — دولار أمريكي' },
  { value: 'GBP', label: 'GBP — جنيه إسترليني' },
]

export const currencyCodes = currencies.map((c) => c.value)