<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: { type: String, required: true },
  intro: { type: String, default: '' },
  status: { type: String, default: '' },
  sections: { type: Array, required: true },
  // كل قسم: { id, title, paragraphs?: string[], items?: string[], link?: { to: string, label: string } }
})
</script>

<template>
  <article class="legal container">
    <header class="legal-head">
      <span class="section-kicker">وثيقة قانونية</span>
      <h1>{{ title }}</h1>
      <p v-if="intro" class="legal-intro">{{ intro }}</p>
      <p v-if="status" class="legal-status">{{ status }}</p>
    </header>

    <section v-for="(section, index) in sections" :id="section.id" :key="section.id" class="legal-section">
      <h2><span class="legal-num">{{ index + 1 }}</span>{{ section.title }}</h2>
      <p v-for="(paragraph, i) in section.paragraphs ?? []" :key="`p-${i}`">{{ paragraph }}</p>
      <ul v-if="section.items?.length">
        <li v-for="(item, i) in section.items" :key="`i-${i}`">{{ item }}</li>
      </ul>
      <RouterLink v-if="section.link" class="legal-link" :to="{ name: section.link.to }">
        {{ section.link.label }} ←
      </RouterLink>
    </section>
  </article>
</template>

<style scoped>
.legal {
  max-width: 760px;
  padding-block: 48px 72px;
}

.legal-head {
  padding-bottom: 26px;
  border-bottom: 1px solid var(--line);
}

h1 {
  margin: 12px 0 10px;
  color: var(--forest-deep);
  font-size: clamp(30px, 4vw, 40px);
  line-height: 1.4;
  letter-spacing: -0.05em;
}

.legal-intro {
  max-width: 600px;
  margin: 0;
  color: #69766c;
  font-size: 13px;
  line-height: 2;
}

.legal-status {
  display: inline-block;
  margin: 16px 0 0;
  padding: 6px 12px;
  border: 1px solid #f0e4b8;
  border-radius: 10px;
  background: #fff8e3;
  color: #7a6a2c;
  font-size: 11px;
  line-height: 1.8;
}

.legal-section {
  padding-top: 30px;
}

h2 {
  display: flex;
  align-items: center;
  gap: 11px;
  margin: 0 0 10px;
  color: #203b30;
  font-size: 17px;
  letter-spacing: -0.02em;
}

.legal-num {
  width: 28px;
  height: 28px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border: 1px solid #dce4ce;
  border-radius: 50%;
  background: var(--lime-soft);
  color: #516b36;
  font: 600 12px Arial, sans-serif;
}

.legal-section p {
  margin: 0 0 10px;
  color: #5e6c63;
  font-size: 13px;
  line-height: 2.05;
}

ul {
  margin: 0 0 10px;
  padding-inline-start: 20px;
  color: #5e6c63;
  font-size: 13px;
  line-height: 2.05;
}

li::marker {
  color: #8aa266;
}

.legal-link {
  display: inline-block;
  color: var(--forest);
  font-size: 13px;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.legal-link:hover {
  color: #698247;
}

@media (max-width: 600px) {
  .legal {
    padding-block: 30px 52px;
  }
  h2 {
    font-size: 15px;
  }
  .legal-section p,
  ul {
    font-size: 12px;
  }
}
</style>