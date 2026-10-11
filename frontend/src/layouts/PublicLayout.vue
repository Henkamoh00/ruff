<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import PublicHeader from '@/components/PublicHeader.vue'
import PublicFooter from '@/components/PublicFooter.vue'

const route = useRoute()
</script>

<template>
  <div class="public-layout">
    <div v-if="route.meta.announcement" class="announcement">
      <span class="announcement-dot" aria-hidden="true"></span>
      <span>رَف قيد التجربة — نبحث عن أوّل المحلات المشاركة</span>
      <RouterLink :to="{ name: 'register' }">
        كن من الأوائل <span aria-hidden="true">←</span>
      </RouterLink>
    </div>

    <PublicHeader />

    <main class="public-main">
      <RouterView />
    </main>

    <PublicFooter />
  </div>
</template>

<style scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.public-main {
  flex: 1;
}

.announcement {
  min-height: 38px;
  padding: 7px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--forest-deep);
  color: #edf3e3;
  font-size: 11px;
  letter-spacing: 0.01em;
}

.announcement-dot {
  width: 6px;
  height: 6px;
  background: var(--lime);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(215, 243, 106, 0.13);
}

.announcement a {
  color: var(--lime);
  font-weight: 700;
  margin-inline-start: 7px;
  white-space: nowrap;
}

.announcement a span {
  display: inline-block;
  margin-inline-start: 3px;
}

@media (max-width: 600px) {
  .announcement {
    gap: 7px;
    padding-inline: 10px;
    font-size: 9px;
  }
  .announcement a {
    margin-inline-start: 2px;
  }
}
</style>