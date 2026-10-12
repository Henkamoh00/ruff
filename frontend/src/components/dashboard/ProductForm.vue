<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import FormField from '@/components/forms/FormField.vue'
import FormTextarea from '@/components/forms/FormTextarea.vue'
import ImagePicker from '@/components/forms/ImagePicker.vue'
import { useToast } from '@/composables/useToast'
import { previewDiscount, validateProductForm } from '@/utils/productValidators'

const props = defineProps({
  mode: { type: String, default: 'create' }, // create | edit
  initial: { type: Object, default: () => ({}) },
  currentImage: { type: String, default: null },
  currency: { type: String, required: true },
})

const toast = useToast()

const form = reactive({
  name: '',
  description: '',
  price: '',
  originalPrice: '',
  category: '',
  visible: true,
  available: true,
  ...props.initial,
})

const imageFile = ref(null)

const touched = reactive({})
const submitted = ref(false)

const errors = computed(() => validateProductForm(form))
const discount = computed(() => previewDiscount(form))

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

  // لا يُرسل أي طلب هنا: الحفظ سيُربط بالخلفية في مرحلة المنتجات
  toast.notifyNotConnected(props.mode === 'create' ? 'إضافة المنتج' : 'حفظ المنتج')
}

const submitLabel = computed(() => (props.mode === 'create' ? 'إضافة المنتج' : 'حفظ التعديلات'))
</script>

<template>
  <form class="product-form" novalidate @submit.prevent="onSubmit">
    <section class="form-card">
      <h2>بيانات المنتج</h2>
      <FormField
        id="product-name"
        v-model="form.name"
        label="اسم المنتج"
        placeholder="مثال: حقيبة كلاسيكية"
        :maxlength="100"
        :error="visibleError('name')"
        @blur="touch('name')"
      />
      <FormTextarea
        id="product-description"
        v-model="form.description"
        label="وصف المنتج (اختياري)"
        placeholder="سطر يعرّف الزبون بالمنتج."
        :maxlength="300"
        :rows="3"
        :hint="`${form.description.length} / 300`"
        :error="visibleError('description')"
        @blur="touch('description')"
      />
      <FormField
        id="product-category"
        v-model="form.category"
        label="الفئة (اختيارية)"
        placeholder="مثال: حقائب"
        hint="المنتجات التي تشترك في الفئة نفسها تظهر في أزرار التصفية داخل الكتالوج."
        :maxlength="40"
        :error="visibleError('category')"
        @blur="touch('category')"
      />
    </section>

    <section class="form-card">
      <h2>السعر</h2>
      <div class="grid-2">
        <FormField
          id="product-price"
          v-model="form.price"
          :label="`السعر الحالي (${currency})`"
          placeholder="3500"
          hint="عدد صحيح بالأرقام 0-9 فقط."
          ltr
          :error="visibleError('price')"
          @blur="touch('price')"
        />
        <FormField
          id="product-original-price"
          v-model="form.originalPrice"
          :label="`السعر الأصلي (${currency}، اختياري)`"
          placeholder="4200"
          hint="أدخله إن كان المنتج مخفضًا، ويجب أن يكون أعلى من السعر الحالي."
          ltr
          :error="visibleError('originalPrice')"
          @blur="touch('originalPrice')"
        />
      </div>
      <p v-if="discount" class="discount-preview">
        سيظهر المنتج بشارة «عرض» وخصم {{ discount }}٪، وفي قسم العروض إن كان ظاهرًا.
      </p>
    </section>

    <section class="form-card">
      <h2>الصورة</h2>
      <ImagePicker
        id="product-image"
        v-model="imageFile"
        label="صورة المنتج (صورة واحدة فقط)"
        :current-url="currentImage"
      />
    </section>

    <section class="form-card">
      <h2>الظهور والتوفر</h2>
      <label class="check-row" for="product-visible">
        <input id="product-visible" v-model="form.visible" type="checkbox" />
        <span>
          <strong>ظاهر في الكتالوج</strong>
          <small>المنتج المخفي لا يراه الزوار، لكنه يُحتسب ضمن حد المنتجات.</small>
        </span>
      </label>
      <label class="check-row" for="product-available">
        <input id="product-available" v-model="form.available" type="checkbox" />
        <span>
          <strong>متوفر</strong>
          <small>ألغِ التحديد إن نفد المنتج مؤقتًا.</small>
        </span>
      </label>
    </section>

    <div class="form-actions">
      <button type="submit" class="button button-dark">{{ submitLabel }}</button>
      <RouterLink class="button button-outline" :to="{ name: 'products' }">إلغاء</RouterLink>
    </div>
  </form>
</template>

<style scoped>
.product-form {
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

.discount-preview {
  margin: 0;
  padding: 9px 13px;
  border: 1px solid #e2e9d4;
  border-radius: 10px;
  background: var(--lime-soft);
  color: #4b6130;
  font-size: 12px;
  line-height: 1.8;
}

.check-row {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  cursor: pointer;
}

.check-row input {
  width: 17px;
  height: 17px;
  margin: 4px 0 0;
  flex: 0 0 auto;
  accent-color: var(--forest);
}

.check-row span {
  display: flex;
  flex-direction: column;
  line-height: 1.7;
}

.check-row strong {
  color: #243b30;
  font-size: 13px;
}

.check-row small {
  color: #8a948b;
  font-size: 11px;
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