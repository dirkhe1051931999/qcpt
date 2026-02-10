<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">点击编辑图标弹出编辑框，修改后点击确认保存</p>
        <JCEditableProxy v-model="basicValue" :required="false">
          <template #editor="{ tempValue, updateTempValue }">
            <j-q-input :model-value="tempValue" @update:model-value="updateTempValue" />
          </template>
        </JCEditableProxy>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ basicValue || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>表单验证</h4>
        <p class="demo-hint">使用 setEditorRef 设置编辑器引用，支持表单验证。当使用验证规则时，需要设置 required=false</p>
        <JCEditableProxy v-model="validatedValue" @saved="handleSaved">
          <template #editor="{ tempValue, updateTempValue, setEditorRef }">
            <j-q-input :model-value="tempValue" @update:model-value="updateTempValue" :ref="setEditorRef" :rules="[(val) => !!val || '不能为空']" />
          </template>
        </JCEditableProxy>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ validatedValue || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>权限控制</h4>
        <p class="demo-hint">通过 code 属性控制编辑功能的显示（示例中 code 为空，默认显示）</p>
        <JCEditableProxy v-model="permissionValue" code="" :required="false">
          <template #editor="{ tempValue, updateTempValue }">
            <j-q-input :model-value="tempValue" @update:model-value="updateTempValue" />
          </template>
        </JCEditableProxy>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ permissionValue || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义显示内容</h4>
        <p class="demo-hint">使用 display 插槽自定义显示内容</p>
        <JCEditableProxy v-model="customDisplayValue" :required="false">
          <template #display>
            <span style="color: #1976d2; font-weight: 500">{{ customDisplayValue }}</span>
          </template>
          <template #editor="{ tempValue, updateTempValue }">
            <j-q-input :model-value="tempValue" @update:model-value="updateTempValue" />
          </template>
        </JCEditableProxy>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ customDisplayValue || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义弹窗宽度</h4>
        <p class="demo-hint">通过 popupWidth 属性设置弹窗宽度</p>
        <JCEditableProxy v-model="widePopupValue" popup-width="500px" :required="false">
          <template #editor="{ tempValue, updateTempValue }">
            <j-q-input :model-value="tempValue" @update:model-value="updateTempValue" />
          </template>
        </JCEditableProxy>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ widePopupValue || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>异步保存</h4>
        <p class="demo-hint">使用 confirm 事件实现异步保存逻辑</p>
        <JCEditableProxy v-model="asyncValue" @confirm="handleConfirm" :required="false">
          <template #editor="{ tempValue, updateTempValue }">
            <j-q-input :model-value="tempValue" @update:model-value="updateTempValue" />
          </template>
        </JCEditableProxy>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ asyncValue || '(空)' }}</p>
          <p><strong>保存状态:</strong> {{ saveStatus }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>实际应用场景</h4>
        <p class="demo-hint">在表格或列表中快速编辑字段值</p>
        <div class="demo-card">
          <div class="info-row">
            <span class="label">用户名:</span>
            <JCEditableProxy v-model="userName" :required="false">
              <template #editor="{ tempValue, updateTempValue }">
                <j-q-input :model-value="tempValue" @update:model-value="updateTempValue" />
              </template>
            </JCEditableProxy>
          </div>
          <div class="info-row">
            <span class="label">邮箱:</span>
            <JCEditableProxy v-model="userEmail" :required="true">
              <template #editor="{ tempValue, updateTempValue, setEditorRef }">
                <j-q-input :model-value="tempValue" @update:model-value="updateTempValue" :ref="setEditorRef" :rules="[(val) => /.+@.+\..+/.test(val) || '邮箱格式不正确']" />
              </template>
            </JCEditableProxy>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCEditableProxy, JQInput } from 'qcpt';

const basicValue = ref('可编辑的值');
const validatedValue = ref('带验证的值');
const permissionValue = ref('权限控制的值');
const customDisplayValue = ref('自定义显示');
const widePopupValue = ref('宽弹窗');
const asyncValue = ref('异步保存');
const saveStatus = ref('未保存');

const userName = ref('张三');
const userEmail = ref('zhangsan@example.com');

const handleSaved = (newValue: string) => {
  console.log('保存成功', newValue);
};

const handleConfirm = (newValue: string, done: (options?: { success?: boolean; close?: boolean; resetValue?: boolean }) => void) => {
  saveStatus.value = '保存中...';
  // 模拟异步保存
  setTimeout(() => {
    saveStatus.value = '保存成功';
    done({ success: true, close: true });
  }, 1000);
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
