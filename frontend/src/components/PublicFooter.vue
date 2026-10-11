<script setup>
import { RouterLink } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="site-footer container">
    <BrandLogo size="sm" />
    <p>منتجات محلك، في رابط واحد.</p>
    <nav class="footer-links" aria-label="روابط التذييل">
      <RouterLink :to="{ name: 'privacy' }">الخصوصية</RouterLink>
      <RouterLink :to="{ name: 'terms' }">الشروط</RouterLink>
      <button type="button" class="back-to-top" @click="scrollToTop">العودة للأعلى ↑</button>
    </nav>
    <small>© 2026 رَف — الفكرة قيد الاختبار.</small>
  </footer>
</template>

<style scoped>
.site-footer {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px 25px;
  padding-block: 25px 28px;
}

.site-footer p {
  margin: 0;
  color: #7c877d;
  font-size: 11px;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 20px;
  color: #526259;
  font-size: 11px;
  font-weight: 600;
}

.footer-links a:hover,
.back-to-top:hover {
  color: var(--forest-soft);
}

.back-to-top {
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  cursor: pointer;
}

.site-footer > small {
  grid-column: 1 / -1;
  padding-top: 15px;
  border-top: 1px solid var(--line);
  color: #9aa298;
  font-size: 10px;
}

@media (max-width: 600px) {
  .site-footer {
    grid-template-columns: auto 1fr;
    gap: 10px 15px;
  }
  .site-footer p {
    font-size: 10px;
  }
  .footer-links {
    grid-column: 1 / -1;
    grid-row: 2;
  }
  .site-footer > small {
    margin-top: 6px;
  }
}
</style>