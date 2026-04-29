<template>
  <div class="login-container">
    <el-card class="login-card" shadow="never">
      <div class="login-header">
        <div class="login-title">集成平台</div>
        <div class="login-subtitle">统一认证登录</div>
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-position="top"
        class="login-form"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入账号"
            prefix-icon="User"
            autocomplete="off"
            class="login-input"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            class="login-input"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="handleLogin"
            :loading="loading"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElForm, ElMessage } from 'element-plus'
import {testApi,loginApi} from '@/api'
import {userStore} from '@/store'

const router = useRouter()
const loginFormRef = ref<InstanceType<typeof ElForm>>()
const loading = ref(false)

// 登录表单数据，默认账号密码为admin
const loginForm = reactive({
  username: 'admin',
  password: 'admin'
})

// 表单验证规则
const loginRules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

// 登录函数
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    loading.value = true
    // 表单验证
    await loginFormRef.value.validate()
    // 账号密码正确
      loginApi({
        account:loginForm.username,
        password:loginForm.password
      }).then(res=>{
        if(res.code === 200){
            // 登录成功，跳转到门户页面
            const user = userStore()
            user.setUser(res.data)
            localStorage.setItem('intergration_token',res.data.token)
            router.push('/portal') 
        }else if (res.code === 7003){
           ElMessage.error('账号或密码错误')
        }
        
      })

  } catch (error) {
    console.error('登录表单验证失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #f7f8fb 0%, #eef2ff 100%);
  padding: 24px;
  box-sizing: border-box;

  .login-card {
    width: 420px;
    border-radius: 12px;
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
    overflow: hidden;
    :deep(.el-card__body) {
      padding: 28px 28px 18px;
    }
  }

  .login-header {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 18px;
    .login-title {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: 0.2px;
      text-align: center;
    }
    .login-subtitle {
      font-size: 13px;
      color: #64748b;
      text-align: center;
    }
  }

  .login-form {
    margin-top: 8px;
  }

  .login-input {
    width: 100%;
    :deep(.el-input__wrapper) {
      border-radius: 10px;
      padding: 2px 12px;
    }
  }

  .login-btn {
    width: 100%;
    height: 40px;
    border-radius: 10px;
  }
}
</style>
