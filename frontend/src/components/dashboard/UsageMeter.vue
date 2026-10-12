<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  used: { type: Number, required: true },
  limit: { type: Number, required: true },
})

const percent = computed(() => Math.min(100, Math.round((props.used / props.limit) * 100)))
const reached = computed(() => props.used >= props.limit)
</script>

<template>
  <div class="usage" :class="{ reached }">
    <div class="usage-top">
      <span class="usage-title">المنتجات في الخطة المجانية</span>
      <strong class="usage-count"><span dir="ltr">{{ used }} / {{ limit }}</span></strong>
    </div>

    <div
      class="bar"
      role="progressbar"
      :aria-valuenow="used"
      aria-valuemin="0"
      :aria-valuemax="limit"
      :aria-label="`${used} من ${limit} منتجات مستخدمة`"
    >
      <span :style="{ width: `${percent}%` }"></span>
    </div>

    <p v-if="reached" class="usage-note">
      وصل متجرك إلى الحد المجاني. لإضافة منتجات أخرى تعرّف على الخطة المدفوعة.
      <RouterLink :to="{ name: 'upgrade' }">التعرّف على الخطة المدفوعة ←</RouterLink>
    </p>
    <p v-else class="usage-note">
      تُحتسب كل المنتجات المحفوظة، الظاهرة والمخفية. يمكنك إضافة {{ limit - used }} منتجات أخرى.
    </p>
  </div>
</template>

<style scoped>
.usage-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.usage-title {
  color: #4d5e54;
  font-size: 12px;
  font-weight: 600;
}

.usage-count {
  color: var(--forest);
  font-size: 15px;
}

.bar {
  height: 9px;
  overflow: hidden;
  border-radius: 50px;
  background: #eaeee0;
}

.bar span {
  display: block;
  height: 100%;
  border-radius: 50px;
  background: #7f9561;
  transition: width 0.3s;
}

.reached .bar span {
  background: #d9873a;
}

.usage-note {
  margin: 10px 0 0;
  color: #7c877e;
  font-size: 11px;
  line-height: 1.9;
}

.usage-note a {
  display: inline-block;
  margin-inline-start: 4px;
  color: var(--forest);
  font-weight: 700;
}

.usage-note a:hover {
  color: #698247;
}
</style>