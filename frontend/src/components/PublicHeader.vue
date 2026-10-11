<script setup>
import { RouterLink } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'
</script>

<template>
  <header class="site-header container">
    <BrandLogo />

    <nav class="main-nav" aria-label="التنقل الرئيسي">
      <RouterLink :to="{ name: 'home', hash: '#how' }">كيف يعمل؟</RouterLink>
      <RouterLink :to="{ name: 'catalog-demo' }">نموذج الكتالوج</RouterLink>
      <RouterLink :to="{ name: 'home', hash: '#benefits' }">لماذا رَف؟</RouterLink>
    </nav>

    <div class="header-actions">
      <RouterLink class="login-link" :to="{ name: 'login' }">تسجيل الدخول</RouterLink>
      <RouterLink class="button button-dark header-cta" :to="{ name: 'register' }">
        أنشئ حسابك <span aria-hidden="true">↗</span>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-inline-start: auto;
  margin-inline-end: 10px;
}

.main-nav a {
  color: #59685f;
  font-size: 13px;
  font-weight: 500;
  transition: color 0.2s;
}

.main-nav a:hover {
  color: var(--forest-soft);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.login-link {
  color: #516259;
  font-size: 12px;
  font-weight: 700;
  transition: color 0.2s;
}

.login-link:hover {
  color: var(--forest-soft);
}

.header-cta {
  min-height: 42px;
  padding: 9px 16px;
  font-size: 12px;
}

@media (max-width: 900px) {
  .main-nav {
    gap: 18px;
  }
}

@media (max-width: 700px) {
  .main-nav {
    display: none;
  }
  .site-header {
    margin-inline-end: 0;
  }
  .header-actions {
    margin-inline-start: auto;
  }
}

@media (max-width: 600px) {
  .site-header {
    height: 72px;
    gap: 10px;
  }
  .header-actions {
    gap: 12px;
  }
  .header-cta {
    padding: 8px 12px;
    min-height: 39px;
    font-size: 10px;
  }
  .login-link {
    font-size: 11px;
  }
}
</style>