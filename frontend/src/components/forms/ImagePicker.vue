<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'

const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: File, default: null },
  currentUrl: { type: String, default: null },
  wide: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const input = ref(null)
const previewUrl = ref(null)
const localError = ref('')

watch(
  () => props.modelValue,
  (file) => {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = file ? URL.createObjectURL(file) : null
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
})

function hasAllowedExtension(name) {
  const lower = name.toLowerCase()
  return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext))
}

function onChange(event) {
  const file = event.target.files?.[0]
  if (!file) return

  localError.value = ''
  // فحص أولي في المتصفح فقط. الخلفية ستتحقق من محتوى الملف الفعلي.
  if (!ALLOWED_TYPES.includes(file.type) || !hasAllowedExtension(file.name)) {
    localError.value = 'صيغة غير مدعومة. استخدم JPG أو PNG أو WEBP.'
    event.target.value = ''
    return
  }
  if (file.size > MAX_BYTES) {
    localError.value = 'حجم الصورة أكبر من 5 ميغابايت.'
    event.target.value = ''
    return
  }
  emit('update:modelValue', file)
}

function remove() {
  localError.value = ''
  if (input.value) input.value.value = ''
  emit('update:modelValue', null)
}
</script>

<template>
  <div class="picker" :class="{ 'has-error': localError }">
    <span class="picker-label">{{ label }}</span>

    <div class="picker-body">
      <div class="preview" :class="{ wide }">
        <img v-if="previewUrl" :src="previewUrl" alt="" />
        <img v-else-if="currentUrl" :src="currentUrl" alt="" />
        <span v-else class="preview-empty" aria-hidden="true">▦</span>
      </div>

      <div class="picker-actions">
        <label class="button button-outline button-small" :for="id">
          {{ previewUrl || currentUrl ? 'استبدال الصورة' : 'اختيار صورة' }}
        </label>
        <input
          :id="id"
          ref="input"
          class="visually-hidden"
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          @change="onChange"
        />
        <button v-if="previewUrl" type="button" class="button button-small button-danger" @click="remove">
          إزالة
        </button>
        <p class="picker-hint">JPG أو PNG أو WEBP · الحد الأقصى 5 ميغابايت.</p>
        <p v-if="previewUrl" class="picker-hint">معاينة محلية فقط: لم تُرفع الصورة بعد.</p>
        <p v-if="localError" class="picker-error" role="alert">{{ localError }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.picker {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.picker-label {
  color: #243b30;
  font-size: 12px;
  font-weight: 600;
}

.picker-body {
  display: flex;
  align-items: center;
  gap: 16px;
}

.preview {
  width: 84px;
  height: 84px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 1px dashed #cfd7c1;
  border-radius: 14px;
  background: #f4f6ee;
}

.preview.wide {
  width: 160px;
  height: 84px;
}

.preview img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.preview-empty {
  color: #b4bfa5;
  font-size: 26px;
}

.picker-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.picker-actions .button {
  cursor: pointer;
}

.picker-hint {
  width: 100%;
  margin: 0;
  color: #8a948b;
  font-size: 11px;
  line-height: 1.7;
}

.picker-error {
  width: 100%;
  margin: 0;
  color: var(--danger);
  font-size: 11px;
}

input:focus-visible + .button,
.picker-actions:focus-within .button-outline {
  border-color: #7f9561;
}

@media (max-width: 600px) {
  .picker-body {
    align-items: flex-start;
  }
  .preview.wide {
    width: 120px;
  }
}
</style>