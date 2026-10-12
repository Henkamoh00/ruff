<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthFormShell from '@/components/forms/AuthFormShell.vue'
import FormField from '@/components/forms/FormField.vue'
import { useToast } from '@/composables/useToast'
import {
  validateEmail,
  validateName,
  validateNewPassword,
  validatePasswordConfirm,
} from '@/utils/validators'

const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirm: '',
  accepted: false,
})
const touched = reactive({ name: false, email: false, password: false, confirm: false })
const submitted = ref(false)

const errors = computed(() => ({
  name: validateName(form.name),
  email: validateEmail(form.email),
  password: validateNewPassword(form.password),
  confirm: validatePasswordConfirm(form.password, form.confirm),
  accepted: form.accepted ? '' : 'يجب الموافقة على الشروط وسياسة الخصوصية للمتابعة.',
}))

function visibleError(field) {
  if (field === 'accepted') return submitted.value ? errors.value.accepted : ''
  return touched[field] || submitted.value ? errors.value[field] : ''
}

async function onSubmit() {
  submitted.value = true

  if (Object.values(errors.value).some(Boolean)) {
    await nextTick()
    document.querySelector('form [aria-invalid="true"]')?.focus()
    return
  }

  // لا يُرسل أي طلب هنا: إنشاء الحساب سيُربط بالخلفية في مرحلة المصادقة
  toast.notifyNotConnected('إنشاء الحساب')
}
</script>

<template>
  <AuthFormShell title="إنشاء حساب" subtitle="أنشئ حسابك لتجهيز كتالوج متجرك ومشاركته برابط واحد.">
    <form class="auth-form" novalidate @submit.prevent="onSubmit">
      <FormField
        id="register-name"
        v-model="form.name"
        label="الاسم"
        autocomplete="name"
        placeholder="اسمك الكامل"
        :maxlength="80"
        :error="visibleError('name')"
        @blur="touched.name = true"
      />

      <FormField
        id="register-email"
        v-model="form.email"
        label="البريد الإلكتروني"
        type="email"
        autocomplete="email"
        placeholder="name@example.com"
        ltr
        :error="visibleError('email')"
        @blur="touched.email = true"
      />

      <FormField
        id="register-password"
        v-model="form.password"
        label="كلمة المرور"
        type="password"
        autocomplete="new-password"
        hint="8 أحرف على الأقل."
        ltr
        :error="visibleError('password')"
        @blur="touched.password = true"
      />

      <FormField
        id="register-confirm"
        v-model="form.confirm"
        label="تأكيد كلمة المرور"
        type="password"
        autocomplete="new-password"
        ltr
        :error="visibleError('confirm')"
        @blur="touched.confirm = true"
      />

      <div class="terms" :class="{ 'has-error': visibleError('accepted') }">
        <label class="terms-row" for="register-accepted">
          <input
            id="register-accepted"
            v-model="form.accepted"
            type="checkbox"
            :aria-invalid="visibleError('accepted') ? 'true' : 'false'"
            :aria-describedby="visibleError('accepted') ? 'register-accepted-error' : undefined"
          />
          <span>
            أوافق على
            <RouterLink :to="{ name: 'terms' }" target="_blank">شروط الاستخدام</RouterLink>
            و
            <RouterLink :to="{ name: 'privacy' }" target="_blank">سياسة الخصوصية</RouterLink>.
          </span>
        </label>
        <p v-if="visibleError('accepted')" id="register-accepted-error" class="terms-error">
          {{ visibleError('accepted') }}
        </p>
      </div>

      <button type="submit" class="button button-dark button-full">إنشاء الحساب</button>
    </form>

    <template #footer>
      لديك حساب بالفعل؟ <RouterLink :to="{ name: 'login' }">سجّل الدخول</RouterLink>
    </template>
  </AuthFormShell>
</template>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-form .button {
  margin-top: 4px;
}

.terms-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #4d5e54;
  font-size: 12px;
  line-height: 1.9;
  cursor: pointer;
}

.terms-row input {
  width: 17px;
  height: 17px;
  margin: 3px 0 0;
  flex: 0 0 auto;
  accent-color: var(--forest);
}

.terms-row a {
  color: var(--forest);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.terms-error {
  margin: 4px 0 0;
  color: var(--danger);
  font-size: 11px;
}
</style>