<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">最简单的用法，展示对象详情。</p>
        <JQDetailList :items="basicItems" :data="basicData" />
        <div class="demo-value">
          <p><strong>说明:</strong> 默认使用垂直布局，标签显示在值上方</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>垂直布局（默认）</h4>
        <p class="demo-hint">标签显示在值上方，使用网格布局。</p>
        <JQDetailList :items="verticalItems" :data="verticalData" layout="vertical" />
        <div class="demo-value">
          <p><strong>说明:</strong> 标签在上，值在下，使用网格布局</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>水平两端对齐布局</h4>
        <p class="demo-hint">标签和值并排显示，使用 space-between 对齐。</p>
        <JQDetailList :items="horizontalBetweenItems" :data="horizontalBetweenData" layout="horizontal-between" />
        <div class="demo-value">
          <p><strong>说明:</strong> 标签在左，值在右，两端对齐</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>水平左对齐布局</h4>
        <p class="demo-hint">标签和值并排显示，左对齐。标签宽度可配置。</p>
        <JQDetailList 
          :items="horizontalLeftItems" 
          :data="horizontalLeftData" 
          layout="horizontal-left"
          label-width="120px"
        />
        <div class="demo-value">
          <p><strong>说明:</strong> 标签在左，值在右，左对齐，标签宽度 120px</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>多行文本省略</h4>
        <p class="demo-hint">使用 whiteSpace 属性控制文本的最大行数，超出后自动显示省略号和提示框。</p>
        <JQDetailList :items="whiteSpaceItems" :data="whiteSpaceData" />
        <div class="demo-value">
          <p><strong>说明:</strong> 描述字段设置 whiteSpace: 2，最多显示 2 行</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>选项映射</h4>
        <p class="demo-hint">使用选项数组将原始值映射为显示标签。</p>
        <JQDetailList :items="optionsItems" :data="optionsData" />
        <div class="demo-value">
          <p><strong>说明:</strong> 状态字段使用 options 映射，显示对应的标签和样式</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>日期格式化</h4>
        <p class="demo-hint">使用 date 属性格式化日期，支持默认格式和自定义格式。</p>
        <JQDetailList :items="dateItems" :data="dateData" />
        <div class="demo-value">
          <p><strong>说明:</strong> 创建时间使用默认格式，更新时间使用自定义格式</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>条件显示</h4>
        <p class="demo-hint">基于数据条件显示/隐藏字段。</p>
        <JQDetailList :items="visibleItems" :data="visibleData" />
        <div class="demo-value">
          <p><strong>说明:</strong> 支付时间仅在已支付时显示，取消时间仅在已取消时显示</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>点击处理</h4>
        <p class="demo-hint">使项目可点击，并自定义点击处理。</p>
        <JQDetailList :items="clickableItems" :data="clickableData" />
        <div class="demo-value">
          <p><strong>说明:</strong> 设备 ID 可点击，点击后会在控制台输出。打开浏览器控制台查看输出</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>复制功能</h4>
        <p class="demo-hint">使用 copy 属性在字段值旁显示复制按钮。</p>
        <JQDetailList :items="copyItems" :data="copyData" />
        <div class="demo-value">
          <p><strong>说明:</strong> 订单号和设备 ID 字段显示复制按钮，点击可复制值</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义渲染（插槽）</h4>
        <p class="demo-hint">使用 item-value-{name} 和 item-suffix-{name} 插槽自定义特定字段的渲染。</p>
        <JQDetailList :items="slotItems" :data="slotData">
          <template #item-value-status="{ value }">
            <span 
              :style="{ 
                color: value === 'active' ? '#4caf50' : '#999',
                fontWeight: '600'
              }"
            >
              {{ value === 'active' ? '✓ 启用' : '✗ 禁用' }}
            </span>
          </template>
          
          <template #item-value-price="{ value }">
            <span style="color: #1976d2; font-weight: 600; font-size: 16px;">
              ¥{{ value.toFixed(2) }}
            </span>
          </template>
        </JQDetailList>
        <div class="demo-value">
          <p><strong>说明:</strong> 状态和价格字段使用了自定义插槽渲染</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>完整示例（用户详情）</h4>
        <p class="demo-hint">综合使用各种功能，展示一个完整的用户详情页面。</p>
        <JQDetailList :items="completeItems" :data="completeData" />
        <div class="demo-value">
          <p><strong>说明:</strong> 综合使用选项映射、日期格式化、多行省略、复制等功能</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQDetailList } from 'qcpt';
import type { DetailItem } from 'qcpt';

// 基础用法
const basicItems: DetailItem[] = [
  { name: 'id', label: 'ID', span: 6, format: (v) => v },
  { name: 'name', label: '姓名', span: 6, format: (v) => v },
  { name: 'email', label: '邮箱', span: 6, format: (v) => v },
  { name: 'status', label: '状态', span: 6, format: (v) => v }
];

const basicData = ref({
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com',
  status: 'active'
});

// 垂直布局
const verticalItems: DetailItem[] = [
  { name: 'id', label: 'ID', span: 6, format: (v) => v },
  { name: 'name', label: '姓名', span: 6, format: (v) => v },
  { name: 'email', label: '邮箱', span: 12, format: (v) => v }
];

const verticalData = ref({
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com'
});

// 水平两端对齐布局
const horizontalBetweenItems: DetailItem[] = [
  { name: 'id', label: 'ID', span: 6, format: (v) => v },
  { name: 'name', label: '姓名', span: 6, format: (v) => v },
  { name: 'email', label: '邮箱', span: 12, format: (v) => v }
];

const horizontalBetweenData = ref({
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com'
});

// 水平左对齐布局
const horizontalLeftItems: DetailItem[] = [
  { name: 'id', label: 'ID', span: 6, format: (v) => v },
  { name: 'name', label: '姓名', span: 6, format: (v) => v },
  { name: 'email', label: '邮箱', span: 12, format: (v) => v }
];

const horizontalLeftData = ref({
  id: 1,
  name: '张三',
  email: 'zhangsan@example.com'
});

// 多行文本省略
const whiteSpaceItems: DetailItem[] = [
  { name: 'name', label: '姓名', span: 6, format: (v) => v },
  { 
    name: 'description', 
    label: '描述', 
    span: 12, 
    whiteSpace: 2,
    format: (v) => v
  }
];

const whiteSpaceData = ref({
  name: '张三',
  description: '这是一段很长的描述文本，超出容器宽度时会显示省略号。支持多行显示，最多显示指定的行数，超出部分会显示省略号。鼠标悬停可查看完整内容。'
});

// 选项映射
const optionsItems: DetailItem[] = [
  { name: 'name', label: '姓名', span: 6, format: (v) => v },
  {
    name: 'status',
    label: '状态',
    span: 6,
    options: [
      { value: 'active', label: '启用', class: 'text-positive' },
      { value: 'disabled', label: '禁用', class: 'text-grey' }
    ],
    findByKey: 'value',
    displayKey: 'label',
    format: (v) => v
  }
];

const optionsData = ref({
  name: '张三',
  status: 'active'
});

// 日期格式化
const dateItems: DetailItem[] = [
  { name: 'name', label: '姓名', span: 6, format: (v) => v },
  { name: 'createdAt', label: '创建时间', span: 6, date: true, format: (v) => v },
  { name: 'updatedAt', label: '更新时间', span: 6, date: 'YYYY-MM-DD', format: (v) => v }
];

const dateData = ref({
  name: '张三',
  createdAt: '2025-01-29 10:20:30',
  updatedAt: '2025-01-29 15:30:45'
});

// 条件显示
const visibleItems: DetailItem[] = [
  { name: 'orderId', label: '订单号', span: 6, format: (v) => v },
  { name: 'status', label: '状态', span: 6, format: (v) => v },
  {
    name: 'paidAt',
    label: '支付时间',
    span: 6,
    date: 'YYYY-MM-DD HH:mm:ss',
    visible: (row) => row.status === 'paid',
    format: (v) => v
  },
  {
    name: 'cancelledAt',
    label: '取消时间',
    span: 6,
    date: 'YYYY-MM-DD HH:mm:ss',
    visible: (row) => row.status === 'cancelled',
    format: (v) => v
  }
];

const visibleData = ref({
  orderId: 'ORD001',
  status: 'paid',
  paidAt: '2025-01-29 10:20:30',
  cancelledAt: null
});

// 点击处理
const clickableItems: DetailItem[] = [
  { name: 'name', label: '姓名', span: 6, format: (v) => v },
  {
    name: 'deviceId',
    label: '设备 ID',
    span: 6,
    onClick: (value) => {
      console.log('点击了设备 ID:', value);
    },
    clickable: true,
    format: (v) => v
  }
];

const clickableData = ref({
  name: '张三',
  deviceId: 'DEV-12345'
});

// 复制功能
const copyItems: DetailItem[] = [
  { name: 'name', label: '姓名', span: 6, format: (v) => v },
  { name: 'orderId', label: '订单号', span: 6, copy: true, format: (v) => v },
  { name: 'deviceId', label: '设备 ID', span: 6, copy: true, format: (v) => v }
];

const copyData = ref({
  name: '张三',
  orderId: 'ORD-12345',
  deviceId: 'DEV-67890'
});

// 自定义渲染（插槽）
const slotItems: DetailItem[] = [
  { name: 'name', label: '姓名', span: 6, format: (v) => v },
  { name: 'status', label: '状态', span: 6, format: (v) => v },
  { name: 'price', label: '价格', span: 6, format: (v) => v }
];

const slotData = ref({
  name: '张三',
  status: 'active',
  price: 99.99
});

// 完整示例
const completeItems: DetailItem[] = [
  { name: 'id', label: 'ID', span: 6, format: (v) => v },
  { name: 'name', label: '姓名', span: 6, tip: '用户在系统中的显示名称', format: (v) => v },
  {
    name: 'status',
    label: '状态',
    span: 6,
    options: [
      { value: 'active', label: '启用', class: 'text-positive' },
      { value: 'disabled', label: '禁用', class: 'text-grey' }
    ],
    findByKey: 'value',
    displayKey: 'label',
    format: (v) => v
  },
  { name: 'email', label: '邮箱', span: 6, copy: true, format: (v) => v },
  { name: 'createdAt', label: '创建时间', span: 6, date: 'YYYY-MM-DD HH:mm:ss', format: (v) => v },
  { 
    name: 'description', 
    label: '描述', 
    span: 12, 
    whiteSpace: 3,
    format: (v) => v
  }
];

const completeData = ref({
  id: 1,
  name: '张三',
  status: 'active',
  email: 'zhangsan@example.com',
  createdAt: '2025-01-29 10:20:30',
  description: '这是一段很长的描述文本，超出容器宽度时会显示省略号。支持多行显示，最多显示指定的行数，超出部分会显示省略号。鼠标悬停可查看完整内容。这是一段很长的描述文本。'
});
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
