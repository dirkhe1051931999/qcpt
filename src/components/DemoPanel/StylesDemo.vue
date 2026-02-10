<template>
  <div class="styles-demo-wrapper">
    <q-tabs
      v-model="currentTab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
    >
      <q-tab name="sizes" label="尺寸工具类" />
      <q-tab name="fonts" label="字体工具类" />
      <q-tab name="utils" label="通用工具类" />
      <q-tab name="links" label="链接样式" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="currentTab" animated class="tab-panels">
      <!-- 尺寸工具类 -->
      <q-tab-panel name="sizes">
        <div class="demo-category">
          <h4>宽度工具类 (w-*)</h4>
          <p class="category-desc">固定像素宽度，从 10px 到 200px</p>
          <div class="size-showcase">
            <div v-for="size in pixelSizes" :key="size" class="size-demo-item">
              <div class="size-box" :class="`w-${size}`">
                <span class="size-label">w-{{ size }}</span>
              </div>
              <div class="size-info">{{ size }}px</div>
            </div>
          </div>

          <p class="category-desc" style="margin-top: 24px">百分比宽度</p>
          <div class="size-showcase">
            <div v-for="size in percentSizes" :key="size.name" class="size-demo-item" style="width: 100%">
              <div class="size-box" :class="`w-${size.name}`">
                <span class="size-label">w-{{ size.name }}</span>
              </div>
              <div class="size-info">{{ size.value }}</div>
            </div>
          </div>
        </div>

        <div class="demo-category">
          <h4>高度工具类 (h-*)</h4>
          <p class="category-desc">固定像素高度</p>
          <div class="height-showcase">
            <div v-for="size in [20, 30, 40, 50, 60, 100]" :key="size" class="height-demo-item">
              <div class="height-box" :class="`h-${size}`">
                <span class="height-label">h-{{ size }}</span>
              </div>
              <div class="size-info">{{ size }}px</div>
            </div>
          </div>
        </div>

        <div class="demo-category">
          <h4>最大宽度 (max-w-*)</h4>
          <p class="category-desc">限制元素的最大宽度</p>
          <div class="max-width-showcase">
            <div class="max-w-demo">
              <div class="box-example max-w-500">
                <code>max-w-500</code>
                <p>这个容器最大宽度为 500px</p>
              </div>
            </div>
            <div class="max-w-demo">
              <div class="box-example max-w-800">
                <code>max-w-800</code>
                <p>这个容器最大宽度为 800px</p>
              </div>
            </div>
            <div class="max-w-demo">
              <div class="box-example max-w-100p">
                <code>max-w-100p</code>
                <p>这个容器最大宽度为 100%</p>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-category">
          <h4>最小高度 (min-h-*)</h4>
          <p class="category-desc">设置元素的最小高度</p>
          <div class="min-height-showcase">
            <div class="min-h-demo">
              <div class="box-example min-h-100">
                <code>min-h-100</code>
                <p>最小高度 100px</p>
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 字体工具类 -->
      <q-tab-panel name="fonts">
        <div class="demo-category">
          <h4>字体大小 (fs-*)</h4>
          <p class="category-desc">从 10px 到 80px 的字体大小</p>
          <div class="font-showcase">
            <div v-for="size in fontSizes" :key="size" class="font-demo-item">
              <div class="font-sample" :class="`fs-${size}`">
                示例文字 Aa
              </div>
              <div class="font-info">
                <code>fs-{{ size }}</code>
                <span class="font-value">{{ size }}px</span>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-category">
          <h4>常用字体大小对比</h4>
          <div class="font-comparison">
            <div class="comparison-item">
              <div class="fs-12">小号文字 (fs-12)</div>
              <code>12px - 适用于辅助信息、注释</code>
            </div>
            <div class="comparison-item">
              <div class="fs-14">正文文字 (fs-14)</div>
              <code>14px - 适用于正文内容</code>
            </div>
            <div class="comparison-item">
              <div class="fs-16">标准文字 (fs-16)</div>
              <code>16px - 适用于标准正文</code>
            </div>
            <div class="comparison-item">
              <div class="fs-20">小标题 (fs-20)</div>
              <code>20px - 适用于小标题</code>
            </div>
            <div class="comparison-item">
              <div class="fs-24">标题 (fs-24)</div>
              <code>24px - 适用于标题</code>
            </div>
            <div class="comparison-item">
              <div class="fs-32">大标题 (fs-32)</div>
              <code>32px - 适用于大标题</code>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 通用工具类 -->
      <q-tab-panel name="utils">
        <div class="demo-category">
          <h4>隐藏元素 (.hide)</h4>
          <div class="util-demo">
            <div class="demo-box">
              <p>这是可见的内容</p>
              <p class="hide">这是隐藏的内容（使用 .hide 类）</p>
              <p>这又是可见的内容</p>
            </div>
            <div class="code-example">
              <pre>&lt;p class="hide"&gt;隐藏的内容&lt;/p&gt;</pre>
            </div>
          </div>
        </div>

        <div class="demo-category">
          <h4>文本省略号 (.ellipsis)</h4>
          <div class="util-demo">
            <div class="demo-box">
              <div class="ellipsis" style="width: 300px">
                这是一段很长的文本内容，会在容器宽度不足时自动显示省略号，这是一段很长的文本内容
              </div>
            </div>
            <div class="code-example">
              <pre>&lt;div class="ellipsis"&gt;超长文本会自动显示省略号&lt;/div&gt;</pre>
            </div>
          </div>
        </div>

        <div class="demo-category">
          <h4>表格内按钮样式</h4>
          <div class="util-demo">
            <div class="demo-box">
              <div class="button-group">
                <button class="in-table-link-button">编辑</button>
                <button class="in-table-link-button">查看</button>
                <button class="in-table-delete-button">删除</button>
              </div>
            </div>
            <div class="code-example">
              <pre>&lt;button class="in-table-link-button"&gt;编辑&lt;/button&gt;
&lt;button class="in-table-delete-button"&gt;删除&lt;/button&gt;</pre>
            </div>
          </div>
        </div>

        <div class="demo-category">
          <h4>密码输入框样式</h4>
          <div class="util-demo">
            <div class="demo-box">
              <input class="input-password" type="password" value="password123" />
            </div>
            <div class="code-example">
              <pre>&lt;input class="input-password" type="password" /&gt;</pre>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 链接样式 -->
      <q-tab-panel name="links">
        <div class="demo-category">
          <h4>主要链接 (.link-type)</h4>
          <p class="category-desc">使用主题色的链接样式，带悬停效果</p>
          <div class="link-demo">
            <a href="#" class="link-type">这是一个主要链接</a>
          </div>
          <div class="code-example">
            <pre>&lt;a class="link-type"&gt;主要链接&lt;/a&gt;</pre>
          </div>
        </div>

        <div class="demo-category">
          <h4>删除链接 (.delete-type)</h4>
          <p class="category-desc">使用危险色的链接样式，用于删除操作</p>
          <div class="link-demo">
            <a href="#" class="delete-type">删除链接</a>
          </div>
          <div class="code-example">
            <pre>&lt;a class="delete-type"&gt;删除链接&lt;/a&gt;</pre>
          </div>
        </div>

        <div class="demo-category">
          <h4>链接组合示例</h4>
          <div class="link-demo">
            <div class="link-group">
              <a href="#" class="link-type">详情</a>
              <span class="separator">|</span>
              <a href="#" class="link-type">编辑</a>
              <span class="separator">|</span>
              <a href="#" class="delete-type">删除</a>
            </div>
          </div>
          <div class="code-example">
            <pre>&lt;a class="link-type"&gt;详情&lt;/a&gt;
&lt;span&gt;|&lt;/span&gt;
&lt;a class="link-type"&gt;编辑&lt;/a&gt;
&lt;span&gt;|&lt;/span&gt;
&lt;a class="delete-type"&gt;删除&lt;/a&gt;</pre>
          </div>
        </div>

        <div class="demo-category">
          <h4>实际应用场景</h4>
          <p class="category-desc">在表格、列表等场景中的应用</p>
          <div class="scenario-demo">
            <table class="demo-table">
              <thead>
                <tr>
                  <th>用户名</th>
                  <th>邮箱</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>张三</td>
                  <td>zhangsan@example.com</td>
                  <td>
                    <a href="#" class="link-type">查看</a>
                    <span class="separator">|</span>
                    <a href="#" class="link-type">编辑</a>
                    <span class="separator">|</span>
                    <a href="#" class="delete-type">删除</a>
                  </td>
                </tr>
                <tr>
                  <td>李四</td>
                  <td>lisi@example.com</td>
                  <td>
                    <button class="in-table-link-button">查看</button>
                    <button class="in-table-link-button">编辑</button>
                    <button class="in-table-delete-button">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentTab = ref('sizes');

const pixelSizes = [10, 20, 30, 40, 50, 60, 100, 150, 200];
const percentSizes = [
  { name: '25p', value: '25%' },
  { name: '33p', value: '33.33%' },
  { name: '50p', value: '50%' },
  { name: '66p', value: '66.67%' },
  { name: '75p', value: '75%' },
  { name: '100p', value: '100%' },
];

const fontSizes = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 52, 56, 64, 72, 80];
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.styles-demo-wrapper {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.tab-panels {
  background: transparent;
}

.demo-category {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
}

.demo-category:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.demo-category h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--sl-color-text);
}

.category-desc {
  margin: 0 0 16px 0;
  font-size: 13px;
  color: #666;
}

/* 尺寸展示 */
.size-showcase {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
}

.size-demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.size-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.size-label {
  font-size: 11px;
  font-weight: 600;
  color: white;
  font-family: 'Courier New', monospace;
}

.size-info {
  font-size: 12px;
  color: #666;
  font-family: 'Courier New', monospace;
}

/* 高度展示 */
.height-showcase {
  display: flex;
  gap: 16px;
  align-items: flex-end;
}

.height-demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.height-box {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 4px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.height-label {
  font-size: 11px;
  font-weight: 600;
  color: white;
  font-family: 'Courier New', monospace;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

/* 最大宽度展示 */
.max-width-showcase {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.max-w-demo {
  width: 100%;
}

.box-example {
  background: #f5f6fa;
  padding: 16px;
  border-radius: 6px;
  border: 2px dashed #ddd;
}

.box-example code {
  display: block;
  font-weight: 600;
  color: #0B5CFF;
  margin-bottom: 8px;
}

.box-example p {
  margin: 0;
  color: #666;
}

/* 最小高度展示 */
.min-height-showcase {
  display: flex;
  gap: 16px;
}

.min-h-demo {
  flex: 1;
}

/* 字体展示 */
.font-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.font-demo-item {
  background: #fff;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  transition: all 0.2s;
}

.font-demo-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.font-sample {
  color: #2c3e50;
  margin-bottom: 8px;
  font-weight: 500;
}

.font-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.font-info code {
  color: #0B5CFF;
  font-weight: 600;
}

.font-value {
  color: #999;
}

/* 字体对比 */
.font-comparison {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comparison-item {
  background: #f5f6fa;
  padding: 16px;
  border-radius: 6px;
  border-left: 4px solid #0B5CFF;
}

.comparison-item div {
  margin-bottom: 8px;
  color: #2c3e50;
}

.comparison-item code {
  font-size: 12px;
  color: #666;
}

/* 工具类演示 */
.util-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-box {
  background: #fff;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}

.code-example {
  background: #f5f6fa;
  padding: 12px;
  border-radius: 4px;
}

.code-example pre {
  margin: 0;
  font-size: 13px;
  font-family: 'Courier New', monospace;
  color: #2c3e50;
  white-space: pre-wrap;
}



/* 链接演示 */
.link-demo {
  background: #fff;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 12px;
}

.link-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.separator {
  color: #ddd;
  user-select: none;
}

/* 场景演示 */
.scenario-demo {
  background: #fff;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow-x: auto;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
}

.demo-table th,
.demo-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.demo-table th {
  background: #f5f6fa;
  font-weight: 600;
  color: #2c3e50;
}

.demo-table td {
  color: #666;
}

.demo-table tbody tr:hover {
  background: #f9f9f9;
}
</style>
