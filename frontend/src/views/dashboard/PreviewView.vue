<script setup>
import { computed, ref } from 'vue'
import PageHeader from '@/components/dashboard/PageHeader.vue'
import { demoDashboardStore } from '@/data/dashboard'

const store = demoDashboardStore

const device = ref('phone') // phone | desktop
const reloadKey = ref(0)
const path = computed(() => `/c/${store.id}`)
</script>

<template>
  <div>
    <PageHeader title="معاينة الكتالوج" subtitle="هكذا يرى زبائنك كتالوج متجرك على الهاتف والحاسوب.">
      <template #actions>
        <button type="button" class="button button-outline button-small" @click="reloadKey++">
          إعادة التحميل
        </button>
        <a class="button button-dark button-small" :href="path" target="_blank" rel="noopener">
          فتح في تبويب جديد <span aria-hidden="true">↗</span>
        </a>
      </template>
    </PageHeader>

    <div class="toolbar" role="group" aria-label="حجم المعاينة">
      <button
        type="button"
        :class="{ 'is-active': device === 'phone' }"
        :aria-pressed="device === 'phone'"
        @click="device = 'phone'"
      >
        هاتف
      </button>
      <button
        type="button"
        :class="{ 'is-active': device === 'desktop' }"
        :aria-pressed="device === 'desktop'"
        @click="device = 'desktop'"
      >
        حاسوب
      </button>
    </div>

    <div class="stage" :class="device">
      <iframe :key="reloadKey" :src="path" title="معاينة كتالوج المتجر" loading="lazy"></iframe>
    </div>

    <p class="hint">
      المعاينة تعرض الكتالوج العام كما يظهر للزوار، بالبيانات التجريبية الحالية. وإن أخفيت المتجر
      فلن يستطيع الزوار فتح رابطه.
    </p>
  </div>
</template>

<style scoped>
.toolbar {
  display: inline-flex;
  gap: 4px;
  margin-bottom: 14px;
  padding: 4px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
}

.toolbar button {
  min-height: 36px;
  padding: 0 18px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #59685f;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.toolbar button:hover {
  background: #f4f6ee;
}

.toolbar button.is-active {
  background: var(--forest);
  color: #fff;
}

.stage {
  margin-inline: auto;
  overflow: hidden;
  background: #fff;
}

.stage iframe {
  width: 100%;
  height: 100%;
  display: block;
  border: 0;
  background: #fff;
}

.stage.phone {
  width: min(100%, 390px);
  height: 720px;
  border: 10px solid #1b2b26;
  border-radius: 34px;
  box-shadow: 0 24px 60px rgba(11, 43, 37, 0.18);
}

.stage.desktop {
  width: 100%;
  height: 720px;
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 16px 40px rgba(11, 43, 37, 0.08);
}

.hint {
  margin: 16px 0 0;
  color: #8a948b;
  font-size: 11px;
  line-height: 1.9;
  text-align: center;
}

@media (max-width: 600px) {
  .toolbar {
    display: flex;
  }
  .toolbar button {
    flex: 1;
  }
  .stage.phone {
    height: 640px;
    border-width: 8px;
    border-radius: 28px;
  }
  .stage.desktop {
    height: 560px;
  }
}
</style>