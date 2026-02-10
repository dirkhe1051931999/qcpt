<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">最简单的表格用法，展示基本的数据列表。</p>
        <JQTable
          :columns="basicColumns"
          :rows="basicRows"
          row-key="id"
        />
        <div class="demo-value">
          <p><strong>数据行数:</strong> {{ basicRows.length }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>服务端分页</h4>
        <p class="demo-hint">最常见的用法：监听 pagination-change 事件，获取数据后更新 rows，并调用 setTotal 更新总数。</p>
        <JQTable
          ref="serverPaginationTableRef"
          :columns="serverPaginationColumns"
          :rows="serverPaginationRows"
          :loading="serverPaginationLoading"
          row-key="id"
          @pagination-change="handleServerPaginationChange"
        />
        <div class="demo-value">
          <p><strong>当前页码:</strong> {{ serverPaginationPage }}</p>
          <p style="margin-top: 4px;"><strong>每页条数:</strong> {{ serverPaginationPageSize }}</p>
          <p style="margin-top: 4px;"><strong>总数据量:</strong> {{ serverPaginationTotal }}</p>
          <p style="margin-top: 4px; font-size: 12px; color: #999;">提示：切换页码或每页条数时会触发 pagination-change 事件</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>多行文本省略（whiteSpace）</h4>
        <p class="demo-hint">使用 whiteSpace 属性控制单元格文本的最大行数（1-3行），超出后自动显示省略号和提示框。</p>
        <JQTable
          :columns="whiteSpaceColumns"
          :rows="whiteSpaceRows"
          row-key="id"
        />
        <div class="demo-value">
          <p><strong>说明:</strong> 描述列设置 whiteSpace: 2，最多显示 2 行；标题列设置 whiteSpace: 1，单行省略</p>
          <p style="margin-top: 4px;"><strong>提示:</strong> 鼠标悬停在省略的文本上可查看完整内容</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>宽度限制（limitWidth）</h4>
        <p class="demo-hint">使用 limitWidth 属性限制单元格的最大宽度，响应式：大屏（>1440px）默认 500px，小屏（≤1440px）默认 300px。</p>
        <JQTable
          :columns="limitWidthColumns"
          :rows="limitWidthRows"
          row-key="id"
        />
        <div class="demo-value">
          <p><strong>说明:</strong> 邮箱和 URL 列设置了 limitWidth，超出最大宽度时会自动换行</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>列级别宽度配置</h4>
        <p class="demo-hint">可以通过列级别的 cellMaxWidth 和 cellMaxWidthSmall 覆盖表格级别的配置。</p>
        <JQTable
          :columns="columnWidthColumns"
          :rows="columnWidthRows"
          row-key="id"
          :cell-max-width="500"
          :cell-max-width-small="300"
        />
        <div class="demo-value">
          <p><strong>说明:</strong> 邮箱列使用列级别的配置（大屏 800px，小屏 500px），覆盖表格级别的配置</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>固定列</h4>
        <p class="demo-hint">在列的 classes 或 headerClasses 中添加 table-cell--fix-left 或 table-cell--fix-right 类来固定列。固定列在横向滚动时会保持可见。</p>
        <div style="overflow-x: auto; max-width: 100%;">
          <JQTable
            :columns="fixedColumns"
            :rows="fixedRows"
            row-key="id"
          />
        </div>
        <div class="demo-value">
          <p><strong>说明:</strong> 第一列固定在左侧，最后一列固定在右侧，横向滚动时保持可见</p>
          <p style="margin-top: 4px;"><strong>提示:</strong> 需要在列的 classes 或 headerClasses 中添加 table-cell--fix-left 或 table-cell--fix-right</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>列点击（onClick）</h4>
        <p class="demo-hint">使用 onClick 属性使列可点击，配合 clickable 控制是否可点击。</p>
        <JQTable
          :columns="clickableColumns"
          :rows="clickableRows"
          row-key="id"
        />
        <div class="demo-value">
          <p><strong>点击次数:</strong> {{ clickCount }}</p>
          <p style="margin-top: 4px; font-size: 12px; color: #999;">提示：打开浏览器控制台查看点击事件输出</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>条件点击（clickable）</h4>
        <p class="demo-hint">使用 clickable 函数动态判断单元格是否可点击。</p>
        <JQTable
          :columns="conditionalClickableColumns"
          :rows="conditionalClickableRows"
          row-key="id"
        />
        <div class="demo-value">
          <p><strong>说明:</strong> 状态列只有在状态为 'active' 时才可点击</p>
          <p style="margin-top: 4px; font-size: 12px; color: #999;">提示：打开浏览器控制台查看点击事件输出</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义单元格（插槽）</h4>
        <p class="demo-hint">使用 body-cell-{name} 插槽自定义单元格渲染。</p>
        <JQTable
          :columns="slotColumns"
          :rows="slotRows"
          row-key="id"
        >
          <template #body-cell-status="{ row }">
            <q-td>
              <span 
                :style="{ 
                  color: row.status === 'active' ? '#4caf50' : '#999',
                  fontWeight: '600'
                }"
              >
                {{ row.status === 'active' ? '✓ 启用' : '✗ 禁用' }}
              </span>
            </q-td>
          </template>
          
          <template #body-cell-price="{ row }">
            <q-td>
              <span style="color: #1976d2; font-weight: 600; font-size: 16px;">
                ¥{{ row.price.toFixed(2) }}
              </span>
            </q-td>
          </template>
        </JQTable>
        <div class="demo-value">
          <p><strong>说明:</strong> 状态和价格列使用了自定义插槽渲染</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>行选择</h4>
        <p class="demo-hint">使用 v-model:selected 绑定选中的行。</p>
        <JQTable
          :columns="selectionColumns"
          :rows="selectionRows"
          v-model:selected="selectedRows"
          row-key="id"
        />
        <div class="demo-value">
          <p><strong>选中的行:</strong> {{ JSON.stringify(selectedRows.map(r => r.id)) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>加载状态</h4>
        <p class="demo-hint">使用 loading 属性显示加载状态。</p>
        <div style="margin-bottom: 12px;">
          <JQButton label="切换加载状态" @click="toggleLoading" />
        </div>
        <JQTable
          :columns="loadingColumns"
          :rows="loadingRows"
          :loading="tableLoading"
          row-key="id"
        />
        <div class="demo-value">
          <p><strong>加载状态:</strong> {{ tableLoading ? '加载中...' : '未加载' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>排序</h4>
        <p class="demo-hint">使用 sortable 属性启用列排序。</p>
        <JQTable
          :columns="sortableColumns"
          :rows="sortableRows"
          row-key="id"
        />
        <div class="demo-value">
          <p><strong>说明:</strong> ID 和年龄列启用了排序，点击列头可以排序</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>隐藏分页</h4>
        <p class="demo-hint">使用 hidePagination 属性隐藏底部分页组件。</p>
        <JQTable
          :columns="noPaginationColumns"
          :rows="noPaginationRows"
          row-key="id"
          hide-pagination
        />
        <div class="demo-value">
          <p><strong>说明:</strong> 分页组件已隐藏，适合不需要分页的场景</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>完整示例（用户列表）</h4>
        <p class="demo-hint">综合使用各种功能，展示一个完整的用户列表表格。</p>
        <JQTable
          ref="completeTableRef"
          :columns="completeColumns"
          :rows="completeRows"
          :loading="completeLoading"
          row-key="id"
          @pagination-change="handleCompletePaginationChange"
        >
          <template #body-cell-status="{ row }">
            <q-td>
              <span 
                :style="{ 
                  color: row.status === 'active' ? '#4caf50' : '#999',
                  fontWeight: '600'
                }"
              >
                {{ row.status === 'active' ? '✓ 启用' : '✗ 禁用' }}
              </span>
            </q-td>
          </template>
        </JQTable>
        <div class="demo-value">
          <p><strong>当前页码:</strong> {{ completePage }}</p>
          <p style="margin-top: 4px;"><strong>每页条数:</strong> {{ completePageSize }}</p>
          <p style="margin-top: 4px;"><strong>总数据量:</strong> {{ completeTotal }}</p>
          <p style="margin-top: 4px;"><strong>功能:</strong> 服务端分页、多行省略、列点击、自定义单元格、排序</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type ComponentPublicInstance } from 'vue';
import { JQTable, JQButton } from 'qcpt';

// 基础用法
const basicColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: '姓名', field: 'name', align: 'left' },
  { name: 'email', label: '邮箱', field: 'email', align: 'left' },
  { name: 'status', label: '状态', field: 'status', align: 'center' }
];

const basicRows = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', status: 'active' },
  { id: 2, name: '李四', email: 'lisi@example.com', status: 'disabled' },
  { id: 3, name: '王五', email: 'wangwu@example.com', status: 'active' }
]);

// 服务端分页
const serverPaginationTableRef = ref<ComponentPublicInstance | null>(null);
const serverPaginationLoading = ref(false);
const serverPaginationPage = ref(1);
const serverPaginationPageSize = ref(15);
const serverPaginationTotal = ref(50);
const serverPaginationRows = ref([
  { id: 1, name: '用户1', email: 'user1@example.com', status: 'active' },
  { id: 2, name: '用户2', email: 'user2@example.com', status: 'active' },
  { id: 3, name: '用户3', email: 'user3@example.com', status: 'disabled' }
]);

const serverPaginationColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'name', label: '姓名', field: 'name', align: 'left' },
  { name: 'email', label: '邮箱', field: 'email', align: 'left' },
  { name: 'status', label: '状态', field: 'status', align: 'center' }
];

const handleServerPaginationChange = async (pagination: { page: number; rowsPerPage: number }) => {
  serverPaginationLoading.value = true;
  serverPaginationPage.value = pagination.page;
  serverPaginationPageSize.value = pagination.rowsPerPage;
  
  // 模拟 API 请求
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 模拟数据
  const start = (pagination.page - 1) * pagination.rowsPerPage;
  const mockData = [];
  for (let i = 0; i < pagination.rowsPerPage; i++) {
    mockData.push({
      id: start + i + 1,
      name: `用户${start + i + 1}`,
      email: `user${start + i + 1}@example.com`,
      status: i % 2 === 0 ? 'active' : 'disabled'
    });
  }
  
  serverPaginationRows.value = mockData;
  
  // 设置总数
  if (serverPaginationTableRef.value && typeof (serverPaginationTableRef.value as any).setTotal === 'function') {
    (serverPaginationTableRef.value as any).setTotal(serverPaginationTotal.value);
  }
  
  serverPaginationLoading.value = false;
};

// 多行文本省略
const whiteSpaceColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'title', label: '标题', field: 'title', align: 'left', whiteSpace: 1 },
  { name: 'description', label: '描述', field: 'description', align: 'left', whiteSpace: 2 }
];

const whiteSpaceRows = ref([
  { 
    id: 1, 
    title: '这是一个很长的标题，超出容器宽度时会显示省略号',
    description: '这是一段很长的描述文本，超出容器宽度时会显示省略号。支持多行显示，最多显示指定的行数，超出部分会显示省略号。鼠标悬停可查看完整内容。'
  },
  { 
    id: 2, 
    title: '短标题',
    description: '短描述'
  }
]);

// 宽度限制
const limitWidthColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: '姓名', field: 'name', align: 'left' },
  { name: 'email', label: '邮箱', field: 'email', align: 'left', limitWidth: true },
  { name: 'url', label: 'URL', field: 'url', align: 'left', limitWidth: true }
];

const limitWidthRows = ref([
  { 
    id: 1, 
    name: '张三',
    email: 'verylongemailaddress@example.com',
    url: 'https://www.example.com/very/long/path/to/resource'
  },
  { 
    id: 2, 
    name: '李四',
    email: 'lisi@example.com',
    url: 'https://www.example.com'
  }
]);

// 列级别宽度配置
const columnWidthColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: '姓名', field: 'name', align: 'left' },
  { 
    name: 'email', 
    label: '邮箱', 
    field: 'email', 
    align: 'left', 
    limitWidth: true,
    cellMaxWidth: 800,
    cellMaxWidthSmall: 500
  }
];

const columnWidthRows = ref([
  { id: 1, name: '张三', email: 'verylongemailaddress@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
]);

// 固定列
const fixedColumns = [
  { 
    name: 'id', 
    label: 'ID', 
    field: 'id', 
    align: 'left',
    classes: 'table-cell--fix-left',
    headerClasses: 'table-cell--fix-left'
  },
  { name: 'name', label: '姓名', field: 'name', align: 'left' },
  { name: 'email', label: '邮箱', field: 'email', align: 'left' },
  { name: 'phone', label: '电话', field: 'phone', align: 'left' },
  { name: 'address', label: '地址', field: 'address', align: 'left' },
  { name: 'department', label: '部门', field: 'department', align: 'left' },
  { 
    name: 'action', 
    label: '操作', 
    field: 'action', 
    align: 'center',
    classes: 'table-cell--fix-right',
    headerClasses: 'table-cell--fix-right'
  }
];

const fixedRows = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', phone: '13800138000', address: '北京市朝阳区', department: '技术部', action: '操作' },
  { id: 2, name: '李四', email: 'lisi@example.com', phone: '13800138001', address: '上海市浦东新区', department: '产品部', action: '操作' },
  { id: 3, name: '王五', email: 'wangwu@example.com', phone: '13800138002', address: '广州市天河区', department: '运营部', action: '操作' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', phone: '13800138003', address: '深圳市南山区', department: '设计部', action: '操作' }
]);

// 列点击
const clickCount = ref(0);
const clickableColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  {
    name: 'name',
    label: '姓名（可点击）',
    field: 'name',
    align: 'left',
    onClick: (row: any) => {
      clickCount.value++;
      console.log('点击了姓名:', row);
    },
    clickable: true
  },
  { name: 'email', label: '邮箱', field: 'email', align: 'left' }
];

const clickableRows = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' },
  { id: 3, name: '王五', email: 'wangwu@example.com' }
]);

// 条件点击
const conditionalClickableColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: '姓名', field: 'name', align: 'left' },
  {
    name: 'status',
    label: '状态（条件点击）',
    field: 'status',
    align: 'center',
    onClick: (row: any) => {
      console.log('点击了状态:', row);
    },
    clickable: (value: any, row: any) => row.status === 'active'
  }
];

const conditionalClickableRows = ref([
  { id: 1, name: '张三', status: 'active' },
  { id: 2, name: '李四', status: 'disabled' },
  { id: 3, name: '王五', status: 'active' }
]);

// 自定义单元格（插槽）
const slotColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: '姓名', field: 'name', align: 'left' },
  { name: 'status', label: '状态', field: 'status', align: 'center' },
  { name: 'price', label: '价格', field: 'price', align: 'right' }
];

const slotRows = ref([
  { id: 1, name: '张三', status: 'active', price: 99.99 },
  { id: 2, name: '李四', status: 'disabled', price: 199.50 }
]);

// 行选择
const selectedRows = ref<any[]>([]);
const selectionColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: '姓名', field: 'name', align: 'left' },
  { name: 'email', label: '邮箱', field: 'email', align: 'left' }
];

const selectionRows = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' },
  { id: 3, name: '王五', email: 'wangwu@example.com' }
]);

// 加载状态
const tableLoading = ref(false);
const loadingColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: '姓名', field: 'name', align: 'left' },
  { name: 'email', label: '邮箱', field: 'email', align: 'left' }
];

const loadingRows = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
]);

const toggleLoading = () => {
  tableLoading.value = !tableLoading.value;
};

// 排序
const sortableColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'name', label: '姓名', field: 'name', align: 'left' },
  { name: 'age', label: '年龄', field: 'age', align: 'center', sortable: true }
];

const sortableRows = ref([
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 28 }
]);

// 隐藏分页
const noPaginationColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: '姓名', field: 'name', align: 'left' },
  { name: 'email', label: '邮箱', field: 'email', align: 'left' }
];

const noPaginationRows = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
]);

// 完整示例
const completeTableRef = ref<ComponentPublicInstance | null>(null);
const completeLoading = ref(false);
const completePage = ref(1);
const completePageSize = ref(15);
const completeTotal = ref(100);
const completeRows = ref([
  { 
    id: 1, 
    name: '张三', 
    email: 'zhangsan@example.com', 
    status: 'active',
    description: '这是一段很长的描述文本，超出容器宽度时会显示省略号。支持多行显示，最多显示指定的行数，超出部分会显示省略号。'
  },
  { 
    id: 2, 
    name: '李四', 
    email: 'lisi@example.com', 
    status: 'disabled',
    description: '短描述'
  },
  { 
    id: 3, 
    name: '王五', 
    email: 'wangwu@example.com', 
    status: 'active',
    description: '这是另一段很长的描述文本，用于测试多行省略功能。'
  }
]);

const completeColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  {
    name: 'name',
    label: '姓名',
    field: 'name',
    align: 'left',
    onClick: (row: any) => {
      console.log('点击了姓名:', row);
    },
    clickable: true
  },
  { name: 'email', label: '邮箱', field: 'email', align: 'left', limitWidth: true },
  { name: 'status', label: '状态', field: 'status', align: 'center' },
  { name: 'description', label: '描述', field: 'description', align: 'left', whiteSpace: 2 }
];

const handleCompletePaginationChange = async (pagination: { page: number; rowsPerPage: number }) => {
  completeLoading.value = true;
  completePage.value = pagination.page;
  completePageSize.value = pagination.rowsPerPage;
  
  // 模拟 API 请求
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 模拟数据
  const start = (pagination.page - 1) * pagination.rowsPerPage;
  const mockData = [];
  for (let i = 0; i < pagination.rowsPerPage; i++) {
    mockData.push({
      id: start + i + 1,
      name: `用户${start + i + 1}`,
      email: `user${start + i + 1}@example.com`,
      status: i % 2 === 0 ? 'active' : 'disabled',
      description: `这是用户${start + i + 1}的描述信息，用于测试多行省略功能。`
    });
  }
  
  completeRows.value = mockData;
  
  // 设置总数
  if (completeTableRef.value && typeof (completeTableRef.value as any).setTotal === 'function') {
    (completeTableRef.value as any).setTotal(completeTotal.value);
  }
  
  completeLoading.value = false;
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
