<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <JQFormLabel label="选择年份">
          <JQDateYear v-model="basicYear" />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ basicYear || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义显示格式</h4>
        <p class="demo-hint">使用 valueDisplayFn 自定义显示格式，不影响实际值</p>
        <JQFormLabel label="选择年份">
          <JQDateYear 
            v-model="customDisplayYear" 
            :value-display-fn="formatYear"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ customDisplayYear || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>支持多种数据类型</h4>
        <p class="demo-hint">组件支持时间戳、Date 对象、字符串等多种格式</p>
        <div class="q-gutter-md">
          <JQFormLabel label="时间戳">
            <JQDateYear v-model="timestampYear" />
          </JQFormLabel>
          <JQFormLabel label="Date对象">
            <JQDateYear v-model="dateObjectYear" />
          </JQFormLabel>
          <JQFormLabel label="字符串">
            <JQDateYear v-model="stringYear" />
          </JQFormLabel>
        </div>
        <div class="demo-value">
          <p>时间戳: {{ timestampYear }}</p>
          <p>Date对象: {{ dateObjectYear ? dateObjectYear.toString() : '(空)' }}</p>
          <p>字符串: {{ stringYear || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>必填项</h4>
        <JQFormLabel label="选择年份" required>
          <JQDateYear v-model="requiredYear" />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ requiredYear || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用状态</h4>
        <JQFormLabel label="禁用的年份选择器">
          <JQDateYear 
            v-model="disabledYear" 
            disable
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ disabledYear || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>不可清空</h4>
        <p class="demo-hint">设置 clearable=false 禁用清空功能</p>
        <JQFormLabel label="不可清空的年份">
          <JQDateYear 
            v-model="noClearYear" 
            :clearable="false"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ noClearYear || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义值显示插槽</h4>
        <p class="demo-hint">使用 value-display 插槽自定义值的显示方式</p>
        <JQFormLabel label="选择年份">
          <JQDateYear v-model="slotDisplayYear">
            <template #value-display>
              <span v-if="slotDisplayYear" style="color: #667eea; font-weight: 500;">
                🗓️ {{ formatSlotYear(slotDisplayYear) }}
              </span>
            </template>
          </JQDateYear>
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ slotDisplayYear || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>表单验证</h4>
        <JQFormLabel label="选择年份" required>
          <JQDateYear 
            v-model="validatedYear" 
            :rules="[
              val => !!val || '请选择年份'
            ]"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ validatedYear || '(空)' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQDateYear, JQFormLabel } from 'qcpt';

const basicYear = ref('');
const customDisplayYear = ref('');
const timestampYear = ref(Date.now());
const dateObjectYear = ref<Date | null>(new Date());
const stringYear = ref('2024');
const requiredYear = ref('');
const disabledYear = ref(new Date('2024-01-01'));
const noClearYear = ref(Date.now());
const slotDisplayYear = ref('');
const validatedYear = ref('');

// 自定义显示格式
const formatYear = (value: any) => {
  if (!value) return '';
  const date = new Date(value);
  return `${date.getFullYear()}年`;
};

// 格式化插槽显示年份
const formatSlotYear = (value: any) => {
  if (!value) return '';
  const date = new Date(value);
  return `${date.getFullYear()}年`;
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
