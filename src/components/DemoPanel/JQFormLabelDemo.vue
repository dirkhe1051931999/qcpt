<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <j-q-form-label label="用户名" required>
          <j-q-input v-model="basicUsername" />
        </j-q-form-label>
        <p class="demo-value">输入值: {{ basicUsername || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>带提示的标签</h4>
        <j-q-form-label label="邮箱" tip="请输入有效的邮箱地址">
          <j-q-input v-model="emailValue" />
        </j-q-form-label>
        <p class="demo-value">输入值: {{ emailValue || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>必填标记</h4>
        <div class="q-gutter-md">
          <j-q-form-label label="必填项" required>
            <j-q-input v-model="requiredValue" />
          </j-q-form-label>
          
          <j-q-form-label label="非必填项">
            <j-q-input v-model="optionalValue" />
          </j-q-form-label>
        </div>
        <p class="demo-value">必填项值: {{ requiredValue || '(空)' }}</p>
        <p class="demo-value">非必填项值: {{ optionalValue || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>垂直布局（默认）</h4>
        <j-q-form-label label="用户名" vertical>
          <j-q-input v-model="verticalUsername" />
        </j-q-form-label>
        <p class="demo-value">输入值: {{ verticalUsername || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>水平布局</h4>
        <j-q-form-label label="用户名" horizontal>
          <j-q-input v-model="horizontalUsername" />
        </j-q-form-label>
        <p class="demo-value">输入值: {{ horizontalUsername || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>自定义样式</h4>
        <j-q-form-label 
          label="自定义标签" 
          label-class="custom-label-demo"
          value-class="custom-value-demo"
        >
          <j-q-input v-model="customStyleValue" />
        </j-q-form-label>
        <p class="demo-value">输入值: {{ customStyleValue || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>标签提示插槽</h4>
        <j-q-form-label label="用户名" required>
          <template #label-hint>
            <div style="font-size: 12px; color: #999; margin-top: 4px;">
              用户名长度为3-20个字符
            </div>
          </template>
          <j-q-input v-model="labelHintValue" />
        </j-q-form-label>
        <p class="demo-value">输入值: {{ labelHintValue || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>表单项详情插槽</h4>
        <j-q-form-label label="邮箱">
          <j-q-input v-model="detailValue" />
          <template #form-item-detail>
            <div style="font-size: 12px; color: #666; margin-top: 4px;">
              <p style="margin: 0;">提示：邮箱将用于接收重要通知</p>
            </div>
          </template>
        </j-q-form-label>
        <p class="demo-value">输入值: {{ detailValue || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>自定义标签插槽</h4>
        <j-q-form-label>
          <template #label>
            <div style="display: flex; align-items: center;">
              <q-icon name="person" size="16px" style="margin-right: 4px;" />
              <span style="font-weight: 600;">自定义标签</span>
            </div>
          </template>
          <j-q-input v-model="customLabelValue" />
        </j-q-form-label>
        <p class="demo-value">输入值: {{ customLabelValue || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>完整示例（表单组合）</h4>
        <div class="q-gutter-md">
          <j-q-form-label label="用户名" required tip="用户名长度为3-20个字符">
            <template #label-hint>
              <div style="font-size: 12px; color: #999; margin-top: 4px;">
                只能包含字母、数字和下划线
              </div>
            </template>
            <j-q-input v-model="completeUsername" />
          </j-q-form-label>
          
          <j-q-form-label label="邮箱" required tip="请输入有效的邮箱地址">
            <j-q-input v-model="completeEmail" />
            <template #form-item-detail>
              <div style="font-size: 12px; color: #666; margin-top: 4px;">
                邮箱将用于接收验证码和重要通知
              </div>
            </template>
          </j-q-form-label>
          
          <j-q-form-label label="手机号" tip="请输入11位手机号码">
            <j-q-input v-model="completePhone" />
          </j-q-form-label>
        </div>
        <div style="margin-top: 12px;">
          <p class="demo-value">用户名: {{ completeUsername || '(空)' }}</p>
          <p class="demo-value">邮箱: {{ completeEmail || '(空)' }}</p>
          <p class="demo-value">手机号: {{ completePhone || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>与其他组件组合</h4>
        <div class="q-gutter-md">
          <j-q-form-label label="选择日期" required>
            <j-q-date v-model="dateValue" />
          </j-q-form-label>
          
          <j-q-form-label label="选择选项" tip="请选择一个选项">
            <j-q-select 
              v-model="selectValue"
              :options="selectOptions"
              option-label="label"
              option-value="value"
            />
          </j-q-form-label>
          
          <j-q-form-label label="上传文件">
            <j-q-file 
              v-model="fileValue"
              accept="image/*"
              :maxlength="1"
            />
          </j-q-form-label>
        </div>
        <div style="margin-top: 12px;">
          <p class="demo-value">日期: {{ dateValue || '(空)' }}</p>
          <p class="demo-value">选项: {{ selectValue || '(空)' }}</p>
          <p class="demo-value">文件数: {{ fileValue.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQFormLabel, JQInput, JQDate, JQSelect, JQFile } from 'qcpt';

// 基础用法
const basicUsername = ref('');

// 带提示
const emailValue = ref('');

// 必填标记
const requiredValue = ref('');
const optionalValue = ref('');

// 布局
const verticalUsername = ref('');
const horizontalUsername = ref('');

// 自定义样式
const customStyleValue = ref('');

// 插槽
const labelHintValue = ref('');
const detailValue = ref('');
const customLabelValue = ref('');

// 完整示例
const completeUsername = ref('');
const completeEmail = ref('');
const completePhone = ref('');

// 与其他组件组合
const dateValue = ref('');
const selectValue = ref(null);
const fileValue = ref<File[]>([]);

const selectOptions = ref([
  { label: '选项 1', value: 1 },
  { label: '选项 2', value: 2 },
  { label: '选项 3', value: 3 }
]);
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
/* 自定义样式示例 */
:deep(.custom-label-demo) {
  color: #667eea;
  font-weight: 600;
}

:deep(.custom-value-demo) {
  background: #f5f6fa;
  padding: 8px;
  border-radius: 4px;
}
</style>
