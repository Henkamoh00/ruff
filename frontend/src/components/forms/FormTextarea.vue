<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  error: { type: String, default: '' },
  hint: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  maxlength: { type: Number, default: undefined },
  rows: { type: Number, default: 4 },
})

defineEmits(['update:modelValue', 'blur'])

const describedBy = computed(() => {
  if (props.error) return `${props.id}-error`
  if (props.hint) return `${props.id}-hint`
  return undefined
})
</script>

<template>
  <div class="field" :class="{ 'has-error': error }">
    <label :for="id">{{ label }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="describedBy"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    ></textarea>
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

textarea {
  width: 100%;
  padding: 11px 14px;
  border: 1px solid #dfe4d6;
  border-radius: 11px;
  background: #fff;
  color: var(--ink);
  font-size: 13px;
  line-height: 1.9;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
}

textarea::placeholder {
  color: #a6aea5;
}

textarea:focus {
  outline: none;
  border-color: #7f9561;
  box-shadow: 0 0 0 3px rgba(215, 243, 106, 0.4);
}

.has-error textarea {
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