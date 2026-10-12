<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' },
  error: { type: String, default: '' },
  hint: { type: String, default: '' },
  autocomplete: { type: String, default: 'off' },
  placeholder: { type: String, default: '' },
  maxlength: { type: Number, default: undefined },
  ltr: { type: Boolean, default: false },
})

defineEmits(['update:modelValue', 'blur'])

const reveal = ref(false)
const isPassword = computed(() => props.type === 'password')
const inputType = computed(() => (isPassword.value && reveal.value ? 'text' : props.type))
const describedBy = computed(() => {
  if (props.error) return `${props.id}-error`
  if (props.hint) return `${props.id}-hint`
  return undefined
})
</script>

<template>
  <div class="field" :class="{ 'has-error': error }">
    <label :for="id">{{ label }}</label>

    <div class="field-control">
      <input
        :id="id"
        :value="modelValue"
        :type="inputType"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :dir="ltr ? 'ltr' : undefined"
        :class="{
          'is-ltr': ltr,
          'pad-right': isPassword && ltr,
          'pad-left': isPassword && !ltr,
        }"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-describedby="describedBy"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur')"
      />
      <button
        v-if="isPassword"
        type="button"
        class="toggle"
        :class="ltr ? 'at-right' : 'at-left'"
        :aria-pressed="reveal"
        @click="reveal = !reveal"
      >
        {{ reveal ? 'إخفاء' : 'إظهار' }}
      </button>
    </div>

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

.field-control {
  position: relative;
}

input {
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

input.is-ltr {
  text-align: left;
}

/* الحقول اللاتينية: النص يبدأ من اليسار، فالزر على اليمين */
input.pad-right {
  padding-right: 70px;
}

/* الحقول العربية: النص يبدأ من اليمين، فالزر على اليسار */
input.pad-left {
  padding-left: 70px;
}

input::placeholder {
  color: #a6aea5;
}

input:focus {
  outline: none;
  border-color: #7f9561;
  box-shadow: 0 0 0 3px rgba(215, 243, 106, 0.4);
}

.has-error input {
  border-color: var(--danger);
  background: #fffafa;
}

.has-error input:focus {
  box-shadow: 0 0 0 3px rgba(180, 65, 47, 0.14);
}

.toggle {
  position: absolute;
  top: 5px;
  bottom: 5px;
  padding: 0 11px;
  border: 0;
  border-radius: 8px;
  background: #f0f2e9;
  color: #516259;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}

.toggle.at-right {
  right: 5px;
}

.toggle.at-left {
  left: 5px;
}

.toggle:hover {
  background: var(--lime-soft);
  color: var(--forest);
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