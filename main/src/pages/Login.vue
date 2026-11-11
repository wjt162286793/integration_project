<template>
  <main class="login-page">
    <div class="login-preferences">
      <div class="login-theme-picker" role="group" aria-label="主题颜色">
        <button
          v-for="item in themeOptions"
          :key="item.key"
          class="login-theme-swatch"
          :class="{ 'login-theme-swatch-active': uiPreferences.theme === item.key }"
          :style="{ '--theme-color': item.color }"
          type="button"
          :aria-label="item.label"
          :title="item.label"
          @click="changeTheme(item.key)"
        />
      </div>
      <button class="login-locale-toggle" type="button" @click="toggleLocale">
        {{ uiPreferences.locale === 'zh-CN' ? 'EN' : '中文' }}
      </button>
    </div>
    <section class="brand-panel">
      <div class="brand-lockup">
        <div class="brand-mark">
          <img src="../assets/svg/lego.svg" alt="" />
        </div>
        <div class="brand-name">
          <strong>集成平台</strong>
          <span>INTEGRATION WORKSPACE</span>
        </div>
      </div>

      <div class="brand-content">
        <p class="eyebrow">ONE WORKSPACE, CONNECTED SYSTEMS</p>
        <h1>让复杂系统，<br />协同得更简单。</h1>
        <p class="brand-description">
          统一连接业务应用与数据能力，<br />
          在一个工作空间里，高效完成每一项工作。
        </p>

        <div class="network-visual" aria-hidden="true">
          <div class="visual-glow"></div>
          <div class="network-card">
            <div class="network-heading">
              <span class="network-indicator"></span>
              <span>CONNECTED WORKSPACE</span>
              <span class="network-count">04 APPS</span>
            </div>
            <div class="network-flow">
              <div class="network-core">
                <span class="core-mark">I</span>
                <span>主应用</span>
              </div>
              <div class="network-branches">
                <div class="network-branch">
                  <span class="branch-line"></span>
                  <span class="branch-node">交易</span>
                </div>
                <div class="network-branch">
                  <span class="branch-line"></span>
                  <span class="branch-node">数据</span>
                </div>
                <div class="network-branch">
                  <span class="branch-line"></span>
                  <span class="branch-node">AI</span>
                </div>
                <div class="network-branch">
                  <span class="branch-line"></span>
                  <span class="branch-node">运维</span>
                </div>
              </div>
            </div>
            <div class="network-footer">
              <span>统一入口</span>
              <span>稳定连接 · 即刻协作</span>
            </div>
          </div>
          <div class="floating-orbit orbit-one"></div>
          <div class="floating-orbit orbit-two"></div>
        </div>
      </div>

      <div class="brand-footer">
        <span>安全访问</span>
        <i></i>
        <span>高效协作</span>
        <i></i>
        <span>持续连接</span>
      </div>
    </section>

    <section class="login-panel">
      <div class="login-content">
        <div class="login-heading">
          <p class="login-eyebrow">WELCOME BACK</p>
          <h2>欢迎回来</h2>
          <p>登录集成平台，继续你的工作。</p>
        </div>

        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          @submit.prevent="handleLogin"
        >
          <el-form-item prop="username">
            <label class="field-label" for="login-account">账号</label>
            <el-input
              id="login-account"
              v-model="loginForm.username"
              placeholder="请输入账号"
              autocomplete="username"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <label class="field-label" for="login-password">密码</label>
            <el-input
              id="login-password"
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              autocomplete="current-password"
              show-password
              size="large"
            />
          </el-form-item>
          <el-button
            class="login-button"
            type="primary"
            native-type="submit"
            :loading="loading"
          >
            {{ loading ? '正在登录' : '登录' }}
          </el-button>
        </el-form>

        <p class="login-help">如无法登录，请联系系统管理员</p>
      </div>
      <div class="login-copyright">© 2026 集成平台 · INTEGRATION WORKSPACE</div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { loginApi } from '@/api'
import { userStore } from '@/store'
import { getUiPreferences, setUiPreferences, themes } from '@/ui-preferences'
import type { UiLocale, UiTheme } from '@/ui-preferences'

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const uiPreferences = ref(getUiPreferences())
const themeOptions = (Object.entries(themes) as [UiTheme, { label: string; color: string }][]).map(
  ([key, value]) => ({ key, ...value })
)

const changeTheme = (theme: UiTheme) => {
  setUiPreferences({ theme })
  uiPreferences.value = getUiPreferences()
}

const toggleLocale = () => {
  const locale: UiLocale = uiPreferences.value.locale === 'zh-CN' ? 'en-US' : 'zh-CN'
  setUiPreferences({ locale })
  uiPreferences.value = getUiPreferences()
}

const loginForm = reactive({
  username: '',
  password: '',
})

const loginRules: FormRules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const handleLogin = async () => {
  if (!loginFormRef.value || loading.value) return

  loading.value = true

  try {
    const valid = await loginFormRef.value.validate().catch(() => false)
    if (!valid) return

    const response = await loginApi({
      account: loginForm.username,
      password: loginForm.password,
    })

    if (response.code !== 200) {
      ElMessage.error(response.code === 7003 ? '账号或密码错误' : response.msg || '登录失败，请重试')
      return
    }

    if (!response.data?.token) {
      ElMessage.error('登录信息不完整，请联系系统管理员')
      return
    }

    userStore().setUser(response.data)
    localStorage.setItem('intergration_token', response.data.token)
    await router.push('/portal')
  } catch {
    ElMessage.error('登录暂时不可用，请检查网络后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="less" scoped>
.login-page {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(460px, 0.92fr);
  min-height: 100vh;
  background: #fbfcfe;
}

.login-preferences {
  position: absolute;
  z-index: 2;
  top: 22px;
  right: 28px;
  display: flex;
  align-items: center;
  gap: 9px;
}

.login-theme-picker {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 7px;
  border: 1px solid #e6eaf0;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.85);
}

.login-theme-swatch {
  width: 15px;
  height: 15px;
  padding: 0;
  border: 2px solid #fff;
  border-radius: 50%;
  background: var(--theme-color);
  box-shadow: 0 0 0 1px transparent;
  cursor: pointer;
}

.login-theme-swatch-active {
  box-shadow: 0 0 0 1px var(--theme-color);
}

.login-locale-toggle {
  height: 30px;
  padding: 0 10px;
  border: 1px solid #e6eaf0;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.85);
  color: #61708a;
  cursor: pointer;
  font-size: 11px;
  font-weight: 650;
}

.login-locale-toggle:hover {
  border-color: var(--app-primary);
  color: var(--app-primary);
}

.brand-panel {
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: clamp(32px, 4vw, 68px);
  color: #f8fbff;
  background:
    radial-gradient(circle at 82% 17%, rgba(65, 114, 239, 0.26), transparent 28%),
    linear-gradient(145deg, #111b2d 0%, #14233a 58%, #172944 100%);
}

.brand-panel::after {
  position: absolute;
  right: -180px;
  bottom: -260px;
  width: 560px;
  height: 560px;
  border: 1px solid rgba(164, 190, 239, 0.12);
  border-radius: 50%;
  content: '';
  pointer-events: none;
}

.brand-lockup {
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 13px;
}

.brand-mark {
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
}

.brand-mark img {
  width: 29px;
  height: 29px;
  object-fit: contain;
}

.brand-name {
  display: grid;
  gap: 4px;
}

.brand-name strong {
  font-size: 17px;
  font-weight: 650;
  letter-spacing: 0.04em;
}

.brand-name span,
.eyebrow {
  color: #9aabc4;
  font-size: 10px;
  font-weight: 650;
  letter-spacing: 0.17em;
}

.brand-content {
  z-index: 1;
  width: min(100%, 680px);
  margin: 48px auto 28px;
}

.eyebrow {
  margin-bottom: 22px;
  color: #90adf7;
}

.brand-content h1 {
  font-size: clamp(36px, 4.2vw, 62px);
  font-weight: 650;
  letter-spacing: -0.055em;
  line-height: 1.24;
}

.brand-description {
  margin-top: 19px;
  color: #aebbd0;
  font-size: 15px;
  line-height: 1.9;
}

.network-visual {
  position: relative;
  height: clamp(220px, 26vh, 290px);
  margin-top: 34px;
}

.visual-glow {
  position: absolute;
  top: 14%;
  left: 10%;
  width: 78%;
  height: 78%;
  border-radius: 50%;
  background: rgba(52, 105, 235, 0.18);
  filter: blur(54px);
}

.network-card {
  position: absolute;
  inset: 12px 4% 8px 4%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 22px 24px 18px;
  border: 1px solid rgba(197, 213, 244, 0.2);
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.045));
  box-shadow: 0 26px 70px rgba(3, 12, 30, 0.25);
  backdrop-filter: blur(16px);
}

.network-heading,
.network-footer {
  display: flex;
  align-items: center;
}

.network-heading {
  gap: 9px;
  color: #d9e4f7;
  font-size: 10px;
  font-weight: 650;
  letter-spacing: 0.1em;
}

.network-indicator {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #62d9ad;
  box-shadow: 0 0 12px rgba(98, 217, 173, 0.8);
}

.network-count {
  margin-left: auto;
  color: #91a2bd;
}

.network-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
}

.network-core {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 132px;
  padding: 13px 15px;
  border: 1px solid rgba(143, 172, 237, 0.4);
  border-radius: 13px;
  background: rgba(47, 92, 190, 0.24);
  color: #eef3ff;
  font-size: 13px;
}

.core-mark {
  display: grid;
  width: 26px;
  height: 26px;
  place-items: center;
  border-radius: 8px;
  background: #4d7ef0;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.network-branches {
  display: grid;
  gap: 9px;
}

.network-branch {
  display: flex;
  align-items: center;
  gap: 10px;
}

.branch-line {
  width: 24px;
  height: 1px;
  background: linear-gradient(90deg, #4c78df, rgba(150, 177, 237, 0.5));
}

.branch-node {
  display: grid;
  width: 47px;
  height: 27px;
  place-items: center;
  border: 1px solid rgba(187, 204, 239, 0.2);
  border-radius: 8px;
  background: rgba(14, 28, 49, 0.55);
  color: #dbe5f7;
  font-size: 11px;
}

.network-footer {
  justify-content: space-between;
  color: #91a2bd;
  font-size: 11px;
}

.floating-orbit {
  position: absolute;
  z-index: 2;
  border: 1px solid rgba(132, 164, 234, 0.16);
  border-radius: 50%;
  pointer-events: none;
}

.orbit-one {
  top: -13px;
  right: 11%;
  width: 34px;
  height: 34px;
}

.orbit-two {
  bottom: -4px;
  left: 12%;
  width: 13px;
  height: 13px;
  background: #5c83e2;
  box-shadow: 0 0 22px rgba(92, 131, 226, 0.7);
}

.brand-footer {
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #99a9c1;
  font-size: 11px;
}

.brand-footer i {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #637898;
}

.login-panel {
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  padding: 72px clamp(28px, 7vw, 112px);
  background: #fbfcfe;
}

.login-content {
  width: min(100%, 420px);
  margin: auto;
}

.login-heading {
  margin-bottom: 36px;
}

.login-eyebrow {
  margin-bottom: 14px;
  color: var(--app-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.login-heading h2 {
  color: #17243a;
  font-size: 34px;
  font-weight: 650;
  letter-spacing: -0.04em;
}

.login-heading > p:last-child {
  margin-top: 12px;
  color: #7c8799;
  font-size: 14px;
}

.login-form :deep(.el-form-item) {
  display: block;
  margin-bottom: 22px;
}

.field-label {
  display: block;
  margin-bottom: 9px;
  color: #344158;
  font-size: 13px;
  font-weight: 600;
}

.login-form :deep(.el-input__wrapper) {
  min-height: 50px;
  padding: 0 15px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 0 1px #dfe5ef inset;
  transition: box-shadow 0.2s ease;
}

.login-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #aebbd0 inset;
}

.login-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--app-primary) inset, 0 0 0 3px color-mix(in srgb, var(--app-primary) 12%, transparent);
}

.login-form :deep(.el-input__inner) {
  color: #202c40;
  font-size: 14px;
}

.login-form :deep(.el-input__inner::placeholder) {
  color: #a0a9b8;
}

.login-button {
  width: 100%;
  height: 50px;
  margin-top: 8px;
  border: 0;
  border-radius: 10px;
  background: linear-gradient(100deg, var(--app-primary), color-mix(in srgb, var(--app-primary), white 18%));
  box-shadow: 0 8px 18px rgba(56, 105, 226, 0.2);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.login-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 11px 24px color-mix(in srgb, var(--app-primary) 27%, transparent);
}

.login-help {
  margin-top: 22px;
  color: #9aa4b3;
  font-size: 12px;
  text-align: center;
}

.login-copyright {
  position: absolute;
  right: 24px;
  bottom: 24px;
  left: 24px;
  color: #a7afbc;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-align: center;
}

@media (max-width: 980px) {
  .login-page {
    grid-template-columns: minmax(0, 1fr) minmax(410px, 0.9fr);
  }

  .brand-panel {
    padding: 34px;
  }

  .brand-content h1 {
    font-size: 42px;
  }
}

@media (max-width: 760px) {
  .login-page {
    display: block;
  }

  .brand-panel {
    display: none;
  }

  .login-panel {
    min-height: 100vh;
    padding: 40px 24px 72px;
  }

  .login-preferences {
    top: 16px;
    right: 16px;
  }

  .login-heading h2 {
    font-size: 30px;
  }
}
</style>
