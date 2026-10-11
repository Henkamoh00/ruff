<script setup>
import { RouterLink } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'
import { scrollToId } from '@/utils/scroll'

defineProps({
  showOffers: { type: Boolean, default: false },
  showCta: { type: Boolean, default: false },
})
</script>

<template>
  <header class="catalog-header container">
    <BrandLogo />

    <nav class="catalog-nav" aria-label="التنقل داخل الكتالوج">
      <a href="#products" @click.prevent="scrollToId('products')">المنتجات</a>
      <a v-if="showOffers" href="#offers" @click.prevent="scrollToId('offers')">العروض</a>
    </nav>

    <RouterLink v-if="showCta" class="button button-dark header-cta" :to="{ name: 'register' }">
      أنشئ كتالوجك <span aria-hidden="true">↗</span>
    </RouterLink>
  </header>
</template>

<style scoped>
.catalog-header {
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid #e8ebe2;
}
.catalog-nav {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-inline-start: auto;
  margin-inline-end: 25px;
}
.catalog-nav a { color: #59685f; font-size: 13px; font-weight: 500; transition: color 0.2s; }
.catalog-nav a:hover { color: var(--forest-soft); }
.header-cta { min-height: 42px; padding: 9px 16px; font-size: 12px; }

@media (max-width: 650px) {
  .catalog-header { height: 70px; }
  .catalog-nav { display: none; }
  .catalog-header .header-cta { margin-inline-start: auto; padding: 8px 12px; min-height: 39px; font-size: 10px; }
}
</style>