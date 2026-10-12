<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageHeader from '@/components/dashboard/PageHeader.vue'
import UsageMeter from '@/components/dashboard/UsageMeter.vue'
import { siteConfig } from '@/config/site'
import { FREE_PLAN_LIMIT, pickDemoProducts } from '@/data/dashboard'

const route = useRoute()

// للتصميم فقط: ?state=limit يعرض حالة بلوغ الحد
const used = computed(() => pickDemoProducts(route.query.state).length)

const upgradeUrl = computed(() => siteConfig.upgradeFormUrl)

const freeFeatures = [
  `${FREE_PLAN_LIMIT} منتجات كحد أقصى لكل متجر، وتُحتسب المخفية منها`,
  'صورة واحدة لكل منتج (حتى 5 ميغابايت)',
  'رابط كتالوج عام قابل للمشاركة',
  'قسم عروض يظهر تلقائيًا عند وجود منتجات مخفضة',
]
</script>

<template>
  <div>
    <PageHeader
      title="حد المنتجات والترقية"
      subtitle="تعرّف على حدود الخطة المجانية وما الذي يمكنك فعله عند بلوغها."
    />

    <section class="card usage-card">
      <UsageMeter :used="used" :limit="FREE_PLAN_LIMIT" />
    </section>

    <div class="plans">
      <section class="plan current" aria-labelledby="free-title">
        <span class="plan-tag">خطتك الحالية</span>
        <h2 id="free-title">الخطة المجانية</h2>
        <ul>
          <li v-for="feature in freeFeatures" :key="feature">{{ feature }}</li>
        </ul>
      </section>

      <section class="plan paid" aria-labelledby="paid-title">
        <span class="plan-tag soon">قيد التجهيز</span>
        <h2 id="paid-title">الخطة المدفوعة</h2>
        <p>
          تهدف إلى رفع عدد المنتجات عن الحد المجاني. لم تُحدَّد التفاصيل والأسعار بعد، ولا يوجد
          دفع أو اشتراك في هذه المرحلة.
        </p>

        <a
          v-if="upgradeUrl"
          class="button button-primary"
          :href="upgradeUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          طلب الترقية <span aria-hidden="true">↗</span>
        </a>
        <template v-else>
          <button type="button" class="button button-primary" disabled>طلب الترقية</button>
          <small>نموذج الطلب غير متاح حاليًا، حاول لاحقًا.</small>
        </template>

        <small v-if="upgradeUrl">يفتح نموذجًا تخبرنا فيه بعدد المنتجات التي تحتاجها.</small>
      </section>
    </div>

    <section class="card tips">
      <h2>إن بلغت الحد الآن</h2>
      <ul>
        <li>احذف منتجًا لم تعد تحتاجه لتحرير مكانه.</li>
        <li>إخفاء المنتج لا يحرّر مكانه، لأن المنتجات المخفية تُحتسب ضمن الحد.</li>
        <li>عدّل منتجًا موجودًا بدل إضافة منتج جديد مشابه له.</li>
      </ul>
      <RouterLink class="button button-outline button-small" :to="{ name: 'products' }">
        الذهاب إلى المنتجات
      </RouterLink>
    </section>

    <p class="design-switch">
      للتصميم فقط:
      <RouterLink :to="{ name: 'upgrade' }">الحالة العادية</RouterLink>
      ·
      <RouterLink :to="{ name: 'upgrade', query: { state: 'limit' } }">بلوغ الحد</RouterLink>
    </p>
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

.plans {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.plan {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 17px;
  background: #fff;
}

.plan.paid {
  background: var(--forest);
  border-color: var(--forest);
  color: #fff;
}

.plan-tag {
  padding: 3px 10px;
  border-radius: 50px;
  background: var(--lime-soft);
  color: #4b6130;
  font-size: 10px;
  font-weight: 700;
}

.plan-tag.soon {
  background: rgba(215, 243, 106, 0.16);
  color: var(--lime);
}

.plan h2 {
  margin: 0;
  color: var(--forest);
  font-size: 18px;
  letter-spacing: -0.03em;
}

.paid h2 {
  color: #fff;
}

.plan ul {
  margin: 0;
  padding-inline-start: 18px;
  color: #5e6c63;
  font-size: 12px;
  line-height: 2;
}

.plan li::marker {
  color: #8aa266;
}

.paid p {
  margin: 0;
  color: #c0d0c7;
  font-size: 12px;
  line-height: 2;
}

.paid small {
  color: #a9bdb2;
  font-size: 10px;
  line-height: 1.8;
}

.tips h2 {
  margin: 0 0 8px;
  color: var(--forest);
  font-size: 15px;
}

.tips ul {
  margin: 0 0 14px;
  padding-inline-start: 18px;
  color: #5e6c63;
  font-size: 12px;
  line-height: 2;
}

.tips li::marker {
  color: #8aa266;
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
  .plans {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .card,
  .plan {
    padding: 18px;
  }
}
</style>