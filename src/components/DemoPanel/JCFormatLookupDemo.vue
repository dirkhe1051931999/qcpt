<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">根据选项映射显示格式化后的值</p>
        <div class="info-row">
          <span class="label">状态:</span>
          <JCFormatLookup :value="status" :options="statusOptions" />
        </div>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ status }}</p>
          <p><strong>显示:</strong> {{ getStatusLabel(status) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义匹配键</h4>
        <p class="demo-hint">使用 matchKeys 属性指定匹配的键（默认同时匹配 value 和 label）</p>
        <div class="info-row">
          <span class="label">只匹配 value:</span>
          <JCFormatLookup :value="status" :options="statusOptions" :match-keys="['value']" />
        </div>
        <div class="info-row">
          <span class="label">只匹配 label:</span>
          <JCFormatLookup :value="'启用'" :options="statusOptions" :match-keys="['label']" />
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义默认内容</h4>
        <p class="demo-hint">使用 defaultContent 属性自定义未找到匹配项时显示的内容</p>
        <div class="info-row">
          <span class="label">未知状态:</span>
          <JCFormatLookup :value="unknownStatus" :options="statusOptions" default-content="未知状态" />
        </div>
      </div>

      <div class="demo-section">
        <h4>完全隐藏</h4>
        <p class="demo-hint">使用 rmDom 属性在未找到匹配项时完全隐藏元素</p>
        <div class="info-row">
          <span class="label">有匹配项:</span>
          <JCFormatLookup :value="status" :options="statusOptions" :rm-dom="true">
            <span style="color: #1976d2; font-weight: 500;">{{ getStatusLabel(status) }}</span>
          </JCFormatLookup>
        </div>
        <div class="info-row">
          <span class="label">无匹配项:</span>
          <JCFormatLookup :value="unknownStatus" :options="statusOptions" :rm-dom="true">
            <span style="color: #1976d2; font-weight: 500;">{{ getStatusLabel(unknownStatus) }}</span>
          </JCFormatLookup>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 无匹配项时整个元素不会渲染</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义显示内容</h4>
        <p class="demo-hint">使用插槽自定义显示内容</p>
        <div class="info-row">
          <span class="label">状态:</span>
          <JCFormatLookup :value="status" :options="statusOptions">
            <template #default="{ label }">
              <span :class="getStatusClass(status)">{{ label }}</span>
            </template>
          </JCFormatLookup>
        </div>
      </div>

      <div class="demo-section">
        <h4>实际应用场景</h4>
        <p class="demo-hint">在表格中显示状态、类型等格式化后的值</p>
        <div class="demo-card">
          <div class="info-row">
            <span class="label">订单状态:</span>
            <JCFormatLookup :value="orderStatus" :options="orderStatusOptions">
              <template #default="{ label }">
                <span :class="getOrderStatusClass(orderStatus)">{{ label }}</span>
              </template>
            </JCFormatLookup>
          </div>
          <div class="info-row">
            <span class="label">用户类型:</span>
            <JCFormatLookup :value="userType" :options="userTypeOptions" />
          </div>
          <div class="info-row">
            <span class="label">支付方式:</span>
            <JCFormatLookup :value="paymentMethod" :options="paymentMethodOptions" default-content="未知" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCFormatLookup } from 'qcpt';
import type { OptionItem } from 'qcpt';

const status = ref('active');
const unknownStatus = ref('unknown');

const statusOptions: OptionItem[] = [
  { value: 'active', label: '启用' },
  { value: 'disabled', label: '禁用' },
  { value: 'pending', label: '待审核' }
];

const getStatusLabel = (val: string) => {
  const option = statusOptions.find(item => item.value === val || item.label === val);
  return option ? option.label : '-';
};

const getStatusClass = (val: string) => {
  return val === 'active' ? 'text-positive' : val === 'disabled' ? 'text-negative' : 'text-grey';
};

const orderStatus = ref('paid');
const orderStatusOptions: OptionItem[] = [
  { value: 'pending', label: '待支付' },
  { value: 'paid', label: '已支付' },
  { value: 'shipped', label: '已发货' },
  { value: 'completed', label: '已完成' },
  { value: 'cancelled', label: '已取消' }
];

const getOrderStatusClass = (val: string) => {
  const classMap: Record<string, string> = {
    pending: 'text-warning',
    paid: 'text-info',
    shipped: 'text-primary',
    completed: 'text-positive',
    cancelled: 'text-negative'
  };
  return classMap[val] || 'text-grey';
};

const userType = ref('vip');
const userTypeOptions: OptionItem[] = [
  { value: 'normal', label: '普通用户' },
  { value: 'vip', label: 'VIP用户' },
  { value: 'svip', label: '超级VIP' }
];

const paymentMethod = ref('alipay');
const paymentMethodOptions: OptionItem[] = [
  { value: 'alipay', label: '支付宝' },
  { value: 'wechat', label: '微信支付' },
  { value: 'bank', label: '银行卡' }
];
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 特定颜色工具类
.text-positive {
  color: #4caf50;
}

.text-negative {
  color: #f44336;
}

.text-warning {
  color: #ff9800;
}

.text-info {
  color: #2196f3;
}

.text-primary {
  color: #1976d2;
}

.text-grey {
  color: #757575;
}
</style>
