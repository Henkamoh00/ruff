<script setup>
defineProps({
  categories: { type: Array, required: true },
  modelValue: { type: String, default: null },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <nav class="category-list" aria-label="أقسام المنتجات">
    <span class="category-label">تصفّحي حسب القسم</span>
    <button
      type="button"
      :class="{ 'is-active': modelValue === null }"
      :aria-pressed="modelValue === null"
      @click="$emit('update:modelValue', null)"
    >
      الكل
    </button>
    <button
      v-for="category in categories"
      :key="category"
      type="button"
      :class="{ 'is-active': modelValue === category }"
      :aria-pressed="modelValue === category"
      @click="$emit('update:modelValue', category)"
    >
      {{ category }}
    </button>
  </nav>
</template>

<style scoped>
.category-list {
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;
  padding: 17px 0 23px;
  border-block: 1px solid #e8ebe2;
}
.category-label { margin-inline-end: 7px; color: #849087; font-size: 10px; }
.category-list button {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 6px 14px;
  border: 1px solid #e3e8dc;
  border-radius: 50px;
  background: #fff;
  color: #465a4e;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.category-list button:hover { border-color: #b8c99e; background: #f0f5df; }
.category-list button.is-active { border-color: #123b32; background: #123b32; color: #fff; }

@media (max-width: 650px) {
  .category-list { gap: 7px; padding-block: 14px 18px; }
  .category-label { width: 100%; }
  .category-list button { min-height: 31px; padding-inline: 12px; font-size: 10px; }
}
</style>