<template>
  <div class="hero-visual" aria-label="مثال بصري لكتالوج محل ملابس">
    <div class="visual-orbit orbit-one" aria-hidden="true"></div>
    <div class="visual-orbit orbit-two" aria-hidden="true"></div>
    <div class="floating-note note-top">
      <span class="mini-check" aria-hidden="true">✓</span>
      <span><strong>كل منتجاتك</strong><small>في مكان واحد</small></span>
    </div>

    <div class="catalog-window">
      <div class="browser-bar">
        <span></span><span></span><span></span>
        <div class="browser-address">raff.dz / boutique-yasmine</div>
      </div>
      <div class="catalog-content">
        <div class="store-topline">
          <span class="store-avatar">ي</span>
          <div class="store-title">
            <strong>بوتيك ياسمين</strong>
            <small>ملابس نسائية · بسكرة</small>
          </div>
          <span class="verified-mark" aria-label="مثال توضيحي">✓</span>
        </div>

        <div class="store-cover">
          <div class="cover-copy">
            <span>اختيارات الموسم</span>
            <strong>أناقة<br />على ذوقك.</strong>
            <small>تصفّحي الجديد</small>
          </div>
          <div class="cover-sun" aria-hidden="true"></div>
          <div class="cover-arch" aria-hidden="true"></div>
        </div>

        <div class="products-heading"><strong>منتجاتنا</strong><span>عرض الكل ←</span></div>
        <div class="product-grid">
          <article class="product-card">
            <div class="product-image image-one">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=360&q=80"
                alt="ملابس معروضة في متجر"
                loading="lazy"
              />
            </div>
            <strong>إطلالة يومية</strong><span>3,500 دج</span>
          </article>
          <article class="product-card">
            <div class="product-image image-two">
              <img
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=360&q=80"
                alt="حقيبة نسائية"
                loading="lazy"
              />
            </div>
            <strong>حقيبة كلاسيكية</strong><span>4,200 دج</span>
          </article>
          <article class="product-card">
            <div class="product-image image-three">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=360&q=80"
                alt="إطلالة ملابس عصرية"
                loading="lazy"
              />
            </div>
            <strong>طقم الموسم</strong><span>5,800 دج</span>
          </article>
        </div>

        <div class="store-contact">
          <span class="whatsapp-symbol" aria-hidden="true">◔</span>
          <span>تواصل مع المحل</span>
          <span class="contact-arrow" aria-hidden="true">↗</span>
        </div>
      </div>
    </div>

    <div class="floating-note note-bottom">
      <span class="link-icon" aria-hidden="true">↗</span>
      <span><strong>رابط واحد</strong><small>جاهز للمشاركة</small></span>
    </div>
    <div class="visual-caption">مثال توضيحي لشكل الكتالوج — ليس متجرًا حقيقيًا</div>
  </div>
</template>

<style scoped>
.hero-visual {
  position: relative;
  min-width: 0;
  padding: 22px 8px 28px;
  isolation: isolate;
}
.hero-visual::before {
  content: '';
  position: absolute;
  inset: 4% 7% 8%;
  background: #eaf0dc;
  border-radius: 47% 53% 47% 53% / 44% 44% 56% 56%;
  transform: rotate(-8deg);
  z-index: -2;
}
.visual-orbit {
  position: absolute;
  border: 1px solid rgba(18, 59, 50, 0.1);
  border-radius: 50%;
  z-index: -1;
}
.orbit-one { width: 430px; height: 430px; top: -17px; right: -45px; }
.orbit-two { width: 340px; height: 340px; top: 26px; right: 0; border-style: dashed; }

.catalog-window {
  width: min(100%, 438px);
  margin-inline: auto;
  overflow: hidden;
  border: 6px solid rgba(255, 255, 255, 0.9);
  border-radius: 19px;
  background: #fff;
  box-shadow: 0 30px 72px rgba(18, 59, 50, 0.2), 0 3px 10px rgba(18, 59, 50, 0.06);
  transform: rotate(-1.6deg);
}
.browser-bar {
  height: 30px;
  background: #f2f4ef;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 10px;
  border-bottom: 1px solid #e8ebe5;
}
.browser-bar > span { width: 5px; height: 5px; border-radius: 50%; background: #cbd0c5; }
.browser-address {
  direction: ltr;
  margin-inline: auto;
  padding: 2px 30px;
  border-radius: 5px;
  color: #9ba39b;
  background: #e8ebe5;
  font: 7px Arial, sans-serif;
}
.catalog-content { padding: 15px 15px 12px; }
.store-topline { display: flex; align-items: center; gap: 8px; padding: 0 1px 12px; }
.store-avatar {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  color: var(--forest);
  background: var(--lime);
  font-size: 15px;
  font-weight: 700;
}
.store-title { display: flex; flex-direction: column; line-height: 1.55; }
.store-title strong { font-size: 10px; color: #223b32; }
.store-title small { color: #8b958d; font-size: 7px; }
.verified-mark {
  margin-inline-start: auto;
  display: grid;
  place-items: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  color: #fff;
  background: #739553;
  font: 8px Arial, sans-serif;
}
.store-cover {
  position: relative;
  overflow: hidden;
  height: 156px;
  display: flex;
  align-items: center;
  background: linear-gradient(118deg, #eee5d5 0%, #d2dbbf 56%, #b9c6a5 100%);
  border-radius: 10px;
}
.cover-copy {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-inline-start: 20px;
  color: #274536;
}
.cover-copy > span { font-size: 7px; letter-spacing: 0.05em; margin-bottom: 4px; }
.cover-copy strong { font-size: 24px; line-height: 1.2; letter-spacing: -0.06em; }
.cover-copy small { margin-top: 8px; font-size: 7px; border-bottom: 1px solid #6d7f5b; padding-bottom: 2px; }
.cover-sun { position: absolute; top: 18px; right: 40px; width: 70px; height: 70px; background: #e5b78c; border-radius: 50%; opacity: 0.8; }
.cover-arch {
  position: absolute;
  bottom: -28px;
  right: 84px;
  width: 110px;
  height: 155px;
  border: 18px solid rgba(255, 255, 255, 0.55);
  border-bottom: 0;
  border-radius: 70px 70px 0 0;
  transform: rotate(12deg);
}
.products-heading { display: flex; align-items: center; justify-content: space-between; margin: 13px 1px 8px; }
.products-heading strong { color: #263a30; font-size: 10px; }
.products-heading span { color: #8c988b; font-size: 7px; }
.product-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.product-card { min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.product-image { height: 105px; overflow: hidden; background: #e7e8dc; border-radius: 7px; }
.product-image img { display: block; width: 100%; height: 100%; object-fit: cover; }
.image-one { background: #e8c7bb; }
.image-two { background: #e8d8c0; }
.image-three { background: #bfcdb6; }
.product-card strong {
  overflow: hidden;
  color: #48564b;
  font-size: 8px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.product-card > span { color: #183e31; font-size: 8px; font-weight: 700; }
.store-contact {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-top: 12px;
  padding: 8px 10px;
  background: #e5efda;
  color: #28513d;
  border-radius: 7px;
  font-size: 8px;
  font-weight: 700;
}
.whatsapp-symbol {
  display: inline-grid;
  place-items: center;
  width: 15px;
  height: 15px;
  border: 1.5px solid #53845a;
  border-radius: 50%;
  font-size: 13px;
  line-height: 1;
  transform: rotate(-30deg);
}
.contact-arrow { margin-inline-start: auto; font-size: 12px; }

.floating-note {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 14px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(229, 232, 223, 0.8);
  border-radius: 12px;
  box-shadow: 0 14px 32px rgba(18, 59, 50, 0.12);
  position: absolute;
  z-index: 3;
}
.floating-note span:last-child { display: flex; flex-direction: column; line-height: 1.5; }
.floating-note strong { font-size: 10px; color: #1a382f; }
.floating-note small { font-size: 8px; color: #7f8b81; }
.mini-check,
.link-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 29px;
  height: 29px;
  border-radius: 9px;
  color: #2b513b;
  background: #e8f3cf;
  font-size: 14px;
}
.link-icon { color: var(--forest); background: var(--lime); font-size: 16px; }
.note-top { top: 63px; left: -7px; }
.note-bottom { bottom: 70px; right: -9px; }
.visual-caption { position: absolute; bottom: 3px; width: 100%; text-align: center; color: #839087; font-size: 9px; }

@media (max-width: 900px) {
  .hero-visual { width: min(100%, 540px); margin: 0 auto; padding-block: 30px 33px; }
  .catalog-window { width: min(100%, 410px); }
  .note-top { left: 0; }
  .note-bottom { right: -1px; }
  .orbit-one { right: 0; }
  .orbit-two { right: 40px; }
}

@media (max-width: 600px) {
  .hero-visual { padding: 23px 4px 32px; margin-top: 10px; }
  .catalog-window { width: 94%; border-width: 5px; }
  .catalog-content { padding: 11px 10px 9px; }
  .store-cover { height: 130px; }
  .product-image { height: 83px; }
  .cover-copy { padding-inline-start: 14px; }
  .cover-copy strong { font-size: 21px; }
  .cover-sun { right: 23px; width: 60px; height: 60px; }
  .cover-arch { right: 55px; }
  .note-top { top: 39px; left: -3px; }
  .note-bottom { bottom: 53px; right: -3px; }
  .floating-note { padding: 8px 10px; gap: 6px; }
  .floating-note strong { font-size: 9px; }
  .floating-note small { font-size: 7px; }
  .mini-check,
  .link-icon { width: 25px; height: 25px; }
  .visual-caption { font-size: 8px; }
}
</style>