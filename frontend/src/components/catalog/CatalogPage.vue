<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'
import CatalogNotice from '@/components/catalog/CatalogNotice.vue'
import CatalogHeader from '@/components/catalog/CatalogHeader.vue'
import CatalogIdentity from '@/components/catalog/CatalogIdentity.vue'
import CatalogHero from '@/components/catalog/CatalogHero.vue'
import CatalogCategories from '@/components/catalog/CatalogCategories.vue'
import OfferCard from '@/components/catalog/OfferCard.vue'
import ProductCard from '@/components/catalog/ProductCard.vue'
import CatalogContact from '@/components/catalog/CatalogContact.vue'
import { hasDiscount } from '@/utils/format'

const props = defineProps({
  store: { type: Object, required: true },
  products: { type: Array, default: () => [] },
  variant: { type: String, default: 'public' }, // 'demo' | 'public'
  notice: { type: Object, default: null }, // { label, text } أو null
})

const isDemo = computed(() => props.variant === 'demo')

// المنتجات المخفية لا تظهر أبدًا في الكتالوج
const visibleProducts = computed(() => props.products.filter((p) => p.visible !== false))
const offers = computed(() => visibleProducts.value.filter(hasDiscount))
const categories = computed(() => [
  ...new Set(visibleProducts.value.map((p) => p.category).filter(Boolean)),
])

const activeCategory = ref(null)
const shownProducts = computed(() =>
  activeCategory.value
    ? visibleProducts.value.filter((p) => p.category === activeCategory.value)
    : visibleProducts.value,
)

const countLabel = computed(() =>
  isDemo.value
    ? `${visibleProducts.value.length} منتجات تجريبية`
    : `${visibleProducts.value.length} منتج`,
)
</script>

<template>
  <div class="catalog-page">
    <CatalogNotice v-if="notice" :label="notice.label" :text="notice.text" />

    <CatalogHeader
      :show-offers="offers.length > 0"
      :show-cta="isDemo"
    />

    <main class="container catalog-main">
      <CatalogIdentity :store="store" :demo="isDemo" />

      <CatalogHero v-if="store.hero && visibleProducts.length" :hero="store.hero" />

      <!-- حالة عدم وجود منتجات -->
      <section v-if="!visibleProducts.length" class="empty-state">
        <div class="empty-icon" aria-hidden="true">▦</div>
        <h2>لا توجد منتجات في هذا الكتالوج حاليًا</h2>
        <p>سيظهر هنا كل ما يضيفه المتجر من منتجات وأسعار، فتفقّد الصفحة لاحقًا.</p>
      </section>

      <template v-else>
        <CatalogCategories
          v-if="categories.length > 1"
          v-model="activeCategory"
          :categories="categories"
        />

        <!-- قسم العروض: يظهر فقط عند وجود تخفيضات فعلية -->
        <section
          v-if="offers.length"
          id="offers"
          class="offers-section"
          aria-labelledby="offers-title"
        >
          <div class="section-heading-row">
            <div>
              <span class="catalog-section-kicker">المميز هذا الأسبوع</span>
              <h2 id="offers-title">عروض المتجر</h2>
              <p v-if="isDemo">هذا القسم اختياري؛ يظهر في كتالوج المتجر عندما تُضيف عروضًا.</p>
              <p v-else>منتجات عليها تخفيضات حالية.</p>
            </div>
            <span v-if="isDemo" class="demo-chip">عرض تجريبي</span>
          </div>
          <div class="offers-grid">
            <OfferCard
              v-for="product in offers"
              :key="product.id"
              :product="product"
              :label="isDemo ? 'عرض توضيحي' : 'عرض'"
            />
          </div>
        </section>

        <section id="products" class="products-section" aria-labelledby="products-title">
          <div class="section-heading-row">
            <div>
              <span class="catalog-section-kicker">اكتشفي المجموعة</span>
              <h2 id="products-title">منتجاتنا</h2>
              <p v-if="isDemo">مثال على عرض الصور والأسماء والأسعار بصورة واضحة ومنظمة.</p>
            </div>
            <span class="products-count">{{ countLabel }}</span>
          </div>
          <div class="catalog-products-grid">
            <ProductCard v-for="product in shownProducts" :key="product.id" :product="product" />
          </div>
        </section>
      </template>

      <CatalogContact :store="store" :demo="isDemo" />

      <!-- دعوة للتسجيل في النموذج التجريبي فقط -->
      <section v-if="isDemo" class="catalog-cta" aria-labelledby="catalog-cta-title">
        <div class="catalog-cta-mark" aria-hidden="true">رَف</div>
        <div class="catalog-cta-copy">
          <h2 id="catalog-cta-title">هل تريد كتالوجًا لمتجرك بهذا الشكل؟</h2>
          <p>رَف يساعدك على عرض منتجاتك وأسعارك في رابط واحد سهل المشاركة.</p>
        </div>
        <RouterLink class="button button-primary" :to="{ name: 'register' }">
          سجّل اهتمامك <span aria-hidden="true">↗</span>
        </RouterLink>
      </section>
    </main>

    <footer class="catalog-footer container">
      <BrandLogo size="sm" />
      <p>منتجات محلك، في رابط واحد.</p>
      <RouterLink v-if="isDemo" :to="{ name: 'home' }" class="footer-link">
        العودة إلى الصفحة الرئيسية ↑
      </RouterLink>
      <RouterLink v-else :to="{ name: 'home' }" class="footer-link">أنشئ كتالوجك عبر رَف ↗</RouterLink>
      <small v-if="isDemo">هذه معاينة تصميمية — المتجر والمنتجات والأسعار غير حقيقية.</small>
      <small v-else>هذا الكتالوج أُنشئ عبر رَف.</small>
    </footer>
  </div>
</template>

<style scoped>
.catalog-page { min-height: 100vh; background: #fbfbf7; }
.catalog-main { padding-bottom: 68px; }

.catalog-section-kicker { color: #6a824a; font-size: 11px; font-weight: 700; }
.offers-section,
.products-section { padding-top: 49px; }
.section-heading-row { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 19px; }
.section-heading-row h2 { margin: 4px 0 3px; font-size: 27px; line-height: 1.5; letter-spacing: -0.04em; color: var(--forest-deep); font-weight: 700; }
.section-heading-row p { margin: 0; color: #7a857c; font-size: 11px; line-height: 1.9; }
.demo-chip,
.products-count { color: #6d7d55; background: #f0f4e7; border: 1px solid #e2e9d4; border-radius: 50px; padding: 6px 11px; font-size: 9px; white-space: nowrap; }
.offers-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 17px; }
.catalog-products-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px 16px; }

.empty-state { margin-top: 40px; padding: 64px 24px; border: 1px dashed #d6dccb; border-radius: 19px; background: #fff; text-align: center; }
.empty-icon { width: 54px; height: 54px; margin: 0 auto 14px; display: grid; place-items: center; border-radius: 16px; background: #f0f5df; color: #7f9561; font-size: 24px; }
.empty-state h2 { margin: 0 0 6px; color: #123b32; font-size: 19px; letter-spacing: -0.03em; }
.empty-state p { max-width: 380px; margin: 0 auto; color: #7a857c; font-size: 12px; line-height: 1.9; }

.catalog-cta { display: flex; align-items: center; gap: 18px; margin-top: 56px; padding: 27px 30px; border-radius: 19px; background: #123b32; color: #fff; }
.catalog-cta-mark { width: 46px; height: 46px; display: grid; place-items: center; flex: 0 0 auto; border-radius: 13px; background: #d7f36a; color: #123b32; font-size: 14px; font-weight: 700; }
.catalog-cta-copy { flex: 1; }
.catalog-cta-copy h2 { margin: 0 0 4px; color: #fff; font-size: 19px; letter-spacing: -0.03em; }
.catalog-cta-copy p { margin: 0; color: #c0d0c7; font-size: 11px; line-height: 1.9; }
.catalog-cta .button { flex: 0 0 auto; }

.catalog-footer { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px 25px; padding-block: 25px 28px; }
.catalog-footer p { margin: 0; color: #7c877d; font-size: 11px; }
.footer-link { color: #526259; font-size: 11px; font-weight: 600; }
.footer-link:hover { color: var(--forest-soft); }
.catalog-footer > small { grid-column: 1 / -1; padding-top: 15px; border-top: 1px solid var(--line); color: #9aa298; font-size: 10px; }

@media (max-width: 650px) {
  .offers-section,
  .products-section { padding-top: 35px; }
  .section-heading-row { align-items: start; gap: 9px; }
  .section-heading-row h2 { font-size: 23px; }
  .section-heading-row p { max-width: 290px; font-size: 10px; }
  .demo-chip,
  .products-count { padding: 5px 8px; font-size: 8px; }
  .offers-grid { grid-template-columns: 1fr; gap: 12px; }
  .catalog-products-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 10px; }
  .catalog-cta { flex-wrap: wrap; margin-top: 39px; padding: 20px; border-radius: 15px; }
  .catalog-cta-mark { width: 39px; height: 39px; }
  .catalog-cta-copy { flex: 1 1 calc(100% - 60px); }
  .catalog-cta-copy h2 { font-size: 16px; }
  .catalog-cta-copy p { font-size: 10px; }
  .catalog-cta .button { width: 100%; }
  .catalog-footer { grid-template-columns: 1fr auto; gap: 13px; }
  .catalog-footer p { display: none; }
  .footer-link { font-size: 10px; }
}
</style>