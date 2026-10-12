<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <header class="page-header">
    <div class="page-header-copy">
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.actions" class="page-header-actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 24px;
}

h1 {
  margin: 0;
  color: var(--forest-deep);
  font-size: 26px;
  line-height: 1.5;
  letter-spacing: -0.04em;
}

.page-header-copy p {
  max-width: 560px;
  margin: 2px 0 0;
  color: #7c877e;
  font-size: 12px;
  line-height: 1.9;
}

.page-header-actions {
  display: flex;
  gap: 10px;
}

@media (max-width: 600px) {
  h1 {
    font-size: 22px;
  }
}
</style>