<script setup>
import { discountPercent, formatPrice } from '@/utils/format'

defineProps({
  product: { type: Object, required: true },
  currency: { type: String, default: '' },
  label: { type: String, default: 'عرض' },
})
</script>

<template>
  <article class="offer-card">
    <div class="offer-image">
      <img v-if="product.image" :src="product.image" :alt="product.imageAlt || product.name" loading="lazy" />
      <div v-else class="image-fallback" aria-hidden="true">▦</div>
      <span class="discount-label">
        خصم {{ discountPercent(product.price, product.originalPrice) }}٪
      </span>
    </div>
    <div class="offer-info">
      <span class="offer-type">{{ label }}</span>
      <h3>{{ product.name }}</h3>
      <div class="price-line">
        <strong>{{ formatPrice(product.price, currency) }}</strong>
        <del>{{ formatPrice(product.originalPrice, currency) }}</del>
      </div>
    </div>
  </article>
</template>

<style scoped>
.offer-card {
  display: grid;
  grid-template-columns: 44% 1fr;
  min-width: 0;
  overflow: hidden;
  border: 1px solid #e8ebe2;
  border-radius: 16px;
  background: #fff;
  transition: box-shadow 0.2s, transform 0.2s;
}
.offer-card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(18, 59, 50, 0.07); }
.offer-image { position: relative; min-height: 175px; overflow: hidden; background: #ecece2; }
.offer-image img { width: 100%; height: 100%; min-height: 175px; display: block; object-fit: cover; }
.image-fallback { width: 100%; height: 100%; min-height: 175px; display: grid; place-items: center; color: #b4bfa5; font-size: 34px; }
.discount-label { position: absolute; top: 10px; right: 10px; padding: 5px 8px; border-radius: 7px; background: #d7f36a; color: #123b32; font-size: 10px; font-weight: 700; }
.offer-info { align-self: center; padding: 15px 18px; }
.offer-type { color: #8a968a; font-size: 9px; }
.offer-info h3 { margin: 7px 0 13px; color: #243b30; font-size: 15px; }
.price-line { display: flex; align-items: baseline; flex-wrap: wrap; gap: 9px; }
.price-line strong { color: #123b32; font-size: 17px; }
.price-line del { color: #9ca49c; font-size: 11px; }

@media (max-width: 900px) {
  .offer-card { grid-template-columns: 42% 1fr; }
  .offer-info { padding: 12px; }
  .offer-info h3 { font-size: 13px; }
}
@media (max-width: 650px) {
  .offer-card { grid-template-columns: 39% 1fr; }
  .offer-image,
  .offer-image img,
  .image-fallback { min-height: 145px; }
  .offer-info h3 { margin-block: 5px 9px; }
  .price-line strong { font-size: 15px; }
}
@media (max-width: 380px) {
  .offer-info { padding: 10px; }
  .price-line { gap: 5px; }
}
</style>