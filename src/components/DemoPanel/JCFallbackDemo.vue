<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">当值为空时显示默认的 '-'</p>
        <div class="info-row">
          <span class="label">有值:</span>
          <JCFallback :value="hasValue">
            {{ hasValue }}
          </JCFallback>
        </div>
        <div class="info-row">
          <span class="label">无值:</span>
          <JCFallback :value="noValue">
            {{ noValue }}
          </JCFallback>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 无值时显示默认的 '-'</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义默认内容</h4>
        <p class="demo-hint">使用 defaultContent 属性自定义无值时显示的内容</p>
        <div class="info-row">
          <span class="label">邮箱:</span>
          <JCFallback :value="email" default-content="暂无邮箱">
            {{ email }}
          </JCFallback>
        </div>
        <div class="info-row">
          <span class="label">电话:</span>
          <JCFallback :value="phone" default-content="暂无电话">
            {{ phone }}
          </JCFallback>
        </div>
      </div>

      <div class="demo-section">
        <h4>完全隐藏</h4>
        <p class="demo-hint">使用 rmDom 属性在无值时完全隐藏元素（不渲染 DOM）</p>
        <div class="info-row">
          <span class="label">描述:</span>
          <JCFallback :value="description" :rm-dom="true">
            <div style="color: #1976d2;">{{ description }}</div>
          </JCFallback>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 当 description 为空时，整个 div 不会渲染</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>零值处理</h4>
        <p class="demo-hint">默认情况下，0 和 '0' 被视为有效值</p>
        <div class="info-row">
          <span class="label">默认（0 有效）:</span>
          <JCFallback :value="zeroValue">
            {{ zeroValue }}
          </JCFallback>
        </div>
        <div class="info-row">
          <span class="label">0 无效:</span>
          <JCFallback :value="zeroValue" :zero-is-valid="false">
            {{ zeroValue }}
          </JCFallback>
        </div>
      </div>

      <div class="demo-section">
        <h4>布尔值 false 处理</h4>
        <p class="demo-hint">默认情况下，false 被视为有效值</p>
        <div class="info-row">
          <span class="label">默认（false 有效）:</span>
          <JCFallback :value="falseValue">
            {{ falseValue ? '启用' : '禁用' }}
          </JCFallback>
        </div>
        <div class="info-row">
          <span class="label">false 无效:</span>
          <JCFallback :value="falseValue" :false-is-valid="false">
            {{ falseValue ? '启用' : '禁用' }}
          </JCFallback>
        </div>
      </div>

      <div class="demo-section">
        <h4>实际应用场景</h4>
        <p class="demo-hint">在表格或详情页中处理空值显示</p>
        <div class="demo-card">
          <div class="info-row">
            <span class="label">用户名:</span>
            <JCFallback :value="userName">
              {{ userName }}
            </JCFallback>
          </div>
          <div class="info-row">
            <span class="label">邮箱:</span>
            <JCFallback :value="userEmail" default-content="未设置邮箱">
              {{ userEmail }}
            </JCFallback>
          </div>
          <div class="info-row">
            <span class="label">备注:</span>
            <JCFallback :value="userNote" :rm-dom="true">
              <span style="color: #666;">{{ userNote }}</span>
            </JCFallback>
          </div>
          <div class="info-row">
            <span class="label">积分:</span>
            <JCFallback :value="userPoints">
              {{ userPoints }}
            </JCFallback>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCFallback } from 'qcpt';

const hasValue = ref('有值的内容');
const noValue = ref('');
const email = ref('');
const phone = ref('');
const description = ref('');
const zeroValue = ref(0);
const falseValue = ref(false);

const userName = ref('张三');
const userEmail = ref('');
const userNote = ref('');
const userPoints = ref(0);
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
