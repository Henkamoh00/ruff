<script setup>
import { computed } from 'vue'

const props = defineProps({
  store: { type: Object, required: true },
  demo: { type: Boolean, default: false },
})

const initial = computed(() => props.store.initial || props.store.name?.trim().charAt(0) || '؟')
</script>

<template>
  <section class="shop-identity" aria-label="معلومات المتجر">
    <img v-if="store.logo" class="shop-logo" :src="store.logo" :alt="`شعار ${store.name}`" />
    <div v-else class="shop-avatar" aria-hidden="true">{{ initial }}</div>

    <div class="shop-identity-copy">
      <div class="shop-name-line">
        <h1>{{ store.name }}</h1>
        <span v-if="demo" class="demo-status">متجر تجريبي</span>
      </div>
      <p v-if="store.tagline">{{ store.tagline }}</p>
    </div>

    <div v-if="store.city" class="shop-location">
      <span aria-hidden="true">⌖</span> {{ store.city }}
    </div>
  </section>
</template>

<style scoped>
.shop-identity {
  display: flex;
  align-items: center;
  gap: 13px;
  padding-block: 30px 25px;
  border-bottom: 1px solid #e8ebe2;
}
.shop-avatar,
.shop-logo {
  width: 53px;
  height: 53px;
  flex: 0 0 auto;
  border-radius: 16px;
}
.shop-avatar {
  display: grid;
  place-items: center;
  background: #d7f36a;
  color: #123b32;
  font-size: 24px;
  font-weight: 700;
}
.shop-logo { object-fit: cover; }
.shop-identity-copy { min-width: 0; }
.shop-name-line { display: flex; align-items: center; flex-wrap: wrap; gap: 9px; }
.shop-name-line h1 { max-width: none; margin: 0; font-size: 20px; line-height: 1.5; letter-spacing: -0.03em; color: #123b32; }
.demo-status { border-radius: 50px; padding: 3px 8px; color: #62705f; background: #eff2e8; font-size: 9px; font-weight: 600; }
.shop-identity-copy p { margin: 2px 0 0; color: #79847a; font-size: 11px; }
.shop-location { margin-inline-start: auto; color: #647267; font-size: 11px; white-space: nowrap; }
.shop-location span { color: #80935d; font-size: 17px; vertical-align: -1px; }

@media (max-width: 650px) {
  .shop-identity { padding-block: 22px 18px; gap: 10px; }
  .shop-avatar,
  .shop-logo { width: 45px; height: 45px; border-radius: 13px; }
  .shop-avatar { font-size: 21px; }
  .shop-name-line h1 { font-size: 17px; }
  .shop-identity-copy p { font-size: 10px; }
  .shop-location { font-size: 9px; }
}
@media (max-width: 380px) {
  .shop-location { display: none; }
}
</style>