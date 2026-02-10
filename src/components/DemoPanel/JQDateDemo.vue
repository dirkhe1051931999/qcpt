<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <JQFormLabel label="选择日期">
          <JQDate v-model="basicDate" />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ basicDate || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>日期范围选择</h4>
        <p class="demo-hint">使用 range 属性启用日期范围选择，返回 { from, to } 对象</p>
        <JQFormLabel label="日期范围">
          <JQDate v-model="dateRange" range />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ JSON.stringify(dateRange) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义日期格式</h4>
        <p class="demo-hint">使用 mask 属性自定义日期格式</p>
        <div class="q-gutter-md">
          <JQFormLabel label="格式: YYYY/MM/DD">
            <JQDate 
              v-model="customFormatDate1" 
              mask="YYYY/MM/DD"
            />
          </JQFormLabel>
          <JQFormLabel label="格式: DD-MM-YYYY">
            <JQDate 
              v-model="customFormatDate2" 
              mask="DD-MM-YYYY"
            />
          </JQFormLabel>
        </div>
        <div class="demo-value">
          <p>YYYY/MM/DD: {{ customFormatDate1 || '(空)' }}</p>
          <p>DD-MM-YYYY: {{ customFormatDate2 || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>日期限制（只能选今天及以后）</h4>
        <p class="demo-hint">使用 options 属性限制可选日期</p>
        <JQFormLabel label="选择日期">
          <JQDate 
            v-model="restrictedDate" 
            :options="dateOptions"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ restrictedDate || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义显示格式</h4>
        <p class="demo-hint">使用 valueDisplayFn 自定义显示格式，不影响实际值</p>
        <JQFormLabel label="选择日期">
          <JQDate 
            v-model="displayFormatDate" 
            :value-display-fn="formatDate"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ displayFormatDate || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>必填项</h4>
        <JQFormLabel label="选择日期" required>
          <JQDate v-model="requiredDate" />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ requiredDate || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用状态</h4>
        <JQFormLabel label="禁用的日期选择器">
          <JQDate 
            v-model="disabledDate" 
            disable
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ disabledDate || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>只读状态</h4>
        <JQFormLabel label="只读的日期选择器">
          <JQDate 
            v-model="readonlyDate" 
            readonly
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ readonlyDate || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>不可清空</h4>
        <p class="demo-hint">设置 clearable=false 禁用清空功能</p>
        <JQFormLabel label="不可清空的日期">
          <JQDate 
            v-model="noClearDate" 
            :clearable="false"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ noClearDate || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义弹窗内容</h4>
        <p class="demo-hint">使用 popup-prepend 插槽在日期选择器弹窗顶部添加自定义内容</p>
        <JQFormLabel label="选择日期">
          <JQDate v-model="customPopupDate">
            <template #popup-prepend>
              <div style="padding: 12px; background: #f5f6fa; border-bottom: 1px solid #e6e9f4;">
                <p style="margin: 0; font-size: 13px; color: #666;">请选择一个日期</p>
              </div>
            </template>
          </JQDate>
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ customPopupDate || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>时间戳值</h4>
        <p class="demo-hint">组件支持时间戳、Date 对象、字符串等多种格式</p>
        <JQFormLabel label="时间戳日期">
          <JQDate v-model="timestampDate" />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值(时间戳): {{ timestampDate }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>表单验证</h4>
        <JQFormLabel label="选择日期" required>
          <JQDate 
            v-model="validatedDate" 
            :rules="[
              val => !!val || '请选择日期'
            ]"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ validatedDate || '(空)' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQDate, JQFormLabel } from 'qcpt';
import { date } from 'quasar';

const basicDate = ref('');
const dateRange = ref<{ from: string; to: string }>({ from: '', to: '' });
const customFormatDate1 = ref('');
const customFormatDate2 = ref('');
const restrictedDate = ref('');
const displayFormatDate = ref('');
const requiredDate = ref('');
const disabledDate = ref('2024-01-15');
const readonlyDate = ref('2024-02-20');
const noClearDate = ref('2024-03-10');
const customPopupDate = ref('');
const timestampDate = ref(Date.now());
const validatedDate = ref('');

// 日期限制：只能选今天及以后
const dateOptions = (d: string) => {
  return date.isSameOrAfter(d, date.formatDate(new Date(), 'YYYY-MM-DD'));
};

// 自定义显示格式
const formatDate = (value: any) => {
  if (!value) return '';
  const d = new Date(value);
  return date.formatDate(d, 'YYYY年MM月DD日');
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
