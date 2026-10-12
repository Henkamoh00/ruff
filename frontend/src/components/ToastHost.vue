<script setup>
import { useToast } from '@/composables/useToast'

const { toasts, dismiss } = useToast()
const icons = { success: '✓', error: '!', info: 'i' }
</script>

<template>
  <div class="toast-host" aria-live="polite">
    <TransitionGroup name="toast" tag="div" class="toast-list">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="`is-${toast.type}`"
        :role="toast.type === 'error' ? 'alert' : 'status'"
      >
        <span class="toast-icon" aria-hidden="true">{{ icons[toast.type] }}</span>
        <p>{{ toast.message }}</p>
        <button type="button" aria-label="إغلاق الإشعار" @click="dismiss(toast.id)">×</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-host {
  position: fixed;
  z-index: 100;
  top: 16px;
  left: 50%;
  width: min(440px, calc(100% - 28px));
  transform: translateX(-50%);
  pointer-events: none;
}

.toast-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 13px 15px;
  border-radius: 14px;
  box-shadow: 0 16px 44px rgba(11, 43, 37, 0.28);
  pointer-events: auto;
}

.toast p {
  flex: 1;
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.8;
}

.toast-icon {
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  margin-top: 1px;
  border-radius: 50%;
  font: 700 13px Arial, sans-serif;
}

.toast button {
  flex: 0 0 auto;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.1);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

.toast button:hover {
  background: rgba(0, 0, 0, 0.2);
}

/* أخضر ليموني ساطع */
.is-success {
  background: #c6f03a;
  color: #0b2b25;
}
.is-success .toast-icon {
  background: #0b2b25;
  color: #c6f03a;
}
.is-success button {
  color: #0b2b25;
}

/* أصفر ساطع */
.is-info {
  background: #ffd60a;
  color: #2b2200;
}
.is-info .toast-icon {
  background: #2b2200;
  color: #ffd60a;
}
.is-info button {
  color: #2b2200;
}

/* أحمر ساطع */
.is-error {
  background: #ef3b2d;
  color: #fff;
}
.is-error .toast-icon {
  background: #fff;
  color: #ef3b2d;
}
.is-error button {
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
}
.is-error button:hover {
  background: rgba(255, 255, 255, 0.35);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
.toast-leave-active {
  position: absolute;
  inset-inline: 0;
}
</style>