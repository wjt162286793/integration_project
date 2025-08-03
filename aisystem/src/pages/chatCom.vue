<template>
  <div class="mainDom">
    <div style="height: 60px" v-if="!isSubApp"></div>
    <div class="chatDom" id="chatDom">
      <div v-for="(chatItem, chatIndex) in msgList" :key="chatIndex">
        <!--用户 -->
        <div
          v-if="chatItem.type === 'user'"
          :class="['chatItem', 'chatItem_user']"
        >
          <div class="chatContent">
            {{ chatItem.content }}
          </div>
          <img src="@/assets/svg/human.svg" alt="" />
        </div>
        <!-- AI -->
        <div
          v-else-if="chatItem.type === 'ai'"
          :class="['chatItem', 'chatItem_ai']"
        >
          <img src="@/assets/svg/ai.svg" alt="" />
          <div
            class="chatContent"
            v-html="renderMdText(chatItem.content)"
          ></div>
        </div>
        <!-- 加载中 -->
      </div>
      <div v-if="loading" :class="['chatItem', 'chatItem_ai']">
        <img src="@/assets/svg/ai.svg" alt="" />
        <div
          class="chatContent"
          v-html="renderMdText(text)"
          v-if="text.length > 0"
        ></div>
        <div class="loadingText">思考中...</div>
      </div>
    </div>
    <div class="searchBox">
      <el-input type="textarea" style="width: 1000px" :rows="4" v-model="msg">
      </el-input>
      <img
        v-if="!loading"
        src="@/assets/svg/sendBtn.svg"
        alt=""
        class="sendBtn"
        @click="sendMsg"
      />
      <img src="@/assets/svg/stop.svg" v-else alt="" class="sendBtn" @click="stopSend" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, Ref } from "vue";
import MarkdownIt from "markdown-it";
import MarkdownItAbbr from "markdown-it-abbr";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItHighlightjs from "markdown-it-highlightjs";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItTasklists from "markdown-it-task-lists";
import MarkdownItTOC from "markdown-it-toc-done-right";
import "highlight.js/styles/default.css";

interface MsgItem {
  type: "user" | "ai";
  content: string;
}

const isSubApp = window.__POWERED_BY_WUJIE__

const msg: Ref<string> = ref("");
const message: Ref<string> = ref("");
const text: Ref<string> = ref("");

const markdownRender = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(MarkdownItAbbr)
  .use(MarkdownItAnchor)
  .use(MarkdownItFootnote)
  .use(MarkdownItHighlightjs)
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItTasklists)
  .use(MarkdownItTOC);

const msgList: Ref<MsgItem[]> = ref([
  {
    type: "ai",
    content: "你好啊,您可以提问我一些问题(暂时只支持纯文本哦)",
  },
]);

const loading: Ref<boolean> = ref(false);
const newAiContext: Ref<string> = ref("");
const sendMsg = () => {
  message.value = msg.value;
  msgList.value.push({
    type: "user",
    content: message.value,
  });
  msg.value = "";
  loading.value = true;
  async function postStream() {
    console.log(message.value, "传的是什么");
    const response = await fetch("http://localhost:8051/aisys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream", // 明确告知我们需要SSE
      },

      body: JSON.stringify({ message: message.value }),
    });

    if (!response.ok || !response.body) {
      loading.value = false;
      throw new Error("Network response was not ok");
    }

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    try {
      while (loading.value) {
        const { done, value } = await reader.read();
        if (done) break;

        // 处理SSE格式数据
        value.split("\n\n").forEach((chunk) => {
          if (chunk.includes("Stream-Started")) {
            //开始
            loading.value = true;
            text.value = "";
            newAiContext.value = "";
          } else if (chunk.startsWith("data: ")) {
            //填充
            try {
              const data = JSON.parse(chunk.substring(6));
              console.log("Stream data:", data);
              text.value += data.content;
              // 自动滚动到底部
              nextTick(() => {
                const chatDom = document.getElementById("chatDom");
                if (chatDom) {
                  chatDom.scrollTop = chatDom.scrollHeight;
                }
              });
            } catch (e) {
              loading.value = false;
            }
          } else if (chunk.includes("Stream-Completed")) {
            //结束
            console.log("结束的标志");
            loading.value = false;
            newAiContext.value = text.value;
            text.value = "";
            msgList.value.push({
              type: "ai",
              content: newAiContext.value,
            });
          }
        });
      }
    } finally {
      loading.value = false;
      reader.releaseLock();
    }
  }

  postStream().catch(console.error);
};

const stopSend = () => {
  loading.value = false;
  newAiContext.value = text.value;
  text.value = "";
  msgList.value.push({
    type: "ai",
    content: newAiContext.value,
  });
};
const renderMdText = (text) => {
  return markdownRender.render(text);
};
</script>
<style lang="less" scoped>
.mainDom {
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.chatDom {
  width: 1000px;
  margin: 32px auto;
  height: 700px;
  overflow: auto;
}
.searchBox {
  width: 1000px;
  margin: auto;
  border: 1px solid #c2b2f8;
  border-radius: 8px;
  position: relative;
  .sendBtn {
    position: absolute;
    right: 16px;
    top: 32px;
    cursor: pointer;
  }
  :deep(.el-textarea__inner) {
    padding-right: 56px !important;
  }
}

.chatItem {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  min-width: 50px;
  min-height: 30px;
  position: relative;
  .chatContent {
    white-space: pre-wrap; /* 保留换行符并允许自动换行 */
    overflow-wrap: break-word; /* 处理长单词 */
    word-break: break-all; /* 强制换行（可选） */

    /* 添加列表样式恢复 */
    :deep(ol),
    :deep(ul) {
      list-style-type: initial;
      padding-left: 2em;
    }

    :deep(li) {
      list-style-position: inside;
    }

    :deep(h1) {
      font-size: 24px;
      line-height: 48px;
      font-weight: 800;
    }
    :deep(h2) {
      font-size: 22px;
      line-height: 42px;
      font-weight: 700;
    }
    :deep(h3) {
      font-size: 20px;
      line-height: 36px;
      font-weight: 600;
    }
    :deep(h4) {
      width: 500px;
    }
    :deep(a) {
      color: #335fee;
      line-height: 20px;
    }
    :deep(p) {
      line-height: 20px;
    }
  }
  .loadingText {
    position: absolute;
    left: 48px;
    bottom: -32px;
    padding: 4px 8px;
    background: #eee;
  }
}
.chatItem_user {
  justify-content: flex-end;
  .chatContent {
    padding: 16px;
    border-radius: 8px;
    background: #3fb59f;
    max-width: 900px;
    line-height: 14px;
  }
}
.chatItem_ai {
  .chatContent {
    padding: 16px;
    box-shadow: 1px 1px 6px 6px #eee;
    border-radius: 8px;
    max-width: 900px;
    line-height: 14px;
  }
}
</style>
// 首先在文件开头导入nextTick
import { nextTick } from 'vue';
