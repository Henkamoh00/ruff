// قائمة العملات المتاحة لاختيار المتجر. كل رمز يجب أن يكون رمز ISO 4217 صالحًا.
// أضف عملات أخرى بنفس الصيغة عند الحاجة، وطابق القائمة نفسها في الباكند.
export const currencies = [
  // المغرب العربي ومصر
  // الصحراء الغربية: لا عملة معتمدة دوليًا لها، ويُستخدم DZD أو MAD أو MRU بحسب المنطقة.
  { value: 'DZD', label: 'DZD — دينار جزائري' },
  { value: 'MAD', label: 'MAD — درهم مغربي' },
  { value: 'TND', label: 'TND — دينار تونسي' },
  { value: 'LYD', label: 'LYD — دينار ليبي' },
  { value: 'MRU', label: 'MRU — أوقية موريتانية' },
  { value: 'EGP', label: 'EGP — جنيه مصري' },

  // دول الخليج العربي
  { value: 'SAR', label: 'SAR — ريال سعودي' },
  { value: 'AED', label: 'AED — درهم إماراتي' },
  { value: 'QAR', label: 'QAR — ريال قطري' },
  { value: 'KWD', label: 'KWD — دينار كويتي' },
  { value: 'BHD', label: 'BHD — دينار بحريني' },
  { value: 'OMR', label: 'OMR — ريال عماني' },

  // دول المشرق العربي واليمن
  // فلسطين: لا عملة معتمدة دوليًا لها، والمستخدم فعليًا ILS و JOD.
  { value: 'YER', label: 'YER — ريال يمني' },
  { value: 'IQD', label: 'IQD — دينار عراقي' },
  { value: 'SYP', label: 'SYP — ليرة سورية' },
  { value: 'LBP', label: 'LBP — ليرة لبنانية' },
  { value: 'JOD', label: 'JOD — دينار أردني' },
  { value: 'ILS', label: 'ILS — شيكل (فلسطين)' },

  // دول شرق إفريقيا العربية
  { value: 'SDG', label: 'SDG — جنيه سوداني' },
  { value: 'DJF', label: 'DJF — فرنك جيبوتي' },
  { value: 'SOS', label: 'SOS — شلن صومالي' },
  { value: 'KMF', label: 'KMF — فرنك قمري (جزر القمر)' },

  // عملات عالمية
  { value: 'EUR', label: 'EUR — يورو' },
  { value: 'USD', label: 'USD — دولار أمريكي' },
  { value: 'GBP', label: 'GBP — جنيه إسترليني' },
]

export const currencyCodes = currencies.map((c) => c.value)