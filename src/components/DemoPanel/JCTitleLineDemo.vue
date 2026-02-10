<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">最简单的用法，只需要提供 label 属性即可显示标题分隔线。</p>
        <JCTitleLine label="基础标题" />
        <div class="demo-content">
          <p>这是标题下方的内容区域</p>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 标题左侧显示文本，右侧有一条横线延伸</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>带额外内容</h4>
        <p class="demo-hint">使用默认插槽在标题右侧添加额外内容，如按钮、链接等。</p>
        <JCTitleLine label="带操作的标题">
          <JQButton label="编辑" size="sm" type="secondary" />
        </JCTitleLine>
        <div class="demo-content">
          <p>这是标题下方的内容区域</p>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 标题右侧可以添加操作按钮或其他内容</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>多个操作按钮</h4>
        <p class="demo-hint">可以在标题右侧添加多个操作按钮。</p>
        <JCTitleLine label="多操作标题">
          <JQButton label="新增" size="sm" type="primary" style="margin-right: 8px;" />
          <JQButton label="导入" size="sm" type="secondary" />
        </JCTitleLine>
        <div class="demo-content">
          <p>这是标题下方的内容区域</p>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 可以添加多个按钮，按钮之间可以设置间距</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>带链接的标题</h4>
        <p class="demo-hint">可以在标题右侧添加链接或其他元素。</p>
        <JCTitleLine label="带链接的标题">
          <a href="#" style="color: #1976d2; text-decoration: none; font-size: 13px;">查看全部</a>
        </JCTitleLine>
        <div class="demo-content">
          <p>这是标题下方的内容区域</p>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 可以添加链接、文本或其他任意内容</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>带图标的标题</h4>
        <p class="demo-hint">可以在标题右侧添加图标和文本组合。</p>
        <JCTitleLine label="带图标的标题">
          <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 13px; color: #666;">
            <span>📊</span>
            <span>统计</span>
          </span>
        </JCTitleLine>
        <div class="demo-content">
          <p>这是标题下方的内容区域</p>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 可以添加图标、文本等任意组合</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>实际应用场景</h4>
        <p class="demo-hint">在实际页面中使用标题分隔线来分隔不同的内容区块。</p>
        <div class="demo-scenario">
          <JCTitleLine label="基本信息">
            <JQButton label="编辑" size="sm" type="secondary" />
          </JCTitleLine>
          <div class="demo-content">
            <p>姓名: 张三</p>
            <p>年龄: 25</p>
            <p>邮箱: zhangsan@example.com</p>
          </div>

          <JCTitleLine label="联系方式" style="margin-top: 32px;">
            <a href="#" style="color: #1976d2; text-decoration: none; font-size: 13px;">添加</a>
          </JCTitleLine>
          <div class="demo-content">
            <p>电话: 13800138000</p>
            <p>地址: 北京市朝阳区</p>
          </div>

          <JCTitleLine label="其他信息" style="margin-top: 32px;" />
          <div class="demo-content">
            <p>备注: 这是一些其他信息</p>
          </div>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 在实际应用中，标题分隔线常用于分隔表单的不同区块</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>不同长度的标题</h4>
        <p class="demo-hint">标题可以有不同的长度，横线会自动延伸。</p>
        <JCTitleLine label="短标题" />
        <div class="demo-content">
          <p>短标题示例</p>
        </div>

        <JCTitleLine label="这是一个比较长的标题文本" style="margin-top: 24px;" />
        <div class="demo-content">
          <p>长标题示例</p>
        </div>

        <JCTitleLine label="这是一个非常非常非常长的标题文本，用来测试长标题的显示效果" style="margin-top: 24px;" />
        <div class="demo-content">
          <p>超长标题示例</p>
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 无论标题多长，横线都会自动延伸至容器边缘</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { JCTitleLine, JQButton } from 'qcpt';
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-content {
  margin-top: 16px;
  padding: 12px;
  background: rgba(128, 128, 128, 0.05);
  border-radius: 4px;
}

.demo-content p {
  margin: 4px 0;
  font-size: 13px;
  color: var(--sl-color-text-accent);
}

.demo-content p:first-child {
  margin-top: 0;
}

.demo-content p:last-child {
  margin-bottom: 0;
}





.demo-value p:last-child {
  margin-bottom: 0;
}

.demo-scenario {
  padding: 16px;
  background: rgba(128, 128, 128, 0.02);
  border-radius: 4px;
}
</style>
