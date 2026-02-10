<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">使用 JQMessage.show() 显示消息通知</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <q-btn label="成功消息" color="positive" @click="showSuccess" />
          <q-btn label="错误消息" color="negative" @click="showError" />
          <q-btn label="警告消息" color="warning" @click="showWarn" />
        </div>
      </div>

      <div class="demo-section">
        <h4>通知模式</h4>
        <p class="demo-hint">使用 isNotify: true 启用通知模式（带关闭按钮）</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <q-btn label="成功通知" color="positive" @click="showSuccessNotify" />
          <q-btn label="错误通知" color="negative" @click="showErrorNotify" />
          <q-btn label="警告通知" color="warning" @click="showWarnNotify" />
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义位置</h4>
        <p class="demo-hint">使用 position 属性自定义消息显示位置</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <q-btn label="顶部" color="primary" @click="showTop" />
          <q-btn label="底部" color="primary" @click="showBottom" />
          <q-btn label="左上" color="primary" @click="showTopLeft" />
          <q-btn label="右上" color="primary" @click="showTopRight" />
        </div>
      </div>

      <div class="demo-section">
        <h4>实际应用场景</h4>
        <p class="demo-hint">在操作成功后显示成功消息，失败时显示错误消息</p>
        <div class="demo-card">
          <div class="button-group">
            <q-btn label="保存数据" color="primary" @click="handleSave" />
            <q-btn label="删除数据" color="negative" @click="handleDelete" />
            <q-btn label="提交表单" color="positive" @click="handleSubmit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { JQMessage } from 'qcpt';
import { QBtn } from 'quasar';

const showSuccess = () => {
  JQMessage.show({ 
    type: 'success', 
    content: '操作完成！' 
  });
};

const showError = () => {
  JQMessage.show({ 
    type: 'error', 
    content: '操作失败，请重试' 
  });
};

const showWarn = () => {
  JQMessage.show({ 
    type: 'warn', 
    content: '请检查您的输入' 
  });
};

const showSuccessNotify = () => {
  JQMessage.show({
    type: 'success',
    content: '操作完成！',
    isNotify: true
  });
};

const showErrorNotify = () => {
  JQMessage.show({
    type: 'error',
    content: '操作失败，请重试',
    isNotify: true
  });
};

const showWarnNotify = () => {
  JQMessage.show({
    type: 'warn',
    content: '请检查您的输入',
    isNotify: true
  });
};

const showTop = () => {
  JQMessage.show({
    type: 'success',
    content: '顶部消息',
    position: 'top'
  });
};

const showBottom = () => {
  JQMessage.show({
    type: 'success',
    content: '底部消息',
    position: 'bottom'
  });
};

const showTopLeft = () => {
  JQMessage.show({
    type: 'success',
    content: '左上角消息',
    position: 'top-left'
  });
};

const showTopRight = () => {
  JQMessage.show({
    type: 'success',
    content: '右上角消息',
    position: 'top-right'
  });
};

const handleSave = () => {
  // 模拟保存操作
  setTimeout(() => {
    JQMessage.show({
      type: 'success',
      content: '保存成功',
      position: 'top'
    });
  }, 500);
};

const handleDelete = () => {
  // 模拟删除操作
  setTimeout(() => {
    JQMessage.show({
      type: 'error',
      content: '删除失败，请重试',
      position: 'top'
    });
  }, 500);
};

const handleSubmit = () => {
  // 模拟提交操作
  setTimeout(() => {
    JQMessage.show({
      type: 'success',
      content: '提交成功',
      position: 'top',
      isNotify: true
    });
  }, 500);
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
