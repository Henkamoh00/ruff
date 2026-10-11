<script setup>
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'

const route = useRoute()
const menuOpen = ref(false)

const navItems = [
  {
    label: 'الرئيسية',
    icon: '▦',
    to: { name: 'dashboard' },
    match: (path) => path === '/dashboard',
  },
  {
    label: 'المنتجات',
    icon: '▤',
    to: { name: 'products' },
    match: (path) => path.startsWith('/dashboard/products'),
  },
  {
    label: 'بيانات المتجر',
    icon: '⌂',
    to: { name: 'store-edit' },
    match: (path) => path.startsWith('/dashboard/store'),
  },
  {
    label: 'معاينة الكتالوج',
    icon: '↗',
    to: { name: 'preview' },
    match: (path) => path === '/dashboard/preview',
  },
  {
    label: 'إعدادات الحساب',
    icon: '✳',
    to: { name: 'settings' },
    match: (path) => path === '/dashboard/settings',
  },
]

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <div class="dash">
    <div v-if="menuOpen" class="dash-overlay" @click="menuOpen = false"></div>

    <aside class="dash-sidebar" :class="{ open: menuOpen }" aria-label="قائمة لوحة التحكم">
      <div class="sidebar-top">
        <BrandLogo :to="{ name: 'dashboard' }" />
      </div>

      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="nav-item"
          :class="{ 'is-active': item.match(route.path) }"
        >
          <span class="nav-icon" aria-hidden="true">{{ item.icon }}</span>
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="sidebar-bottom">
        <RouterLink class="upgrade-link" :to="{ name: 'upgrade' }">
          <strong>الخطة المجانية</strong>
          <small>حد المنتجات والترقية ←</small>
        </RouterLink>
        <!-- تنقّل فقط في مرحلة الواجهة؛ لا يوجد خروج فعلي قبل ربط المصادقة -->
        <RouterLink class="logout-link" :to="{ name: 'login' }">تسجيل الخروج</RouterLink>
      </div>
    </aside>

    <div class="dash-body">
      <header class="dash-topbar">
        <button
          type="button"
          class="menu-button"
          :aria-expanded="menuOpen"
          aria-label="فتح القائمة"
          @click="menuOpen = !menuOpen"
        >
          ☰
        </button>
        <BrandLogo :to="{ name: 'dashboard' }" size="sm" />
      </header>

      <div class="demo-strip">
        واجهة تجريبية: البيانات المعروضة أمثلة، ولم يُربط الحفظ بالخلفية بعد.
      </div>

      <main class="dash-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dash {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 256px minmax(0, 1fr);
  background: var(--paper);
}

.dash-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 22px 16px;
  background: #fff;
  border-inline-end: 1px solid var(--line);
}

.sidebar-top {
  padding: 4px 8px 24px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 11px;
  min-height: 44px;
  padding: 8px 12px;
  border-radius: 11px;
  color: #4d5e54;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
}

.nav-item:hover {
  background: #f4f6ee;
}

.nav-item.is-active {
  background: var(--lime-soft);
  color: var(--forest);
}

.nav-icon {
  width: 24px;
  text-align: center;
  color: #7f9561;
  font-size: 16px;
}

.sidebar-bottom {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.upgrade-link {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 13px 14px;
  border-radius: 13px;
  background: var(--forest);
  color: #fff;
}

.upgrade-link strong {
  font-size: 12px;
}

.upgrade-link small {
  color: var(--lime);
  font-size: 10px;
  font-weight: 600;
}

.logout-link {
  padding: 9px 12px;
  color: #7c877d;
  font-size: 12px;
  font-weight: 600;
}

.logout-link:hover {
  color: var(--danger);
}

.dash-body {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.dash-topbar {
  display: none;
}

.demo-strip {
  padding: 7px 24px;
  background: #fff8e3;
  border-bottom: 1px solid #f0e4b8;
  color: #7a6a2c;
  font-size: 11px;
  text-align: center;
}

.dash-content {
  flex: 1;
  width: 100%;
  max-width: 1040px;
  margin-inline: auto;
  padding: 32px 28px 64px;
}

.dash-overlay {
  display: none;
}

@media (max-width: 900px) {
  .dash {
    grid-template-columns: minmax(0, 1fr);
  }

  .dash-sidebar {
    position: fixed;
    inset-block: 0;
    inset-inline-start: 0;
    z-index: 30;
    width: 272px;
    transform: translateX(100%);
    transition: transform 0.25s;
    box-shadow: 0 0 40px rgba(11, 43, 37, 0.15);
  }

  .dash-sidebar.open {
    transform: none;
  }

  .dash-overlay {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 20;
    background: rgba(11, 43, 37, 0.4);
  }

  .dash-topbar {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 58px;
    padding: 0 17px;
    background: #fff;
    border-bottom: 1px solid var(--line);
  }

  .menu-button {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: #fff;
    color: var(--forest);
    font-size: 18px;
    cursor: pointer;
  }

  .dash-content {
    padding: 22px 17px 52px;
  }
}
</style>