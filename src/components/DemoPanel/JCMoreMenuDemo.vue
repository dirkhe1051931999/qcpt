<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">点击更多图标显示操作菜单</p>
        <JCMoreMenu :actions="basicActions" :item="currentItem" />
        <div class="demo-value">
          <p><strong>说明:</strong> 点击菜单项会在控制台输出日志</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>动态显示/隐藏</h4>
        <p class="demo-hint">使用 visible 属性动态控制菜单项的显示</p>
        <JCMoreMenu :actions="visibleActions" :item="currentItem" />
        <div class="demo-value">
          <p><strong>说明:</strong> 编辑按钮只在 status 为 'active' 时显示</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用菜单项</h4>
        <p class="demo-hint">使用 disabled 属性禁用菜单项</p>
        <JCMoreMenu :actions="disabledActions" :item="currentItem" />
      </div>

      <div class="demo-section">
        <h4>自定义图标</h4>
        <p class="demo-hint">使用插槽自定义菜单项图标（需要设置 action.id）</p>
        <JCMoreMenu :actions="iconActions" :item="currentItem">
          <template #menu-icon-edit="{ action, item }">
            <q-icon name="edit" color="primary" />
          </template>
          <template #menu-icon-delete="{ action, item }">
            <q-icon name="delete" color="negative" />
          </template>
        </JCMoreMenu>
      </div>

      <div class="demo-section">
        <h4>动态标签</h4>
        <p class="demo-hint">使用函数形式的 label 属性实现动态标签</p>
        <JCMoreMenu :actions="dynamicLabelActions" :item="currentItem" />
      </div>

      <div class="demo-section">
        <h4>自定义触发按钮</h4>
        <p class="demo-hint">使用 trigger 插槽自定义触发按钮</p>
        <JCMoreMenu :actions="basicActions" :item="currentItem">
          <template #trigger>
            <q-btn icon="more_vert" flat dense round />
          </template>
        </JCMoreMenu>
      </div>

      <div class="demo-section">
        <h4>监听 action 事件</h4>
        <p class="demo-hint">使用 @action 事件监听菜单项点击</p>
        <JCMoreMenu 
          :actions="basicActions" 
          :item="currentItem"
          @action="handleAction"
        />
        <div class="demo-value">
          <p><strong>最后点击:</strong> {{ lastAction }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>不同尺寸 (size)</h4>
        <p class="demo-hint">使用 size 属性控制菜单尺寸和定位方式</p>
        <div class="size-comparison">
          <div class="size-item">
            <div class="size-label">
              <strong>size="md"</strong> (默认)
              <span class="size-desc">• 自适应宽度 (fit=true)</span>
              <span class="size-desc">• 紧凑显示</span>
            </div>
            <div class="size-demo">
              <JCMoreMenu :actions="basicActions" :item="currentItem" size="md" />
            </div>
          </div>
          <div class="size-item">
            <div class="size-label">
              <strong>size="lg"</strong>
              <span class="size-desc">• 固定最小宽度 (80px)</span>
              <span class="size-desc">• 自定义偏移量 [5, 10]</span>
              <span class="size-desc">• 锚点: bottom left</span>
            </div>
            <div class="size-demo">
              <JCMoreMenu :actions="basicActions" :item="currentItem" size="lg" />
            </div>
          </div>
        </div>
        <div class="demo-value" style="margin-top: 16px;">
          <p><strong>说明:</strong></p>
          <ul style="margin: 8px 0; padding-left: 20px;">
            <li><code>size="md"</code>: 适合表格行内使用，菜单宽度自适应内容</li>
            <li><code>size="lg"</code>: 适合独立使用，菜单有固定最小宽度和偏移量</li>
          </ul>
        </div>
      </div>

      <div class="demo-section">
        <h4>实际应用场景 - 表格操作列</h4>
        <p class="demo-hint">在表格中为每行数据提供操作菜单，推荐使用 size="md"</p>
        <div class="table-wrapper">
          <table class="demo-table">
            <thead>
              <tr>
                <th>用户名</th>
                <th>状态</th>
                <th>角色</th>
                <th style="width: 80px; text-align: center;">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>张三</td>
                <td><span class="status-badge status-active">激活</span></td>
                <td>管理员</td>
                <td style="text-align: center;">
                  <JCMoreMenu :actions="tableActions" :item="{ id: 1, name: '张三', status: 'active' }" size="md">
                    <template #menu-icon-edit>
                      <q-icon name="edit" color="primary" />
                    </template>
                    <template #menu-icon-delete>
                      <q-icon name="delete" color="negative" />
                    </template>
                  </JCMoreMenu>
                </td>
              </tr>
              <tr>
                <td>李四</td>
                <td><span class="status-badge status-inactive">未激活</span></td>
                <td>编辑者</td>
                <td style="text-align: center;">
                  <JCMoreMenu :actions="tableActions" :item="{ id: 2, name: '李四', status: 'inactive' }" size="md">
                    <template #menu-icon-edit>
                      <q-icon name="edit" color="primary" />
                    </template>
                    <template #menu-icon-delete>
                      <q-icon name="delete" color="negative" />
                    </template>
                  </JCMoreMenu>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="demo-value" style="margin-top: 12px;">
          <p><strong>提示:</strong> 表格操作列使用 <code>size="md"</code> 可以让菜单更紧凑，节省空间</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>尺寸对比 - 同一场景</h4>
        <p class="demo-hint">对比 md 和 lg 在相同菜单项下的显示效果</p>
        <div class="comparison-wrapper">
          <div class="comparison-item">
            <div class="comparison-header">size="md" (表格场景)</div>
            <div class="comparison-demo">
              <div class="mock-table-cell">
                <span>张三 (管理员)</span>
                <JCMoreMenu :actions="comparisonActions" :item="currentItem" size="md" />
              </div>
            </div>
            <div class="comparison-note">紧凑布局，适合行内显示</div>
          </div>
          <div class="comparison-item">
            <div class="comparison-header">size="lg" (独立使用)</div>
            <div class="comparison-demo">
              <div class="mock-card">
                <div class="mock-card-content">
                  <strong>用户卡片</strong>
                  <p>张三 - 管理员</p>
                </div>
                <JCMoreMenu :actions="comparisonActions" :item="currentItem" size="lg" />
              </div>
            </div>
            <div class="comparison-note">较大间距，适合卡片、独立区域</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCMoreMenu } from 'qcpt';
import type { JCMoreMenuAction } from 'qcpt';
import { QIcon, QBtn } from 'quasar';

const currentItem = ref({ id: 1, name: '测试项', status: 'active', type: 'user' });
const lastAction = ref('');

const basicActions = ref<JCMoreMenuAction[]>([
  { 
    label: '编辑', 
    onClick: (item) => console.log('编辑', item) 
  },
  { 
    label: '删除', 
    onClick: (item) => console.log('删除', item) 
  }
]);

const visibleActions = ref<JCMoreMenuAction[]>([
  { 
    label: '编辑',
    visible: (item) => item.status === 'active',
    onClick: (item) => console.log('编辑', item) 
  },
  { 
    label: '删除',
    visible: true,
    onClick: (item) => console.log('删除', item) 
  }
]);

const disabledActions = ref<JCMoreMenuAction[]>([
  { 
    label: '编辑',
    disabled: false,
    onClick: (item) => console.log('编辑', item) 
  },
  { 
    label: '删除',
    disabled: (item) => item.status === 'active',
    onClick: (item) => console.log('删除', item) 
  }
]);

const iconActions = ref<JCMoreMenuAction[]>([
  { 
    id: 'edit',
    label: '编辑',
    onClick: (item) => console.log('编辑', item) 
  },
  { 
    id: 'delete',
    label: '删除',
    onClick: (item) => console.log('删除', item) 
  }
]);

const dynamicLabelActions = ref<JCMoreMenuAction[]>([
  { 
    label: ({ item }) => item.type === 'user' ? '编辑用户' : '编辑',
    onClick: (item) => console.log('编辑', item) 
  },
  { 
    label: '删除',
    onClick: (item) => console.log('删除', item) 
  }
]);

const tableActions = ref<JCMoreMenuAction[]>([
  { 
    id: 'edit',
    label: '编辑',
    visible: (item) => item.status === 'active',
    onClick: (item) => console.log('编辑', item) 
  },
  { 
    id: 'delete',
    label: '删除',
    onClick: (item) => console.log('删除', item) 
  }
]);

const comparisonActions = ref<JCMoreMenuAction[]>([
  { 
    label: '查看详情',
    onClick: (item) => console.log('查看详情', item) 
  },
  { 
    label: '编辑信息',
    onClick: (item) => console.log('编辑信息', item) 
  },
  { 
    label: '权限设置',
    onClick: (item) => console.log('权限设置', item) 
  },
  { 
    label: '删除用户',
    onClick: (item) => console.log('删除用户', item) 
  }
]);

const handleAction = ({ action, item }: { action: JCMoreMenuAction, item: any }) => {
  const label = typeof action.label === 'function' ? action.label({ item, action }) : action.label;
  lastAction.value = label || '';
  console.log('Action clicked:', label, item);
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// JCMoreMenu 特定样式

.size-comparison {
  display: flex;
  gap: 32px;
  margin-top: 16px;
}

.size-item {
  flex: 1;
  background: #f5f6fa;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.size-label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.size-label strong {
  font-size: 15px;
  color: #0B5CFF;
  margin-bottom: 8px;
  display: block;
}

.size-desc {
  font-size: 12px;
  color: #666;
  padding-left: 8px;
}

.size-demo {
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 24px;
  border-radius: 6px;
  border: 1px dashed #ddd;
  min-height: 60px;
}

.demo-value ul {
  list-style-type: disc;
}

.demo-value li {
  margin: 4px 0;
  font-size: 13px;
  color: #666;
}

.demo-value code {
  background: #f5f6fa;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  color: #0B5CFF;
  font-family: 'Courier New', monospace;
}

/* 表格样式 */
.table-wrapper {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.demo-table th {
  background: #f5f6fa;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 13px;
  color: #2c3e50;
  border-bottom: 2px solid #e0e0e0;
}

.demo-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
  color: #666;
}

.demo-table tbody tr:hover {
  background: #fafafa;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-active {
  background: #e8f5e9;
  color: #2da641;
}

.status-inactive {
  background: #f5f5f5;
  color: #999;
}

/* 对比样式 */
.comparison-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 16px;
}

.comparison-item {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.comparison-header {
  background: #f5f6fa;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14px;
  color: #2c3e50;
  border-bottom: 2px solid #e0e0e0;
}

.comparison-demo {
  padding: 24px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comparison-note {
  background: #fffbea;
  border-top: 1px solid #ffd700;
  padding: 8px 16px;
  font-size: 12px;
  color: #856404;
  text-align: center;
}

.mock-table-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 300px;
  padding: 8px 12px;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.mock-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 300px;
  padding: 16px;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.mock-card-content {
  flex: 1;
}

.mock-card-content strong {
  display: block;
  font-size: 14px;
  color: #2c3e50;
  margin-bottom: 4px;
}

.mock-card-content p {
  margin: 0;
  font-size: 13px;
  color: #666;
}
</style>
