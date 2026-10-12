<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import FormNotice from '@/components/forms/FormNotice.vue'
import { siteConfig } from '@/config/site'
import { whatsappLink } from '@/utils/format'

const channels = computed(() => {
  const list = []
  if (siteConfig.contactEmail) {
    list.push({
      key: 'email',
      icon: '✉',
      label: 'البريد الإلكتروني',
      value: siteConfig.contactEmail,
      href: `mailto:${siteConfig.contactEmail}`,
      ltr: true,
    })
  }
  const wa = whatsappLink(siteConfig.contactWhatsapp)
  if (wa) {
    list.push({
      key: 'whatsapp',
      icon: '◔',
      label: 'واتساب',
      value: siteConfig.contactWhatsapp,
      href: wa,
      ltr: true,
    })
  }
  if (siteConfig.instagramUrl) {
    list.push({
      key: 'instagram',
      icon: '◎',
      label: 'إنستغرام',
      value: siteConfig.instagramUrl,
      href: siteConfig.instagramUrl,
      ltr: true,
    })
  }
  if (siteConfig.facebookUrl) {
    list.push({
      key: 'facebook',
      icon: 'f',
      label: 'فيسبوك',
      value: siteConfig.facebookUrl,
      href: siteConfig.facebookUrl,
      ltr: true,
    })
  }
  return list
})
</script>

<template>
  <section class="contact container">
    <header class="contact-head">
      <span class="section-kicker">نسعد بسماعك</span>
      <h1>تواصل معنا</h1>
      <p>
        لأي سؤال عن رَف، أو لإخبارنا عن نشاطك وكيف تعرض منتجاتك اليوم، راسلنا عبر إحدى الوسائل
        التالية.
      </p>
    </header>

    <FormNotice v-if="!channels.length">
      لم تُضبط وسائل التواصل بعد. أضفها في الملف <span dir="ltr">src/config/site.js</span> لتظهر
      هنا.
    </FormNotice>

    <div v-else class="channel-list">
      <a
        v-for="channel in channels"
        :key="channel.key"
        class="channel"
        :href="channel.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="channel-icon" aria-hidden="true">{{ channel.icon }}</span>
        <span class="channel-text">
          <strong>{{ channel.label }}</strong>
          <small :dir="channel.ltr ? 'ltr' : undefined">{{ channel.value }}</small>
        </span>
        <span class="channel-arrow" aria-hidden="true">↗</span>
      </a>
    </div>

    <div class="contact-more">
      <p>تريد رؤية الفكرة أولًا؟</p>
      <RouterLink class="button button-outline" :to="{ name: 'catalog-demo' }">
        شاهد نموذج الكتالوج
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.contact {
  max-width: 620px;
  padding-block: 56px 80px;
}

.contact-head {
  margin-bottom: 26px;
}

h1 {
  margin: 12px 0 10px;
  color: var(--forest-deep);
  font-size: clamp(30px, 4vw, 40px);
  line-height: 1.4;
  letter-spacing: -0.05em;
}

.contact-head p {
  margin: 0;
  color: #69766c;
  font-size: 13px;
  line-height: 2;
}

.channel-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.channel {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px 18px;
  border: 1px solid #e8ebe2;
  border-radius: 15px;
  background: #fff;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.channel:hover {
  transform: translateY(-2px);
  border-color: #b8c99e;
  box-shadow: 0 12px 28px rgba(18, 59, 50, 0.07);
}

.channel-icon {
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: var(--lime);
  color: var(--forest);
  font-size: 18px;
  font-weight: 700;
}

.channel-text {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  line-height: 1.6;
}

.channel-text strong {
  color: #203b30;
  font-size: 13px;
}

.channel-text small {
  overflow: hidden;
  color: #7c877e;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
}

.channel-arrow {
  color: #8aa266;
  font-size: 18px;
}

.contact-more {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 34px;
  padding-top: 22px;
  border-top: 1px solid var(--line);
}

.contact-more p {
  margin: 0;
  color: #69766c;
  font-size: 12px;
}

@media (max-width: 600px) {
  .contact {
    padding-block: 36px 56px;
  }
  .contact-more {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
}
</style>