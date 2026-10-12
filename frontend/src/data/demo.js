// بيانات تجريبية واضحة: ليست متجرًا حقيقيًا ولا تُحفظ في أي مكان.

export const demoStore = {
  id: 'demo',
  name: 'بوتيك ياسمين',
  initial: 'ي',
  logo: null,
  tagline: 'ملابس نسائية واختيارات يومية',
  city: 'جدة، السعودية',
  address: null,
  currency: 'SAR',
  phone: '+966 555 00 00 00',
  whatsapp: '+966 555 00 00 00',
  socials: [],
  hero: {
    eyebrow: 'اختيارات الموسم',
    titleMain: 'قطع تحبّينها،',
    titleMuted: 'وأسعار واضحة.',
    text: 'تصفّحي مجموعة المتجر واختاري ما يناسبك. كل المنتجات والأسعار في مكان واحد، من دون الحاجة إلى البحث بين الصور والرسائل.',
    buttonLabel: 'تصفّحي المنتجات',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'صورة توضيحية لأزياء في متجر',
    imageNote: 'صورة توضيحية',
    tagTitle: 'إطلالات مختارة',
    tagText: 'نموذج لواجهة المتجر',
  },
}

export const demoProducts = [
  {
    id: 'p1',
    name: 'طقم الموسم',
    description: 'اختيار أنيق للإطلالات اليومية',
    price: 162,
    originalPrice: null,
    category: 'ملابس',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'إطلالة ملابس عصرية',
    visible: true,
  },
  {
    id: 'p2',
    name: 'إطلالة يومية',
    description: 'تصميم بسيط يسهل تنسيقه',
    price: 90,
    originalPrice: 97.50,
    category: 'ملابس',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'ملابس معروضة في متجر',
    visible: true,
  },
  {
    id: 'p3',
    name: 'حقيبة كلاسيكية',
    description: 'قطعة عملية للاستخدام اليومي',
    price: 98,
    originalPrice: 115,
    category: 'حقائب',
    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'حقيبة نسائية',
    visible: true,
  },
  {
    id: 'p4',
    name: 'سترة خفيفة',
    description: 'تصميم مناسب لأيام الموسم',
    price: 149,
    originalPrice: null,
    category: 'ملابس',
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'ملابس معروضة',
    visible: true,
  },
  {
    id: 'p5',
    name: 'إكسسوار أنيق',
    description: 'لمسة بسيطة لإطلالتك',
    price: 45,
    originalPrice: null,
    category: 'إكسسوارات',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'إكسسوارات، صورة توضيحية',
    visible: true,
  },
  {
    id: 'p6',
    name: 'حقيبة صغيرة',
    description: 'حجم عملي ولمسة هادئة',
    price: 92,
    originalPrice: null,
    category: 'حقائب',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'حقيبة يد، صورة توضيحية',
    visible: true,
  },
]

// متجر تجريبي بلا منتجات، لاختبار الحالة الفارغة
export const demoEmptyStore = {
  ...demoStore,
  id: 'demo-empty',
  name: 'متجر بلا منتجات',
  initial: 'م',
  tagline: 'مثال لكتالوج فارغ',
  hero: null,
}

export const demoCatalogs = {
  demo: { store: demoStore, products: demoProducts },
  'demo-empty': { store: demoEmptyStore, products: [] },
}