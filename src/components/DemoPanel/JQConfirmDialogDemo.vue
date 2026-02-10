<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">使用 JQConfirmDialog.show() 显示确认对话框</p>
        <q-btn label="显示确认对话框" color="primary" @click="showBasicDialog" />
        <div class="demo-value">
          <p><strong>说明:</strong> 点击确认返回 true，取消返回 false</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>删除确认对话框</h4>
        <p class="demo-hint">使用 isDelete: true 显示删除样式的确认对话框</p>
        <q-btn label="删除确认" color="negative" @click="showDeleteDialog" />
      </div>

      <div class="demo-section">
        <h4>自定义颜色</h4>
        <p class="demo-hint">使用 color 属性自定义确认按钮的颜色</p>
        <q-btn label="自定义颜色" color="warning" @click="showCustomColorDialog" />
      </div>

      <div class="demo-section">
        <h4>隐藏取消按钮</h4>
        <p class="demo-hint">使用 cancel: false 隐藏取消按钮</p>
        <q-btn label="隐藏取消按钮" color="info" @click="showNoCancelDialog" />
      </div>

      <div class="demo-section">
        <h4>自定义图标</h4>
        <p class="demo-hint">使用 icon 属性自定义图标（字符串图标名）</p>
        <q-btn label="自定义图标" color="primary" @click="showCustomIconDialog" />
      </div>

      <div class="demo-section">
        <h4>隐藏关闭按钮</h4>
        <p class="demo-hint">使用 showClose: false 隐藏右上角关闭按钮</p>
        <q-btn label="隐藏关闭按钮" color="primary" @click="showNoCloseDialog" />
      </div>

      <div class="demo-section">
        <h4>实际应用场景</h4>
        <p class="demo-hint">在删除、重置等危险操作前显示确认对话框</p>
        <div class="demo-card">
          <div class="button-group">
            <q-btn label="删除用户" color="negative" @click="handleDeleteUser" />
            <q-btn label="重置数据" color="warning" @click="handleResetData" />
            <q-btn label="发布内容" color="positive" @click="handlePublishContent" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { JQConfirmDialog } from 'qcpt';
import { QBtn } from 'quasar';

const showBasicDialog = async () => {
  try {
    const confirmed = await JQConfirmDialog.show({
      title: '确认操作',
      content: '确定要执行此操作吗？',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    });
    console.log('用户确认:', confirmed);
  } catch (error) {
    console.log('用户取消了操作');
  }
};

const showDeleteDialog = async () => {
  try {
    const confirmed = await JQConfirmDialog.show({
      title: '确认删除',
      content: '确定要删除此项吗？此操作无法撤销。',
      isDelete: true
    });
    if (confirmed) {
      console.log('执行删除操作');
    }
  } catch (error) {
    console.log('用户取消了删除');
  }
};

const showCustomColorDialog = async () => {
  try {
    const confirmed = await JQConfirmDialog.show({
      title: '确认操作',
      content: '确定要执行此操作吗？',
      color: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    });
    console.log('用户确认:', confirmed);
  } catch (error) {
    console.log('用户取消了操作');
  }
};

const showNoCancelDialog = async () => {
  try {
    const confirmed = await JQConfirmDialog.show({
      title: '提示',
      content: '操作已完成',
      cancel: false,
      confirmButtonText: '知道了'
    });
    console.log('用户确认:', confirmed);
  } catch (error) {
    console.log('对话框被关闭');
  }
};

const showCustomIconDialog = async () => {
  try {
    const confirmed = await JQConfirmDialog.show({
      title: '确认操作',
      content: '确定要执行此操作吗？',
      icon: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    });
    console.log('用户确认:', confirmed);
  } catch (error) {
    console.log('用户取消了操作');
  }
};

const showNoCloseDialog = async () => {
  try {
    const confirmed = await JQConfirmDialog.show({
      title: '确认操作',
      content: '确定要执行此操作吗？',
      showClose: false,
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    });
    console.log('用户确认:', confirmed);
  } catch (error) {
    console.log('用户取消了操作');
  }
};

const handleDeleteUser = async () => {
  try {
    const confirmed = await JQConfirmDialog.show({
      title: '确认删除',
      content: '确定要删除此用户吗？此操作无法撤销。',
      isDelete: true,
      confirmButtonText: '删除',
      cancelButtonText: '取消'
    });
    if (confirmed) {
      console.log('删除用户');
      // 执行删除操作
    }
  } catch (error) {
    console.log('用户取消了删除');
  }
};

const handleResetData = async () => {
  try {
    const confirmed = await JQConfirmDialog.show({
      title: '确认重置',
      content: '确定要重置数据吗？所有未保存的更改将丢失。',
      color: 'warning',
      confirmButtonText: '重置',
      cancelButtonText: '取消'
    });
    if (confirmed) {
      console.log('重置数据');
      // 执行重置操作
    }
  } catch (error) {
    console.log('用户取消了重置');
  }
};

const handlePublishContent = async () => {
  try {
    const confirmed = await JQConfirmDialog.show({
      title: '确认发布',
      content: '确定要发布此内容吗？',
      confirmButtonText: '发布',
      cancelButtonText: '取消'
    });
    if (confirmed) {
      console.log('发布内容');
      // 执行发布操作
    }
  } catch (error) {
    console.log('用户取消了发布');
  }
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
