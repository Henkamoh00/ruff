<script setup>
import { ref } from 'vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { useToast } from '@/composables/useToast'

defineProps({
  email: { type: String, required: true },
})

const toast = useToast()
const open = ref(false)

function onConfirm() {
  open.value = false
  // لا يُحذف شيء هنا: الحذف سيُربط بالخلفية في مرحلة المصادقة
  toast.notifyNotConnected('حذف الحساب')
}
</script>

<template>
  <section class="danger" aria-labelledby="danger-title">
    <h2 id="danger-title">حذف الحساب</h2>
    <p>
      يمكنك حذف حسابك بنفسك في أي وقت. عند تأكيد الحذف يُحذف كل ما يلي نهائيًا خلال 30 يومًا، ولا
      يمكن استرجاعه بعد ذلك:
    </p>
    <ul>
      <li>حسابك وبياناته.</li>
      <li>متجرك وكل منتجاته وصورها.</li>
      <li>رابط الكتالوج العام.</li>
    </ul>
    <p class="grace">
      <strong>مهلة 30 يومًا:</strong> يُخفى كتالوجك فورًا، وإن سجّلت دخولك خلال هذه المدة يُلغى
      الحذف تلقائيًا ويعود حسابك كما كان. وإن لم تفعل، يُحذف كل شيء بعد انتهائها.
    </p>
    <div>
      <button type="button" class="button button-danger" @click="open = true">حذف حسابي</button>
    </div>

    <ConfirmDialog
      :open="open"
      title="حذف الحساب؟"
      text="سيُحذف حسابك ومتجرك وكل منتجاتك وصورها نهائيًا بعد 30 يومًا، ويُخفى كتالوجك من الآن. إن سجّلت دخولك خلال هذه المدة يُلغى الحذف."
      confirm-label="تأكيد حذف الحساب"
      :confirm-phrase="email"
      phrase-label="للتأكيد، اكتب بريدك الإلكتروني:"
      @confirm="onConfirm"
      @cancel="open = false"
    />
  </section>
</template>

<style scoped>
.danger {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 22px 24px;
  border: 1px solid #f0c8c0;
  border-radius: 17px;
  background: #fffafa;
}

h2 {
  margin: 0;
  color: var(--danger);
  font-size: 15px;
  letter-spacing: -0.02em;
}

p {
  margin: 0;
  color: #6f5a56;
  font-size: 12px;
  line-height: 1.9;
}

.grace {
  padding: 10px 13px;
  border: 1px solid #f0e4b8;
  border-radius: 11px;
  background: #fff8e3;
  color: #6f6330;
}

ul {
  margin: 0 0 6px;
  padding-inline-start: 18px;
  color: #6f5a56;
  font-size: 12px;
  line-height: 2;
}

li::marker {
  color: #d9a69d;
}

@media (max-width: 600px) {
  .danger {
    padding: 18px;
  }
  .danger .button {
    width: 100%;
  }
  .danger > div {
    width: 100%;
  }
}
</style>