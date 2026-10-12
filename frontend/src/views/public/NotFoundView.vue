<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section class="not-found container">
    <span class="code" aria-hidden="true">404</span>
    <h1>الصفحة غير موجودة</h1>
    <p>الرابط الذي فتحته غير صحيح أو أن الصفحة لم تعد متاحة.</p>
    <p class="path" dir="ltr">{{ route.fullPath }}</p>
    <div class="actions">
      <RouterLink class="button button-dark" :to="{ name: 'home' }">العودة إلى الرئيسية</RouterLink>
      <RouterLink class="button button-outline" :to="{ name: 'catalog-demo' }">
        شاهد نموذج الكتالوج
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  max-width: 520px;
  padding-block: 88px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.code {
  padding: 6px 18px;
  border-radius: 16px;
  background: var(--lime);
  color: var(--forest);
  font: 700 34px Arial, sans-serif;
  letter-spacing: 0.04em;
}

h1 {
  margin: 14px 0 0;
  color: var(--forest-deep);
  font-size: 30px;
  line-height: 1.4;
  letter-spacing: -0.04em;
}

p {
  margin: 0;
  color: #69766c;
  font-size: 13px;
  line-height: 2;
}

.path {
  max-width: 100%;
  overflow-wrap: anywhere;
  color: #9aa298;
  font: 12px Arial, sans-serif;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 18px;
}

@media (max-width: 600px) {
  .not-found {
    padding-block: 56px 72px;
  }
  h1 {
    font-size: 25px;
  }
}
</style>