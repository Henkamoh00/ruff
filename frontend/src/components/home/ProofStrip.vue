<template>
  <section class="proof-strip container" aria-label="مزايا الخدمة">
    <div class="proof-item"><span class="proof-icon">01</span><span>صور وأسعار واضحة</span></div>
    <div class="proof-divider" aria-hidden="true"></div>
    <div class="proof-item"><span class="proof-icon">02</span><span>رابط سهل المشاركة</span></div>
    <div class="proof-divider" aria-hidden="true"></div>
    <div class="proof-item"><span class="proof-icon">03</span><span>البيع من محلك كالمعتاد</span></div>
  </section>
</template>

<style scoped>
.proof-strip {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
  padding: 22px 28px;
  margin-bottom: 88px;
  border-block: 1px solid var(--line);
}
.proof-item { display: flex; align-items: center; gap: 12px; color: #536259; font-size: 12px; font-weight: 600; }
.proof-icon { color: #698247; font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; }
.proof-divider { width: 1px; height: 24px; background: #e0e5d8; }

@media (max-width: 900px) {
  .proof-strip { margin-bottom: 60px; }
}
@media (max-width: 600px) {
  .proof-strip {
    display: grid;
    grid-template-columns: 1fr;
    gap: 13px;
    align-items: start;
    padding: 20px 4px;
    margin-bottom: 42px;
  }
  .proof-item { gap: 11px; font-size: 11px; }
  .proof-divider { width: 100%; height: 1px; }
}
</style>