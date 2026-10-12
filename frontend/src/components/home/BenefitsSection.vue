<script setup>
const benefits = [
  {
    num: '01',
    icon: '▦',
    tone: 'icon-lime',
    title: 'كل شيء منظّم',
    text: 'اعرض صور المنتجات وأسعارها في صفحة مرتبة بدل الصور المتناثرة داخل المحادثات.',
  },
  {
    num: '02',
    icon: '↗',
    tone: 'icon-peach',
    title: 'شاركها أينما كنت',
    text: 'ضع الرابط في حساباتك على مواقع التواصل أو أرسله لأي زبون يسأل عن منتجاتك.',
  },
  {
    num: '03',
    icon: '⌂',
    tone: 'icon-blue',
    title: 'الزبون يزور محلك',
    text: 'رَف ليس منصة توصيل ولا يشترط الدفع الإلكتروني. هدفه أن يرى الزبون ما تعرضه قبل الزيارة.',
  },
]
</script>

<template>
  <section class="benefits-section" id="benefits">
    <div class="container">
      <div class="section-heading">
        <span class="section-kicker">ببساطة، هذا هو الهدف</span>
        <h2>
          خلّي منتجاتك تتكلم<br />
          <span class="muted-heading">بدل ما تعيد نفس الإجابات.</span>
        </h2>
        <p>
          لما يسأل الزبون «ايش عندكم؟» أو «بِـكَم؟»، أرسل له رابطًا واحدًا فيه التفاصيل بدل عشرات
          الصور المتفرقة.
        </p>
      </div>

      <div class="benefit-grid">
        <article v-for="item in benefits" :key="item.num" class="benefit-card">
          <div class="benefit-icon" :class="item.tone" aria-hidden="true">{{ item.icon }}</div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <span class="card-number">{{ item.num }}</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.benefits-section { padding-block: 84px 90px; background: #f0f2e9; }
.section-heading { max-width: 680px; margin-bottom: 39px; }
h2 {
  margin: 15px 0;
  font-size: clamp(31px, 3.6vw, 43px);
  line-height: 1.45;
  color: var(--forest-deep);
  font-weight: 700;
  letter-spacing: -0.05em;
}
.muted-heading { color: #819084; }
.section-heading > p { max-width: 545px; margin: 0; color: #69766c; font-size: 13px; line-height: 2; }
.benefit-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
.benefit-card {
  min-height: 225px;
  position: relative;
  padding: 26px 24px;
  background: #fff;
  border: 1px solid #e8ebdf;
  border-radius: 17px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.benefit-card:hover { transform: translateY(-4px); box-shadow: 0 15px 35px rgba(18, 59, 50, 0.07); }
.benefit-icon { width: 43px; height: 43px; display: grid; place-items: center; border-radius: 13px; font-size: 22px; font-weight: 600; }
.icon-lime { color: #365331; background: #edf5d7; }
.icon-peach { color: #975e3d; background: var(--peach); }
.icon-blue { color: #3d627f; background: var(--blue); }
.benefit-card h3 { margin: 19px 0 7px; color: #203b30; font-size: 16px; }
.benefit-card p { max-width: 280px; margin: 0; color: #79837b; font-size: 12px; line-height: 1.9; }
.card-number { position: absolute; bottom: 12px; left: 18px; color: #e8ece3; font: 700 27px Arial, sans-serif; }

@media (max-width: 900px) {
  .benefits-section { padding-block: 65px; }
}
@media (max-width: 600px) {
  .benefits-section { padding-block: 52px; }
  .section-heading { margin-bottom: 25px; }
  h2 { font-size: 32px; }
  .section-heading > p { font-size: 12px; }
  .benefit-grid { grid-template-columns: 1fr; gap: 10px; }
  .benefit-card { min-height: 0; padding: 21px; }
  .benefit-card h3 { margin-top: 13px; }
  .benefit-card p { max-width: 100%; padding-bottom: 3px; }
}
</style>