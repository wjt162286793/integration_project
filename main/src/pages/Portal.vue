<template>
  <div class="app-shell">
    <Header
      :active-section="activeSection"
      :show-return-to-console="isSubAppPage"
      :show-sub-app-navigation="isExchangePage"
    />
    <main class="app-shell-main" :class="{ 'app-shell-main-subapp': isSubAppPage }">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'

const route = useRoute()
const subAppRoutes = new Set(['exchange', 'bigdata', 'aisystem', 'devops'])
const activeSection = computed(() => route.name === 'settings' ? 'settings' : 'console')
const isSubAppPage = computed(() => subAppRoutes.has(route.name?.toString() ?? ''))
const isExchangePage = computed(() => route.name === 'exchange')
</script>

<style lang="less" scoped>
.portal-shell {
  display: grid;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  min-height: 0;
  grid-template-columns: 248px minmax(0, 1fr);
  overflow: hidden;
  background: #f4f6fa;
  transition: grid-template-columns 0.22s ease;
}

.portal-shell-collapsed {
  grid-template-columns: 72px minmax(0, 1fr);
}

.portal-workspace {
  display: flex;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  overflow: hidden;
}

.workspace-topbar {
  display: flex;
  min-height: 82px;
  flex: 0 0 82px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 28px;
}

.workspace-heading {
  display: grid;
  gap: 5px;
}

.workspace-breadcrumb {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #9aa5b5;
  font-size: 10px;
  font-weight: 650;
  letter-spacing: 0.12em;
}

.workspace-breadcrumb i {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #b6bfcc;
}

.workspace-breadcrumb strong {
  color: #77849a;
  font-size: 10px;
  font-weight: 550;
  letter-spacing: 0;
}

.workspace-heading h1 {
  color: #1d2b42;
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.workspace-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.theme-picker {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  border: 1px solid #e6eaf0;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.72);
}

.theme-swatch {
  width: 15px;
  height: 15px;
  padding: 0;
  border: 2px solid #fff;
  border-radius: 50%;
  background: var(--theme-color);
  box-shadow: 0 0 0 1px transparent;
  cursor: pointer;
}

.theme-swatch-active {
  box-shadow: 0 0 0 1px var(--theme-color);
}

.locale-toggle {
  min-width: 38px;
  height: 30px;
  padding: 0 8px;
  border: 1px solid #e6eaf0;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
  color: #61708a;
  cursor: pointer;
  font-size: 11px;
  font-weight: 650;
}

.locale-toggle:hover {
  border-color: var(--app-primary);
  color: var(--app-primary);
}

.workspace-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 11px;
  border: 1px solid #e6eaf0;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.72);
  color: #6e7a8d;
  font-size: 11px;
}

.workspace-chip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #57bf91;
  box-shadow: 0 0 0 3px rgba(87, 191, 145, 0.12);
}

.topbar-profile {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #4e5b70;
  font-size: 12px;
  font-weight: 550;
}

.topbar-avatar {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--app-primary) 18%, white);
  border-radius: 50%;
  background: color-mix(in srgb, var(--app-primary) 9%, white);
  color: var(--app-primary);
  font-size: 12px;
  font-weight: 700;
}

.workspace-content {
  min-width: 0;
  min-height: 0;
  flex: 1;
  padding: 0 18px 18px;
  overflow: hidden;
}

.subApp-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid #e6eaf0;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 5px 22px rgba(29, 47, 79, 0.045);
}

.subApp-container :deep(.micro-app-host) {
  width: 100%;
  height: 100%;
  min-height: 0;
}

@media (max-width: 760px) {
  .portal-shell {
    grid-template-columns: 72px minmax(0, 1fr);
  }

  .workspace-topbar {
    min-height: 72px;
    flex-basis: 72px;
    padding: 0 15px;
  }

  .workspace-actions {
    gap: 6px;
  }

  .theme-picker {
    gap: 4px;
    padding: 4px;
  }

  .workspace-chip {
    display: none;
  }

  .topbar-profile > span {
    display: none;
  }

  .workspace-content {
    padding: 0 8px 8px;
  }

  .subApp-container {
    border-radius: 10px;
  }
}

@media (min-width: 761px) and (max-width: 1120px) {
  .workspace-topbar {
    gap: 12px;
    padding-right: 16px;
    padding-left: 20px;
  }

  .workspace-actions {
    gap: 8px;
  }

  .workspace-chip {
    display: none;
  }
}

.app-shell {
  display: flex;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  min-height: 0;
  flex-direction: column;
  overflow: hidden;
  background: #f4f6fa;
}

.app-shell-main {
  min-width: 0;
  min-height: 0;
  flex: 1;
  overflow: auto;
}

.app-shell-main-subapp {
  padding: 0;
  overflow: hidden;
}

.app-shell-main-subapp :deep(.micro-app-host) {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}
</style>
