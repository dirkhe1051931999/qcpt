<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">最简单的树形组件用法，支持多选。</p>
        <JCTree
          v-model="basicSelectedValues"
          :options="basicTreeData"
          option-label="label"
          option-value="value"
        />
        <div class="demo-value">
          <p><strong>当前选中的值:</strong> {{ JSON.stringify(basicSelectedValues) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>单选模式</h4>
        <p class="demo-hint">设置 multiple=false 启用单选模式，配合 tick-strategy="strict" 确保只能选择一个节点。</p>
        <JCTree
          v-model="singleSelectedValue"
          :options="singleTreeData"
          :multiple="false"
          tick-strategy="strict"
        />
        <div class="demo-value">
          <p><strong>当前选中的值:</strong> {{ JSON.stringify(singleSelectedValue) }}</p>
          <p style="margin-top: 4px;"><strong>说明:</strong> 单选模式下，只能选择一个节点</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>多选模式</h4>
        <p class="demo-hint">设置 multiple=true 启用多选模式，可以选择多个节点。</p>
        <JCTree
          v-model="multipleSelectedValues"
          :options="multipleTreeData"
          :multiple="true"
        />
        <div class="demo-value">
          <p><strong>当前选中的值:</strong> {{ JSON.stringify(multipleSelectedValues) }}</p>
          <p style="margin-top: 4px;"><strong>说明:</strong> 多选模式下，可以选择多个节点</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>仅叶子节点可选</h4>
        <p class="demo-hint">使用 leafOnly 属性限制只能选择叶子节点（没有子节点的节点）。</p>
        <JCTree
          v-model="leafOnlySelectedValues"
          :options="leafOnlyTreeData"
          :multiple="true"
          leaf-only
        />
        <div class="demo-value">
          <p><strong>当前选中的值:</strong> {{ JSON.stringify(leafOnlySelectedValues) }}</p>
          <p style="margin-top: 4px;"><strong>说明:</strong> 只能选择叶子节点，父节点不可选</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>选择策略</h4>
        <p class="demo-hint">通过 tickStrategy 属性设置选择策略：strict（严格模式）、leaf（叶子节点模式）、leaf-filtered（过滤的叶子节点模式）。</p>
        <div style="margin-bottom: 16px;">
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>strict 模式（默认）:</strong></p>
          <JCTree
            v-model="strictSelectedValues"
            :options="strategyTreeData"
            :multiple="true"
            tick-strategy="strict"
          />
          <div class="demo-value" style="margin-top: 12px;">
            <p><strong>选中的值:</strong> {{ JSON.stringify(strictSelectedValues) }}</p>
            <p style="margin-top: 4px; font-size: 12px; color: #999;">说明：选择节点时不影响子节点或父节点</p>
          </div>
        </div>
        <div>
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>leaf 模式:</strong></p>
          <JCTree
            v-model="leafSelectedValues"
            :options="strategyTreeData"
            :multiple="true"
            tick-strategy="leaf"
          />
          <div class="demo-value" style="margin-top: 12px;">
            <p><strong>选中的值:</strong> {{ JSON.stringify(leafSelectedValues) }}</p>
            <p style="margin-top: 4px; font-size: 12px; color: #999;">说明：选择节点时自动选择所有子节点</p>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义字段名</h4>
        <p class="demo-hint">通过 optionLabel 和 optionValue 自定义字段名。</p>
        <JCTree
          v-model="customFieldSelectedValues"
          :options="customFieldTreeData"
          option-label="name"
          option-value="id"
        />
        <div class="demo-value">
          <p><strong>当前选中的值:</strong> {{ JSON.stringify(customFieldSelectedValues) }}</p>
          <p style="margin-top: 4px;"><strong>说明:</strong> 使用 name 作为标签，id 作为值</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>完整示例（部门树）</h4>
        <p class="demo-hint">实际应用场景：部门树选择，展示完整的树形结构。</p>
        <JCTree
          v-model="departmentSelectedValues"
          :options="departmentTreeData"
          :multiple="true"
        />
        <div class="demo-value">
          <p><strong>当前选中的部门:</strong> {{ JSON.stringify(departmentSelectedValues) }}</p>
          <p style="margin-top: 4px;"><strong>说明:</strong> 可以选择多个部门</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCTree } from 'qcpt';

// 基础用法
const basicSelectedValues = ref<(string | number)[]>([]);
const basicTreeData = ref([
  {
    label: '节点1',
    value: 1,
    children: [
      { label: '子节点1', value: 2 },
      { label: '子节点2', value: 3 }
    ]
  },
  {
    label: '节点2',
    value: 4,
    children: [
      { label: '子节点3', value: 5 }
    ]
  }
]);

// 单选模式
const singleSelectedValue = ref<(string | number)[]>([]);
const singleTreeData = ref([
  {
    label: '节点1',
    value: 1,
    children: [
      { label: '子节点1', value: 2 },
      { label: '子节点2', value: 3 }
    ]
  },
  {
    label: '节点2',
    value: 4
  }
]);

// 多选模式
const multipleSelectedValues = ref<(string | number)[]>([]);
const multipleTreeData = ref([
  {
    label: '节点1',
    value: 1,
    children: [
      { label: '子节点1', value: 2 },
      { label: '子节点2', value: 3 }
    ]
  },
  {
    label: '节点2',
    value: 4,
    children: [
      { label: '子节点3', value: 5 },
      { label: '子节点4', value: 6 }
    ]
  }
]);

// 仅叶子节点可选
const leafOnlySelectedValues = ref<(string | number)[]>([]);
const leafOnlyTreeData = ref([
  {
    label: '节点1',
    value: 1,
    children: [
      { label: '子节点1', value: 2 },
      { label: '子节点2', value: 3 }
    ]
  },
  {
    label: '节点2',
    value: 4,
    children: [
      { label: '子节点3', value: 5 }
    ]
  }
]);

// 选择策略
const strictSelectedValues = ref<(string | number)[]>([]);
const leafSelectedValues = ref<(string | number)[]>([]);
const strategyTreeData = ref([
  {
    label: '节点1',
    value: 1,
    children: [
      { label: '子节点1', value: 2 },
      { label: '子节点2', value: 3 }
    ]
  },
  {
    label: '节点2',
    value: 4
  }
]);

// 自定义字段名
const customFieldSelectedValues = ref<(string | number)[]>([]);
const customFieldTreeData = ref([
  {
    name: '节点1',
    id: 1,
    children: [
      { name: '子节点1', id: 2 },
      { name: '子节点2', id: 3 }
    ]
  },
  {
    name: '节点2',
    id: 4
  }
]);

// 完整示例（部门树）
const departmentSelectedValues = ref<(string | number)[]>([]);
const departmentTreeData = ref([
  {
    label: '技术部',
    value: 'tech',
    children: [
      {
        label: '前端组',
        value: 'frontend',
        children: [
          { label: 'Vue 小组', value: 'vue-team' },
          { label: 'React 小组', value: 'react-team' }
        ]
      },
      {
        label: '后端组',
        value: 'backend',
        children: [
          { label: 'Java 小组', value: 'java-team' },
          { label: 'Node.js 小组', value: 'nodejs-team' }
        ]
      }
    ]
  },
  {
    label: '产品部',
    value: 'product',
    children: [
      {
        label: '产品设计组',
        value: 'design',
        children: [
          { label: 'UI 设计', value: 'ui-design' },
          { label: 'UX 设计', value: 'ux-design' }
        ]
      }
    ]
  },
  {
    label: '运营部',
    value: 'operation'
  }
]);
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
