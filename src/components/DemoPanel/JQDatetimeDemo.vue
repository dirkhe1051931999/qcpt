<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <JQFormLabel label="选择日期时间">
          <JQDatetime v-model="basicDatetime" />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ basicDatetime || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>日期时间范围选择</h4>
        <p class="demo-hint">使用 range 属性启用日期时间范围选择，返回 { from, to } 对象。范围选择模式下，开始时间默认为 00:00:00，结束时间默认为 00:00:00（可通过 endhhmmss 自定义）</p>
        <JQFormLabel label="选择日期时间范围">
          <JQDatetime 
            v-model="datetimeRange" 
            range
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ JSON.stringify(datetimeRange) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义默认结束时间</h4>
        <p class="demo-hint">使用 endhhmmss 属性设置范围选择时结束时间的默认值（格式：['HH', 'mm', 'ss']）</p>
        <JQFormLabel label="选择日期时间范围（结束时间默认23:59:59）">
          <JQDatetime 
            v-model="customEndTimeRange" 
            range
            :endhhmmss="['23', '59', '59']"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ JSON.stringify(customEndTimeRange) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>日期限制（只能选今天及以后）</h4>
        <p class="demo-hint">使用 options 属性限制可选日期</p>
        <JQFormLabel label="选择日期时间">
          <JQDatetime 
            v-model="restrictedDatetime" 
            :options="dateOptions"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ restrictedDatetime || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义显示格式</h4>
        <p class="demo-hint">使用 valueDisplayFn 自定义显示格式，不影响实际值</p>
        <JQFormLabel label="选择日期时间">
          <JQDatetime 
            v-model="customDisplayDatetime" 
            :value-display-fn="formatDateTime"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ customDisplayDatetime || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>启用滚动提示</h4>
        <p class="demo-hint">使用 showTooltip 启用滚动提示，提示用户可以使用鼠标滚轮调整时间</p>
        <JQFormLabel label="选择日期时间（支持鼠标滚轮调整时间）">
          <JQDatetime 
            v-model="tooltipDatetime" 
            :show-tooltip="true"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ tooltipDatetime || '(空)' }}</p>
          <p style="margin-top: 8px; font-size: 12px; color: #999;">提示：打开弹窗后，鼠标悬停在时间输入框上可以用滚轮调整</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>必填项</h4>
        <JQFormLabel label="选择日期时间" required>
          <JQDatetime v-model="requiredDatetime" />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ requiredDatetime || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>表单验证</h4>
        <JQFormLabel label="选择日期时间" required>
          <JQDatetime 
            v-model="validatedDatetime" 
            :rules="[
              val => !!val || '请选择日期时间'
            ]"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ validatedDatetime || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用状态</h4>
        <JQFormLabel label="禁用的日期时间选择器">
          <JQDatetime 
            v-model="disabledDatetime" 
            disable
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ disabledDatetime || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>只读状态</h4>
        <JQFormLabel label="只读的日期时间选择器">
          <JQDatetime 
            v-model="readonlyDatetime" 
            readonly
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ readonlyDatetime || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>不可清空</h4>
        <p class="demo-hint">设置 clearable=false 禁用清空功能</p>
        <JQFormLabel label="不可清空的日期时间">
          <JQDatetime 
            v-model="noClearDatetime" 
            :clearable="false"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ noClearDatetime || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>使用时间戳</h4>
        <p class="demo-hint">组件支持时间戳、Date 对象、字符串等多种格式</p>
        <JQFormLabel label="时间戳日期时间">
          <JQDatetime v-model="timestampDatetime" />
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值(时间戳): {{ timestampDatetime }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义弹窗内容</h4>
        <p class="demo-hint">使用 popup-prepend 插槽在日期时间选择器弹窗顶部添加自定义内容</p>
        <JQFormLabel label="选择日期时间">
          <JQDatetime v-model="customPopupDatetime">
            <template #popup-prepend>
              <div style="padding: 12px; background: #f5f6fa; border-bottom: 1px solid #e6e9f4;">
                <p style="margin: 0; font-size: 13px; color: #666;">请选择一个日期时间</p>
              </div>
            </template>
          </JQDatetime>
        </JQFormLabel>
        <div class="demo-value">
          <p>当前值: {{ customPopupDatetime || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>范围选择（完整示例）</h4>
        <p class="demo-hint">结合范围选择、自定义结束时间、滚动提示等功能</p>
        <JQFormLabel label="完整范围示例">
          <JQDatetime 
            v-model="fullRangeExample" 
            range
            :endhhmmss="['23', '59', '59']"
            :show-tooltip="true"
          />
        </JQFormLabel>
        <div class="demo-value">
          <div v-if="fullRangeExample && fullRangeExample.from && fullRangeExample.to">
            <p>开始时间: {{ fullRangeExample.from }}</p>
            <p>结束时间: {{ fullRangeExample.to }}</p>
            <p>时间跨度: {{ calculateDuration(fullRangeExample) }}</p>
          </div>
          <p v-else>当前值: (空)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQDatetime, JQFormLabel } from 'qcpt';
import { date } from 'quasar';

const basicDatetime = ref<string | null>(null);
const datetimeRange = ref<{ from: string | null; to: string | null }>({
  from: null,
  to: null
});
const customEndTimeRange = ref<{ from: string | null; to: string | null }>({
  from: null,
  to: null
});
const restrictedDatetime = ref<string | null>(null);
const customDisplayDatetime = ref<string | null>(null);
const tooltipDatetime = ref<string | null>(null);
const requiredDatetime = ref<string | null>(null);
const validatedDatetime = ref<string | null>(null);
const disabledDatetime = ref<string | null>('2024-01-15 10:30:00');
const readonlyDatetime = ref<string | null>('2024-02-20 14:45:00');
const noClearDatetime = ref<string | null>('2024-03-10 09:00:00');
const timestampDatetime = ref<number>(Date.now());
const customPopupDatetime = ref<string | null>(null);
const fullRangeExample = ref<{ from: string | null; to: string | null }>({
  from: null,
  to: null
});

// 日期限制：只能选今天及以后
const dateOptions = (d: string) => {
  return date.isSameDate(d, new Date(), 'day') || date.isAfterDate(d, new Date(), 'day');
};

// 自定义显示格式
const formatDateTime = (value: any) => {
  if (!value) return '';
  const d = new Date(value);
  return date.formatDate(d, 'YYYY年MM月DD日 HH:mm:ss');
};

// 计算时间跨度
const calculateDuration = (range: { from: string | null; to: string | null }) => {
  if (!range.from || !range.to) return '';
  
  const start = new Date(range.from).getTime();
  const end = new Date(range.to).getTime();
  const diff = end - start;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  const parts = [];
  if (days > 0) parts.push(`${days}天`);
  if (hours > 0) parts.push(`${hours}小时`);
  if (minutes > 0) parts.push(`${minutes}分钟`);
  
  return parts.join(' ') || '0分钟';
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
