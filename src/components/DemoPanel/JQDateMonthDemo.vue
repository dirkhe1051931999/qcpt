<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <JQFormLabel label="选择月份">
          <JQDateMonth v-model="basicMonth" />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ basicMonth || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>月份范围选择</h4>
        <p class="demo-hint">使用 range 属性启用月份范围选择，返回 { from, to } 对象</p>
        <JQFormLabel label="月份范围">
          <JQDateMonth v-model="monthRange" range />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ JSON.stringify(monthRange) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义显示格式</h4>
        <p class="demo-hint">使用 valueDisplayFn 自定义显示格式，不影响实际值</p>
        <JQFormLabel label="选择月份">
          <JQDateMonth 
            v-model="customDisplayMonth" 
            :value-display-fn="formatMonth"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ customDisplayMonth || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用特定月份（禁用未来月份）</h4>
        <p class="demo-hint">使用 optionDisabledFn 禁用特定月份</p>
        <JQFormLabel label="选择月份">
          <JQDateMonth 
            v-model="restrictedMonth" 
            :option-disabled-fn="disableFutureMonths"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ restrictedMonth || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义语言环境</h4>
        <p class="demo-hint">使用 locale 属性设置语言环境，影响月份显示格式</p>
        <div class="q-gutter-md">
          <JQFormLabel label="中文">
            <JQDateMonth 
              v-model="localeMonth1" 
              locale="zh-CN"
            />
          </JQFormLabel>
          <JQFormLabel label="English">
            <JQDateMonth 
              v-model="localeMonth2" 
              locale="en-US"
            />
          </JQFormLabel>
        </div>
        <div class="demo-value">
          <p>中文: {{ localeMonth1 || '(空)' }}</p>
          <p>English: {{ localeMonth2 || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>必填项</h4>
        <JQFormLabel label="选择月份" required>
          <JQDateMonth v-model="requiredMonth" />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ requiredMonth || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用状态</h4>
        <JQFormLabel label="禁用的月份选择器">
          <JQDateMonth 
            v-model="disabledMonth" 
            disable
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ disabledMonth || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>不可清空</h4>
        <p class="demo-hint">设置 clearable=false 禁用清空功能</p>
        <JQFormLabel label="不可清空的月份">
          <JQDateMonth 
            v-model="noClearMonth" 
            :clearable="false"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ noClearMonth || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义值显示插槽</h4>
        <p class="demo-hint">使用 value-display 插槽自定义值的显示方式</p>
        <JQFormLabel label="选择月份">
          <JQDateMonth v-model="slotDisplayMonth">
            <template #value-display>
              <span v-if="slotDisplayMonth" style="color: #667eea; font-weight: 500;">
                📅 {{ formatSlotMonth(slotDisplayMonth) }}
              </span>
            </template>
          </JQDateMonth>
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ slotDisplayMonth || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>表单验证</h4>
        <JQFormLabel label="选择月份" required>
          <JQDateMonth 
            v-model="validatedMonth" 
            :rules="[
              val => !!val || '请选择月份'
            ]"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ validatedMonth || '(空)' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQDateMonth, JQFormLabel } from 'qcpt';

const basicMonth = ref('');
const monthRange = ref<{ from: string; to: string }>({ from: '', to: '' });
const customDisplayMonth = ref('');
const restrictedMonth = ref('');
const localeMonth1 = ref('');
const localeMonth2 = ref('');
const requiredMonth = ref('');
const disabledMonth = ref(Date.now());
const noClearMonth = ref(Date.now());
const slotDisplayMonth = ref('');
const validatedMonth = ref('');

// 自定义显示格式
const formatMonth = (value: any) => {
  if (!value) return '';
  const date = new Date(value);
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
};

// 禁用未来月份
const disableFutureMonths = (monthValue: number, options: { rangeStartValue?: number }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getFullYear() * 12 + currentDate.getMonth();
  return monthValue > currentMonth;
};

// 格式化插槽显示月份
const formatSlotMonth = (value: any) => {
  if (!value) return '';
  const date = new Date(value);
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
