<template>
  <header class="app-topbar">
    <button class="topbar-brand" type="button" @click="goToConsole">
      <span class="brand-mark">
        <img src="../assets/svg/lego.svg" alt="" />
      </span>
      <span class="topbar-brand-copy">
        <strong>集成平台</strong>
        <small>INTEGRATION</small>
      </span>
    </button>

    <nav class="primary-navigation" aria-label="主导航">
      <button
        class="primary-navigation-item"
        :class="{ 'primary-navigation-item-active': activeSection === 'console' }"
        :aria-current="activeSection === 'console' ? 'page' : undefined"
        type="button"
        @click="goToConsole"
      >
        控制台
      </button>
      <button
        class="primary-navigation-item"
        :class="{ 'primary-navigation-item-active': activeSection === 'settings' }"
        :aria-current="activeSection === 'settings' ? 'page' : undefined"
        type="button"
        @click="goToSettings"
      >
        系统设置
      </button>
    </nav>

    <div class="topbar-spacer"></div>

    <nav
      v-if="showSubAppNavigation && subAppNavigation.items.length"
      class="subapp-navigation"
      aria-label="子应用导航"
    >
      <button
        v-for="item in subAppNavigation.items"
        :key="item.key"
        class="subapp-navigation-item"
        :class="{ 'subapp-navigation-item-active': item.key === subAppNavigation.activeKey }"
        type="button"
        @click="navigateSubApp(item)"
      >
        {{ item.name }}
      </button>
    </nav>

    <button
      v-if="showReturnToConsole"
      class="return-console-button"
      type="button"
      @click="goToConsole"
    >
      <span aria-hidden="true">←</span>
      返回控制台
    </button>

    <div class="topbar-user">
      <span class="topbar-avatar">A</span>
      <span class="topbar-user-name">管理员</span>
    </div>
    <button class="topbar-logout" type="button" @click="logout">退出登录</button>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { navigateSubApp, subAppNavigation } from '@/subapp-navigation'

defineProps<{
  activeSection: 'console' | 'settings'
  showReturnToConsole: boolean
  showSubAppNavigation: boolean
}>()

const router = useRouter()

const goToConsole = () => {
  router.push({ name: 'console' })
}

const goToSettings = () => {
  router.push({ name: 'settings' })
}

const logout = () => {
  localStorage.removeItem('intergration_token')
  router.replace('/login')
}
</script>

<style lang="less" scoped>
.app-sidebar {
  position: relative;
  display: flex;
  width: 248px;
  height: 100%;
  flex-direction: column;
  padding: 24px 14px 16px;
  background: #111b2b;
  color: #eef3fb;
  transition: width 0.22s ease, padding 0.22s ease;
}

.brand-lockup {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 2px 10px 38px;
}

.brand-mark {
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.08);
}

.brand-mark img {
  width: 29px;
  height: 29px;
  object-fit: contain;
}

.brand-copy {
  display: grid;
  gap: 4px;
}

.brand-copy strong {
  color: #f4f7fc;
  font-size: 16px;
  font-weight: 650;
  letter-spacing: 0.04em;
}

.brand-copy span {
  color: #74849c;
  font-size: 9px;
  font-weight: 650;
  letter-spacing: 0.15em;
}

.sidebar-menu-control {
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 7px 12px;
}

.workspace-label {
  padding: 0 12px 11px;
  color: #71829b;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.sidebar-toggle {
  display: grid;
  width: 26px;
  height: 26px;
  flex: 0 0 26px;
  place-items: center;
  border: 1px solid rgba(174, 192, 222, 0.14);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.045);
  color: #a4b1c4;
  cursor: pointer;
}

.sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.sidebar-toggle svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.app-sidebar-collapsed {
  width: 72px;
  align-items: center;
  padding-right: 8px;
  padding-left: 8px;
}

.app-sidebar-collapsed .brand-lockup {
  padding-right: 0;
  padding-left: 0;
}

.app-sidebar-collapsed .brand-copy,
.app-sidebar-collapsed .workspace-label,
.app-sidebar-collapsed .navigation-label,
.app-sidebar-collapsed .navigation-indicator,
.app-sidebar-collapsed .profile-copy {
  display: none;
}

.app-sidebar-collapsed .sidebar-menu-control {
  justify-content: center;
  padding: 0 0 7px;
}

.app-sidebar-collapsed .navigation-item {
  width: 52px;
  justify-content: center;
  padding: 0;
}

.app-sidebar-collapsed .sidebar-profile {
  justify-content: center;
  padding-right: 0;
  padding-left: 0;
}

.app-navigation {
  display: grid;
  gap: 6px;
}

.navigation-item {
  position: relative;
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  border: 0;
  border-radius: 11px;
  background: transparent;
  color: #a4b1c4;
  cursor: pointer;
  text-align: left;
  transition: color 0.18s ease, background 0.18s ease;
}

.navigation-item:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #f4f7fc;
}

.navigation-item-active {
  background: linear-gradient(100deg, color-mix(in srgb, var(--app-primary) 25%, transparent), color-mix(in srgb, var(--app-primary) 10%, transparent));
  color: #fff;
}

.navigation-item-active:hover {
  background: linear-gradient(100deg, color-mix(in srgb, var(--app-primary) 30%, transparent), color-mix(in srgb, var(--app-primary) 14%, transparent));
}

.navigation-symbol {
  display: grid;
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  place-items: center;
  border: 1px solid rgba(174, 192, 222, 0.14);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.045);
  color: #b9c6d8;
  font-size: 12px;
  font-weight: 650;
}

.navigation-item-active .navigation-symbol {
  border-color: color-mix(in srgb, var(--app-primary) 55%, white);
  background: var(--app-primary);
  color: #fff;
}

.navigation-label {
  overflow: hidden;
  font-size: 13px;
  font-weight: 550;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.navigation-indicator {
  width: 5px;
  height: 5px;
  margin-left: auto;
  border-radius: 50%;
  background: #8aabff;
  box-shadow: 0 0 10px rgba(138, 171, 255, 0.8);
}

.sidebar-spacer {
  flex: 1;
}

.sidebar-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 7px 3px;
  border-top: 1px solid rgba(205, 217, 236, 0.1);
}

.profile-avatar {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: linear-gradient(145deg, color-mix(in srgb, var(--app-primary) 78%, white), var(--app-primary));
  color: #fff;
  font-size: 13px;
  font-weight: 650;
}

.profile-copy {
  display: grid;
  min-width: 0;
  flex: 1;
  gap: 3px;
}

.profile-copy strong {
  overflow: hidden;
  color: #e4eaf4;
  font-size: 11px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-copy span {
  color: #7d8ba1;
  font-size: 10px;
}

.logout-button {
  display: grid;
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  place-items: center;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #91a0b5;
  cursor: pointer;
  transition: color 0.18s ease, background 0.18s ease;
}

.logout-button:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.logout-button svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
}

@media (max-width: 760px) {
  .app-sidebar {
    width: 72px;
    align-items: center;
    padding: 17px 8px 12px;
  }

  .brand-lockup {
    padding: 0 0 30px;
  }

  .brand-copy,
  .workspace-label,
  .navigation-label,
  .navigation-indicator,
  .profile-copy {
    display: none;
  }

  .navigation-item {
    width: 52px;
    justify-content: center;
    padding: 0;
  }

  .sidebar-menu-control {
    justify-content: center;
    padding-right: 0;
    padding-left: 0;
  }

  .sidebar-profile {
    width: 100%;
    justify-content: center;
    padding: 13px 0 0;
  }

  .logout-button {
    position: absolute;
    right: 20px;
    bottom: 17px;
    width: 28px;
    height: 28px;
    background: #111b2b;
    box-shadow: 0 0 0 5px #111b2b;
  }
}

.app-topbar {
  position: relative;
  z-index: 5;
  display: flex;
  min-height: 72px;
  flex: 0 0 72px;
  align-items: center;
  gap: 20px;
  padding: 0 clamp(14px, 3vw, 34px);
  background: #111b2b;
  color: #eef3fb;
  box-shadow: 0 3px 14px rgba(13, 25, 43, 0.12);
}

.topbar-brand {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 11px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  text-align: left;
}

.topbar-brand-copy {
  display: grid;
  gap: 4px;
}

.topbar-brand-copy strong {
  color: #f4f7fc;
  font-size: 15px;
  font-weight: 650;
  letter-spacing: 0.04em;
}

.topbar-brand-copy small {
  color: #8797ae;
  font-size: 9px;
  font-weight: 650;
  letter-spacing: 0.14em;
}

.primary-navigation {
  display: flex;
  height: 100%;
  align-items: stretch;
  gap: 4px;
  margin-left: 22px;
}

.primary-navigation-item {
  position: relative;
  min-width: 88px;
  padding: 0 14px;
  border: 0;
  background: transparent;
  color: #afbdd0;
  cursor: pointer;
  font-size: 13px;
  font-weight: 550;
  transition: color 0.18s ease, background 0.18s ease;
}

.primary-navigation-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}

.primary-navigation-item-active {
  color: #fff;
  font-weight: 650;
}

.primary-navigation-item-active::after {
  position: absolute;
  right: 14px;
  bottom: 0;
  left: 14px;
  height: 2px;
  border-radius: 2px 2px 0 0;
  background: var(--app-primary);
  content: '';
}

.topbar-spacer {
  flex: 1;
  min-width: 10px;
}

.subapp-navigation {
  display: flex;
  height: 100%;
  flex: 0 1 auto;
  align-items: stretch;
  gap: 3px;
  min-width: 0;
  margin-right: 4px;
}

.subapp-navigation-item {
  position: relative;
  min-width: 74px;
  padding: 0 12px;
  border: 0;
  background: transparent;
  color: #afbdd0;
  cursor: pointer;
  font-size: 12px;
  font-weight: 550;
  white-space: nowrap;
  transition: background 0.18s ease, color 0.18s ease;
}

.subapp-navigation-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}

.subapp-navigation-item-active {
  color: #fff;
  font-weight: 650;
}

.subapp-navigation-item-active::after {
  position: absolute;
  right: 12px;
  bottom: 0;
  left: 12px;
  height: 2px;
  border-radius: 2px 2px 0 0;
  background: var(--app-primary);
  content: '';
}

.return-console-button {
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  gap: 8px;
  padding: 0 13px;
  border: 1px solid rgba(206, 219, 240, 0.22);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.07);
  color: #f4f7fc;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.return-console-button:hover {
  border-color: var(--app-primary);
  background: color-mix(in srgb, var(--app-primary) 22%, #111b2b);
}

.return-console-button span {
  font-size: 17px;
  line-height: 1;
}

.topbar-user {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e4eaf4;
  font-size: 12px;
  white-space: nowrap;
}

.topbar-avatar {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--app-primary) 58%, white);
  border-radius: 50%;
  background: var(--app-primary);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.topbar-logout {
  padding: 7px 0 7px 6px;
  border: 0;
  background: transparent;
  color: #afbdd0;
  cursor: pointer;
  font-size: 11px;
  white-space: nowrap;
}

.topbar-logout:hover {
  color: #fff;
}

@media (max-width: 760px) {
  .app-topbar {
    min-height: 64px;
    flex-basis: 64px;
    gap: 8px;
    padding-right: 10px;
    padding-left: 12px;
  }

  .brand-mark {
    width: 36px;
    height: 36px;
    flex-basis: 36px;
  }

  .brand-mark img {
    width: 25px;
    height: 25px;
  }

  .topbar-brand-copy {
    display: none;
  }

  .primary-navigation {
    gap: 0;
    margin-left: 2px;
  }

  .primary-navigation-item {
    min-width: 68px;
    padding: 0 8px;
    font-size: 12px;
  }

  .primary-navigation-item-active::after {
    right: 8px;
    left: 8px;
  }

  .return-console-button {
    min-height: 32px;
    gap: 4px;
    padding: 0 8px;
    font-size: 11px;
  }

  .subapp-navigation {
    gap: 0;
    margin-right: 0;
  }

  .subapp-navigation-item {
    min-width: 56px;
    padding: 0 7px;
    font-size: 11px;
  }

  .subapp-navigation-item-active::after {
    right: 7px;
    left: 7px;
  }

  .topbar-user-name {
    display: none;
  }

  .topbar-logout {
    font-size: 10px;
  }
}
</style>
