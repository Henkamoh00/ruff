<script setup>
import CatalogPage from '@/components/catalog/CatalogPage.vue'
import { demoStore, demoProducts } from '@/data/demo'

const notice = {
  label: 'معاينة توضيحية',
  text: 'اسم المتجر والصور والمنتجات والأسعار أمثلة وليست بيانات متجر حقيقي.',
}
</script>

<template>
  <CatalogPage :store="demoStore" :products="demoProducts" variant="demo" :notice="notice" />
</template>