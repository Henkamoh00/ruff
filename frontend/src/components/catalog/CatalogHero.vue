<script setup>
import { scrollToId } from '@/utils/scroll'

defineProps({
  hero: { type: Object, required: true },
})
</script>

<template>
  <section class="catalog-hero" aria-labelledby="catalog-hero-title">
    <div class="catalog-hero-copy">
      <span class="catalog-eyebrow">{{ hero.eyebrow }}</span>
      <h2 id="catalog-hero-title">
        {{ hero.titleMain }}<br /><span>{{ hero.titleMuted }}</span>
      </h2>
      <p>{{ hero.text }}</p>
      <a class="button button-dark" href="#products" @click.prevent="scrollToId('products')">
        {{ hero.buttonLabel }} <span aria-hidden="true">↓</span>
      </a>
    </div>

    <div class="catalog-hero-image">
      <img :src="hero.image" :alt="hero.imageAlt" fetchpriority="high" />
      <span v-if="hero.imageNote" class="image-note">{{ hero.imageNote }}</span>
      <div v-if="hero.tagTitle" class="hero-image-tag">
        <span>✳</span>
        <div>
          <strong>{{ hero.tagTitle }}</strong>
          <small>{{ hero.tagText }}</small>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.catalog-hero {
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  align-items: center;
  gap: clamp(28px, 5vw, 72px);
  padding-block: 48px 42px;
}
.catalog-hero-copy { padding-block: 12px; }
.catalog-eyebrow { color: #6a824a; font-size: 11px; font-weight: 700; }
.catalog-hero-copy h2 {
  margin: 13px 0 15px;
  font-size: clamp(32px, 3.5vw, 46px);
  line-height: 1.4;
  letter-spacing: -0.05em;
  color: var(--forest-deep);
  font-weight: 700;
}
.catalog-hero-copy h2 span { color: #819084; }
.catalog-hero-copy p { max-width: 440px; margin: 0; color: #69766c; font-size: 13px; line-height: 2; }
.catalog-hero-copy .button { margin-top: 24px; min-width: 160px; }
.catalog-hero-image { position: relative; height: 350px; border-radius: 22px; overflow: hidden; background: #dce5d4; }
.catalog-hero-image::after {
  content: '';
  position: absolute;
  inset: 45% 0 0;
  pointer-events: none;
  background: linear-gradient(0deg, rgba(10, 35, 26, 0.34), transparent);
}
.catalog-hero-image > img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: center 38%; }
.image-note { position: absolute; z-index: 1; top: 12px; left: 12px; padding: 4px 9px; border-radius: 50px; background: rgba(255, 255, 255, 0.88); color: #617065; font-size: 9px; }
.hero-image-tag {
  position: absolute;
  z-index: 2;
  right: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
}
.hero-image-tag > span { display: grid; place-items: center; width: 33px; height: 33px; border-radius: 10px; background: #d7f36a; color: #123b32; font-size: 17px; }
.hero-image-tag div { display: flex; flex-direction: column; line-height: 1.6; }
.hero-image-tag strong { color: #243b30; font-size: 11px; }
.hero-image-tag small { color: #859087; font-size: 9px; }

@media (max-width: 900px) {
  .catalog-hero { grid-template-columns: 1fr 1fr; gap: 25px; padding-top: 35px; }
  .catalog-hero-image { height: 320px; }
}
@media (max-width: 650px) {
  .catalog-hero { grid-template-columns: 1fr; gap: 22px; padding-block: 31px 28px; }
  .catalog-hero-copy { padding: 0; }
  .catalog-hero-copy h2 { font-size: 34px; }
  .catalog-hero-copy p { font-size: 12px; }
  .catalog-hero-image { height: 260px; border-radius: 17px; }
}
</style>