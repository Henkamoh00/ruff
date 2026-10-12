<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageHeader from '@/components/dashboard/PageHeader.vue'
import ProductForm from '@/components/dashboard/ProductForm.vue'
import LimitReached from '@/components/dashboard/LimitReached.vue'
import { FREE_PLAN_LIMIT, demoDashboardStore, pickDemoProducts } from '@/data/dashboard'

const route = useRoute()

// للتصميم فقط: ?state=limit يعرض حالة بلوغ الحد
const used = computed(() => pickDemoProducts(route.query.state).length)
const atLimit = computed(() => used.value >= FREE_PLAN_LIMIT)
</script>

<template>
  <div>
    <PageHeader
      title="إضافة منتج"
      subtitle="أضف منتجًا بصورة واحدة وسعره. يمكنك إخفاؤه أو تعديله لاحقًا."
    />

    <LimitReached v-if="atLimit" :limit="FREE_PLAN_LIMIT" />
    <ProductForm v-else mode="create" :currency="demoDashboardStore.currency" />

    <p class="design-switch">
      للتصميم فقط:
      <RouterLink :to="{ name: 'product-new' }">النموذج</RouterLink>
      ·
      <RouterLink :to="{ name: 'product-new', query: { state: 'limit' } }">حالة بلوغ الحد</RouterLink>
    </p>
  </div>
</template>

<style scoped>
.design-switch {
  margin: 22px 0 0;
  color: #9aa298;
  font-size: 11px;
}

.design-switch a {
  color: #516259;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>