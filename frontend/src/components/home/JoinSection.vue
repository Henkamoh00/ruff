<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="join-section" id="join">
    <div class="join-pattern" aria-hidden="true"></div>
    <div class="container join-content">
      <div class="join-copy">
        <span class="join-label"><span></span>أنشئ كاتالوج متجرك الآن وشاركه برابط واحد مباشر</span>
        <h2>هل يناسب رَف<br />محلّك؟</h2>
        <p>
          يدعم رَف العديد من أنواع المتاجر.
        </p>
        <p>
          سجّل مجّانًا وقم بإعداد كاتالوج متجرك، وسترى كيف يسهل عليك رَف ما كنت تبذل فيه الكثير من الوقت.
        </p>
      </div>

      <div class="join-action-card">
        <div class="form-mini-icon" aria-hidden="true">✳</div>
        <h3>جرّب بنفسك</h3>
        <p>في أقل من دقيقة. لا يوجد دفع أو التزام في هذه المرحلة.</p>
        <RouterLink class="button button-primary button-full" :to="{ name: 'register' }">
          سجّل مجانًا <span aria-hidden="true">↗</span>
        </RouterLink>
        <span class="privacy-note">
          <span aria-hidden="true">◈</span>لا تتردّد إنها خطوة مفيدة فعلا وسترى مردودها.
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.join-section { position: relative; overflow: hidden; padding-block: 78px; background: var(--forest); color: #fff; }
.join-pattern {
  position: absolute;
  inset: 0 50% 0 0;
  opacity: 0.12;
  background-image: radial-gradient(#d7f36a 1px, transparent 1px);
  background-size: 19px 19px;
  mask-image: linear-gradient(90deg, transparent, #000);
}
.join-content { position: relative; display: grid; grid-template-columns: 1fr 0.73fr; align-items: center; gap: 75px; }
.join-label { display: inline-flex; align-items: center; gap: 9px; color: #d7e8bf; font-size: 11px; }
.join-label span { width: 7px; height: 7px; border-radius: 50%; background: var(--lime); box-shadow: 0 0 0 4px rgba(215, 243, 106, 0.13); }
.join-copy h2 {
  margin: 14px 0 12px;
  color: #fff;
  font-size: clamp(34px, 4vw, 47px);
  line-height: 1.45;
  font-weight: 700;
  letter-spacing: -0.05em;
}
.join-copy p { max-width: 490px; margin: 0; color: #c0d0c7; font-size: 13px; line-height: 2.1; }
.join-action-card {
  padding: 27px;
  color: var(--ink);
  background: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 19px;
  box-shadow: 0 20px 65px rgba(0, 0, 0, 0.16);
}
.form-mini-icon { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 12px; color: var(--forest); background: var(--lime); font-size: 20px; }
.join-action-card h3 { margin: 14px 0 3px; color: var(--forest); font-size: 18px; }
.join-action-card > p { margin: 0 0 19px; color: #7c877e; font-size: 11px; line-height: 1.9; }
.privacy-note { display: flex; justify-content: center; align-items: center; gap: 6px; margin-top: 12px; color: #929b92; font-size: 9px; }
.privacy-note span { font-size: 12px; }

@media (max-width: 900px) {
  .join-content { grid-template-columns: 1fr 0.9fr; gap: 30px; }
}
@media (max-width: 600px) {
  .join-section { padding-block: 53px; }
  .join-content { grid-template-columns: 1fr; gap: 26px; }
  .join-copy h2 { font-size: 38px; }
  .join-copy p { font-size: 12px; }
  .join-action-card { padding: 23px; }
}
</style>