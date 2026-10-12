<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageHeader from '@/components/dashboard/PageHeader.vue'
import StoreStatusCard from '@/components/dashboard/StoreStatusCard.vue'
import UsageMeter from '@/components/dashboard/UsageMeter.vue'
import { formatPrice, hasDiscount } from '@/utils/format'
import {
  FREE_PLAN_LIMIT,
  demoAccount,
  demoDashboardProducts,
  demoDashboardStore,
} from '@/data/dashboard'

const route = useRoute()

// للتصميم فقط: /dashboard?state=no-store يعرض حالة «لا متجر بعد»
const hasStore = computed(() => route.query.state !== 'no-store')

const currency = demoDashboardStore.currency
const products = demoDashboardProducts
const used = products.length
const hiddenCount = computed(() => products.filter((p) => p.visible === false).length)
const offersCount = computed(() => products.filter(hasDiscount).length)
const recent = computed(() => products.slice(0, 4))
</script>

<template>
  <div>
    <PageHeader
      :title="`مرحبًا، ${demoAccount.name}`"
      :subtitle="hasStore ? 'ملخص حالة متجرك وكتالوجه.' : 'ابدأ بإنشاء متجرك لتحصل على رابط كتالوج عام.'"
    />

    <!-- حالة: لا يوجد متجر بعد -->
    <section v-if="!hasStore" class="no-store">
      <div class="no-store-icon" aria-hidden="true">⌂</div>
      <h2>لم تُنشئ متجرك بعد</h2>
      <p>
        أدخل اسم متجرك ومعلومات التواصل، ثم أضف منتجاتك وانشر الكتالوج لتشاركه برابط واحد.
      </p>
      <RouterLink class="button button-primary" :to="{ name: 'store-new' }">
        إنشاء المتجر <span aria-hidden="true">↗</span>
      </RouterLink>
    </section>

    <!-- حالة: متجر قائم -->
    <template v-else>
      <StoreStatusCard :store="demoDashboardStore" />

      <div class="grid">
        <section class="card">
          <UsageMeter :used="used" :limit="FREE_PLAN_LIMIT" />
          <dl class="facts">
            <div>
              <dt>مخفية</dt>
              <dd>{{ hiddenCount }}</dd>
            </div>
            <div>
              <dt>عليها عروض</dt>
              <dd>{{ offersCount }}</dd>
            </div>
          </dl>
        </section>

        <section class="card actions-card">
          <h2>إجراءات سريعة</h2>
          <RouterLink class="button button-primary" :to="{ name: 'product-new' }">
            إضافة منتج <span aria-hidden="true">+</span>
          </RouterLink>
          <RouterLink class="button button-outline" :to="{ name: 'store-edit' }">
            تعديل بيانات المتجر
          </RouterLink>
          <RouterLink class="button button-outline" :to="{ name: 'preview' }">
            معاينة الكتالوج
          </RouterLink>
        </section>
      </div>

      <section class="card recent">
        <div class="recent-head">
          <h2>آخر المنتجات</h2>
          <RouterLink :to="{ name: 'products' }">عرض كل المنتجات ←</RouterLink>
        </div>
        <ul>
          <li v-for="product in recent" :key="product.id">
            <img :src="product.image" :alt="product.imageAlt" />
            <span class="name">{{ product.name }}</span>
            <span class="price">
              {{ formatPrice(product.price, currency) }}
              <del v-if="hasDiscount(product)">{{ formatPrice(product.originalPrice, currency) }}</del>
            </span>
          </li>
        </ul>
      </section>

      <p class="design-switch">
        للتصميم فقط:
        <RouterLink :to="{ name: 'dashboard', query: { state: 'no-store' } }">
          عرض حالة «لا متجر بعد»
        </RouterLink>
      </p>
    </template>

    <p v-if="!hasStore" class="design-switch">
      للتصميم فقط:
      <RouterLink :to="{ name: 'dashboard' }">العودة إلى حالة المتجر القائم</RouterLink>
    </p>
  </div>
</template>

<style scoped>
.no-store {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 56px 24px;
  border: 1px dashed #d6dccb;
  border-radius: 19px;
  background: #fff;
  text-align: center;
}

.no-store-icon {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: var(--lime);
  color: var(--forest);
  font-size: 26px;
}

.no-store h2 {
  margin: 8px 0 0;
  color: var(--forest);
  font-size: 19px;
  letter-spacing: -0.03em;
}

.no-store p {
  max-width: 400px;
  margin: 0 0 12px;
  color: #7a857c;
  font-size: 12px;
  line-height: 1.9;
}

.grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 16px;
  margin-top: 16px;
}

.card {
  padding: 22px 24px;
  border: 1px solid var(--line);
  border-radius: 17px;
  background: #fff;
}

.facts {
  display: flex;
  gap: 28px;
  margin: 18px 0 0;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}

.facts dt {
  color: #8a948b;
  font-size: 11px;
}

.facts dd {
  margin: 0;
  color: var(--forest);
  font-size: 20px;
  font-weight: 700;
}

.actions-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.actions-card h2 {
  margin: 0 0 4px;
  color: var(--forest);
  font-size: 15px;
}

.recent {
  margin-top: 16px;
}

.recent-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.recent-head h2 {
  margin: 0;
  color: var(--forest);
  font-size: 15px;
}

.recent-head a {
  color: #516259;
  font-size: 11px;
  font-weight: 700;
}

.recent-head a:hover {
  color: var(--forest-soft);
}

.recent ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.recent li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid var(--line);
}

.recent img {
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  border-radius: 10px;
  object-fit: cover;
  background: #e8e9df;
}

.name {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  color: #243b30;
  font-size: 13px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.price {
  display: flex;
  align-items: baseline;
  gap: 7px;
  color: var(--forest);
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.price del {
  color: #9ca49c;
  font-size: 10px;
  font-weight: 400;
}

.design-switch {
  margin: 22px 0 0;
  color: #9aa298;
  font-size: 11px;
}

.design-switch a {
  color: #516259;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .card {
    padding: 18px;
  }
}
</style>