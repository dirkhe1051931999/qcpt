<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">最简单的标签页用法，使用 v-model 绑定当前激活的标签值。</p>
        <JCTabs v-model="basicActiveTab" :options="basicOptions">
          <div v-if="basicActiveTab === 'tab1'" class="demo-tab-content">
            <p>这是标签页 1 的内容</p>
          </div>
          <div v-if="basicActiveTab === 'tab2'" class="demo-tab-content">
            <p>这是标签页 2 的内容</p>
          </div>
          <div v-if="basicActiveTab === 'tab3'" class="demo-tab-content">
            <p>这是标签页 3 的内容</p>
          </div>
        </JCTabs>
        <div class="demo-value">
          <p><strong>当前激活的标签:</strong> {{ basicActiveTab || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>样式变体</h4>
        <p class="demo-hint">支持三种样式：default（默认）、flat（扁平）、line（线条）。</p>
        <div style="margin-bottom: 24px;">
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>default 样式:</strong></p>
          <JCTabs v-model="variantActiveTab1" :options="variantOptions" variant="default" />
        </div>
        <div style="margin-bottom: 24px;">
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>flat 样式:</strong></p>
          <JCTabs v-model="variantActiveTab2" :options="variantOptions" variant="flat" />
        </div>
        <div>
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>line 样式:</strong></p>
          <JCTabs v-model="variantActiveTab3" :options="variantOptions" variant="line" />
        </div>
        <div class="demo-value">
          <p><strong>当前激活的标签:</strong> {{ variantActiveTab1 || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用标签</h4>
        <p class="demo-hint">可以禁用整个组件（disable）或单个标签（在 options 中设置 disable: true）。</p>
        <div style="margin-bottom: 24px;">
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>禁用单个标签:</strong></p>
          <JCTabs v-model="disabledActiveTab1" :options="disabledOptions1" />
        </div>
        <div>
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>禁用整个组件:</strong></p>
          <JCTabs v-model="disabledActiveTab2" :options="disabledOptions2" :disable="true" />
        </div>
        <div class="demo-value">
          <p><strong>单个禁用当前值:</strong> {{ disabledActiveTab1 || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>整个禁用当前值:</strong> {{ disabledActiveTab2 || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>换行显示</h4>
        <p class="demo-hint">使用 wrap 属性允许标签换行，适合标签数量较多的情况。</p>
        <JCTabs v-model="wrapActiveTab" :options="wrapOptions" wrap />
        <div class="demo-value">
          <p><strong>当前激活的标签:</strong> {{ wrapActiveTab || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>提示:</strong> 当标签过多时会自动换行显示</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>等分扩展</h4>
        <p class="demo-hint">使用 expand 属性让标签等分铺满容器宽度。</p>
        <JCTabs v-model="expandActiveTab" :options="expandOptions" expand />
        <div class="demo-value">
          <p><strong>当前激活的标签:</strong> {{ expandActiveTab || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>提示:</strong> 每个标签等分容器宽度</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>标签宽度限制</h4>
        <p class="demo-hint">通过 itemMaxWidth 设置所有标签的最大宽度，或通过单个选项的 maxWidth 设置特定标签的宽度。超出时显示省略号和 tooltip。</p>
        <div style="margin-bottom: 24px;">
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>全局宽度限制 (itemMaxWidth):</strong></p>
          <JCTabs v-model="maxWidthActiveTab1" :options="maxWidthOptions1" item-max-width="120px" />
        </div>
        <div>
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>单个标签宽度限制 (maxWidth):</strong></p>
          <JCTabs v-model="maxWidthActiveTab2" :options="maxWidthOptions2" />
        </div>
        <div class="demo-value">
          <p><strong>提示:</strong> 鼠标悬停在省略的标签上可查看完整内容</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义标签内容</h4>
        <p class="demo-hint">使用 item 插槽自定义所有标签的内容，或使用 item-{value} 插槽自定义特定标签的内容。</p>
        <JCTabs v-model="slotActiveTab" :options="slotOptions">
          <template #item="{ item, active }">
            <span :style="{ color: active ? '#1976d2' : '#666', fontWeight: active ? '600' : '400' }">
              {{ item.label }}
            </span>
          </template>
          
          <template #item-tab1="{ item, active }">
            <span style="margin-right: 4px;">🏠</span>
            <span :style="{ color: active ? '#1976d2' : '#666' }">{{ item.label }}</span>
          </template>
        </JCTabs>
        <div class="demo-value">
          <p><strong>当前激活的标签:</strong> {{ slotActiveTab || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>提示:</strong> 第一个标签使用了自定义图标</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>监听值变化</h4>
        <p class="demo-hint">监听 change 事件获取标签切换，可以在控制台查看输出。</p>
        <JCTabs v-model="changeActiveTab" :options="changeOptions" @change="handleChange" />
        <div class="demo-value">
          <p><strong>当前激活的标签:</strong> {{ changeActiveTab || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>切换次数:</strong> {{ changeCount }}</p>
          <p style="margin-top: 4px; font-size: 12px; color: #999;">提示：打开浏览器控制台查看 change 事件输出</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>完整示例（设置页面）</h4>
        <p class="demo-hint">综合使用各种功能，展示一个完整的设置页面标签切换。</p>
        <JCTabs v-model="completeActiveTab" :options="completeOptions" variant="line" expand>
          <div v-if="completeActiveTab === 'general'" class="demo-tab-content">
            <h5>通用设置</h5>
            <p>这里是通用设置的内容...</p>
          </div>
          <div v-if="completeActiveTab === 'account'" class="demo-tab-content">
            <h5>账户设置</h5>
            <p>这里是账户设置的内容...</p>
          </div>
          <div v-if="completeActiveTab === 'security'" class="demo-tab-content">
            <h5>安全设置</h5>
            <p>这里是安全设置的内容...</p>
          </div>
          <div v-if="completeActiveTab === 'privacy'" class="demo-tab-content">
            <h5>隐私设置</h5>
            <p>这里是隐私设置的内容...</p>
          </div>
        </JCTabs>
        <div class="demo-value">
          <p><strong>当前激活的标签:</strong> {{ completeActiveTab || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>功能:</strong> line 样式、等分扩展、内容切换</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCTabs } from 'qcpt';
import type { TabOption } from 'qcpt';

// 基础用法
const basicActiveTab = ref<string | number | null>('tab1');
const basicOptions: TabOption[] = [
  { label: '标签1', value: 'tab1' },
  { label: '标签2', value: 'tab2' },
  { label: '标签3', value: 'tab3' }
];

// 样式变体
const variantActiveTab1 = ref<string | number | null>('tab1');
const variantActiveTab2 = ref<string | number | null>('tab1');
const variantActiveTab3 = ref<string | number | null>('tab1');
const variantOptions: TabOption[] = [
  { label: '标签1', value: 'tab1' },
  { label: '标签2', value: 'tab2' },
  { label: '标签3', value: 'tab3' }
];

// 禁用标签
const disabledActiveTab1 = ref<string | number | null>('tab1');
const disabledOptions1: TabOption[] = [
  { label: '可用标签1', value: 'tab1' },
  { label: '禁用标签', value: 'tab2', disable: true },
  { label: '可用标签2', value: 'tab3' }
];

const disabledActiveTab2 = ref<string | number | null>('tab1');
const disabledOptions2: TabOption[] = [
  { label: '标签1', value: 'tab1' },
  { label: '标签2', value: 'tab2' },
  { label: '标签3', value: 'tab3' }
];

// 换行显示
const wrapActiveTab = ref<string | number | null>('tab1');
const wrapOptions: TabOption[] = [
  { label: '标签1', value: 'tab1' },
  { label: '标签2', value: 'tab2' },
  { label: '标签3', value: 'tab3' },
  { label: '标签4', value: 'tab4' },
  { label: '标签5', value: 'tab5' },
  { label: '标签6', value: 'tab6' },
  { label: '标签7', value: 'tab7' },
  { label: '标签8', value: 'tab8' }
];

// 等分扩展
const expandActiveTab = ref<string | number | null>('tab1');
const expandOptions: TabOption[] = [
  { label: '标签1', value: 'tab1' },
  { label: '标签2', value: 'tab2' },
  { label: '标签3', value: 'tab3' }
];

// 标签宽度限制
const maxWidthActiveTab1 = ref<string | number | null>('tab1');
const maxWidthOptions1: TabOption[] = [
  { label: '很长的标签名称1', value: 'tab1' },
  { label: '很长的标签名称2', value: 'tab2' },
  { label: '很长的标签名称3', value: 'tab3' }
];

const maxWidthActiveTab2 = ref<string | number | null>('tab1');
const maxWidthOptions2: TabOption[] = [
  { label: '正常标签', value: 'tab1' },
  { label: '很长的标签名称，超出最大宽度会显示省略号', value: 'tab2', maxWidth: '100px' },
  { label: '另一个正常标签', value: 'tab3' }
];

// 自定义标签内容
const slotActiveTab = ref<string | number | null>('tab1');
const slotOptions: TabOption[] = [
  { label: '首页', value: 'tab1' },
  { label: '设置', value: 'tab2' },
  { label: '关于', value: 'tab3' }
];

// 监听值变化
const changeActiveTab = ref<string | number | null>('tab1');
const changeCount = ref(0);
const changeOptions: TabOption[] = [
  { label: '标签1', value: 'tab1' },
  { label: '标签2', value: 'tab2' },
  { label: '标签3', value: 'tab3' }
];

const handleChange = (value: string | number | null) => {
  changeCount.value++;
  console.log('change 事件触发，当前值:', value);
};

// 完整示例
const completeActiveTab = ref<string | number | null>('general');
const completeOptions: TabOption[] = [
  { label: '通用设置', value: 'general' },
  { label: '账户设置', value: 'account' },
  { label: '安全设置', value: 'security' },
  { label: '隐私设置', value: 'privacy' }
];
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}

.demo-tab-content {
  margin-top: 16px;
  padding: 16px;
  background: rgba(128, 128, 128, 0.05);
  border-radius: 4px;
  min-height: 60px;
}

.demo-tab-content h5 {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
}

.demo-tab-content p {
  margin: 0;
  font-size: 13px;
  color: var(--sl-color-text-accent);
}
</style>
