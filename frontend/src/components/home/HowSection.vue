<script setup>
import { RouterLink } from 'vue-router'

const steps = [
  {
    num: 1,
    symbol: '⌁',
    title: 'عرّفنا بمحلّك',
    text: 'أخبرنا عن نشاطك وكيف تعرض منتجاتك حاليًا، لنطوّر رَف بما يناسب احتياجاتك.',
  },
  {
    num: 2,
    symbol: '▤',
    title: 'جهّز كتالوجك',
    text: 'تُرتّب صور المنتجات وأسعارها ومعلومات المحل في صفحة واحدة.',
  },
  {
    num: 3,
    symbol: '↗',
    title: 'شارك الرابط',
    text: 'أرسله لزبائنك وانشره على حساباتك، ليستعرضوا المنتجات متى أرادوا.',
  },
]
</script>

<template>
  <section class="how-section container" id="how">
    <div class="how-intro">
      <span class="section-kicker">ثلاث خطوات فقط</span>
      <h2>من صور منتجاتك<br />إلى رابط جاهز.</h2>
      <p>الفكرة أن يكون عرض منتجاتك أسهل، دون أن تغيّر طريقة عمل محلك.</p>
      <RouterLink class="button button-dark" :to="{ name: 'register' }">
        جـرّب رَف <span aria-hidden="true">↗</span>
      </RouterLink>
    </div>

    <div class="steps-list">
      <article v-for="step in steps" :key="step.num" class="step-item">
        <span class="step-num">{{ step.num }}</span>
        <div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </div>
        <span class="step-symbol" aria-hidden="true">{{ step.symbol }}</span>
      </article>
      <p class="steps-disclaimer">
        رَف في مرحلة اختبار الفكرة. التسجيل لا يُلزمك بالشراء، ولم يبدأ الاشتراك المدفوع بعد.
      </p>
    </div>
  </section>
</template>

<style scoped>
.how-section { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 80px; padding-block: 100px; }
h2 {
  margin: 15px 0;
  font-size: clamp(31px, 3.6vw, 43px);
  line-height: 1.45;
  color: var(--forest-deep);
  font-weight: 700;
  letter-spacing: -0.05em;
}
.how-intro h2 { margin-bottom: 15px; }
.how-intro > p { max-width: 360px; margin: 0 0 25px; color: #69766c; font-size: 13px; line-height: 2; }
.how-intro .button { min-width: 160px; }
.steps-list { border-top: 1px solid var(--line); }
.step-item {
  display: grid;
  grid-template-columns: 42px 1fr 32px;
  align-items: start;
  gap: 16px;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
}
.step-num {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 1px solid #dce4ce;
  border-radius: 50%;
  background: #f0f5df;
  color: #516b36;
  font: 600 14px Arial, sans-serif;
}
.step-item h3 { margin: 0 0 5px; color: #244035; font-size: 14px; }
.step-item p { max-width: 430px; margin: 0; color: #79837a; font-size: 12px; line-height: 1.9; }
.step-symbol { color: #a4b395; font-size: 23px; text-align: center; }
.steps-disclaimer { margin: 15px 0 0; color: #8a9289; font-size: 10px; line-height: 1.9; }

@media (max-width: 900px) {
  .how-section { grid-template-columns: 1fr; gap: 40px; padding-block: 70px; }
}
@media (max-width: 600px) {
  .how-section { padding-block: 54px; gap: 29px; }
  h2 { font-size: 32px; }
  .how-intro > p { font-size: 12px; }
  .step-item { grid-template-columns: 35px 1fr 22px; gap: 12px; padding-block: 18px; }
  .step-num { width: 31px; height: 31px; }
  .step-item h3 { font-size: 13px; }
  .step-item p { font-size: 11px; }
}
</style>