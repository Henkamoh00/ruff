<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  store: { type: Object, required: true },
})

const toast = useToast()

// حالة محلية للعرض فقط: لا تُحفظ في أي مكان قبل ربط الخلفية
const published = ref(Boolean(props.store.published))

const publicPath = computed(() => `/c/${props.store.id}`)
const publicUrl = computed(() => `${window.location.origin}${publicPath.value}`)

async function copyLink() {
  try {
    await navigator.clipboard.writeText(publicUrl.value)
    toast.success('تم نسخ رابط الكتالوج.')
  } catch {
    toast.error('تعذّر النسخ تلقائيًا. حدّد الرابط وانسخه يدويًا.')
  }
}

function togglePublished() {
  published.value = !published.value
  toast.notifyNotConnected('تغيير حالة النشر')
}
</script>

<template>
  <section class="status-card" aria-labelledby="status-title">
    <div class="status-top">
      <div class="status-title-line">
        <h2 id="status-title">{{ store.name }}</h2>
        <span class="state" :class="published ? 'is-live' : 'is-hidden'">
          {{ published ? 'منشور' : 'مخفي' }}
        </span>
      </div>
      <button
        type="button"
        class="button button-small"
        :class="published ? 'button-outline' : 'button-primary'"
        @click="togglePublished"
      >
        {{ published ? 'إخفاء المتجر' : 'نشر المتجر' }}
      </button>
    </div>

    <p class="status-text">
      <template v-if="published">الكتالوج ظاهر لكل من لديه الرابط.</template>
      <template v-else>الكتالوج مخفي، ولن يستطيع الزوار فتح الرابط.</template>
    </p>

    <div class="link-row">
      <span class="link-box" dir="ltr">{{ publicUrl }}</span>
      <button type="button" class="button button-outline button-small" @click="copyLink">
        نسخ الرابط
      </button>
      <RouterLink
        class="button button-dark button-small"
        :to="{ name: 'public-catalog', params: { storeId: store.id } }"
      >
        فتح الكتالوج <span aria-hidden="true">↗</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.status-card {
  padding: 22px 24px;
  border: 1px solid var(--line);
  border-radius: 17px;
  background: #fff;
}

.status-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.status-title-line {
  display: flex;
  align-items: center;
  gap: 10px;
}

h2 {
  margin: 0;
  color: var(--forest);
  font-size: 18px;
  letter-spacing: -0.03em;
}

.state {
  padding: 3px 10px;
  border-radius: 50px;
  font-size: 10px;
  font-weight: 700;
}

.is-live {
  background: #e8f3cf;
  color: #3f6226;
}

.is-hidden {
  background: #eff0ea;
  color: #7c877d;
}

.status-text {
  margin: 8px 0 14px;
  color: #7c877e;
  font-size: 12px;
}

.link-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.link-box {
  min-width: 0;
  flex: 1 1 220px;
  overflow: hidden;
  padding: 9px 13px;
  border: 1px solid #e3e8dc;
  border-radius: 10px;
  background: #f8f9f4;
  color: #59685f;
  font: 12px Arial, sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

@media (max-width: 600px) {
  .status-card {
    padding: 18px;
  }
}
</style>