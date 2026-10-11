<script setup>
import { computed } from 'vue'
import { whatsappLink } from '@/utils/format'

const props = defineProps({
  store: { type: Object, required: true },
  demo: { type: Boolean, default: false },
})

const waUrl = computed(() => whatsappLink(props.store.whatsapp))
const address = computed(() => [props.store.address, props.store.city].filter(Boolean).join('، '))
const socials = computed(() => props.store.socials ?? [])
const hasContact = computed(
  () => props.store.whatsapp || props.store.phone || address.value || socials.value.length,
)
</script>

<template>
  <section v-if="hasContact" class="catalog-contact" aria-labelledby="contact-title">
    <div class="contact-info">
      <h2 id="contact-title">تواصل مع المحل</h2>
      <ul>
        <li v-if="store.phone">
          <span class="contact-key">الهاتف</span>
          <span v-if="demo" dir="ltr">{{ store.phone }}</span>
          <a v-else :href="`tel:${store.phone.replace(/\s/g, '')}`" dir="ltr">{{ store.phone }}</a>
        </li>
        <li v-if="address">
          <span class="contact-key">العنوان</span>
          <span>{{ address }}</span>
        </li>
        <li v-for="social in socials" :key="social.url">
          <span class="contact-key">{{ social.label }}</span>
          <a :href="social.url" target="_blank" rel="noopener noreferrer" dir="ltr">{{ social.url }}</a>
        </li>
      </ul>
    </div>

    <div v-if="store.whatsapp" class="contact-action">
      <span v-if="demo" class="button button-dark is-static">
        <span aria-hidden="true">◔</span> تواصل عبر واتساب
      </span>
      <a v-else class="button button-dark" :href="waUrl" target="_blank" rel="noopener noreferrer">
        <span aria-hidden="true">◔</span> تواصل عبر واتساب
      </a>
      <small v-if="demo">زر توضيحي: في المتجر الفعلي يفتح محادثة واتساب مع المحل.</small>
    </div>
  </section>
</template>

<style scoped>
.catalog-contact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 56px;
  padding: 24px 26px;
  border: 1px solid #e8ebe2;
  border-radius: 17px;
  background: #fff;
}
.contact-info h2 { margin: 0 0 8px; color: #123b32; font-size: 17px; letter-spacing: -0.03em; }
.contact-info ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 3px; }
.contact-info li { display: flex; gap: 10px; color: #4d5e54; font-size: 12px; }
.contact-info a:hover { color: var(--forest-soft); text-decoration: underline; }
.contact-key { min-width: 54px; color: #8a968a; }
.contact-action { display: flex; flex-direction: column; align-items: center; gap: 7px; flex: 0 0 auto; }
.contact-action .button { min-width: 190px; }
.contact-action .is-static { cursor: default; }
.contact-action .is-static:hover { transform: none; background: var(--forest); }
.contact-action small { max-width: 190px; color: #9aa298; font-size: 9px; line-height: 1.7; text-align: center; }

@media (max-width: 650px) {
  .catalog-contact { flex-direction: column; align-items: stretch; margin-top: 39px; padding: 20px; gap: 18px; }
  .contact-action { align-items: stretch; }
  .contact-action small { max-width: none; }
}
</style>