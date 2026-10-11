import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '@/layouts/PublicLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import PagePlaceholder from '@/views/PagePlaceholder.vue'
import HomeView from '@/views/public/HomeView.vue'
import CatalogDemoView from '@/views/public/CatalogDemoView.vue'
import PublicCatalogView from '@/views/public/PublicCatalogView.vue'

const routes = [
  // ---------- الصفحات العامة ----------
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: { title: 'الصفحة الرئيسية', announcement: true },
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: PagePlaceholder,
        meta: { title: 'سياسة الخصوصية', batch: 3 },
      },
      {
        path: 'terms',
        name: 'terms',
        component: PagePlaceholder,
        meta: { title: 'شروط الاستخدام', batch: 3 },
      },
    ],
  },

  // ---------- الكتالوج (له رأسه الخاص، بلا تخطيط) ----------
  {
    path: '/catalog-demo',
    name: 'catalog-demo',
    component: CatalogDemoView,
    meta: { title: 'نموذج الكتالوج' },
  },
  {
    path: '/c/:storeId',
    name: 'public-catalog',
    component: PublicCatalogView,
    meta: { title: 'كتالوج المتجر' },
  },

  // ---------- المصادقة ----------
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: PagePlaceholder,
        meta: { title: 'تسجيل الدخول', batch: 3 },
      },
      {
        path: 'register',
        name: 'register',
        component: PagePlaceholder,
        meta: { title: 'إنشاء حساب', batch: 3 },
      },
    ],
  },

  // ---------- لوحة التحكم ----------
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: PagePlaceholder,
        meta: { title: 'لوحة التحكم', batch: 4 },
      },
      {
        path: 'store/new',
        name: 'store-new',
        component: PagePlaceholder,
        meta: { title: 'إنشاء المتجر', batch: 4 },
      },
      {
        path: 'store',
        name: 'store-edit',
        component: PagePlaceholder,
        meta: { title: 'بيانات المتجر', batch: 4 },
      },
      {
        path: 'products',
        name: 'products',
        component: PagePlaceholder,
        meta: { title: 'المنتجات', batch: 5 },
      },
      {
        path: 'products/new',
        name: 'product-new',
        component: PagePlaceholder,
        meta: { title: 'إضافة منتج', batch: 5 },
      },
      {
        path: 'products/:productId/edit',
        name: 'product-edit',
        component: PagePlaceholder,
        meta: { title: 'تعديل منتج', batch: 5 },
      },
      {
        path: 'preview',
        name: 'preview',
        component: PagePlaceholder,
        meta: { title: 'معاينة الكتالوج', batch: 6 },
      },
      {
        path: 'settings',
        name: 'settings',
        component: PagePlaceholder,
        meta: { title: 'إعدادات الحساب', batch: 6 },
      },
      {
        path: 'upgrade',
        name: 'upgrade',
        component: PagePlaceholder,
        meta: { title: 'حد المنتجات والترقية', batch: 5 },
      },
    ],
  },

  // ---------- 404 ----------
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: PagePlaceholder,
    meta: { title: 'الصفحة غير موجودة', batch: 3 },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 20, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = to.meta?.title
  document.title = title ? `${title} — رَف` : 'رَف — منتجات محلك، في رابط واحد'
})

export default router