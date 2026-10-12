<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  limit: { type: Number, required: true },
})
</script>

<template>
  <section class="limit" role="status">
    <div class="limit-icon" aria-hidden="true">!</div>
    <h2>وصل متجرك إلى الحد المجاني</h2>
    <p>
      تتيح الخطة المجانية {{ limit }} منتجات كحد أقصى، وتُحتسب كل المنتجات المحفوظة، الظاهرة
      والمخفية. لإضافة منتج جديد تعرّف على الخطة المدفوعة، أو احذف منتجًا لا تحتاجه.
    </p>
    <div class="limit-actions">
      <RouterLink class="button button-primary" :to="{ name: 'upgrade' }">
        التعرّف على الخطة المدفوعة <span aria-hidden="true">←</span>
      </RouterLink>
      <RouterLink class="button button-outline" :to="{ name: 'products' }">
        العودة إلى المنتجات
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.limit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 48px 24px;
  border: 1px solid #f0e4b8;
  border-radius: 19px;
  background: #fffbee;
  text-align: center;
}

.limit-icon {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  border-radius: 15px;
  background: #fdebd3;
  color: #8a5a1f;
  font: 700 24px Arial, sans-serif;
}

h2 {
  margin: 8px 0 0;
  color: var(--forest);
  font-size: 19px;
  letter-spacing: -0.03em;
}

p {
  max-width: 440px;
  margin: 0 0 12px;
  color: #6f6a4d;
  font-size: 12px;
  line-height: 1.95;
}

.limit-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
</style>