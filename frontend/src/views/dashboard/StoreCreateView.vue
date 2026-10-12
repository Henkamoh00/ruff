<script setup>
import PageHeader from '@/components/dashboard/PageHeader.vue'
import StoreForm from '@/components/dashboard/StoreForm.vue'
</script>

<template>
  <div>
    <PageHeader
      title="إنشاء المتجر"
      subtitle="لكل حساب متجر واحد. بعد الحفظ تحصل على رابط كتالوج عام فريد، ويبقى المتجر مخفيًا حتى تنشره."
    />
    <StoreForm mode="create" />
  </div>
</template>