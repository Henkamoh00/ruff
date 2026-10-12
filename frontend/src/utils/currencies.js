// قائمة العملات المتاحة لاختيار المتجر. أضف عملات أخرى بنفس الصيغة عند الحاجة.
export const currencies = [
  // دول المغرب العربي والصحراء الغربية
  { value: 'DZD', label: 'DZD — دينار جزائري' },
  { value: 'MAD', label: 'MAD — درهم مغربي' },
  { value: 'TND', label: 'TND — دينار تونسي' },
  { value: 'LYD', label: 'LYD — دينار ليبي' },
  { value: 'MRU', label: 'MRU — أوقية موريتانية' },
  { value: 'EGP', label: 'EGP — جنيه مصري' },
  { value: 'SADR', label: 'SADR — بسيطة صحراوية (الصحراء الغربية)' },

  // دول الخليج العربي
  { value: 'SAR', label: 'SAR — ريال سعودي' },
  { value: 'AED', label: 'AED — درهم إماراتي' },
  { value: 'QAR', label: 'QAR — ريال قطري' },
  { value: 'KWD', label: 'KWD — دينار كويتي' },
  { value: 'BHD', label: 'BHD — دينار بحريني' },
  { value: 'OMR', label: 'OMR — ريال عماني' },

  // دول المشرق العربي واليمن
  { value: 'YER', label: 'YER — ريال يمني' },
  { value: 'IQD', label: 'IQD — دينار عراقي' },
  { value: 'SYP', label: 'SYP — ليرة سورية' },
  { value: 'LBP', label: 'LBP — ليرة لبنانية' },
  { value: 'JOD', label: 'JOD — دينار أردني' },
  { value: 'ILS', label: 'ILS / JOD — شيكل / دينار (فلسطين)' },

  // دول شرق إفريقيا العربية
  { value: 'SDG', label: 'SDG — جنيه سوداني' },
  { value: 'DJF', label: 'DJF — فرنك جيبوتي' },
  { value: 'SOS', label: 'SOS — شلن صومالي' },
  { value: 'KMF', label: 'KMF — فرنك قمري (جزر القمر)' },

  // العملات العالمية المتبقية من القائمة الأصلية
  { value: 'EUR', label: 'EUR — يورو' },
  { value: 'USD', label: 'USD — دولار أمريكي' },
  { value: 'GBP', label: 'GBP — جنيه إسترليني' }
];


export const currencyCodes = currencies.map((c) => c.value)