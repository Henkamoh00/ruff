// بيانات تجريبية للوحة التحكم فقط. ليست حسابًا حقيقيًا ولا تُحفظ في أي مكان.
import { demoProducts } from '@/data/demo'

export const FREE_PLAN_LIMIT = 10

export const demoAccount = {
  name: 'ياسمين',
  email: 'yasmine@example.com',
}

export const demoDashboardStore = {
  id: 'demo',
  name: 'بوتيك ياسمين',
  description: 'ملابس نسائية واختيارات يومية.',
  category: 'ملابس',
  currency: 'SAR',
  city: 'جدة',
  address: '',
  phone: '+966 555 00 00 00',
  whatsapp: '+966 555 00 00 00',
  instagram: '',
  facebook: '',
  website: '',
  published: true,
}

// كل المنتجات المخزنة تُحتسب في الحد، سواء كانت ظاهرة أو مخفية.
// منتج واحد مخفي لإظهار الفرق في القائمة.
export const demoDashboardProducts = demoProducts.map((p) =>
  p.id === 'p4' ? { ...p, visible: false } : p,
)

const extraProducts = [
  {
    id: 'p7',
    name: 'وشاح صوفي',
    description: 'دفء بسيط لأيام البرد',
    price: 1800,
    originalPrice: null,
    category: 'إكسسوارات',
    image: null,
    imageAlt: '',
    visible: true,
  },
  {
    id: 'p8',
    name: 'فستان سهرة',
    description: 'قصّة هادئة للمناسبات',
    price: 7200,
    originalPrice: 8000,
    category: 'ملابس',
    image: null,
    imageAlt: '',
    visible: true,
  },
  {
    id: 'p9',
    name: 'حقيبة ظهر',
    description: 'عملية للاستخدام اليومي',
    price: 2900,
    originalPrice: null,
    category: 'حقائب',
    image: null,
    imageAlt: '',
    visible: true,
  },
  {
    id: 'p10',
    name: 'حزام جلدي',
    description: 'لمسة أخيرة للإطلالة',
    price: 1200,
    originalPrice: null,
    category: 'إكسسوارات',
    image: null,
    imageAlt: '',
    visible: true,
  },
]

// عشرة منتجات: حالة بلوغ الحد المجاني
export const demoLimitProducts = [...demoDashboardProducts, ...extraProducts]

// للتصميم فقط: يختار مجموعة البيانات حسب ?state=
export function pickDemoProducts(state) {
  if (state === 'limit') return demoLimitProducts
  if (state === 'empty') return []
  return demoDashboardProducts
}