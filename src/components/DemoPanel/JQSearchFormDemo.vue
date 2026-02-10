<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">搜索表单组件，内置查询和重置按钮。表单控件直接使用 label 属性，不需要用 form-label 包裹。</p>
        <JQSearchForm 
          v-model="basicFormData" 
          @query="handleBasicQuery" 
          @reset="handleBasicReset"
        >
          <JQInput v-model="basicFormData.keyword" label="关键词" />
          <JQSelect 
            v-model="basicFormData.status" 
            :options="statusOptions" 
            label="状态"
          />
        </JQSearchForm>
        <div class="demo-value">
          <p><strong>当前表单值:</strong></p>
          <pre>{{ JSON.stringify(basicFormData, null, 2) }}</pre>
        </div>
      </div>

      <div class="demo-section">
        <h4>多个搜索条件</h4>
        <p class="demo-hint">可以添加多个搜索条件，组件会自动布局</p>
        <JQSearchForm 
          v-model="multipleFormData" 
          @query="handleMultipleQuery"
        >
          <JQInput v-model="multipleFormData.keyword" label="关键词" />
          <JQSelect 
            v-model="multipleFormData.category" 
            :options="categoryOptions" 
            label="分类"
          />
          <JQDate 
            v-model="multipleFormData.date" 
            label="日期"
          />
          <JQSelect 
            v-model="multipleFormData.status" 
            :options="statusOptions" 
            label="状态"
          />
        </JQSearchForm>
        <div class="demo-value">
          <p><strong>当前表单值:</strong></p>
          <pre>{{ JSON.stringify(multipleFormData, null, 2) }}</pre>
        </div>
      </div>

      <div class="demo-section">
        <h4>查询按钮加载状态</h4>
        <p class="demo-hint">使用 queryLoading 属性控制查询按钮的加载状态</p>
        <JQSearchForm 
          v-model="loadingFormData" 
          :query-loading="queryLoading"
          @query="handleLoadingQuery"
        >
          <JQInput v-model="loadingFormData.keyword" label="关键词" />
          <JQSelect 
            v-model="loadingFormData.status" 
            :options="statusOptions" 
            label="状态"
          />
        </JQSearchForm>
        <div class="demo-value">
          <p><strong>当前表单值:</strong></p>
          <pre>{{ JSON.stringify(loadingFormData, null, 2) }}</pre>
          <p style="margin-top: 8px;">查询加载状态: {{ queryLoading ? '加载中...' : '未加载' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>隐藏重置按钮</h4>
        <p class="demo-hint">设置 resetVisible=false 隐藏重置按钮</p>
        <JQSearchForm 
          v-model="noResetFormData" 
          :reset-visible="false"
          @query="handleNoResetQuery"
        >
          <JQInput v-model="noResetFormData.keyword" label="关键词" />
          <JQSelect 
            v-model="noResetFormData.status" 
            :options="statusOptions" 
            label="状态"
          />
        </JQSearchForm>
        <div class="demo-value">
          <p><strong>当前表单值:</strong></p>
          <pre>{{ JSON.stringify(noResetFormData, null, 2) }}</pre>
        </div>
      </div>

      <div class="demo-section">
        <h4>隐藏操作按钮区域</h4>
        <p class="demo-hint">设置 operationVisible=false 隐藏查询和重置按钮，可以自定义操作按钮</p>
        <JQSearchForm 
          v-model="noOperationFormData" 
          :operation-visible="false"
        >
          <JQInput v-model="noOperationFormData.keyword" label="关键词" />
          <JQSelect 
            v-model="noOperationFormData.status" 
            :options="statusOptions" 
            label="状态"
          />
        </JQSearchForm>
        <div style="margin-top: 12px;">
          <JQButton label="自定义查询" type="primary" @click="handleCustomQuery" />
          <JQButton label="自定义重置" type="secondary" @click="handleCustomReset" style="margin-left: 8px;" />
        </div>
        <div class="demo-value">
          <p><strong>当前表单值:</strong></p>
          <pre>{{ JSON.stringify(noOperationFormData, null, 2) }}</pre>
        </div>
      </div>

      <div class="demo-section">
        <h4>额外操作区域</h4>
        <p class="demo-hint">使用 extra-operation 插槽在查询/重置按钮右侧添加额外操作</p>
        <JQSearchForm 
          v-model="extraOperationFormData" 
          @query="handleExtraQuery"
        >
          <JQInput v-model="extraOperationFormData.keyword" label="关键词" />
          <JQSelect 
            v-model="extraOperationFormData.status" 
            :options="statusOptions" 
            label="状态"
          />
          <template #extra-operation>
            <JQButton label="导出" type="secondary" @click="handleExport" />
            <JQButton label="高级搜索" type="text" @click="handleAdvancedSearch" style="margin-left: 8px;" />
          </template>
        </JQSearchForm>
        <div class="demo-value">
          <p><strong>当前表单值:</strong></p>
          <pre>{{ JSON.stringify(extraOperationFormData, null, 2) }}</pre>
        </div>
      </div>

      <div class="demo-section">
        <h4>重置功能</h4>
        <p class="demo-hint">点击重置按钮会将表单数据重置到初始值（组件首次渲染时的值）</p>
        <JQSearchForm 
          v-model="resetFormData" 
          @reset="handleResetFormReset"
        >
          <JQInput v-model="resetFormData.keyword" label="关键词" />
          <JQSelect 
            v-model="resetFormData.status" 
            :options="statusOptions" 
            label="状态"
          />
          <JQDate 
            v-model="resetFormData.date" 
            label="日期"
          />
        </JQSearchForm>
        <div class="demo-value">
          <p><strong>当前表单值:</strong></p>
          <pre>{{ JSON.stringify(resetFormData, null, 2) }}</pre>
          <p style="margin-top: 8px; font-size: 12px; color: #999;">提示：修改表单值后，点击重置按钮会恢复到初始值</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>完整示例（用户搜索）</h4>
        <p class="demo-hint">结合多个表单控件，展示完整的搜索表单功能</p>
        <JQSearchForm 
          v-model="completeFormData" 
          :query-loading="completeQueryLoading"
          @query="handleCompleteQuery"
          @reset="handleCompleteReset"
        >
          <JQInput v-model="completeFormData.username" label="用户名" />
          <JQInput v-model="completeFormData.email" label="邮箱" />
          <JQSelect 
            v-model="completeFormData.role" 
            :options="roleOptions" 
            label="角色"
            filterable
          />
          <JQDate 
            v-model="completeFormData.createDate" 
            label="创建日期"
          />
          <JQSelect 
            v-model="completeFormData.status" 
            :options="statusOptions" 
            label="状态"
          />
          <template #extra-operation>
            <JQButton label="导出" type="secondary" @click="handleCompleteExport" />
          </template>
        </JQSearchForm>
        <div class="demo-value">
          <p><strong>当前表单值:</strong></p>
          <pre>{{ JSON.stringify(completeFormData, null, 2) }}</pre>
          <p style="margin-top: 8px;">查询加载状态: {{ completeQueryLoading ? '加载中...' : '未加载' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQSearchForm, JQInput, JQSelect, JQDate, JQButton } from 'qcpt';

// 基础用法
const basicFormData = ref({
  keyword: '',
  status: null,
});

const handleBasicQuery = () => {
  console.log('查询:', basicFormData.value);
};

const handleBasicReset = () => {
  console.log('重置:', basicFormData.value);
};

// 多个搜索条件
const multipleFormData = ref({
  keyword: '',
  category: null,
  date: '',
  status: null,
});

const handleMultipleQuery = () => {
  console.log('查询:', multipleFormData.value);
};

// 查询按钮加载状态
const loadingFormData = ref({
  keyword: '',
  status: null,
});

const queryLoading = ref(false);

const handleLoadingQuery = async () => {
  queryLoading.value = true;
  // 模拟 API 请求
  await new Promise(resolve => setTimeout(resolve, 2000));
  queryLoading.value = false;
  console.log('查询完成:', loadingFormData.value);
};

// 隐藏重置按钮
const noResetFormData = ref({
  keyword: '',
  status: null,
});

const handleNoResetQuery = () => {
  console.log('查询:', noResetFormData.value);
};

// 隐藏操作按钮区域
const noOperationFormData = ref({
  keyword: '',
  status: null,
});

const handleCustomQuery = () => {
  console.log('自定义查询:', noOperationFormData.value);
};

const handleCustomReset = () => {
  noOperationFormData.value = {
    keyword: '',
    status: null,
  };
};

// 额外操作区域
const extraOperationFormData = ref({
  keyword: '',
  status: null,
});

const handleExtraQuery = () => {
  console.log('查询:', extraOperationFormData.value);
};

const handleExport = () => {
  console.log('导出数据');
  alert('导出功能');
};

const handleAdvancedSearch = () => {
  console.log('打开高级搜索');
  alert('高级搜索功能');
};

// 重置功能
const resetFormData = ref({
  keyword: '初始关键词',
  status: 'active',
  date: '2024-01-01',
});

const handleResetFormReset = () => {
  console.log('重置到初始值:', resetFormData.value);
};

// 完整示例
const completeFormData = ref({
  username: '',
  email: '',
  role: null,
  createDate: '',
  status: null,
});

const completeQueryLoading = ref(false);

const handleCompleteQuery = async () => {
  completeQueryLoading.value = true;
  console.log('查询:', completeFormData.value);
  // 模拟 API 请求
  await new Promise(resolve => setTimeout(resolve, 1500));
  completeQueryLoading.value = false;
};

const handleCompleteReset = () => {
  console.log('重置:', completeFormData.value);
};

const handleCompleteExport = () => {
  console.log('导出数据:', completeFormData.value);
  alert('导出功能');
};

// 选项数据
const statusOptions = [
  { label: '启用', value: 'active' },
  { label: '禁用', value: 'disabled' },
];

const categoryOptions = [
  { label: '分类1', value: 'cat1' },
  { label: '分类2', value: 'cat2' },
  { label: '分类3', value: 'cat3' },
];

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '普通用户', value: 'user' },
  { label: '访客', value: 'guest' },
];
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
