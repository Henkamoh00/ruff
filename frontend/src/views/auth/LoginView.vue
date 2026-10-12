<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthFormShell from '@/components/forms/AuthFormShell.vue'
import FormField from '@/components/forms/FormField.vue'
import { useToast } from '@/composables/useToast'
import { validateEmail, validateLoginPassword } from '@/utils/validators'

const toast = useToast()

const form = reactive({ email: '', password: '' })
const touched = reactive({ email: false, password: false })
const submitted = ref(false)

const errors = computed(() => ({
  email: validateEmail(form.email),
  password: validateLoginPassword(form.password),
}))

function visibleError(field) {
  return touched[field] || submitted.value ? errors.value[field] : ''
}

async function onSubmit() {
  submitted.value = true

  if (errors.value.email || errors.value.password) {
    await nextTick()
    document.querySelector('form [aria-invalid="true"]')?.focus()
    return
  }

  // لا يُرسل أي طلب هنا: تسجيل الدخول سيُربط بالخلفية في مرحلة المصادقة
  toast.notifyNotConnected('تسجيل الدخول')
}
</script>

<template>
  <AuthFormShell title="تسجيل الدخول" subtitle="ادخل إلى لوحة التحكم لإدارة كتالوج متجرك.">
    <form class="auth-form" novalidate @submit.prevent="onSubmit">
      <FormField
        id="login-email"
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
        id="login-password"
        v-model="form.password"
        label="كلمة المرور"
        type="password"
        autocomplete="current-password"
        ltr
        :error="visibleError('password')"
        @blur="touched.password = true"
      />

      <button type="submit" class="button button-dark button-full">دخول</button>
    </form>

    <template #footer>
      ليس لديك حساب؟ <RouterLink :to="{ name: 'register' }">أنشئ حسابًا</RouterLink>
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
</style>