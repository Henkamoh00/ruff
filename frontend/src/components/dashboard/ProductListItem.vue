<script setup>
import { RouterLink } from 'vue-router'
import { discountPercent, formatPrice, hasDiscount } from '@/utils/format'

defineProps({
  product: { type: Object, required: true },
  currency: { type: String, default: '' },
})

defineEmits(['toggle-visible', 'delete'])
</script>

<template>
  <li class="item" :class="{ 'is-hidden': product.visible === false }">
    <div class="thumb">
      <img v-if="product.image" :src="product.image" :alt="product.imageAlt || product.name" loading="lazy" />
      <span v-else aria-hidden="true">▦</span>
    </div>

    <div class="info">
      <div class="name-line">
        <strong>{{ product.name }}</strong>
        <span v-if="product.visible === false" class="badge muted">مخفي</span>
        <span v-else class="badge live">ظاهر</span>
        <span v-if="product.available === false" class="badge warn">غير متوفر</span>
        <span v-if="hasDiscount(product)" class="badge sale">
          خصم {{ discountPercent(product.price, product.originalPrice) }}٪
        </span>
      </div>
      <p class="meta">{{ product.category || 'بلا فئة' }}</p>
    </div>

    <div class="price">
      <strong>{{ formatPrice(product.price, currency) }}</strong>
      <del v-if="hasDiscount(product)">{{ formatPrice(product.originalPrice, currency) }}</del>
    </div>

    <div class="actions">
      <RouterLink
        class="button button-outline button-small"
        :to="{ name: 'product-edit', params: { productId: product.id } }"
      >
        تعديل
      </RouterLink>
      <button type="button" class="button button-outline button-small" @click="$emit('toggle-visible')">
        {{ product.visible === false ? 'إظهار' : 'إخفاء' }}
      </button>
      <button type="button" class="button button-danger button-small" @click="$emit('delete')">
        حذف
      </button>
    </div>
  </li>
</template>

<style scoped>
.item {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-top: 1px solid var(--line);
}

.thumb {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 12px;
  background: #eceee3;
  color: #b4bfa5;
  font-size: 22px;
}

.is-hidden .thumb img {
  opacity: 0.45;
}

.thumb img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.info {
  min-width: 0;
}

.name-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px 8px;
}

.name-line strong {
  color: #243b30;
  font-size: 13px;
}

.badge {
  padding: 2px 8px;
  border-radius: 50px;
  font-size: 9px;
  font-weight: 700;
  white-space: nowrap;
}

.live {
  background: #e8f3cf;
  color: #3f6226;
}

.muted {
  background: #eff0ea;
  color: #7c877d;
}

.warn {
  background: #fdebd3;
  color: #8a5a1f;
}

.sale {
  background: var(--lime);
  color: var(--forest);
}

.meta {
  margin: 2px 0 0;
  color: #8a948b;
  font-size: 11px;
}

.price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.5;
  white-space: nowrap;
}

.price strong {
  color: var(--forest);
  font-size: 13px;
}

.price del {
  color: #9ca49c;
  font-size: 10px;
}

.actions {
  display: flex;
  gap: 6px;
}

@media (max-width: 760px) {
  .item {
    grid-template-columns: 56px minmax(0, 1fr);
    gap: 10px 12px;
  }
  .price {
    grid-column: 2;
    flex-direction: row;
    align-items: baseline;
    gap: 8px;
  }
  .actions {
    grid-column: 1 / -1;
  }
  .actions .button {
    flex: 1;
  }
}
</style>