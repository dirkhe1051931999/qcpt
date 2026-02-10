<template>
  <div class="theming-demo-wrapper">
    <q-tabs v-model="currentTab" dense class="text-grey" active-color="primary" indicator-color="primary" align="left">
      <q-tab name="colors" label="颜色色板" />
      <q-tab name="theme" label="主题切换" />
      <q-tab name="components" label="组件示例" />
      <q-tab name="usage" label="使用说明" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="currentTab" animated class="tab-panels">
      <!-- 颜色色板 -->
      <q-tab-panel name="colors">
        <div class="colors-section">
          <div class="color-category">
            <h4>主要颜色</h4>
            <div class="color-grid">
              <div v-for="color in mainColors" :key="color.name" class="color-item">
                <div class="color-swatch" :style="{ background: color.value }"></div>
                <div class="color-info">
                  <div class="color-name">{{ color.label }}</div>
                  <div class="color-var">--j-color-{{ color.name }}</div>
                  <div class="color-value">{{ color.value }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="color-category">
            <h4>浅色变体</h4>
            <div class="color-grid">
              <div v-for="color in lightColors" :key="color.name" class="color-item">
                <div class="color-swatch" :style="{ background: color.value }"></div>
                <div class="color-info">
                  <div class="color-name">{{ color.label }}</div>
                  <div class="color-var">--j-color-{{ color.name }}</div>
                  <div class="color-value">{{ color.value }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="color-category">
            <h4>深色与灰色变体</h4>
            <div class="color-grid">
              <div v-for="color in darkGrayColors" :key="color.name" class="color-item">
                <div class="color-swatch" :style="{ background: color.value }"></div>
                <div class="color-info">
                  <div class="color-name">{{ color.label }}</div>
                  <div class="color-var">--j-color-{{ color.name }}</div>
                  <div class="color-value">{{ color.value }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 主题切换 -->
      <q-tab-panel name="theme">
        <div class="theme-section">
          <div class="theme-controls">
            <h4>当前主题：{{ currentTheme === 'light' ? '浅色' : '深色' }}</h4>
            <j-q-button :label="currentTheme === 'light' ? '切换为深色主题' : '切换为浅色主题'" :icon="currentTheme === 'light' ? 'dark_mode' : 'light_mode'" type="primary" @click="toggleTheme" />
          </div>

          <div class="theme-preview">
            <div class="preview-card">
              <div class="card-header">
                <h3>预览卡片</h3>
              </div>
              <div class="card-body">
                <p class="preview-text">这是使用当前主题颜色的示例文本</p>
                <div class="preview-buttons">
                  <q-btn flat dense label="主要按钮" color="primary" />
                  <q-btn flat dense label="成功" color="positive" />
                  <q-btn flat dense label="警告" color="warning" />
                  <q-btn flat dense label="错误" color="negative" />
                </div>
                <div class="preview-input">
                  <q-input outlined dense label="输入框示例" hint="输入一些文字" />
                </div>
                <div class="preview-badges">
                  <q-badge color="primary" label="主色" />
                  <q-badge color="positive" label="成功" />
                  <q-badge color="warning" label="警告" />
                  <q-badge color="negative" label="错误" />
                </div>
              </div>
            </div>
          </div>

          <div class="theme-code">
            <h4>当前主题配置：</h4>
            <pre class="code-block">{{ themeConfigCode }}</pre>
          </div>
        </div>
      </q-tab-panel>

      <!-- 组件示例 -->
      <q-tab-panel name="components">
        <div class="components-section">
          <div class="component-example">
            <h4>按钮示例</h4>
            <div class="button-group">
              <j-q-button label="主要按钮" type="primary" />
              <j-q-button label="次要按钮" type="secondary" />
              <j-q-button label="文本按钮" type="text" />
            </div>
          </div>

          <div class="component-example">
            <h4>状态颜色</h4>
            <div class="status-group">
              <q-chip color="primary" text-color="white" icon="info">信息</q-chip>
              <q-chip color="positive" text-color="white" icon="check_circle">成功</q-chip>
              <q-chip color="warning" text-color="white" icon="warning">警告</q-chip>
              <q-chip color="negative" text-color="white" icon="error">错误</q-chip>
            </div>
          </div>

          <div class="component-example">
            <h4>卡片示例</h4>
            <q-card class="example-card">
              <q-card-section class="bg-primary text-white">
                <div class="text-h6">卡片标题</div>
              </q-card-section>
              <q-separator />
              <q-card-section> 这是一个使用主题颜色的卡片示例。标题使用了主色调作为背景。 </q-card-section>
            </q-card>
          </div>

          <div class="component-example">
            <h4>表单元素</h4>
            <div class="form-example">
              <q-input outlined dense label="姓名" hint="请输入姓名" style="max-width: 300px" />
              <q-select outlined dense label="城市" :options="['北京', '上海', '广州', '深圳']" style="max-width: 300px" />
              <q-toggle label="启用通知" color="primary" />
              <q-checkbox label="我同意条款" color="primary" />
            </div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 使用说明 -->
      <q-tab-panel name="usage">
        <div class="usage-section">
          <div class="usage-block">
            <h4>在 SCSS 中使用</h4>
            <pre class="code-block">
.my-component {
  color: var(--j-color-primary);
  background: var(--j-color-grey-light);
  border-color: var(--j-color-blue-light);
}

.card {
  background: var(--j-color-white);
  border: 1px solid var(--j-color-grey-light);
  color: var(--j-color-dark);
}

.card-header {
  background: var(--j-color-blue-light);
  color: var(--j-color-primary);
}</pre
            >
          </div>

          <div class="usage-block">
            <h4>在 Vue 组件中使用</h4>
            <pre class="code-block">
&lt;template&gt;
  &lt;div :style="{ 
    color: 'var(--j-color-primary)',
    background: 'var(--j-color-grey-light)'
  }"&gt;
    自定义颜色内容
  &lt;/div&gt;
&lt;/template&gt;</pre
            >
          </div>

          <div class="usage-block">
            <h4>动态修改颜色</h4>
            <pre class="code-block">
import { setCssVar } from 'quasar'

// 修改主色调（同时更新 Quasar 和 qcpt）
setCssVar('primary', '#FF5722')
document.documentElement.style.setProperty('--j-color-primary', '#FF5722')

// 修改其他颜色（只更新 QCPT CSS 变量）
document.documentElement.style.setProperty('--j-color-grey-light', '#f0f0f0')</pre
            >
          </div>

          <div class="usage-block">
            <h4>可用的 CSS 变量列表</h4>
            <div class="css-vars-list">
              <div v-for="color in allColors" :key="color.name" class="css-var-item">
                <code>--j-color-{{ color.name }}</code>
                <span class="css-var-value">{{ color.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { JQButton } from 'qcpt';
import { setCssVar } from 'quasar';

const currentTab = ref('colors');
const currentTheme = ref<'light' | 'dark'>('light');

// 颜色配置
const mainColors = [
  { name: 'primary', label: '主色调', value: '#0B5CFF' },
  { name: 'blue', label: '蓝色', value: '#0B5CFF' },
  { name: 'dark', label: '深色', value: '#323232' },
  { name: 'green', label: '绿色', value: '#2da641' },
  { name: 'red', label: '红色', value: '#E93030' },
  { name: 'negative', label: '错误色', value: '#E93030' },
  { name: 'yellow', label: '黄色/警告色', value: '#f2c037' },
  { name: 'grey', label: '灰色', value: '#969799' },
  { name: 'white', label: '白色', value: '#ffffff' },
];

const lightColors = [
  { name: 'blue-light', label: '蓝色浅色', value: '#f0f4ff' },
  { name: 'green-light', label: '绿色浅色', value: '#c0e4c6' },
  { name: 'red-light', label: '红色浅色', value: '#fff0f0' },
  { name: 'yellow-light', label: '黄色浅色', value: '#fff9e9' },
  { name: 'grey-light', label: '灰色浅色', value: '#eeeeee' },
  { name: 'grey-lighter', label: '灰色更浅', value: '#f5f6fa' },
];

const darkGrayColors = [
  { name: 'dark-strong', label: '深色加强', value: '#131523' },
  { name: 'dark-lighter', label: '深色浅色变体', value: '#f7f7f7' },
  { name: 'grey-strong', label: '灰色加强', value: '#969799' },
  { name: 'grey-medium', label: '灰色中等', value: '#aaaaaa' },
];

const allColors = computed(() => [...mainColors, ...lightColors, ...darkGrayColors]);

// 主题配置
const lightTheme = {
  primary: '#0B5CFF',
  dark: '#323232',
  'grey-light': '#eeeeee',
  'grey-lighter': '#f5f6fa',
};

const darkTheme = {
  primary: '#64B5F6',
  dark: '#1a1a1a',
  'grey-light': '#333333',
  'grey-lighter': '#2a2a2a',
};

const themeConfigCode = computed(() => {
  const theme = currentTheme.value === 'light' ? lightTheme : darkTheme;
  return JSON.stringify(theme, null, 2);
});

const applyTheme = (theme: typeof lightTheme) => {
  // 更新 Quasar 颜色
  if (theme.primary) {
    setCssVar('primary', theme.primary);
  }
  if (theme.dark) {
    setCssVar('dark', theme.dark);
  }

  // 更新所有 qcpt CSS 变量
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--j-color-${key}`, value);
  });
};

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme.value === 'light' ? lightTheme : darkTheme);
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.theming-demo-wrapper {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.tab-panels {
  background: transparent;
}

/* 颜色色板 */
.colors-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.color-category h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--sl-color-text);
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.color-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s;
}

.color-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.color-swatch {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-info {
  flex: 1;
  min-width: 0;
}

.color-name {
  font-size: 13px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.color-var {
  font-size: 11px;
  font-family: 'Courier New', monospace;
  color: #666;
  margin-bottom: 2px;
}

.color-value {
  font-size: 11px;
  font-family: 'Courier New', monospace;
  color: #999;
}

/* 主题切换 */
.theme-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.theme-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--j-color-grey-lighter, #f5f6fa);
  border-radius: 8px;
}

.theme-controls h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.theme-preview {
  padding: 24px;
  background: var(--j-color-grey-lighter, #f5f6fa);
  border-radius: 8px;
}

.preview-card {
  background: var(--j-color-white, #fff);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  background: var(--j-color-blue-light, #f0f4ff);
  color: var(--j-color-primary, #0b5cff);
  padding: 16px 20px;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.card-body {
  padding: 20px;
}

.preview-text {
  color: var(--j-color-dark, #323232);
  margin: 0 0 16px 0;
}

.preview-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.preview-input {
  margin-bottom: 16px;
}

.preview-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.theme-code h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
}

/* 组件示例 */
.components-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.component-example h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
}

.status-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.example-card {
  max-width: 400px;
}

.form-example {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
}

/* 使用说明 */
.usage-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.usage-block h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
}

.code-block {
  background: #f5f6fa;
  padding: 16px;
  border-radius: 6px;
  font-size: 13px;
  font-family: 'Courier New', monospace;
  color: #2c3e50;
  margin: 0;
  overflow-x: auto;
  line-height: 1.6;
}

.css-vars-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 8px;
}

.css-var-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f5f6fa;
  border-radius: 4px;
  font-size: 12px;
}

.css-var-item code {
  font-family: 'Courier New', monospace;
  color: #0b5cff;
  font-weight: 500;
}

.css-var-value {
  font-family: 'Courier New', monospace;
  color: #666;
}
</style>
