<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import FormField from '@/components/forms/FormField.vue'
import FormTextarea from '@/components/forms/FormTextarea.vue'
import FormSelect from '@/components/forms/FormSelect.vue'
import ImagePicker from '@/components/forms/ImagePicker.vue'
import { siteConfig } from '@/config/site'
import { useToast } from '@/composables/useToast'
import { currencies } from '@/utils/currencies'
import { storeCategories, validateStoreForm } from '@/utils/storeValidators'

const props = defineProps({
  mode: { type: String, default: 'create' }, // create | edit
  initial: { type: Object, default: () => ({}) },
})

const toast = useToast()

const form = reactive({
  name: '',
  description: '',
  category: '',
  currency: siteConfig.defaultCurrency,
  city: '',
  address: '',
  phone: '',
  whatsapp: '',
  instagram: '',
  facebook: '',
  website: '',
  ...props.initial,
})

const logoFile = ref(null)
const coverFile = ref(null)

const touched = reactive({})
const submitted = ref(false)

const errors = computed(() => validateStoreForm(form))

function touch(field) {
  touched[field] = true
}

function visibleError(field) {
  return touched[field] || submitted.value ? (errors.value[field] ?? '') : ''
}

async function onSubmit() {
  submitted.value = true

  if (Object.keys(errors.value).length) {
    await nextTick()
    document.querySelector('form [aria-invalid="true"]')?.focus()
    return
  }

  // لا يُرسل أي طلب هنا: الحفظ سيُربط بالخلفية في مرحلة المتاجر
  toast.notifyNotConnected(props.mode === 'create' ? 'إنشاء المتجر' : 'حفظ بيانات المتجر')
}

const submitLabel = computed(() => (props.mode === 'create' ? 'إنشاء المتجر' : 'حفظ التعديلات'))
const currencyHint = computed(() =>
  props.mode === 'edit'
    ? 'تُعرض بها أسعار منتجاتك. تغيير العملة لا يحوّل الأسعار الحالية، فراجعها بعد التغيير.'
    : 'تُعرض بها أسعار منتجاتك في الكتالوج.',
)
</script>

<template>
  <form class="store-form" novalidate @submit.prevent="onSubmit">
    <section class="form-card">
      <h2>المعلومات الأساسية</h2>
      <FormField
        id="store-name"
        v-model="form.name"
        label="اسم المتجر"
        placeholder="مثال: بوتيك ياسمين"
        :maxlength="80"
        :error="visibleError('name')"
        @blur="touch('name')"
      />
      <div class="grid-2">
        <FormSelect
          id="store-category"
          v-model="form.category"
          label="النشاط التجاري"
          :options="storeCategories"
          placeholder="اختر نشاط المتجر"
          :error="visibleError('category')"
          @blur="touch('category')"
        />
        <FormSelect
          id="store-currency"
          v-model="form.currency"
          label="عملة الأسعار"
          :options="currencies"
          placeholder="اختر العملة"
          :hint="currencyHint"
          :error="visibleError('currency')"
          @blur="touch('currency')"
        />
      </div>
      <FormTextarea
        id="store-description"
        v-model="form.description"
        label="وصف المتجر (اختياري)"
        placeholder="جملة أو جملتان تعرّفان الزبون بمحلك."
        :maxlength="300"
        :rows="3"
        :hint="`${form.description.length} / 300`"
        :error="visibleError('description')"
        @blur="touch('description')"
      />
    </section>

    <section class="form-card">
      <h2>الموقع والتواصل</h2>
      <div class="grid-2">
        <FormField
          id="store-city"
          v-model="form.city"
          label="المدينة"
          placeholder="مثال: بسكرة"
          :maxlength="60"
          :error="visibleError('city')"
          @blur="touch('city')"
        />
        <FormField
          id="store-address"
          v-model="form.address"
          label="العنوان (اختياري)"
          placeholder="الحي أو الشارع"
          :maxlength="150"
          :error="visibleError('address')"
          @blur="touch('address')"
        />
      </div>
      <div class="grid-2">
        <FormField
          id="store-phone"
          v-model="form.phone"
          label="رقم الهاتف"
          type="tel"
          autocomplete="tel"
          placeholder="+213 555 00 00 00"
          ltr
          :error="visibleError('phone')"
          @blur="touch('phone')"
        />
        <FormField
          id="store-whatsapp"
          v-model="form.whatsapp"
          label="رقم واتساب"
          type="tel"
          placeholder="+213 555 00 00 00"
          hint="بالصيغة الدولية مع رمز الدولة. يظهر زر «تواصل عبر واتساب» في الكتالوج عند إدخاله."
          ltr
          :error="visibleError('whatsapp')"
          @blur="touch('whatsapp')"
        />
      </div>
    </section>

    <section class="form-card">
      <h2>روابط اختيارية</h2>
      <FormField
        id="store-instagram"
        v-model="form.instagram"
        label="إنستغرام"
        type="url"
        placeholder="https://instagram.com/..."
        ltr
        :error="visibleError('instagram')"
        @blur="touch('instagram')"
      />
      <FormField
        id="store-facebook"
        v-model="form.facebook"
        label="فيسبوك"
        type="url"
        placeholder="https://facebook.com/..."
        ltr
        :error="visibleError('facebook')"
        @blur="touch('facebook')"
      />
      <FormField
        id="store-website"
        v-model="form.website"
        label="الموقع الإلكتروني"
        type="url"
        placeholder="https://..."
        ltr
        :error="visibleError('website')"
        @blur="touch('website')"
      />
    </section>

    <section class="form-card">
      <h2>الصور</h2>
      <ImagePicker id="store-logo" v-model="logoFile" label="الشعار (اختياري)" />
      <ImagePicker id="store-cover" v-model="coverFile" label="صورة الغلاف (اختيارية)" wide />
    </section>

    <div class="form-actions">
      <button type="submit" class="button button-dark">{{ submitLabel }}</button>
      <RouterLink class="button button-outline" :to="{ name: 'dashboard' }">إلغاء</RouterLink>
    </div>
  </form>
</template>

<style scoped>
.store-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 22px 24px;
  border: 1px solid var(--line);
  border-radius: 17px;
  background: #fff;
}

.form-card h2 {
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
  color: var(--forest);
  font-size: 15px;
  letter-spacing: -0.02em;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
}

.form-actions {
  display: flex;
  gap: 10px;
}

@media (max-width: 700px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .form-card {
    padding: 18px;
  }
  .form-actions .button {
    flex: 1;
  }
}
</style>