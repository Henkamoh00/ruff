<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  // نصوص، أو كائنات بالشكل { value, label }
  options: { type: Array, required: true },
  placeholder: { type: String, default: 'اختر…' },
  error: { type: String, default: '' },
  hint: { type: String, default: '' },
})

defineEmits(['update:modelValue', 'blur'])

const normalized = computed(() =>
  props.options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o)),
)

const describedBy = computed(() => {
  if (props.error) return `${props.id}-error`
  if (props.hint) return `${props.id}-hint`
  return undefined
})
</script>

<template>
  <div class="field" :class="{ 'has-error': error }">
    <label :for="id">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="describedBy"
      @change="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="option in normalized" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" :id="`${id}-error`" class="field-error">{{ error }}</p>
    <p v-else-if="hint" :id="`${id}-hint`" class="field-hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  color: #243b30;
  font-size: 12px;
  font-weight: 600;
}

select {
  width: 100%;
  min-height: 46px;
  padding: 9px 14px;
  border: 1px solid #dfe4d6;
  border-radius: 11px;
  background: #fff;
  color: var(--ink);
  font-size: 13px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

select:focus {
  outline: none;
  border-color: #7f9561;
  box-shadow: 0 0 0 3px rgba(215, 243, 106, 0.4);
}

.has-error select {
  border-color: var(--danger);
  background: #fffafa;
}

.field-error {
  margin: 0;
  color: var(--danger);
  font-size: 11px;
  line-height: 1.7;
}

.field-hint {
  margin: 0;
  color: #8a948b;
  font-size: 11px;
  line-height: 1.7;
}
</style>