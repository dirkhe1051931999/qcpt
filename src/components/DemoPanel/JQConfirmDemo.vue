<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">点击按钮后弹出确认框，点击确认后触发 confirm 事件</p>
        <JQConfirm
          title="确认删除"
          confirm-text="删除"
          cancel-text="取消"
          @confirm="handleConfirm"
        >
          <q-btn label="删除" color="negative" />
        </JQConfirm>
        <div class="demo-value">
          <p><strong>确认次数:</strong> {{ confirmCount }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>使用默认文本</h4>
        <p class="demo-hint">不传入 confirmText 和 cancelText 时使用 i18n 默认值</p>
        <JQConfirm
          title="确认操作"
          @confirm="handleDefaultConfirm"
        >
          <q-btn label="确认操作" color="primary" />
        </JQConfirm>
      </div>

      <div class="demo-section">
        <h4>自定义按钮文本</h4>
        <p class="demo-hint">通过 confirmText 和 cancelText 自定义按钮文本</p>
        <JQConfirm
          title="确认提交"
          confirm-text="提交"
          cancel-text="我再想想"
          @confirm="handleCustomConfirm"
        >
          <q-btn label="提交表单" color="primary" />
        </JQConfirm>
      </div>

      <div class="demo-section">
        <h4>实际应用场景</h4>
        <p class="demo-hint">在操作按钮上添加确认提示，防止误操作</p>
        <div class="demo-card">
          <div class="button-group">
            <JQConfirm
              title="确认删除"
              confirm-text="删除"
              cancel-text="取消"
              @confirm="handleDelete"
            >
              <q-btn label="删除用户" color="negative" />
            </JQConfirm>
            <JQConfirm
              title="确认重置"
              confirm-text="重置"
              cancel-text="取消"
              @confirm="handleReset"
            >
              <q-btn label="重置密码" color="warning" />
            </JQConfirm>
            <JQConfirm
              title="确认发布"
              confirm-text="发布"
              cancel-text="取消"
              @confirm="handlePublish"
            >
              <q-btn label="发布文章" color="positive" />
            </JQConfirm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQConfirm } from 'qcpt';
import { QBtn } from 'quasar';

const confirmCount = ref(0);

const handleConfirm = () => {
  confirmCount.value++;
  console.log('确认删除');
};

const handleDefaultConfirm = () => {
  console.log('确认操作');
};

const handleCustomConfirm = () => {
  console.log('提交表单');
};

const handleDelete = () => {
  console.log('删除用户');
};

const handleReset = () => {
  console.log('重置密码');
};

const handlePublish = () => {
  console.log('发布文章');
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
