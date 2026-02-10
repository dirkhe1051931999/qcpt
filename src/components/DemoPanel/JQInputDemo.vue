<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <JQInput v-model="basicValue" label="用户名" />
        <p class="demo-value">当前值: {{ basicValue || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>带验证的输入框</h4>
        <JQInput 
          v-model="emailValue" 
          label="邮箱"
          :rules="emailRules"
        />
        <p class="demo-value">当前值: {{ emailValue || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>密码输入框</h4>
        <JQInput 
          v-model="passwordValue" 
          label="密码"
          custom-type="password"
          :type="passwordVisible ? 'text' : 'password'"
        >
          <template #append="{ toggleVisibility, isContentVisible }">
            <QIcon 
              :name="isContentVisible ? 'visibility' : 'visibility_off'"
              @click="toggleVisibility"
              class="cursor-pointer"
            />
          </template>
        </JQInput>
        <p class="demo-value">当前值: {{ passwordValue || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>敏感信息遮罩</h4>
        <JQInput 
          v-model="apiKeyValue" 
          label="API Key"
          custom-type="secret"
        >
          <template #append="{ toggleVisibility, isContentVisible }">
            <QIcon 
              :name="isContentVisible ? 'visibility' : 'visibility_off'"
              @click="toggleVisibility"
              class="cursor-pointer"
            />
          </template>
        </JQInput>
        <p class="demo-value">原始值: {{ apiKeyValue }}</p>
      </div>

      <div class="demo-section">
        <h4>禁用状态</h4>
        <JQInput 
          v-model="disabledValue" 
          label="禁用输入框"
          disable
        />
      </div>

      <div class="demo-section">
        <h4>只读状态</h4>
        <JQInput 
          v-model="readonlyValue" 
          label="只读输入框"
          readonly
        />
      </div>

      <div class="demo-section">
        <h4>文本域</h4>
        <JQInput 
          v-model="textareaValue" 
          type="textarea"
          :maxlength="200"
        />
        <p class="demo-value">字数: {{ textareaValue.length }} / 200</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQInput } from 'qcpt';
import { QIcon } from 'quasar';

const basicValue = ref('');
const emailValue = ref('');
const passwordValue = ref('');
const passwordVisible = ref(false);
const apiKeyValue = ref('sk-1234567890abcdef');
const disabledValue = ref('禁用的值');
const readonlyValue = ref('只读的值');
const textareaValue = ref('');

const emailRules = [
  (val: string) => !!val || '邮箱是必填项', 
  (val: string) => /.+@.+\..+/.test(val) || '邮箱格式不正确'
];
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
