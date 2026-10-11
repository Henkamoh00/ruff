<script setup>
import { formatPrice, hasDiscount } from '@/utils/format'

defineProps({
  product: { type: Object, required: true },
})
</script>

<template>
  <article class="catalog-product">
    <div class="catalog-product-image">
      <img v-if="product.image" :src="product.image" :alt="product.imageAlt || product.name" loading="lazy" />
      <div v-else class="image-fallback" aria-hidden="true">▦</div>
      <span v-if="product.category" class="product-category-tag">{{ product.category }}</span>
      <span v-if="hasDiscount(product)" class="sale-badge">عرض</span>
    </div>
    <div class="catalog-product-info">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="price-line">
        <strong>{{ formatPrice(product.price) }}</strong>
        <del v-if="hasDiscount(product)">{{ formatPrice(product.originalPrice) }}</del>
      </div>
    </div>
  </article>
</template>

<style scoped>
.catalog-product {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #e8ebe2;
  border-radius: 15px;
  background: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
}
.catalog-product:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(18, 59, 50, 0.07); }
.catalog-product-image { height: 245px; position: relative; overflow: hidden; background: #e8e9df; }
.catalog-product-image img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 0.35s; }
.catalog-product:hover .catalog-product-image img { transform: scale(1.03); }
.image-fallback { width: 100%; height: 100%; display: grid; place-items: center; color: #b4bfa5; font-size: 38px; }
.product-category-tag { position: absolute; top: 11px; right: 11px; border-radius: 50px; padding: 4px 9px; color: #405548; background: rgba(255, 255, 255, 0.9); font-size: 9px; }
.sale-badge { position: absolute; top: 11px; left: 11px; border-radius: 7px; padding: 4px 9px; background: #d7f36a; color: #123b32; font-size: 9px; font-weight: 700; }
.catalog-product-info { padding: 15px 16px 17px; }
.catalog-product-info h3 { margin: 0 0 4px; color: #243b30; font-size: 14px; }
.catalog-product-info p { min-height: 21px; margin: 0 0 10px; color: #8a948b; font-size: 10px; }
.price-line { display: flex; align-items: baseline; flex-wrap: wrap; gap: 8px; }
.price-line strong { color: #123b32; font-size: 13px; }
.price-line del { color: #9ca49c; font-size: 10px; }

@media (max-width: 900px) {
  .catalog-product-image { height: 205px; }
}
@media (max-width: 650px) {
  .catalog-product-image { height: 190px; }
  .catalog-product-info { padding: 12px; }
  .catalog-product-info h3 { font-size: 12px; }
  .catalog-product-info p { font-size: 9px; }
  .price-line strong { font-size: 12px; }
}
@media (max-width: 380px) {
  .catalog-product-image { height: 160px; }
  .catalog-product-info { padding: 10px; }
}
</style>