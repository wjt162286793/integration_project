<template>
  <section class="console-page">
    <section class="console-intro">
      <p class="console-eyebrow">INTEGRATION WORKSPACE</p>
      <h1>控制台</h1>
      <p class="console-description">从这里进入已接入的业务应用，所有工作都从一个入口开始。</p>
    </section>

    <section class="app-grid" aria-label="应用列表">
      <button
        v-for="item in applications"
        :key="item.name"
        class="app-card"
        type="button"
        @click="openApplication(item)"
      >
        <span class="app-card-heading">
          <span class="app-card-icon" :class="`app-card-icon-${item.name}`">{{ item.symbol }}</span>
          <span class="app-card-arrow" aria-hidden="true">↗</span>
        </span>
        <span class="app-card-title">{{ item.cname }}</span>
        <span class="app-card-description">{{ item.description }}</span>
        <span class="app-card-action">打开应用</span>
      </button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import applications from '@/app-config'
import type { listItem } from '@/types'

const router = useRouter()

const openApplication = (item: listItem) => {
  router.push({ name: item.name })
}
</script>

<style lang="less" scoped>
.console-page {
  width: min(100%, 1480px);
  min-height: 100%;
  margin: 0 auto;
  padding: clamp(24px, 3vw, 44px);
  overflow: auto;
}

.console-intro {
  margin-bottom: 26px;
}

.console-eyebrow {
  margin-bottom: 12px;
  color: var(--app-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.console-intro h1 {
  color: #17243a;
  font-size: clamp(26px, 2.5vw, 34px);
  font-weight: 700;
  letter-spacing: -0.04em;
}

.console-description {
  margin-top: 8px;
  color: #78869a;
  font-size: 14px;
  line-height: 1.7;
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.app-card {
  display: flex;
  min-height: 190px;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px;
  border: 1px solid #e5eaf2;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 6px 18px rgba(27, 46, 78, 0.04);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
}

.app-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--app-primary) 42%, white);
  box-shadow: 0 14px 32px rgba(27, 46, 78, 0.09);
}

.app-card-heading {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.app-card-icon {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 11px;
  background: color-mix(in srgb, var(--app-primary) 11%, white);
  color: var(--app-primary);
  font-size: 14px;
  font-weight: 700;
}

.app-card-icon-bigdata {
  background: #eaf2ff;
  color: #356be8;
}

.app-card-icon-aisystem {
  background: #f0ebff;
  color: #7955d9;
}

.app-card-icon-devops {
  background: #e8f7f4;
  color: #0f9f8f;
}

.app-card-arrow {
  color: #a3adbc;
  font-size: 20px;
}

.app-card-title {
  color: #1d2b42;
  font-size: 16px;
  font-weight: 650;
}

.app-card-description {
  margin-top: 7px;
  color: #78869a;
  font-size: 12px;
  line-height: 1.6;
}

.app-card-action {
  margin-top: auto;
  padding-top: 12px;
  color: var(--app-primary);
  font-size: 12px;
  font-weight: 650;
}

@media (max-width: 1080px) {
  .app-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .console-page {
    padding: 24px 18px;
  }

  .app-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
  }

  .app-card {
    min-height: 168px;
    padding: 17px;
  }
}
</style>
