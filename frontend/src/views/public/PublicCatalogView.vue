<script setup>
import { computed, watchEffect } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import CatalogPage from '@/components/catalog/CatalogPage.vue'
import { demoCatalogs } from '@/data/demo'

const route = useRoute()

// مؤقت: لا يوجد باكند بعد. سيُستبدل بطلب GET /api/catalogs/{store_id}
const catalog = computed(() => demoCatalogs[route.params.storeId] ?? null)

const notice = {
  label: 'بيانات تجريبية',
  text: 'هذا الرابط لا يقرأ من قاعدة بيانات بعد، والمتجر المعروض مثال.',
}

watchEffect(() => {
  if (catalog.value) document.title = `${catalog.value.store.name} — رَف`
})
</script>

<template>
  <CatalogPage
    v-if="catalog"
    :key="route.params.storeId"
    :store="catalog.store"
    :products="catalog.products"
    variant="public"
    :notice="notice"
  />

  <section v-else class="store-missing">
    <h1>هذا المتجر غير متاح</h1>
    <p>
      الرابط غير صحيح أو أن المتجر غير منشور. في هذه المرحلة جرّب
      <span dir="ltr">/c/demo</span> أو <span dir="ltr">/c/demo-empty</span>.
    </p>
    <RouterLink class="button button-dark" :to="{ name: 'home' }">العودة إلى رَف</RouterLink>
  </section>
</template>

<style scoped>
.store-missing {
  max-width: 460px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 0 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
}
h1 { margin: 0; color: var(--forest-deep); font-size: 28px; letter-spacing: -0.04em; }
p { margin: 0 0 12px; color: #69766c; font-size: 13px; line-height: 2; }
</style>