<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'
</script>

<template>
  <div class="auth-layout">
    <header class="auth-header container">
      <BrandLogo />
      <RouterLink class="auth-back" :to="{ name: 'home' }">العودة إلى الموقع ←</RouterLink>
    </header>

    <main class="auth-main">
      <div class="auth-card">
        <RouterView />
      </div>
    </main>

    <footer class="auth-footer container">
      <RouterLink :to="{ name: 'privacy' }">الخصوصية</RouterLink>
      <RouterLink :to="{ name: 'terms' }">الشروط</RouterLink>
      <small>© 2026 رَف</small>
    </footer>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--paper);
}

.auth-header {
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.auth-back {
  color: #516259;
  font-size: 12px;
  font-weight: 700;
}

.auth-back:hover {
  color: var(--forest-soft);
}

.auth-main {
  flex: 1;
  display: grid;
  place-items: center;
  padding: 20px 17px 48px;
}

.auth-card {
  width: min(100%, 440px);
  padding: 32px 30px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(11, 43, 37, 0.07);
}

.auth-footer {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-block: 20px 26px;
  color: #7c877d;
  font-size: 11px;
}

.auth-footer a:hover {
  color: var(--forest-soft);
}

.auth-footer small {
  margin-inline-start: auto;
  color: #9aa298;
  font-size: 10px;
}

@media (max-width: 600px) {
  .auth-header {
    height: 72px;
  }
  .auth-card {
    padding: 24px 20px;
    border-radius: 17px;
  }
}
</style>