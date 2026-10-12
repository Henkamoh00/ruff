<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <div class="auth-shell">
    <div class="auth-heading">
      <span class="auth-mark" aria-hidden="true">✳</span>
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>

    <slot />

    <p v-if="$slots.footer" class="auth-switch">
      <slot name="footer" />
    </p>
  </div>
</template>

<style scoped>
.auth-heading {
  margin-bottom: 22px;
}

.auth-mark {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: var(--lime);
  color: var(--forest);
  font-size: 20px;
}

h1 {
  margin: 14px 0 4px;
  color: var(--forest);
  font-size: 24px;
  line-height: 1.5;
  letter-spacing: -0.04em;
}

.auth-heading p {
  margin: 0;
  color: #7c877e;
  font-size: 12px;
  line-height: 1.9;
}

.auth-switch {
  margin: 22px 0 0;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  color: #7c877e;
  font-size: 12px;
  text-align: center;
}

.auth-switch :deep(a) {
  color: var(--forest);
  font-weight: 700;
}

.auth-switch :deep(a:hover) {
  color: #698247;
}
</style>