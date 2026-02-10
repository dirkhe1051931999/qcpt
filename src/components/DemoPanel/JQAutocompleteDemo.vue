<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">点击输入框会显示历史记录，输入内容会自动过滤历史记录。历史记录保存在 localStorage 中。</p>
        <JQFormLabel label="搜索用户">
          <JQAutocomplete 
            v-model="basicValue" 
            search-key="demo-user-search"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ basicValue || '(空)' }}</p>
          <p style="margin-top: 8px; font-size: 12px; color: #999;">提示：输入内容后，点击输入框外的"保存历史"按钮可以保存到历史记录</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>可删除历史记录</h4>
        <p class="demo-hint">启用 deletable 后，历史记录项右侧会显示删除图标</p>
        <JQFormLabel label="搜索商品">
          <JQAutocomplete 
            v-model="deletableValue" 
            search-key="demo-product-search"
            deletable
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ deletableValue || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义历史记录数量</h4>
        <p class="demo-hint">使用 maxLength 属性设置最大历史记录数量（默认5条）</p>
        <JQFormLabel label="搜索订单">
          <JQAutocomplete 
            v-model="maxLengthValue" 
            search-key="demo-order-search"
            :max-length="10"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ maxLengthValue || '(空)' }}</p>
          <p style="margin-top: 8px; font-size: 12px; color: #999;">最多保存 10 条历史记录</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>必填项</h4>
        <JQFormLabel label="搜索关键词" required>
          <JQAutocomplete 
            v-model="requiredValue" 
            search-key="demo-keyword-search"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ requiredValue || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用 Tooltip</h4>
        <p class="demo-hint">使用 tooltipDisabled 禁用历史记录项的 tooltip 提示</p>
        <JQFormLabel label="搜索（无 Tooltip）">
          <JQAutocomplete 
            v-model="tooltipDisabledValue" 
            search-key="demo-no-tooltip-search"
            tooltip-disabled
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ tooltipDisabledValue || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>手动保存历史记录</h4>
        <p class="demo-hint">通过 ref 调用 saveHistory 方法手动保存历史记录</p>
        <JQFormLabel label="搜索内容">
          <JQAutocomplete 
            ref="manualSaveRef"
            v-model="manualSaveValue" 
            search-key="demo-manual-save"
          />
        </JQFormLabel>
        <div style="margin-top: 12px;">
          <JQButton 
            label="保存当前搜索到历史" 
            type="primary"
            :disable="!manualSaveValue"
            @click="handleManualSave"
          />
        </div>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ manualSaveValue || '(空)' }}</p>
          <p v-if="saveSuccess" style="margin-top: 8px; color: #4caf50;">✓ 已保存到历史记录</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>不同 searchKey 的历史记录隔离</h4>
        <p class="demo-hint">不同的 searchKey 有独立的历史记录，互不影响</p>
        <div class="q-gutter-md">
          <JQFormLabel label="搜索A（searchKey: demo-isolated-a）">
            <JQAutocomplete 
              v-model="isolatedValueA" 
              search-key="demo-isolated-a"
              deletable
            />
          </JQFormLabel>
          <JQFormLabel label="搜索B（searchKey: demo-isolated-b）">
            <JQAutocomplete 
              v-model="isolatedValueB" 
              search-key="demo-isolated-b"
              deletable
            />
          </JQFormLabel>
        </div>
        <div class="demo-value">
          <p><strong>搜索A的值:</strong> {{ isolatedValueA || '(空)' }}</p>
          <p><strong>搜索B的值:</strong> {{ isolatedValueB || '(空)' }}</p>
          <p style="margin-top: 8px; font-size: 12px; color: #999;">两个输入框的历史记录是独立的</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>历史记录过滤</h4>
        <p class="demo-hint">输入内容时，历史记录会自动过滤，只显示包含输入内容的历史项</p>
        <JQFormLabel label="搜索（带历史记录）">
          <JQAutocomplete 
            v-model="filterValue" 
            search-key="demo-filter-search"
            deletable
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ filterValue || '(空)' }}</p>
          <p style="margin-top: 8px; font-size: 12px; color: #999;">提示：先保存一些历史记录，然后输入内容，历史记录会自动过滤</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>完整示例（表单组合）</h4>
        <p class="demo-hint">结合表单验证、历史记录等功能</p>
        <div class="q-gutter-md">
          <JQFormLabel label="用户名搜索" required>
            <JQAutocomplete 
              v-model="completeForm.username" 
              search-key="demo-complete-username"
              deletable
              :max-length="8"
            />
          </JQFormLabel>
          <JQFormLabel label="邮箱搜索">
            <JQAutocomplete 
              v-model="completeForm.email" 
              search-key="demo-complete-email"
              :max-length="5"
            />
          </JQFormLabel>
        </div>
        <div style="margin-top: 12px;">
          <JQButton 
            label="提交表单" 
            type="primary"
            @click="handleSubmit"
          />
        </div>
        <div class="demo-value">
          <p><strong>表单值:</strong></p>
          <pre>{{ JSON.stringify(completeForm, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQAutocomplete, JQFormLabel, JQButton } from 'qcpt';

// 基础用法
const basicValue = ref<string>('');

// 可删除历史记录
const deletableValue = ref<string>('');

// 自定义历史记录数量
const maxLengthValue = ref<string>('');

// 必填项
const requiredValue = ref<string>('');

// 禁用 Tooltip
const tooltipDisabledValue = ref<string>('');

// 手动保存历史记录
const manualSaveValue = ref<string>('');
const manualSaveRef = ref<any>(null);
const saveSuccess = ref(false);

const handleManualSave = () => {
  if (manualSaveValue.value && manualSaveRef.value) {
    manualSaveRef.value.saveHistory(manualSaveValue.value);
    saveSuccess.value = true;
    setTimeout(() => {
      saveSuccess.value = false;
    }, 2000);
  }
};

// 不同 searchKey 的历史记录隔离
const isolatedValueA = ref<string>('');
const isolatedValueB = ref<string>('');

// 历史记录过滤
const filterValue = ref<string>('');

// 完整示例表单
const completeForm = ref({
  username: '',
  email: '',
});

const handleSubmit = () => {
  console.log('提交表单:', completeForm.value);
  alert('表单已提交（查看控制台）');
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
