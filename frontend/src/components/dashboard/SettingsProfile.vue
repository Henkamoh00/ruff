<script setup>
import { computed, nextTick, ref } from 'vue'
import FormField from '@/components/forms/FormField.vue'
import { useToast } from '@/composables/useToast'
import { validateName } from '@/utils/validators'

const props = defineProps({
  account: { type: Object, required: true }, // { name, email }
})

const toast = useToast()

const name = ref(props.account.name)
const touched = ref(false)
const submitted = ref(false)

const error = computed(() => validateName(name.value))
const shownError = computed(() => (touched.value || submitted.value ? error.value : ''))

async function onSubmit() {
  submitted.value = true
  if (error.value) {
    await nextTick()
    document.querySelector('#settings-name')?.focus()
    return
  }
  // لا يُرسل أي طلب هنا: تعديل الحساب سيُربط بالخلفية في مرحلة المصادقة
  toast.notifyNotConnected('حفظ الاسم')
}
</script>

<template>
  <section class="card" aria-labelledby="profile-title">
    <h2 id="profile-title">بيانات الحساب</h2>

    <form novalidate @submit.prevent="onSubmit">
      <FormField
        id="settings-name"
        v-model="name"
        label="الاسم"
        autocomplete="name"
        :maxlength="80"
        :error="shownError"
        @blur="touched = true"
      />

      <div class="readonly">
        <span class="readonly-label">البريد الإلكتروني</span>
        <strong dir="ltr">{{ account.email }}</strong>
        <small>تغيير البريد الإلكتروني غير متاح حاليًا.</small>
      </div>

      <div class="actions">
        <button type="submit" class="button button-dark">حفظ الاسم</button>
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

.readonly {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 11px 14px;
  border: 1px solid #e8ebe2;
  border-radius: 11px;
  background: #f8f9f4;
}

.readonly-label {
  color: #8a948b;
  font-size: 11px;
}

.readonly strong {
  color: #243b30;
  font-size: 13px;
  text-align: right;
}

.readonly small {
  color: #9aa298;
  font-size: 10px;
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