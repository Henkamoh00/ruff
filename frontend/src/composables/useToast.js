import { reactive } from 'vue'

// حالة مشتركة واحدة لكل التطبيق
const state = reactive({ items: [] })
let nextId = 1

const DURATION = { success: 4000, info: 5000, error: 6500 }
const MAX_VISIBLE = 4

function dismiss(id) {
  const index = state.items.findIndex((t) => t.id === id)
  if (index !== -1) state.items.splice(index, 1)
}

function push(type, message, options = {}) {
  // منع تكرار الإشعار نفسه: نستبدل القديم بالجديد
  const duplicate = state.items.find((t) => t.type === type && t.message === message)
  if (duplicate) dismiss(duplicate.id)

  const id = nextId++
  state.items.push({ id, type, message })
  if (state.items.length > MAX_VISIBLE) state.items.shift()

  const duration = options.duration ?? DURATION[type]
  if (duration > 0) setTimeout(() => dismiss(id), duration)
  return id
}

const api = {
  toasts: state.items,
  success: (message, options) => push('success', message, options),
  error: (message, options) => push('error', message, options),
  info: (message, options) => push('info', message, options),
  dismiss,
  // رسالة موحدة لعمليات الواجهة التي لم تُربط بالخلفية بعد
  notifyNotConnected: (action) =>
    push('info', `${action} غير مربوط بالخلفية بعد، ولم يُحفظ أو يُرسل أي شيء.`),
}

export function useToast() {
  return api
}