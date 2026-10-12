import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '@/layouts/PublicLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import HomeView from '@/views/public/HomeView.vue'
import CatalogDemoView from '@/views/public/CatalogDemoView.vue'
import PublicCatalogView from '@/views/public/PublicCatalogView.vue'
import PrivacyView from '@/views/public/PrivacyView.vue'
import TermsView from '@/views/public/TermsView.vue'
import ContactView from '@/views/public/ContactView.vue'
import NotFoundView from '@/views/public/NotFoundView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardHomeView from '@/views/dashboard/DashboardHomeView.vue'
import StoreCreateView from '@/views/dashboard/StoreCreateView.vue'
import StoreEditView from '@/views/dashboard/StoreEditView.vue'
import ProductsView from '@/views/dashboard/ProductsView.vue'
import ProductCreateView from '@/views/dashboard/ProductCreateView.vue'
import ProductEditView from '@/views/dashboard/ProductEditView.vue'
import PreviewView from '@/views/dashboard/PreviewView.vue'
import SettingsView from '@/views/dashboard/SettingsView.vue'
import UpgradeView from '@/views/dashboard/UpgradeView.vue'

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
        path: 'contact',
        name: 'contact',
        component: ContactView,
        meta: { title: 'تواصل معنا' },
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: PrivacyView,
        meta: { title: 'سياسة الخصوصية' },
      },
      {
        path: 'terms',
        name: 'terms',
        component: TermsView,
        meta: { title: 'شروط الاستخدام' },
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
        component: LoginView,
        meta: { title: 'تسجيل الدخول' },
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView,
        meta: { title: 'إنشاء حساب' },
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
        component: DashboardHomeView,
        meta: { title: 'لوحة التحكم' },
      },
      {
        path: 'store/new',
        name: 'store-new',
        component: StoreCreateView,
        meta: { title: 'إنشاء المتجر' },
      },
      {
        path: 'store',
        name: 'store-edit',
        component: StoreEditView,
        meta: { title: 'بيانات المتجر' },
      },
      {
        path: 'products',
        name: 'products',
        component: ProductsView,
        meta: { title: 'المنتجات' },
      },
      {
        path: 'products/new',
        name: 'product-new',
        component: ProductCreateView,
        meta: { title: 'إضافة منتج' },
      },
      {
        path: 'products/:productId/edit',
        name: 'product-edit',
        component: ProductEditView,
        meta: { title: 'تعديل منتج' },
      },
      {
        path: 'preview',
        name: 'preview',
        component: PreviewView,
        meta: { title: 'معاينة الكتالوج' },
      },
      {
        path: 'settings',
        name: 'settings',
        component: SettingsView,
        meta: { title: 'إعدادات الحساب' },
      },
      {
        path: 'upgrade',
        name: 'upgrade',
        component: UpgradeView,
        meta: { title: 'حد المنتجات والترقية' },
      },
    ],
  },

  // ---------- 404 (داخل التخطيط العام) ----------
  {
    path: '/:pathMatch(.*)*',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'not-found',
        component: NotFoundView,
        meta: { title: 'الصفحة غير موجودة' },
      },
    ],
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