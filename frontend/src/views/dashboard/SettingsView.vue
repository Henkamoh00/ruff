<script setup>
import PageHeader from '@/components/dashboard/PageHeader.vue'
import SettingsProfile from '@/components/dashboard/SettingsProfile.vue'
import SettingsPassword from '@/components/dashboard/SettingsPassword.vue'
import SettingsDanger from '@/components/dashboard/SettingsDanger.vue'
import { demoAccount } from '@/data/dashboard'
</script>

<template>
  <div class="settings">
    <PageHeader title="إعدادات الحساب" subtitle="أدِر بيانات حسابك وكلمة المرور." />
    <SettingsProfile :account="demoAccount" />
    <SettingsPassword />
    <SettingsDanger :email="demoAccount.email" />
  </div>
</template>

<style scoped>
.settings {
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.settings :deep(.page-header) {
  margin-bottom: 8px;
}
</style>