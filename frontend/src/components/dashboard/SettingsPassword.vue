<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import FormField from '@/components/forms/FormField.vue'
import { useToast } from '@/composables/useToast'
import {
  validateLoginPassword,
  validateNewPassword,
  validatePasswordConfirm,
} from '@/utils/validators'

const toast = useToast()

const form = reactive({ current: '', next: '', confirm: '' })
const touched = reactive({ current: false, next: false, confirm: false })
const submitted = ref(false)

const errors = computed(() => ({
  current: validateLoginPassword(form.current)
    ? 'أدخل كلمة المرور الحالية.'
    : '',
  next:
    validateNewPassword(form.next) ||
    (form.next && form.next === form.current
      ? 'كلمة المرور الجديدة يجب أن تختلف عن الحالية.'
      : ''),
  confirm: validatePasswordConfirm(form.next, form.confirm),
}))

function visibleError(field) {
  return touched[field] || submitted.value ? errors.value[field] : ''
}

function reset() {
  form.current = ''
  form.next = ''
  form.confirm = ''
  touched.current = touched.next = touched.confirm = false
  submitted.value = false
}

async function onSubmit() {
  submitted.value = true
  if (Object.values(errors.value).some(Boolean)) {
    await nextTick()
    document.querySelector('#password-form [aria-invalid="true"]')?.focus()
    return
  }
  // لا يُرسل أي طلب هنا: تغيير كلمة المرور سيُربط بالخلفية في مرحلة المصادقة
  toast.notifyNotConnected('تغيير كلمة المرور')
  reset()
}
</script>

<template>
  <section class="card" aria-labelledby="password-title">
    <h2 id="password-title">تغيير كلمة المرور</h2>

    <form id="password-form" novalidate @submit.prevent="onSubmit">
      <FormField
        id="password-current"
        v-model="form.current"
        label="كلمة المرور الحالية"
        type="password"
        autocomplete="current-password"
        ltr
        :error="visibleError('current')"
        @blur="touched.current = true"
      />
      <FormField
        id="password-next"
        v-model="form.next"
        label="كلمة المرور الجديدة"
        type="password"
        autocomplete="new-password"
        hint="8 أحرف على الأقل."
        ltr
        :error="visibleError('next')"
        @blur="touched.next = true"
      />
      <FormField
        id="password-confirm"
        v-model="form.confirm"
        label="تأكيد كلمة المرور الجديدة"
        type="password"
        autocomplete="new-password"
        ltr
        :error="visibleError('confirm')"
        @blur="touched.confirm = true"
      />

      <div class="actions">
        <button type="submit" class="button button-dark">تغيير كلمة المرور</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.card {
  padding: 22px 24px;
  border: 1px solid var(--line);
  border-radius: 17px;
  background: #fff;
}

h2 {
  margin: 0 0 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
  color: var(--forest);
  font-size: 15px;
  letter-spacing: -0.02em;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (max-width: 600px) {
  .card {
    padding: 18px;
  }
  .actions .button {
    width: 100%;
  }
}
</style>