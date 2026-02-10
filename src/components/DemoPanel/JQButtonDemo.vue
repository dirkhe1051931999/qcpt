<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <j-q-button 
          label="提交" 
          type="primary"
          @click="handleClick('提交')"
        />
        <p class="demo-value">点击次数: {{ clickCount }}</p>
      </div>

      <div class="demo-section">
        <h4>按钮类型</h4>
        <div class="q-gutter-sm">
          <j-q-button 
            label="主要按钮" 
            type="primary"
          />
          <j-q-button 
            label="次要按钮" 
            type="secondary"
          />
          <j-q-button 
            label="文本按钮" 
            type="text"
          />
        </div>
      </div>

      <div class="demo-section">
        <h4>按钮尺寸</h4>
        <div class="q-gutter-sm">
          <j-q-button 
            label="大按钮" 
            type="primary"
            size="large"
          />
          <j-q-button 
            label="正常按钮" 
            type="primary"
            size="normal"
          />
          <j-q-button 
            label="小按钮" 
            type="primary"
            size="small"
          />
        </div>
      </div>

      <div class="demo-section">
        <h4>带图标的按钮</h4>
        <div class="q-gutter-sm">
          <j-q-button 
            label="保存" 
            type="primary"
            icon="save"
          />
          <j-q-button 
            label="删除" 
            type="secondary"
            icon="delete"
          />
          <j-q-button 
            label="编辑" 
            type="text"
            icon="edit"
          />
          <j-q-button 
            type="primary"
            icon="add"
          />
        </div>
      </div>

      <div class="demo-section">
        <h4>加载状态</h4>
        <j-q-button 
          label="提交中..." 
          type="primary"
          :loading="isSubmitting"
          @click="handleSubmit"
        />
        <p class="demo-value">状态: {{ isSubmitting ? '提交中...' : '空闲' }}</p>
      </div>

      <div class="demo-section">
        <h4>带提示的按钮</h4>
        <div class="q-gutter-sm">
          <j-q-button 
            label="删除" 
            type="secondary"
            icon="delete"
            tips="删除后将无法恢复"
          />
          <j-q-button 
            label="保存" 
            type="primary"
            icon="save"
            tips="保存当前更改"
          />
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用状态</h4>
        <div class="q-gutter-sm">
          <j-q-button 
            label="禁用按钮" 
            type="primary"
            disable
          />
          <j-q-button 
            label="禁用次要按钮" 
            type="secondary"
            disable
          />
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义 Tooltip 配置</h4>
        <div class="q-gutter-sm">
          <j-q-button 
            label="底部提示" 
            tips="这是底部提示"
            :tooltip-config="{
              placement: 'bottom',
              effect: 'light',
              maxWidth: '200px'
            }"
          />
          <j-q-button 
            label="右侧提示" 
            tips="这是右侧提示"
            :tooltip-config="{
              placement: 'right',
              openDelay: 500
            }"
          />
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义插槽</h4>
        <div class="q-gutter-sm">
          <j-q-button type="primary">
            <template #icon>
              <q-icon name="star" color="yellow" />
            </template>
            自定义图标
          </j-q-button>
          
          <j-q-button type="secondary" :loading="customLoading" @click="handleCustomLoading">
            <template #loading>
              <q-spinner-dots color="primary" size="20px" />
            </template>
            自定义加载
          </j-q-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQButton } from 'qcpt';

const clickCount = ref(0);
const isSubmitting = ref(false);
const customLoading = ref(false);

const handleClick = (label: string) => {
  clickCount.value++;
  console.log(`点击了：${label}`);
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('提交成功');
  } finally {
    isSubmitting.value = false;
  }
};

const handleCustomLoading = async () => {
  customLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 2000));
  customLoading.value = false;
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
