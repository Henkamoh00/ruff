<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageHeader from '@/components/dashboard/PageHeader.vue'
import UsageMeter from '@/components/dashboard/UsageMeter.vue'
import ProductListItem from '@/components/dashboard/ProductListItem.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useToast } from '@/composables/useToast'
import { FREE_PLAN_LIMIT, demoDashboardStore, pickDemoProducts } from '@/data/dashboard'

const route = useRoute()
const toast = useToast()
const currency = demoDashboardStore.currency

// نسخة محلية للعرض فقط: الحذف والإخفاء هنا لا يُحفظان في أي مكان
const items = ref([])
watch(
  () => route.query.state,
  (state) => {
    items.value = pickDemoProducts(state).map((p) => ({ ...p }))
  },
  { immediate: true },
)

const used = computed(() => items.value.length)
const atLimit = computed(() => used.value >= FREE_PLAN_LIMIT)

const pendingDelete = ref(null)

function toggleVisible(product) {
  product.visible = product.visible === false
  toast.notifyNotConnected('تبديل ظهور المنتج')
}

function confirmDelete() {
  items.value = items.value.filter((p) => p.id !== pendingDelete.value?.id)
  pendingDelete.value = null
  toast.notifyNotConnected('حذف المنتج')
}
</script>

<template>
  <div>
    <PageHeader title="المنتجات" subtitle="أضف منتجاتك وعدّلها وتحكّم في ظهورها داخل الكتالوج.">
      <template #actions>
        <RouterLink v-if="!atLimit" class="button button-primary" :to="{ name: 'product-new' }">
          إضافة منتج <span aria-hidden="true">+</span>
        </RouterLink>
        <RouterLink v-else class="button button-dark" :to="{ name: 'upgrade' }">
          التعرّف على الخطة المدفوعة <span aria-hidden="true">←</span>
        </RouterLink>
      </template>
    </PageHeader>

    <section class="card usage-card">
      <UsageMeter :used="used" :limit="FREE_PLAN_LIMIT" />
    </section>

    <section v-if="!items.length" class="empty">
      <div class="empty-icon" aria-hidden="true">▦</div>
      <h2>لا توجد منتجات بعد</h2>
      <p>أضف أول منتج بصورته وسعره، وسيظهر في كتالوج متجرك عندما تنشره.</p>
      <RouterLink class="button button-primary" :to="{ name: 'product-new' }">
        إضافة أول منتج <span aria-hidden="true">+</span>
      </RouterLink>
    </section>

    <section v-else class="card list-card" aria-label="قائمة المنتجات">
      <ul>
        <ProductListItem
          v-for="product in items"
          :key="product.id"
          :product="product"
          :currency="currency"
          @toggle-visible="toggleVisible(product)"
          @delete="pendingDelete = product"
        />
      </ul>
    </section>

    <p class="design-switch">
      للتصميم فقط:
      <RouterLink :to="{ name: 'products' }">الحالة العادية</RouterLink>
      ·
      <RouterLink :to="{ name: 'products', query: { state: 'limit' } }">بلوغ الحد</RouterLink>
      ·
      <RouterLink :to="{ name: 'products', query: { state: 'empty' } }">بلا منتجات</RouterLink>
    </p>

    <ConfirmDialog
      :open="Boolean(pendingDelete)"
      title="حذف المنتج؟"
      :text="`سيُحذف «${pendingDelete?.name ?? ''}» من الكتالوج، ويُحرَّر مكانه من حد المنتجات.`"
      confirm-label="حذف المنتج"
      @confirm="confirmDelete"
      @cancel="pendingDelete = null"
    />
  </div>
</template>

<style scoped>
.card {
  padding: 22px 24px;
  border: 1px solid var(--line);
  border-radius: 17px;
  background: #fff;
}

.usage-card {
  margin-bottom: 16px;
}

.list-card {
  padding-block: 4px;
}

.list-card ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.list-card :deep(.item:first-child) {
  border-top: 0;
}

.empty {
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

.empty-icon {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: var(--lime-soft);
  color: #7f9561;
  font-size: 24px;
}

.empty h2 {
  margin: 8px 0 0;
  color: var(--forest);
  font-size: 19px;
  letter-spacing: -0.03em;
}

.empty p {
  max-width: 380px;
  margin: 0 0 12px;
  color: #7a857c;
  font-size: 12px;
  line-height: 1.9;
}

.design-switch {
  margin: 16px 0 0;
  color: #9aa298;
  font-size: 11px;
}

.design-switch a {
  color: #516259;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 600px) {
  .card {
    padding: 18px;
  }
  .list-card {
    padding-block: 2px;
  }
}
</style>