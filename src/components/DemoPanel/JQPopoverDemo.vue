<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">最简单的用法，使用 title 属性设置弹出内容。</p>
        <JQPopover title="这是提示信息">
          <JQButton label="点击我" />
        </JQPopover>
        <div class="demo-value">
          <p><strong>说明:</strong> 默认点击触发，显示 title 内容</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义内容</h4>
        <p class="demo-hint">使用 content 插槽自定义弹出内容，支持 HTML 和组件。</p>
        <JQPopover>
          <JQButton label="自定义内容" />
          <template #content>
            <div style="padding: 4px;">
              <strong style="display: block; margin-bottom: 8px;">自定义标题</strong>
              <p style="margin: 0; font-size: 13px; color: #666;">这是自定义的弹出内容，支持多行文本和 HTML。</p>
            </div>
          </template>
        </JQPopover>
        <div class="demo-value">
          <p><strong>说明:</strong> 使用 content 插槽可以自定义弹出内容的样式和结构</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>悬停触发</h4>
        <p class="demo-hint">使用 trigger="hover" 启用悬停触发。</p>
        <JQPopover title="悬停查看提示信息" trigger="hover">
          <span style="color: #1976d2; cursor: pointer; text-decoration: underline;">悬停我</span>
        </JQPopover>
        <div class="demo-value">
          <p><strong>说明:</strong> 鼠标悬停时显示，移开时隐藏</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>点击触发（默认）</h4>
        <p class="demo-hint">默认使用点击触发，点击元素显示/隐藏弹出内容。</p>
        <JQPopover title="点击查看提示信息" trigger="click">
          <JQButton label="点击我" />
        </JQPopover>
        <div class="demo-value">
          <p><strong>说明:</strong> 点击按钮显示，再次点击隐藏</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义宽度</h4>
        <p class="demo-hint">使用 width 属性自定义弹出框宽度，可以是数字（px）或字符串。</p>
        <div style="display: flex; gap: 16px; align-items: center;">
          <JQPopover title="宽度 200px（默认）" :width="200">
            <JQButton label="200px" size="sm" />
          </JQPopover>
          <JQPopover title="宽度 300px" :width="300">
            <JQButton label="300px" size="sm" />
          </JQPopover>
          <JQPopover title="宽度 400px" :width="400">
            <JQButton label="400px" size="sm" />
          </JQPopover>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 可以设置不同的宽度，数字单位为 px</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>复杂内容</h4>
        <p class="demo-hint">弹出内容可以包含列表、链接等复杂内容。</p>
        <JQPopover>
          <JQButton label="查看菜单" />
          <template #content>
            <div style="padding: 8px;">
              <div style="font-weight: 600; margin-bottom: 8px;">操作菜单</div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <a href="#" style="color: #1976d2; text-decoration: none; font-size: 13px;">编辑</a>
                <a href="#" style="color: #1976d2; text-decoration: none; font-size: 13px;">删除</a>
                <a href="#" style="color: #1976d2; text-decoration: none; font-size: 13px;">查看详情</a>
              </div>
            </div>
          </template>
        </JQPopover>
        <div class="demo-value">
          <p><strong>说明:</strong> 弹出内容可以包含任意 HTML 和组件</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>实际应用场景</h4>
        <p class="demo-hint">在实际页面中使用弹出内容组件。</p>
        <div style="display: flex; gap: 16px; align-items: center;">
          <JQPopover title="用户信息：张三">
            <span style="color: #1976d2; cursor: pointer;">查看用户信息</span>
          </JQPopover>
          
          <JQPopover trigger="hover">
            <span style="color: #666; cursor: help;">❓</span>
            <template #content>
              <div style="padding: 4px; font-size: 13px;">
                这是帮助信息，鼠标悬停即可查看
              </div>
            </template>
          </JQPopover>
          
          <JQPopover>
            <JQButton label="更多操作" type="secondary" size="sm" />
            <template #content>
              <div style="padding: 8px;">
                <div style="font-weight: 600; margin-bottom: 8px;">操作</div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <button style="text-align: left; padding: 4px 8px; border: none; background: none; cursor: pointer; font-size: 13px;">编辑</button>
                  <button style="text-align: left; padding: 4px 8px; border: none; background: none; cursor: pointer; font-size: 13px;">删除</button>
                </div>
              </div>
            </template>
          </JQPopover>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 常用于用户信息提示、帮助信息、操作菜单等场景</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { JQPopover, JQButton } from 'qcpt';
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
