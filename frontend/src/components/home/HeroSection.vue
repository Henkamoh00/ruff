<script setup>
import { RouterLink } from 'vue-router'
import HeroMockup from '@/components/home/HeroMockup.vue'
</script>

<template>
  <section class="hero container">
    <div class="hero-copy">
      <div class="eyebrow">
        <span class="eyebrow-icon" aria-hidden="true">✳</span> واجهة رقمية لمحلّك
      </div>
      <h1>دع زبونك يـرى منتجاتك <span class="highlight">قبل أن يصل إليك.</span></h1>
      <p class="hero-description">
        كتالوج إلكتروني أنيق يجمع صور منتجاتك وأسعارها ومعلومات التواصل في رابط واحد. شاركه على
        واتساب أو إنستغرام، واستقبل الزبائن في محلك — حتى لو كان البيع داخل المحل فقط.
      </p>
      <div class="hero-actions">
        <RouterLink class="button button-primary" :to="{ name: 'register' }">
          أريد تجربة رَف <span aria-hidden="true">↗</span>
        </RouterLink>
        <RouterLink class="catalog-preview-link" :to="{ name: 'catalog-demo' }">
          شاهد نموذج الكتالوج <span aria-hidden="true">↗</span>
        </RouterLink>
        <RouterLink class="text-link" :to="{ name: 'home', hash: '#how' }">
          اكتشف كيف يعمل <span aria-hidden="true">↓</span>
        </RouterLink>
      </div>
      <div class="hero-note">
        <span class="check-icon" aria-hidden="true">✓</span>
        لا تحتاج إلى متجر إلكتروني معقّد أو خدمة توصيل.
      </div>
    </div>

    <HeroMockup />
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 0.96fr 1.04fr;
  align-items: center;
  gap: 38px;
  padding-top: 48px;
  padding-bottom: 72px;
}
.hero-copy { padding-block: 32px; position: relative; z-index: 2; }
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 7px 12px;
  border: 1px solid #e3e8da;
  border-radius: 50px;
  background: #fffef9;
  color: #547264;
  font-size: 12px;
  font-weight: 700;
}
.eyebrow-icon { color: #6c8535; font-size: 16px; }
h1 {
  max-width: 570px;
  margin: 23px 0 18px;
  color: var(--forest-deep);
  font-size: clamp(37px, 4.3vw, 57px);
  line-height: 1.32;
  font-weight: 700;
  letter-spacing: -0.055em;
}
.highlight { position: relative; white-space: nowrap; z-index: 0; }
.highlight::after {
  content: '';
  position: absolute;
  right: -4px;
  left: -4px;
  bottom: 3px;
  height: 14px;
  border-radius: 3px;
  background: var(--lime);
  z-index: -1;
  transform: rotate(-1deg);
}
.hero-description { max-width: 510px; margin: 0; color: #637169; font-size: 15px; line-height: 2.05; }
.hero-actions { display: flex; align-items: center; gap: 25px; flex-wrap: wrap; margin-top: 28px; }
.hero-actions .button { min-width: 184px; }
.text-link { font-size: 12px; color: #516259; font-weight: 700; transition: color 0.2s; }
.text-link:hover { color: var(--forest-soft); }
.text-link span { margin-inline-start: 6px; font-size: 17px; }
.catalog-preview-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  color: #284f40;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}
.catalog-preview-link span { font-size: 15px; }
.catalog-preview-link:hover { color: #698247; }
.hero-note { display: flex; align-items: center; gap: 8px; margin-top: 23px; color: #77837a; font-size: 11px; }
.check-icon {
  width: 17px;
  height: 17px;
  display: inline-grid;
  place-items: center;
  border: 1px solid #cbd7b1;
  border-radius: 50%;
  color: #58772d;
  background: #f0f5df;
  font-size: 10px;
}

@media (min-width: 1400px) {
  .hero { padding-top: 62px; padding-bottom: 88px; }
}
@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; gap: 10px; padding-top: 25px; }
  .hero-copy { padding-block: 22px 0; }
}
@media (max-width: 600px) {
  .hero { padding-top: 18px; padding-bottom: 40px; }
  .hero-copy { padding-top: 15px; }
  .eyebrow { font-size: 10px; }
  h1 { margin-top: 18px; font-size: clamp(34px, 9.6vw, 46px); line-height: 1.4; }
  .hero-description { font-size: 13px; line-height: 2; }
  .hero-actions { align-items: flex-start; gap: 18px; margin-top: 23px; }
  .hero-actions .button { min-width: 0; padding: 12px 16px; font-size: 12px; }
  .text-link { align-self: center; font-size: 11px; }
  .catalog-preview-link { font-size: 11px; }
  .hero-note { align-items: flex-start; font-size: 10px; }
}
</style>