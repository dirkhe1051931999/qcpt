<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">单选模式，选择一个选项</p>
        <j-q-form-label label="选择类型">
          <JQOptionGroup
            v-model="radioValue"
            :options="radioOptions"
            type="radio"
          />
        </j-q-form-label>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ radioValue }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>复选框模式</h4>
        <p class="demo-hint">使用 type="checkbox" 启用多选</p>
        <j-q-form-label label="多选">
          <JQOptionGroup
            v-model="checkboxValue"
            :options="checkboxOptions"
            type="checkbox"
          />
        </j-q-form-label>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ JSON.stringify(checkboxValue) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>内联布局</h4>
        <p class="demo-hint">使用 inline 属性启用内联布局</p>
        <j-q-form-label label="内联布局">
          <JQOptionGroup
            v-model="inlineValue"
            :options="inlineOptions"
            type="radio"
            inline
          />
        </j-q-form-label>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ inlineValue }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>网格布局</h4>
        <p class="demo-hint">使用 inlineSpanCount 属性设置非内联模式下的网格列数</p>
        <j-q-form-label label="网格布局（4列）">
          <JQOptionGroup
            v-model="gridValue"
            :options="gridOptions"
            type="checkbox"
            :inline-span-count="4"
          />
        </j-q-form-label>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ JSON.stringify(gridValue) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>带提示的选项</h4>
        <p class="demo-hint">选项可以设置 tip 属性显示提示</p>
        <j-q-form-label label="选择类型">
          <JQOptionGroup
            v-model="tipValue"
            :options="tipOptions"
            type="radio"
          />
        </j-q-form-label>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ tipValue }}</p>
          <p><strong>说明:</strong> 鼠标悬停在提示图标上查看说明</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>表单验证</h4>
        <p class="demo-hint">支持 Quasar 的 rules 验证</p>
        <j-q-form-label label="选择类型（必填）">
          <JQOptionGroup
            v-model="validatedValue"
            :options="radioOptions"
            type="radio"
            :rules="[
              val => val !== null || '请选择一个选项'
            ]"
          />
        </j-q-form-label>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ validatedValue || '(未选择)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用状态</h4>
        <p class="demo-hint">使用 disable 属性禁用整个组件，或在选项中设置 disable</p>
        <j-q-form-label label="禁用状态">
          <JQOptionGroup
            v-model="disabledValue"
            :options="radioOptions"
            type="radio"
            disable
          />
        </j-q-form-label>
        <div class="form-group">
          <j-q-form-label label="部分禁用">
            <JQOptionGroup
              v-model="partialDisabledValue"
              :options="partialDisabledOptions"
              type="radio"
            />
          </j-q-form-label>
        </div>
      </div>

      <div class="demo-section">
        <h4>实际应用场景</h4>
        <p class="demo-hint">在表单中选择用户类型、订单状态等</p>
        <div class="demo-card">
          <div class="form-group">
            <j-q-form-label label="用户类型">
              <JQOptionGroup
                v-model="userType"
                :options="userTypeOptions"
                type="radio"
              />
            </j-q-form-label>
          </div>
          <div class="form-group">
            <j-q-form-label label="订单状态">
              <JQOptionGroup
                v-model="orderStatus"
                :options="orderStatusOptions"
                type="checkbox"
                :inline-span-count="3"
              />
            </j-q-form-label>
          </div>
          <div class="form-group">
            <j-q-form-label label="通知方式">
              <JQOptionGroup
                v-model="notificationMethods"
                :options="notificationOptions"
                type="checkbox"
                inline
              />
            </j-q-form-label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQOptionGroup, JQFormLabel } from 'qcpt';

const radioValue = ref(null);
const radioOptions = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
];

const checkboxValue = ref<number[]>([]);
const checkboxOptions = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 },
  { label: '选项4', value: 4 }
];

const inlineValue = ref(null);
const inlineOptions = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 }
];

const gridValue = ref<number[]>([]);
const gridOptions = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 },
  { label: '选项4', value: 4 },
  { label: '选项5', value: 5 },
  { label: '选项6', value: 6 }
];

const tipValue = ref(null);
const tipOptions = [
  { label: '选项1', value: 1, tip: '这是选项1的说明' },
  { label: '选项2', value: 2, tip: '这是选项2的说明' },
  { label: '选项3', value: 3, tip: '这是选项3的说明' }
];

const validatedValue = ref(null);

const disabledValue = ref(1);

const partialDisabledValue = ref(null);
const partialDisabledOptions = [
  { label: '选项1', value: 1 },
  { label: '选项2（禁用）', value: 2, disable: true },
  { label: '选项3', value: 3 }
];

const userType = ref(null);
const userTypeOptions = [
  { label: '普通用户', value: 'normal' },
  { label: 'VIP用户', value: 'vip' },
  { label: '超级VIP', value: 'svip' }
];

const orderStatus = ref<number[]>([]);
const orderStatusOptions = [
  { label: '待支付', value: 1 },
  { label: '已支付', value: 2 },
  { label: '已发货', value: 3 },
  { label: '已完成', value: 4 },
  { label: '已取消', value: 5 }
];

const notificationMethods = ref<string[]>([]);
const notificationOptions = [
  { label: '邮件', value: 'email' },
  { label: '短信', value: 'sms' },
  { label: '站内信', value: 'message' }
];
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
/* 表单组样式 */
.form-group {
  margin-top: 16px;
}

.form-group:first-child {
  margin-top: 0;
}
</style>
