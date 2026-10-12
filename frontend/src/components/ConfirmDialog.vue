<script setup>
import { computed, nextTick, ref, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, required: true },
  text: { type: String, default: '' },
  confirmLabel: { type: String, default: 'تأكيد' },
  // إن وُجدت، يجب كتابتها حرفيًا لتفعيل زر التأكيد (للعمليات الخطرة)
  confirmPhrase: { type: String, default: '' },
  phraseLabel: { type: String, default: '' },
})

const emit = defineEmits(['confirm', 'cancel'])

const dialog = ref(null)
const typed = ref('')

const canConfirm = computed(
  () => !props.confirmPhrase || typed.value.trim().toLowerCase() === props.confirmPhrase.toLowerCase(),
)

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) typed.value = ''
    await nextTick()
    const el = dialog.value
    if (!el) return
    if (isOpen && !el.open) el.showModal()
    if (!isOpen && el.open) el.close()
  },
  { immediate: true },
)

function onConfirm() {
  if (canConfirm.value) emit('confirm')
}

function onBackdropClick(event) {
  if (event.target === dialog.value) emit('cancel')
}
</script>

<template>
  <dialog ref="dialog" @cancel.prevent="emit('cancel')" @click="onBackdropClick">
    <div class="box">
      <h2>{{ title }}</h2>
      <p v-if="text">{{ text }}</p>

      <div v-if="confirmPhrase" class="phrase">
        <label for="confirm-phrase">{{ phraseLabel }}</label>
        <input
          id="confirm-phrase"
          v-model="typed"
          dir="ltr"
          autocomplete="off"
          :placeholder="confirmPhrase"
          @keyup.enter="onConfirm"
        />
      </div>

      <div class="actions">
        <button type="button" class="button button-danger" :disabled="!canConfirm" @click="onConfirm">
          {{ confirmLabel }}
        </button>
        <button type="button" class="button button-outline" @click="emit('cancel')">إلغاء</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
dialog {
  width: calc(100% - 34px);
  max-width: 420px;
  padding: 0;
  border: 0;
  border-radius: 17px;
  background: #fff;
  color: var(--ink);
  font-family: inherit;
  box-shadow: 0 24px 70px rgba(11, 43, 37, 0.25);
}

dialog::backdrop {
  background: rgba(11, 43, 37, 0.45);
}

.box {
  padding: 24px;
}

h2 {
  margin: 0 0 6px;
  color: var(--forest);
  font-size: 17px;
  letter-spacing: -0.02em;
}

p {
  margin: 0;
  color: #69766c;
  font-size: 12px;
  line-height: 1.9;
}

.phrase {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 16px;
}

.phrase label {
  color: #243b30;
  font-size: 12px;
  font-weight: 600;
}

.phrase input {
  width: 100%;
  min-height: 44px;
  padding: 9px 14px;
  border: 1px solid #dfe4d6;
  border-radius: 11px;
  font-size: 13px;
  text-align: left;
}

.phrase input:focus {
  outline: none;
  border-color: #7f9561;
  box-shadow: 0 0 0 3px rgba(215, 243, 106, 0.4);
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.actions .button {
  flex: 1;
}
</style>