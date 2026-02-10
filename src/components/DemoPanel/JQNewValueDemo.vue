<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>值验证</h4>
        <p class="demo-hint">通过 addRulesName 属性设置新增值的验证规则</p>
        <j-q-form-label label="邮箱">
          <JQNewValue v-model="emailValues" :options="[]" add-rules-name="email" />
        </j-q-form-label>
        <div class="demo-value">
          <p><strong>说明:</strong> 输入非邮箱格式时会显示错误提示</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>限制最大数量</h4>
        <p class="demo-hint">通过 maxlength 属性限制最大可选数量</p>
        <j-q-form-label label="标签（最多5个）">
          <JQNewValue v-model="maxLengthValues" :options="[]" :maxlength="5" />
        </j-q-form-label>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ JSON.stringify(maxLengthValues) }}</p>
          <p><strong>说明:</strong> 最多只能添加5个值</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>允许重复值</h4>
        <p class="demo-hint">使用 allowDuplicates 属性允许添加重复的值</p>
        <j-q-form-label label="标签（允许重复）">
          <JQNewValue v-model="duplicateValues" :options="[]" :allow-duplicates="true" />
        </j-q-form-label>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ JSON.stringify(duplicateValues) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>表单验证</h4>
        <p class="demo-hint">支持 Quasar 的 rules 验证</p>
        <j-q-form-label label="标签（必填）">
          <JQNewValue v-model="requiredValues" :options="[]" :rules="[(val) => val.length > 0 || '请至少选择一个值']" />
        </j-q-form-label>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ JSON.stringify(requiredValues) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQNewValue, JQFormLabel } from 'qcpt';

const emailValues = ref<string[]>([]);

const maxLengthValues = ref<string[]>([]);

const duplicateValues = ref<string[]>([]);

const requiredValues = ref<string[]>([]);
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>