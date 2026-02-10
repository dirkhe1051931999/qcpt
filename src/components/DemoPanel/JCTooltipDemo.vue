<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">最简单的用法，鼠标悬停在元素上显示提示。</p>
        <div class="demo-flex-center">
          <JCTooltip content="这是提示内容">
            <JQButton label="悬停查看提示" />
          </JCTooltip>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 默认在顶部显示，深色主题，悬停触发</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>位置</h4>
        <p class="demo-hint">通过 placement 属性设置提示框位置，支持 12 种位置。</p>
        <div class="demo-placement-container">
          <div class="demo-placement-row">
            <JCTooltip content="顶部提示" placement="top">
              <JQButton label="Top" size="sm" />
            </JCTooltip>
            <JCTooltip content="顶部开始" placement="top-start">
              <JQButton label="Top Start" size="sm" />
            </JCTooltip>
            <JCTooltip content="顶部结束" placement="top-end">
              <JQButton label="Top End" size="sm" />
            </JCTooltip>
          </div>
          <div class="demo-placement-row">
            <JCTooltip content="左侧提示" placement="left">
              <JQButton label="Left" size="sm" />
            </JCTooltip>
            <div style="flex: 1;"></div>
            <JCTooltip content="右侧提示" placement="right">
              <JQButton label="Right" size="sm" />
            </JCTooltip>
          </div>
          <div class="demo-placement-row">
            <JCTooltip content="底部提示" placement="bottom">
              <JQButton label="Bottom" size="sm" />
            </JCTooltip>
            <JCTooltip content="底部开始" placement="bottom-start">
              <JQButton label="Bottom Start" size="sm" />
            </JCTooltip>
            <JCTooltip content="底部结束" placement="bottom-end">
              <JQButton label="Bottom End" size="sm" />
            </JCTooltip>
          </div>
        </div>
        <div class="demo-value">
          <p><strong>支持的位置:</strong> top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>主题</h4>
        <p class="demo-hint">通过 effect 属性设置主题，支持 dark（深色）和 light（浅色）。</p>
        <div class="demo-flex-center">
          <JCTooltip content="深色主题" effect="dark">
            <JQButton label="Dark" />
          </JCTooltip>
          <JCTooltip content="浅色主题" effect="light" style="margin-left: 16px;">
            <JQButton label="Light" />
          </JCTooltip>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> dark 为默认主题，适合浅色背景；light 适合深色背景</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>触发方式</h4>
        <p class="demo-hint">通过 trigger 属性设置触发方式，支持 hover（悬停）、click（点击）和手动控制。</p>
        <div class="demo-flex-center">
          <JCTooltip content="悬停触发" trigger="hover">
            <JQButton label="Hover" />
          </JCTooltip>
          <JCTooltip content="点击触发" trigger="click" style="margin-left: 16px;">
            <JQButton label="Click" />
          </JCTooltip>
          <JCTooltip content="手动控制" v-model="manualVisible" style="margin-left: 16px;">
            <JQButton label="Manual" @click="manualVisible = !manualVisible" />
          </JCTooltip>
        </div>
        <div class="demo-value">
          <p><strong>当前手动控制状态:</strong> {{ manualVisible ? '显示' : '隐藏' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>延迟显示/隐藏</h4>
        <p class="demo-hint">通过 openDelay 和 closeDelay 设置延迟时间（毫秒）。</p>
        <div class="demo-flex-center">
          <JCTooltip 
            content="延迟显示和隐藏" 
            :open-delay="500"
            :close-delay="300"
          >
            <JQButton label="延迟提示" />
          </JCTooltip>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 延迟 500ms 显示，延迟 300ms 隐藏</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义内容</h4>
        <p class="demo-hint">使用 content 插槽自定义提示内容，支持 HTML 和组件。</p>
        <div class="demo-flex-center">
          <JCTooltip>
            <JQButton label="自定义内容" />
            <template #content>
              <div style="padding: 4px;">
                <strong style="display: block; margin-bottom: 4px;">标题</strong>
                <p style="margin: 0; font-size: 12px;">这是自定义的提示内容，支持多行文本和 HTML。</p>
              </div>
            </template>
          </JCTooltip>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 使用 content 插槽可以自定义提示内容的样式和结构</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用箭头</h4>
        <p class="demo-hint">通过 showArrow 属性控制是否显示箭头。</p>
        <div class="demo-flex-center">
          <JCTooltip content="无箭头提示" :show-arrow="false">
            <JQButton label="无箭头" />
          </JCTooltip>
          <JCTooltip content="有箭头提示" :show-arrow="true" style="margin-left: 16px;">
            <JQButton label="有箭头" />
          </JCTooltip>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 默认显示箭头，可以通过 showArrow 控制</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>最大宽度</h4>
        <p class="demo-hint">通过 maxWidth 属性设置提示框最大宽度，超出会自动换行。</p>
        <div class="demo-flex-center">
          <JCTooltip 
            content="这是一段很长的提示内容，会自动换行以适应最大宽度设置，确保内容完整显示。"
            max-width="200px"
          >
            <JQButton label="限制宽度" />
          </JCTooltip>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 设置 maxWidth 为 200px，内容超出会自动换行</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用状态</h4>
        <p class="demo-hint">通过 disabled 属性禁用提示框。</p>
        <div class="demo-flex-center">
          <JCTooltip content="禁用状态" :disabled="true">
            <JQButton label="禁用" />
          </JCTooltip>
          <JCTooltip content="启用状态" :disabled="false" style="margin-left: 16px;">
            <JQButton label="启用" />
          </JCTooltip>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> disabled 为 true 时，提示框不会显示</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCTooltip, JQButton } from 'qcpt';

const manualVisible = ref(false);
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.demo-placement-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px;
  min-height: 200px;
}

.demo-placement-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}





.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
