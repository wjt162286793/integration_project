<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h3>系统登录</h3>
      </template>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入账号"
            prefix-icon="User"
            autocomplete="off"
            style="width:360px"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            style="width:360px"
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
import { ElForm } from 'element-plus'
import {testApi,loginApi} from '@/api'

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

// 登录处理函数
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    loading.value = true
    // 表单验证
    await loginFormRef.value.validate()
    
    // 验证账号密码（实际项目中应调用后端API）
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      
    
      loginApi({
        account:loginForm.username,
        password:loginForm.password
      }).then(res=>{
        console.log(res,'====')
        if(res.code === 200){
          console.log(res,'结果')
            // 登录成功，跳转到门户页面
            router.push('/portal') 
        }
        
      })
      


      // testApi().then(res=>{
      //   router.push('/portal')
      // })


    } else {
      ElMessage.error('账号或密码错误')
    }
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
  background: #000;

  .login-card {
    width: 520px;
    background: #fff;
    border-radius: 8px;
  }
  h3{
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }

  .login-form {
    margin-top: 20px;
  }

  .login-btn {
    width: 360px;
  }
}
</style>