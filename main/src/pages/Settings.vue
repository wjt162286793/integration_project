<template>
  <section class="settings-page">
    <section class="settings-heading">
      <p class="settings-eyebrow">PREFERENCES</p>
      <h1>系统设置</h1>
      <p>调整工作区的显示偏好，设置会同步到所有子应用。</p>
    </section>

    <section class="settings-section">
      <div class="section-heading">
        <div>
          <h2>主题颜色</h2>
          <p>选择工作区和子应用统一使用的强调色</p>
        </div>
        <span class="section-icon" aria-hidden="true">◐</span>
      </div>
      <div class="theme-grid" role="group" aria-label="主题颜色">
        <button
          v-for="theme in themeOptions"
          :key="theme.key"
          class="theme-option"
          :class="{ 'theme-option-active': preferences.theme === theme.key }"
          :style="{ '--theme-color': theme.color }"
          type="button"
          :aria-pressed="preferences.theme === theme.key"
          @click="changeTheme(theme.key)"
        >
          <span class="theme-preview" :style="{ '--theme-color': theme.color }"></span>
          <span class="theme-option-name">{{ theme.label }}</span>
          <span class="theme-option-check" aria-hidden="true">{{ preferences.theme === theme.key ? '✓' : '' }}</span>
        </button>
      </div>
    </section>

    <section class="settings-section">
      <div class="section-heading">
        <div>
          <h2>界面语言</h2>
          <p>更改工作区和已接入子应用的显示语言</p>
        </div>
        <span class="section-icon section-icon-language" aria-hidden="true">文</span>
      </div>
      <div class="locale-options" role="group" aria-label="界面语言">
        <button
          v-for="locale in localeOptions"
          :key="locale.value"
          class="locale-option"
          :class="{ 'locale-option-active': preferences.locale === locale.value }"
          type="button"
          :aria-pressed="preferences.locale === locale.value"
          @click="changeLocale(locale.value)"
        >
          <span class="locale-radio" aria-hidden="true"></span>
          <span>
            <strong>{{ locale.label }}</strong>
            <small>{{ locale.detail }}</small>
          </span>
        </button>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getUiPreferences, setUiPreferences, themes } from '@/ui-preferences'
import type { UiLocale, UiTheme } from '@/ui-preferences'

const preferences = ref(getUiPreferences())
const themeOptions = (Object.entries(themes) as [UiTheme, { label: string; color: string; darkColor: string }][]).map(
  ([key, value]) => ({ key, ...value })
)
const localeOptions: { value: UiLocale; label: string; detail: string }[] = [
  { value: 'zh-CN', label: '简体中文', detail: 'Chinese (Simplified)' },
  { value: 'en-US', label: 'English', detail: 'English (United States)' },
]

const changeTheme = (theme: UiTheme) => {
  setUiPreferences({ theme })
  preferences.value = getUiPreferences()
}

const changeLocale = (locale: UiLocale) => {
  setUiPreferences({ locale })
  preferences.value = getUiPreferences()
}
</script>

<style lang="less" scoped>
.settings-page {
  width: min(100%, 1040px);
  min-height: 100%;
  margin: 0 auto;
  padding: clamp(28px, 5vw, 60px);
  overflow: auto;
}

.settings-heading {
  margin-bottom: 34px;
}

.settings-eyebrow {
  margin-bottom: 12px;
  color: var(--app-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.settings-heading h1 {
  color: #17243a;
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 700;
  letter-spacing: -0.04em;
}

.settings-heading > p:last-child {
  margin-top: 10px;
  color: #78869a;
  font-size: 14px;
  line-height: 1.7;
}

.settings-section {
  margin-bottom: 18px;
  padding: 25px;
  border: 1px solid #e5eaf2;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(27, 46, 78, 0.04);
}

.section-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 22px;
}

.section-heading h2 {
  color: #233149;
  font-size: 16px;
  font-weight: 650;
}

.section-heading p {
  margin-top: 7px;
  color: #8490a2;
  font-size: 12px;
  line-height: 1.6;
}

.section-icon {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 11px;
  background: color-mix(in srgb, var(--app-primary) 10%, white);
  color: var(--app-primary);
  font-size: 20px;
}

.section-icon-language {
  font-size: 14px;
  font-weight: 650;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.theme-option {
  display: flex;
  min-height: 68px;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid #e4e9f0;
  border-radius: 11px;
  background: #fff;
  color: #405069;
  cursor: pointer;
  text-align: left;
}

.theme-option-active {
  border-color: var(--theme-color);
  background: color-mix(in srgb, var(--theme-color) 5%, white);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--theme-color) 11%, transparent);
}

.theme-preview {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  border-radius: 50%;
  background: var(--theme-color);
  box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.28);
}

.theme-option-name {
  font-size: 13px;
  font-weight: 600;
}

.theme-option-check {
  margin-left: auto;
  color: var(--theme-color);
  font-size: 15px;
  font-weight: 700;
}

.locale-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.locale-option {
  display: flex;
  min-height: 72px;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e4e9f0;
  border-radius: 11px;
  background: #fff;
  color: #405069;
  cursor: pointer;
  text-align: left;
}

.locale-option-active {
  border-color: var(--app-primary);
  background: color-mix(in srgb, var(--app-primary) 5%, white);
}

.locale-radio {
  display: grid;
  width: 17px;
  height: 17px;
  flex: 0 0 17px;
  place-items: center;
  border: 1px solid #c8d0dc;
  border-radius: 50%;
}

.locale-option-active .locale-radio {
  border-color: var(--app-primary);
}

.locale-option-active .locale-radio::after {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--app-primary);
  content: '';
}

.locale-option strong,
.locale-option small {
  display: block;
}

.locale-option strong {
  color: #27364d;
  font-size: 13px;
  font-weight: 600;
}

.locale-option small {
  margin-top: 5px;
  color: #8994a5;
  font-size: 11px;
}

@media (max-width: 640px) {
  .settings-page {
    padding: 24px 16px;
  }

  .settings-section {
    padding: 20px 16px;
  }

  .theme-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .locale-options {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
