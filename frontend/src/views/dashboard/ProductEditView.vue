<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageHeader from '@/components/dashboard/PageHeader.vue'
import ProductForm from '@/components/dashboard/ProductForm.vue'
import { demoDashboardStore, demoLimitProducts } from '@/data/dashboard'

const route = useRoute()

// مؤقت: سيُستبدل بطلب GET /api/products/{product_id}
const product = computed(() => demoLimitProducts.find((p) => p.id === route.params.productId) ?? null)

const initial = computed(() => {
  const p = product.value
  if (!p) return {}
  return {
    name: p.name,
    description: p.description ?? '',
    price: String(p.price),
    originalPrice: p.originalPrice == null ? '' : String(p.originalPrice),
    category: p.category ?? '',
    visible: p.visible !== false,
    available: p.available !== false,
  }
})
</script>

<template>
  <div>
    <template v-if="product">
      <PageHeader :title="`تعديل: ${product.name}`" subtitle="عدّل بيانات المنتج أو استبدل صورته." />
      <ProductForm
        :key="product.id"
        mode="edit"
        :initial="initial"
        :current-image="product.image"
        :currency="demoDashboardStore.currency"
      />
    </template>

    <section v-else class="missing">
      <h1>المنتج غير موجود</h1>
      <p>قد يكون الرابط غير صحيح أو أن المنتج حُذف.</p>
      <RouterLink class="button button-dark" :to="{ name: 'products' }">العودة إلى المنتجات</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.missing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 56px 24px;
  border: 1px dashed #d6dccb;
  border-radius: 19px;
  background: #fff;
  text-align: center;
}

h1 {
  margin: 0;
  color: var(--forest);
  font-size: 21px;
  letter-spacing: -0.03em;
}

p {
  margin: 0 0 12px;
  color: #7a857c;
  font-size: 12px;
}
</style>