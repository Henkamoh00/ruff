<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section class="placeholder">
    <span class="placeholder-tag">قيد البناء — الدفعة {{ route.meta.batch }}</span>
    <h1>{{ route.meta.title }}</h1>
    <p class="placeholder-path" dir="ltr">{{ route.fullPath }}</p>
    <p>
      هذه الصفحة مسار مؤقت للتأكد من عمل التنقل، وسيحل محلها التصميم الفعلي في الدفعة
      {{ route.meta.batch }}.
    </p>
    <RouterLink class="button button-dark" :to="{ name: 'home' }">العودة إلى الرئيسية</RouterLink>
  </section>
</template>

<style scoped>
.placeholder {
  max-width: 560px;
  margin: 0 auto;
  padding: 72px 17px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.placeholder-tag {
  padding: 4px 11px;
  border: 1px solid #e2e9d4;
  border-radius: 50px;
  background: var(--lime-soft);
  color: #6d7d55;
  font-size: 11px;
  font-weight: 600;
}

h1 {
  margin: 12px 0 0;
  color: var(--forest-deep);
  font-size: 32px;
  line-height: 1.4;
  letter-spacing: -0.04em;
}

.placeholder-path {
  margin: 0;
  color: #8a948b;
  font: 12px Arial, sans-serif;
  text-align: left;
}

p {
  margin: 0;
  color: #69766c;
  font-size: 13px;
  line-height: 2;
}

.button {
  margin-top: 14px;
}
</style>