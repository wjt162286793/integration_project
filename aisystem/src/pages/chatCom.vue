<template>
  <div class="mainDom">
    <div class="chatDom">
      
    </div>
    <div class="searchBox">
<el-input
  type="textarea"
  style="width:1000px;"
  :rows="4"
  v-model="msg">
</el-input>
<img src="@/assets/svg/sendBtn.svg" alt="" class="sendBtn" @click="sendMsg">
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref,Ref} from 'vue'


const msg:Ref<string> = ref('')
const es = ref(null)
const text:Ref<string> = ref('')

const sendMsg = ()=>{
  async function postStream() {
  const response = await fetch('http://localhost:3030/aisys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream'  // 明确告知我们需要SSE
    },
    body: JSON.stringify({ message: msg.value})
  });

  if (!response.ok || !response.body) {
    throw new Error('Network response was not ok');
  }

  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      // 处理SSE格式数据
      value.split('\n\n').forEach(chunk => {
        if (chunk.startsWith('data: ')) {
          try {
            const data = JSON.parse(chunk.substring(6));
            console.log('Stream data:', data);
            text.value += data.content
          } catch (e) {
          }
        }
      });
    }
  } finally {
    reader.releaseLock();
  }
}

postStream().catch(console.error);
}

</script>
<style lang="less" scoped>
.mainDom{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.chatDom{
  width: 1000px;
  margin: 48px auto;
  background: red;
  height: 700px;
  overflow: auto;
}
.searchBox{
  width: 1000px;
  margin: auto;
  border: 1px solid #c2b2f8;
  border-radius: 8px;
  position: relative;
  .sendBtn{
     position: absolute;
     right: 16px;
     top: 32px;
  }
  :deep(.el-textarea__inner) {
    padding-right: 56px !important;
  }
}
</style>
