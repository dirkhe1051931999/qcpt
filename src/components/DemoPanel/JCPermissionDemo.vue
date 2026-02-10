<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">根据权限码控制内容的显示/隐藏（示例中 code 为空，默认显示）</p>
        <div class="button-group">
          <JCPermission code="">
            <q-btn label="编辑" color="primary" />
          </JCPermission>
          <JCPermission code="">
            <q-btn label="删除" color="negative" />
          </JCPermission>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 在实际应用中，code 应该传入真实的权限码</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>无权限时的显示</h4>
        <p class="demo-hint">默认情况下，无权限时会显示 '-'，可以通过 defaultContent 自定义</p>
        <div class="info-row">
          <span class="label">默认显示:</span>
          <JCPermission code="non-existent-permission" default-content="无权限">
            <q-btn label="编辑" />
          </JCPermission>
        </div>
        <div class="info-row">
          <span class="label">自定义显示:</span>
          <JCPermission code="non-existent-permission" default-content="🚫 无权限访问">
            <q-btn label="删除" />
          </JCPermission>
        </div>
      </div>

      <div class="demo-section">
        <h4>完全隐藏</h4>
        <p class="demo-hint">使用 rmDom 属性可以在无权限时完全隐藏元素（不渲染 DOM）</p>
        <JCPermission code="non-existent-permission" :rm-dom="true">
          <q-btn label="编辑" />
        </JCPermission>
        <div class="demo-value">
          <p><strong>说明:</strong> 当无权限时，整个按钮不会渲染到 DOM 中</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>本地权限列表</h4>
        <p class="demo-hint">可以通过 pagePermissionId 传入本地权限列表（优先级高于全局注入）</p>
        <div class="button-group">
          <JCPermission 
            code="user-edit"
            :page-permission-id="['user-view', 'user-edit']"
          >
            <q-btn label="编辑用户" color="primary" />
          </JCPermission>
          <JCPermission 
            code="user-delete"
            :page-permission-id="['user-view', 'user-edit']"
          >
            <q-btn label="删除用户" color="negative" />
          </JCPermission>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> user-edit 有权限显示，user-delete 无权限显示默认内容</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>无权限码时默认显示</h4>
        <p class="demo-hint">如果 code 为 null、undefined 或空字符串，组件会默认显示内容</p>
        <div class="button-group">
          <JCPermission :code="null">
            <q-btn label="总是显示" color="primary" />
          </JCPermission>
          <JCPermission code="">
            <q-btn label="也总是显示" color="primary" />
          </JCPermission>
        </div>
      </div>

      <div class="demo-section">
        <h4>实际应用场景</h4>
        <p class="demo-hint">在页面中根据用户权限控制按钮、菜单等的显示</p>
        <div class="demo-card">
          <div class="button-group">
            <JCPermission code="user-view">
              <q-btn label="查看" color="primary" flat />
            </JCPermission>
            <JCPermission code="user-edit" default-content="">
              <q-btn label="编辑" color="primary" flat />
            </JCPermission>
            <JCPermission code="user-delete" :rm-dom="true">
              <q-btn label="删除" color="negative" flat />
            </JCPermission>
          </div>
          <div class="button-group" style="margin-top: 12px;">
            <JCPermission code="user-export">
              <q-btn label="导出" color="secondary" outline />
            </JCPermission>
            <JCPermission code="user-import">
              <q-btn label="导入" color="secondary" outline />
            </JCPermission>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { JCPermission } from 'qcpt';
import { QBtn } from 'quasar';
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
