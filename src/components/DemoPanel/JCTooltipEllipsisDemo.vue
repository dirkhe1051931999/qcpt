<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">自动检测文本溢出，只有在溢出时才显示 tooltip。</p>
        <JCTooltipEllipsis 
          content="这是一段很长的文本，超出容器宽度时会显示省略号，鼠标悬停可查看完整内容"
          style="width: 200px;"
        />
        <div class="demo-value">
          <p><strong>说明:</strong> 文本超出容器宽度时自动显示省略号，悬停显示完整内容</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>单行省略</h4>
        <p class="demo-hint">默认单行省略（lines 为 1），超出宽度时显示省略号。</p>
        <JCTooltipEllipsis 
          content="这是一段很长的文本，超出容器宽度时会显示省略号，鼠标悬停可查看完整内容"
          style="width: 200px;"
          :lines="1"
        />
        <div class="demo-value">
          <p><strong>说明:</strong> 单行省略，超出部分用省略号表示</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>多行省略</h4>
        <p class="demo-hint">设置 lines 大于 1 可支持多行省略，最多显示指定行数。</p>
        <div style="margin-bottom: 16px;">
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>2 行省略:</strong></p>
          <JCTooltipEllipsis 
            content="这是一段很长的文本，超出容器宽度时会显示省略号。支持多行显示，最多显示指定的行数，超出部分会显示省略号。鼠标悬停可查看完整内容。"
            style="width: 200px;"
            :lines="2"
          />
        </div>
        <div>
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>3 行省略:</strong></p>
          <JCTooltipEllipsis 
            content="这是一段很长的文本，超出容器宽度时会显示省略号。支持多行显示，最多显示指定的行数，超出部分会显示省略号。鼠标悬停可查看完整内容。这是一段很长的文本，超出容器宽度时会显示省略号。"
            style="width: 200px;"
            :lines="3"
          />
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 多行省略时，超出指定行数的部分会显示省略号</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义内容</h4>
        <p class="demo-hint">使用插槽自定义显示内容，而不是使用 content 属性。</p>
        <JCTooltipEllipsis 
          style="width: 200px;"
          :lines="2"
        >
          这是一段很长的文本，超出容器宽度时会显示省略号。支持多行显示，最多显示指定的行数，超出部分会显示省略号。
        </JCTooltipEllipsis>
        <div class="demo-value">
          <p><strong>说明:</strong> 使用插槽可以更灵活地控制内容</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义提示位置和主题</h4>
        <p class="demo-hint">可以自定义 tooltip 的位置、主题和最大宽度。</p>
        <div style="margin-bottom: 16px;">
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>底部显示，浅色主题:</strong></p>
          <JCTooltipEllipsis 
            content="这是一段很长的文本，超出容器宽度时会显示省略号"
            style="width: 200px;"
            placement="bottom"
            effect="light"
            max-width="300px"
          />
        </div>
        <div>
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>右侧显示，深色主题:</strong></p>
          <JCTooltipEllipsis 
            content="这是一段很长的文本，超出容器宽度时会显示省略号"
            style="width: 200px;"
            placement="right"
            effect="dark"
          />
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 可以自定义 tooltip 的位置、主题和最大宽度</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自动检测溢出</h4>
        <p class="demo-hint">组件会自动检测文本是否溢出，只有在溢出时才显示 tooltip。</p>
        <div style="margin-bottom: 16px;">
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>文本未溢出（不显示 tooltip）:</strong></p>
          <JCTooltipEllipsis 
            content="短文本"
            style="width: 200px;"
          />
        </div>
        <div>
          <p style="margin-bottom: 8px; font-size: 13px; color: var(--sl-color-text-accent);"><strong>文本溢出（显示 tooltip）:</strong></p>
          <JCTooltipEllipsis 
            content="这是一段很长的文本，超出容器宽度时会显示省略号，鼠标悬停可查看完整内容"
            style="width: 200px;"
          />
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 组件会自动检测，只有在文本溢出时才显示 tooltip</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>实际应用场景</h4>
        <p class="demo-hint">在表格、列表等场景中使用，自动处理文本溢出。</p>
        <div class="demo-table">
          <div class="demo-table-row">
            <div class="demo-table-cell" style="width: 100px;"><strong>姓名</strong></div>
            <div class="demo-table-cell" style="flex: 1;">
              <JCTooltipEllipsis 
                content="这是一个非常非常非常长的姓名，超出容器宽度时会显示省略号"
                style="width: 100%;"
              />
            </div>
          </div>
          <div class="demo-table-row">
            <div class="demo-table-cell" style="width: 100px;"><strong>描述</strong></div>
            <div class="demo-table-cell" style="flex: 1;">
              <JCTooltipEllipsis 
                content="这是一段很长的描述文本，超出容器宽度时会显示省略号。支持多行显示，最多显示指定的行数，超出部分会显示省略号。"
                style="width: 100%;"
                :lines="2"
              />
            </div>
          </div>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 常用于表格、列表等场景，自动处理文本溢出</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { JCTooltipEllipsis } from 'qcpt';
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}

.demo-table {
  border: 1px solid rgba(128, 128, 128, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.demo-table-row {
  display: flex;
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);
}

.demo-table-row:last-child {
  border-bottom: none;
}

.demo-table-cell {
  padding: 12px;
  font-size: 13px;
  color: var(--sl-color-text);
}
</style>
