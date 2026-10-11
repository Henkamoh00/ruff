<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  label: { type: String, required: true },
  text: { type: String, required: true },
})
</script>

<template>
  <div class="demo-notice">
    <span class="demo-notice-label">{{ label }}</span>
    <span>{{ text }}</span>
    <RouterLink :to="{ name: 'home' }">العودة إلى رَف <span aria-hidden="true">↗</span></RouterLink>
  </div>
</template>

<style scoped>
.demo-notice {
  min-height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 7px 18px;
  background: #0b2b25;
  color: #e8eee3;
  font-size: 10px;
  text-align: center;
}
.demo-notice-label {
  padding: 2px 8px;
  border: 1px solid rgba(215, 243, 106, 0.35);
  border-radius: 50px;
  color: #d7f36a;
  font-weight: 700;
  white-space: nowrap;
}
.demo-notice a { margin-inline-start: 6px; color: #d7f36a; font-weight: 700; white-space: nowrap; }
.demo-notice a span { margin-inline-start: 3px; }

@media (max-width: 650px) {
  .demo-notice { flex-wrap: wrap; gap: 5px 8px; padding: 8px 10px; font-size: 9px; }
  .demo-notice a { margin-inline-start: 0; }
}
</style>