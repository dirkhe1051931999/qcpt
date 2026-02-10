<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <j-q-input-recognize 
          ref="basicRef"
          v-model="basicValue" 
          label="输入内容（支持逗号、空格、换行分隔）"
          @update:recognized-items="basicRecognizedItems = $event"
        />
        <p class="demo-value">输入值: {{ basicValue || '(空)' }}</p>
        <p class="demo-value">识别结果: {{ JSON.stringify(basicRecognizedItems) }}</p>
      </div>

      <div class="demo-section">
        <h4>使用正则表达式验证（邮箱）</h4>
        <j-q-input-recognize 
          ref="emailRef"
          v-model="emailValue" 
          label="输入邮箱地址"
          :recognize-rules="[/^[^\s@]+@[^\s@]+\.[^\s@]+$/]"
          @update:recognized-items="emailRecognizedItems = $event"
        />
        <p class="demo-value">输入值: {{ emailValue || '(空)' }}</p>
        <p class="demo-value">识别结果: {{ JSON.stringify(emailRecognizedItems) }}</p>
        <p style="margin-top: 4px; font-size: 12px; color: #999;">提示：输入多个邮箱，用逗号、空格或换行分隔</p>
      </div>

      <div class="demo-section">
        <h4>使用验证函数（用户名）</h4>
        <j-q-input-recognize 
          ref="usernameRef"
          v-model="usernameValue" 
          label="输入用户名（3-20个字符，只能包含字母、数字、下划线）"
          :recognize-rules="[validateUsername]"
          @update:recognized-items="usernameRecognizedItems = $event"
        />
        <p class="demo-value">输入值: {{ usernameValue || '(空)' }}</p>
        <p class="demo-value">识别结果: {{ JSON.stringify(usernameRecognizedItems) }}</p>
      </div>

      <div class="demo-section">
        <h4>限制最大识别数量</h4>
        <j-q-input-recognize 
          ref="maxLimitRef"
          v-model="maxLimitValue" 
          label="输入标签（最多5个）"
          :max="5"
          @update:recognized-items="maxLimitRecognizedItems = $event"
        />
        <p class="demo-value">输入值: {{ maxLimitValue || '(空)' }}</p>
        <p class="demo-value">识别结果: {{ JSON.stringify(maxLimitRecognizedItems) }}</p>
        <p style="margin-top: 4px; font-size: 12px; color: #999;">提示：超过5个时，只显示前5个有效项</p>
      </div>

      <div class="demo-section">
        <h4>允许重复项</h4>
        <j-q-input-recognize 
          ref="duplicateRef"
          v-model="duplicateValue" 
          label="输入内容（允许重复）"
          :allow-duplicate="true"
          @update:recognized-items="duplicateRecognizedItems = $event"
        />
        <p class="demo-value">输入值: {{ duplicateValue || '(空)' }}</p>
        <p class="demo-value">识别结果: {{ JSON.stringify(duplicateRecognizedItems) }}</p>
      </div>

      <div class="demo-section">
        <h4>多个验证规则（或关系）</h4>
        <j-q-input-recognize 
          ref="multipleRulesRef"
          v-model="multipleRulesValue" 
          label="输入邮箱或手机号"
          :recognize-rules="[
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  // 邮箱正则
            /^1[3-9]\d{9}$/  // 手机号正则
          ]"
          @update:recognized-items="multipleRulesRecognizedItems = $event"
        />
        <p class="demo-value">输入值: {{ multipleRulesValue || '(空)' }}</p>
        <p class="demo-value">识别结果: {{ JSON.stringify(multipleRulesRecognizedItems) }}</p>
        <p style="margin-top: 4px; font-size: 12px; color: #999;">提示：只要匹配邮箱或手机号任一规则即可识别</p>
      </div>

      <div class="demo-section">
        <h4>输入框验证规则</h4>
        <j-q-input-recognize 
          ref="inputRulesRef"
          v-model="inputRulesValue" 
          label="必填输入（至少识别出1个有效项）"
          :input-rules="[
            val => !!val || '请输入内容'
          ]"
          :recognize-rules="[/^[a-zA-Z0-9]+$/]"
          @update:recognized-items="inputRulesRecognizedItems = $event"
        />
        <p class="demo-value">输入值: {{ inputRulesValue || '(空)' }}</p>
        <p class="demo-value">识别结果: {{ JSON.stringify(inputRulesRecognizedItems) }}</p>
      </div>

      <div class="demo-section">
        <h4>获取识别结果（事件）</h4>
        <j-q-input-recognize 
          ref="eventRef"
          v-model="eventValue" 
          label="输入内容"
          @change="handleChange"
          @update:recognized-items="eventRecognizedItems = $event"
        />
        <p class="demo-value">输入值: {{ eventValue || '(空)' }}</p>
        <p class="demo-value">识别结果: {{ JSON.stringify(eventRecognizedItems) }}</p>
        <p class="demo-value">最后变化: {{ lastChange || '(无)' }}</p>
      </div>

      <div class="demo-section">
        <h4>使用 ref 获取识别结果</h4>
        <j-q-input-recognize 
          ref="refRecognizeRef"
          v-model="refValue" 
          label="输入内容"
          @update:recognized-items="refRecognizedItemsDisplay = JSON.stringify($event)"
        />
        <div style="margin-top: 8px;">
          <q-btn 
            @click="getRecognizedItems" 
            label="获取识别结果" 
            size="sm" 
            outline 
          />
        </div>
        <p class="demo-value">输入值: {{ refValue || '(空)' }}</p>
        <p class="demo-value">识别结果: {{ refRecognizedItemsDisplay || '(点击按钮获取)' }}</p>
      </div>

      <div class="demo-section">
        <h4>禁用状态</h4>
        <j-q-input-recognize 
          v-model="disabledValue" 
          label="禁用的输入识别"
          disable
        />
      </div>

      <div class="demo-section">
        <h4>只读状态</h4>
        <j-q-input-recognize 
          v-model="readonlyValue" 
          label="只读的输入识别"
          readonly
        />
        <p class="demo-value">输入值: {{ readonlyValue || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>完整示例（标签输入）</h4>
        <j-q-input-recognize 
          ref="tagRef"
          v-model="tagValue" 
          label="输入标签（最多10个，3-20个字符）"
          :max="10"
          :recognize-rules="[validateTag]"
          :input-rules="[
            val => !!val || '请输入标签',
            val => {
              const items = tagRef?.recognizedItems || [];
              return items.length > 0 || '至少需要输入1个有效标签';
            }
          ]"
          @change="handleTagChange"
          @update:recognized-items="tagRecognizedItems = $event"
        />
        <p class="demo-value">输入值: {{ tagValue || '(空)' }}</p>
        <p class="demo-value">识别结果: {{ JSON.stringify(tagRecognizedItems) }}</p>
        <p class="demo-value">标签数量: {{ tagRecognizedItems.length }}/10</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { JQInputRecognize } from 'qcpt';

// 基础用法
const basicValue = ref('');
const basicRecognizedItems = ref<string[]>([]);

// 邮箱验证
const emailValue = ref('');
const emailRecognizedItems = ref<string[]>([]);

// 用户名验证
const usernameValue = ref('');
const usernameRecognizedItems = ref<string[]>([]);

const validateUsername = (value: string) => {
  if (value.length < 3) {
    return '用户名长度不能少于3个字符';
  }
  if (value.length > 20) {
    return '用户名长度不能超过20个字符';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return '用户名只能包含字母、数字和下划线';
  }
  return true;
};

// 最大数量限制
const maxLimitValue = ref('');
const maxLimitRecognizedItems = ref<string[]>([]);

// 允许重复
const duplicateValue = ref('');
const duplicateRecognizedItems = ref<string[]>([]);

// 多个规则
const multipleRulesValue = ref('');
const multipleRulesRecognizedItems = ref<string[]>([]);

// 输入框验证规则
const inputRulesValue = ref('');
const inputRulesRecognizedItems = ref<string[]>([]);

// 事件获取
const eventValue = ref('');
const eventRecognizedItems = ref<string[]>([]);
const lastChange = ref('');

const handleChange = (value: string, recognizedItems: string[]) => {
  eventRecognizedItems.value = recognizedItems;
  lastChange.value = `输入: "${value}"，识别出 ${recognizedItems.length} 项`;
};

// Ref 获取
const refValue = ref('');
const refRecognizeRef = ref<InstanceType<typeof JQInputRecognize>>();
const refRecognizedItemsDisplay = ref('');

// Refs
const basicRef = ref<InstanceType<typeof JQInputRecognize>>();
const emailRef = ref<InstanceType<typeof JQInputRecognize>>();
const usernameRef = ref<InstanceType<typeof JQInputRecognize>>();
const maxLimitRef = ref<InstanceType<typeof JQInputRecognize>>();
const duplicateRef = ref<InstanceType<typeof JQInputRecognize>>();
const multipleRulesRef = ref<InstanceType<typeof JQInputRecognize>>();
const inputRulesRef = ref<InstanceType<typeof JQInputRecognize>>();
const eventRef = ref<InstanceType<typeof JQInputRecognize>>();
const tagRef = ref<InstanceType<typeof JQInputRecognize>>();

const getRecognizedItems = () => {
  const items = refRecognizeRef.value?.recognizedItems || [];
  refRecognizedItemsDisplay.value = JSON.stringify(items);
};

// 禁用/只读
const disabledValue = ref('已禁用的内容');
const readonlyValue = ref('只读内容\n第二行\n第三行');

// 完整示例 - 标签
const tagValue = ref('');
const tagRecognizedItems = ref<string[]>([]);

const validateTag = (value: string) => {
  if (value.length < 3) {
    return '标签长度不能少于3个字符';
  }
  if (value.length > 20) {
    return '标签长度不能超过20个字符';
  }
  if (!/^[\u4e00-\u9fa5a-zA-Z0-9_-]+$/.test(value)) {
    return '标签只能包含中文、英文、数字、下划线和连字符';
  }
  return true;
};

const handleTagChange = (value: string, recognizedItems: string[]) => {
  tagRecognizedItems.value = recognizedItems;
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
