
<template>
  <div class="monaco-editor-container">
    <div class="controls">
      <div class="theme-switcher">
        <label for="theme-select">选择主题: </label>
        <select id="theme-select" v-model="currentTheme" @change="switchTheme">
          <option value="vs">浅色主题</option>
          <option value="vs-dark">深色主题</option>
          <option value="hc-black">高对比度黑色主题</option>
        </select>
      </div>
      <div class="language-switcher">
        <label for="language-select">选择语言: </label>
        <select id="language-select" v-model="currentLanguage" @change="switchLanguage">
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
      </div>
    </div>
    <div ref="editorContainer" class="editor-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as monaco from 'monaco-editor'

declare global {
  interface Window {
    monaco: typeof monaco
  }
}

const editorContainer = ref<HTMLDivElement>(null)
let editor: monaco.editor.IStandaloneCodeEditor | null = null
const currentTheme = ref<string>('vs-dark')
const currentLanguage = ref<string>('javascript')

// 每种语言的示例代码
const languageExamples = {
  javascript: '// JavaScript示例代码\nfunction greet(name) {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet("World");',
  typescript: '// TypeScript示例代码\nfunction greet(name: string): void {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet("World");',
  python: '# Python示例代码\ndef greet(name):\n    print(f"Hello, {name}!")\n\n\ngreet("World")',
  html: '<!-- HTML示例代码 -->\n<!DOCTYPE html>\n<html>\n<head>\n    <title>示例</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>',
  css: '/* CSS示例代码 */\nbody {\n    font-family: Arial, sans-serif;\n    background-color: #f0f0f0;\n}\n\nh1 {\n    color: #333;\n}'
}

onMounted(() => {
  if (editorContainer.value) {
    // 初始化编辑器
    editor = monaco.editor.create(editorContainer.value, {
      value: languageExamples[currentLanguage.value as keyof typeof languageExamples],
      language: currentLanguage.value,
      theme: currentTheme.value,
      automaticLayout: true,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      // 启用代码提示和自动补全
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnCommitCharacter: true,
      acceptSuggestionOnEnter: 'on',
      tabCompletion: 'on',
      quickSuggestions: {
        other: true,
        comments: false,
        strings: false
      }
    })

    window.monaco = monaco
  }
})

const switchTheme = () => {
  if (editor) {
    monaco.editor.setTheme(currentTheme.value)
  }
}

const switchLanguage = () => {
  if (editor) {
    // 获取当前编辑器的模型
    const model = editor.getModel()
    if (model) {
      // 设置新的语言
      monaco.editor.setModelLanguage(model, currentLanguage.value)
      // 更新示例代码
      editor.setValue(languageExamples[currentLanguage.value as keyof typeof languageExamples])
    }
  }
}

onUnmounted(() => {
  if (editor) {
    editor.dispose()
    editor = null
  }
})
</script>

<style lang="less" scoped>
.monaco-editor-container {
  width: 100%;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;

  .controls {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .theme-switcher, .language-switcher {
    padding: 8px;
    background-color: #f5f5f5;
    border-radius: 4px;
    display: flex;
    align-items: center;

    label {
      margin-right: 8px;
      font-weight: bold;
    }

    select {
      padding: 6px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: white;
      cursor: pointer;
    }
  }

  .editor-container {
    width: 100%;
    height: calc(100% - 70px);
    border: 1px solid #ddd;
    border-radius: 4px;
  }
}
</style>