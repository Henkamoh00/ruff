<script setup>
import PageHeader from '@/components/dashboard/PageHeader.vue'
import StoreStatusCard from '@/components/dashboard/StoreStatusCard.vue'
import StoreForm from '@/components/dashboard/StoreForm.vue'
import { demoDashboardStore } from '@/data/dashboard'
</script>

<template>
  <div class="edit">
    <PageHeader title="بيانات المتجر" subtitle="عدّل معلومات متجرك، وانشره أو أخفِه متى شئت." />
    <StoreStatusCard :store="demoDashboardStore" />
    <StoreForm mode="edit" :initial="demoDashboardStore" />
  </div>
</template>

<style scoped>
.edit {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.edit :deep(.page-header) {
  margin-bottom: 8px;
}
</style>