<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">点击复制图标将文本复制到剪贴板</p>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>API Key: {{ apiKey }}</span>
          <JCCopy :text="apiKey" />
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 复制成功后图标会变为 ✓，2秒后恢复</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>复制数字</h4>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>订单号: {{ orderId }}</span>
          <JCCopy :text="orderId" />
        </div>
      </div>

      <div class="demo-section">
        <h4>复制对象</h4>
        <p class="demo-hint">复制对象时会自动转换为 JSON 字符串</p>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>用户信息: {{ JSON.stringify(userInfo) }}</span>
          <JCCopy :text="userInfo" />
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义恢复延迟</h4>
        <p class="demo-hint">通过 revertDelay 属性设置恢复延迟时间（毫秒）</p>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>长延迟: {{ longDelayText }}</span>
          <JCCopy :text="longDelayText" :revert-delay="5000" />
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 恢复延迟设置为 5 秒</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>实际应用场景</h4>
        <p class="demo-hint">在表格或详情页中快速复制关键信息</p>
        <div class="demo-card">
          <div class="info-row">
            <span class="label">用户ID:</span>
            <span class="value">{{ userId }}</span>
            <JCCopy :text="userId" />
          </div>
          <div class="info-row">
            <span class="label">邮箱:</span>
            <span class="value">{{ email }}</span>
            <JCCopy :text="email" />
          </div>
          <div class="info-row">
            <span class="label">Token:</span>
            <span class="value" style="font-family: monospace; font-size: 12px;">{{ token }}</span>
            <JCCopy :text="token" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCCopy } from 'qcpt';

const apiKey = ref('sk-1234567890abcdef');
const orderId = ref(123456789);
const userInfo = ref({ name: '张三', age: 25, city: '北京' });
const longDelayText = ref('这是一个长延迟示例');
const userId = ref('user_20240129_001');
const email = ref('user@example.com');
const token = ref('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ');
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
