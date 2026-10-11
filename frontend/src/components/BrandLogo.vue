<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  to: { type: [String, Object], default: '/' },
  size: { type: String, default: 'md' }, // md | sm
})
</script>

<template>
  <RouterLink :to="to" class="brand" :class="`brand-${size}`" aria-label="رَف، الصفحة الرئيسية">
    <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    <span class="brand-name">رَف</span>
  </RouterLink>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;
}

.brand-name {
  font-size: 27px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.07em;
  color: var(--forest);
}

.brand-mark {
  width: 30px;
  height: 30px;
  padding: 6px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
  background: var(--lime);
  border-radius: 9px;
  transform: rotate(-4deg);
}

.brand-mark i {
  display: block;
  border-radius: 2px;
  background: var(--forest);
}

.brand-mark i:nth-child(2),
.brand-mark i:nth-child(3) {
  opacity: 0.55;
}

.brand-sm .brand-mark {
  width: 25px;
  height: 25px;
  padding: 5px;
  border-radius: 7px;
}

.brand-sm .brand-name {
  font-size: 22px;
}

@media (max-width: 600px) {
  .brand-md .brand-name {
    font-size: 24px;
  }
  .brand-md .brand-mark {
    width: 27px;
    height: 27px;
    padding: 5px;
  }
}
</style>