<script setup>
defineProps({
  tone: { type: String, default: 'info' }, // info | error
})
</script>

<template>
  <div class="form-notice" :class="`tone-${tone}`" role="status">
    <slot />
  </div>
</template>

<style scoped>
.form-notice {
  padding: 11px 14px;
  border: 1px solid;
  border-radius: 11px;
  font-size: 12px;
  line-height: 1.9;
}

.tone-info {
  border-color: #f0e4b8;
  background: #fff8e3;
  color: #7a6a2c;
}

.tone-error {
  border-color: #f0c8c0;
  background: var(--danger-soft);
  color: var(--danger);
}
</style>