<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">最简单的表格用法，只需要定义 columns 和 rows。</p>
        <JCTable 
          :columns="basicColumns" 
          :rows="basicRows"
        />
        <div class="demo-value">
          <p><strong>数据行数:</strong> {{ basicRows.length }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>固定列</h4>
        <p class="demo-hint">使用 firstColumnPinned 和 lastColumnPinned 固定第一列和最后一列，或使用 pinLeft 和 pinRight 固定特定列。</p>
        <JCTable 
          :columns="pinnedColumns" 
          :rows="pinnedRows"
          first-column-pinned
          last-column-pinned
        />
        <div class="demo-value">
          <p><strong>提示:</strong> 第一列和最后一列已固定，横向滚动时保持可见</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>文本省略和提示</h4>
        <p class="demo-hint">使用 maxWidth 限制列宽，超出时自动显示省略号。使用 wrapCount 控制最多显示行数（1-3行）。</p>
        <JCTable 
          :columns="ellipsisColumns" 
          :rows="ellipsisRows"
        />
        <div class="demo-value">
          <p><strong>提示:</strong> 鼠标悬停在省略的文本上可查看完整内容</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>复制功能</h4>
        <p class="demo-hint">在列配置中设置 copy: true，单元格会显示复制按钮，点击可复制单元格内容。</p>
        <JCTable 
          :columns="copyColumns" 
          :rows="copyRows"
        />
        <div class="demo-value">
          <p><strong>提示:</strong> 点击邮箱列右侧的复制按钮可复制邮箱地址</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>单元格点击</h4>
        <p class="demo-hint">使用 clickable 和 onClick 实现单元格点击功能。clickable 可以是布尔值或函数。</p>
        <JCTable 
          :columns="clickableColumns" 
          :rows="clickableRows"
        />
        <div class="demo-value">
          <p><strong>点击次数:</strong> {{ clickCount }}</p>
          <p style="margin-top: 4px; font-size: 12px; color: #999;">提示：打开浏览器控制台查看点击事件输出</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义格式化</h4>
        <p class="demo-hint">使用 format 函数自定义单元格显示格式，例如格式化价格、日期等。</p>
        <JCTable 
          :columns="formatColumns" 
          :rows="formatRows"
        />
        <div class="demo-value">
          <p><strong>提示:</strong> 价格列使用 format 函数格式化为货币格式</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>文本对齐</h4>
        <p class="demo-hint">使用 align 属性控制文本对齐方式：left、center、right。</p>
        <JCTable 
          :columns="alignColumns" 
          :rows="alignRows"
        />
        <div class="demo-value">
          <p><strong>提示:</strong> 姓名左对齐，年龄居中，价格右对齐</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义字段</h4>
        <p class="demo-hint">使用 field 属性指定数据字段，可以是字符串或函数。默认使用 name 作为字段名。</p>
        <JCTable 
          :columns="fieldColumns" 
          :rows="fieldRows"
        />
        <div class="demo-value">
          <p><strong>提示:</strong> 全名列使用函数计算显示值</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义插槽</h4>
        <p class="demo-hint">使用 header-{name} 和 body-{name} 插槽自定义表头和单元格内容。</p>
        <JCTable :columns="slotColumns" :rows="slotRows">
          <template #header-status="{ column }">
            <span style="color: #1976d2; font-weight: 600;">{{ column.label }}</span>
          </template>
          
          <template #body-status="{ row, value }">
            <span 
              :style="{ 
                color: value === 'active' ? '#4caf50' : '#999',
                fontWeight: '600'
              }"
            >
              {{ value === 'active' ? '✓ 启用' : '✗ 禁用' }}
            </span>
          </template>
        </JCTable>
        <div class="demo-value">
          <p><strong>提示:</strong> 状态列使用了自定义插槽显示</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>固定表头</h4>
        <p class="demo-hint">使用 fixedHeader 属性固定表头，当表格内容较多时可以固定表头方便查看。</p>
        <JCTable 
          :columns="fixedHeaderColumns" 
          :rows="fixedHeaderRows"
          :fixed-header="true"
          :max-body-height="200"
        />
        <div class="demo-value">
          <p><strong>提示:</strong> 表头已固定，滚动表格内容时表头保持可见</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>空数据提示</h4>
        <p class="demo-hint">当没有数据时显示空数据提示，可以使用 emptyText 自定义提示文本，或使用 empty 插槽自定义内容。</p>
        <JCTable 
          :columns="emptyColumns" 
          :rows="emptyRows"
          empty-text="暂无数据，请稍后再试"
        />
        <div class="demo-value">
          <p><strong>提示:</strong> 当前没有数据，显示空数据提示</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>完整示例（用户列表）</h4>
        <p class="demo-hint">综合使用各种功能，展示一个完整的用户列表表格。</p>
        <JCTable 
          :columns="completeColumns" 
          :rows="completeRows"
          first-column-pinned
        />
        <div class="demo-value">
          <p><strong>数据行数:</strong> {{ completeRows.length }}</p>
          <p style="margin-top: 4px;"><strong>功能:</strong> 固定第一列、文本省略、复制、点击、格式化</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCTable } from 'qcpt';
import type { JCTableColumn } from 'qcpt';

// 基础用法
const basicColumns: JCTableColumn[] = [
  { name: 'name', label: '姓名', width: 120 },
  { name: 'age', label: '年龄', width: 100 },
  { name: 'email', label: '邮箱', width: 200 }
];

const basicRows = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
]);

// 固定列
const pinnedColumns: JCTableColumn[] = [
  { name: 'name', label: '姓名', width: 120 },
  { name: 'age', label: '年龄', width: 100 },
  { name: 'email', label: '邮箱', width: 200 },
  { name: 'phone', label: '电话', width: 150 },
  { name: 'action', label: '操作', width: 150 }
];

const pinnedRows = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', phone: '13800138000' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com', phone: '13800138001' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', phone: '13800138002' }
]);

// 文本省略和提示
const ellipsisColumns: JCTableColumn[] = [
  { name: 'name', label: '姓名', width: 120 },
  { name: 'description', label: '描述（单行省略）', maxWidth: 200 },
  { name: 'longDescription', label: '长描述（多行省略）', maxWidth: 250, wrapCount: 2 }
];

const ellipsisRows = ref([
  { 
    id: 1, 
    name: '张三', 
    description: '这是一段很长的描述文本，超出最大宽度时会显示省略号，鼠标悬停可查看完整内容',
    longDescription: '这是一段非常长的描述文本，会显示多行内容，超出指定行数后会自动省略，鼠标悬停可查看完整内容。这段文本足够长，可以展示多行省略的效果。'
  },
  { 
    id: 2, 
    name: '李四', 
    description: '短描述',
    longDescription: '短文本不会省略'
  }
]);

// 复制功能
const copyColumns: JCTableColumn[] = [
  { name: 'name', label: '姓名', width: 120 },
  { name: 'email', label: '邮箱', width: 200, copy: true },
  { name: 'phone', label: '电话', width: 150, copy: true }
];

const copyRows = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', phone: '13800138000' },
  { id: 2, name: '李四', email: 'lisi@example.com', phone: '13800138001' }
]);

// 单元格点击
const clickCount = ref(0);

const clickableColumns: JCTableColumn[] = [
  { 
    name: 'name', 
    label: '姓名（可点击）', 
    width: 150,
    clickable: true,
    onClick: (value, row) => {
      clickCount.value++;
      console.log('点击了姓名:', value, row);
    }
  },
  { 
    name: 'status', 
    label: '状态（条件点击）', 
    width: 150,
    clickable: (value) => value === 'active',
    onClick: (value, row) => {
      console.log('点击了状态:', value, row);
    }
  },
  { 
    name: 'email', 
    label: '邮箱', 
    width: 200
  }
];

const clickableRows = ref([
  { id: 1, name: '张三', status: 'active', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', status: 'disabled', email: 'lisi@example.com' },
  { id: 3, name: '王五', status: 'active', email: 'wangwu@example.com' }
]);

// 自定义格式化
const formatColumns: JCTableColumn[] = [
  { name: 'name', label: '商品名称', width: 150 },
  { 
    name: 'price', 
    label: '价格', 
    width: 120,
    align: 'right',
    format: (value) => `¥${value.toFixed(2)}`
  },
  { 
    name: 'discount', 
    label: '折扣', 
    width: 100,
    align: 'center',
    format: (value) => `${(value * 100).toFixed(0)}%`
  }
];

const formatRows = ref([
  { id: 1, name: '商品A', price: 99.99, discount: 0.9 },
  { id: 2, name: '商品B', price: 199.50, discount: 0.85 },
  { id: 3, name: '商品C', price: 299.00, discount: 0.8 }
]);

// 文本对齐
const alignColumns: JCTableColumn[] = [
  { name: 'name', label: '姓名（左对齐）', width: 150, align: 'left' },
  { name: 'age', label: '年龄（居中）', width: 120, align: 'center' },
  { name: 'price', label: '价格（右对齐）', width: 120, align: 'right' }
];

const alignRows = ref([
  { id: 1, name: '张三', age: 25, price: 100 },
  { id: 2, name: '李四', age: 30, price: 200 },
  { id: 3, name: '王五', age: 28, price: 150 }
]);

// 自定义字段
const fieldColumns: JCTableColumn[] = [
  { name: 'firstName', label: '名', width: 100 },
  { name: 'lastName', label: '姓', width: 100 },
  { 
    name: 'fullName', 
    label: '全名', 
    width: 150,
    field: (row) => `${row.firstName} ${row.lastName}`
  }
];

const fieldRows = ref([
  { id: 1, firstName: '三', lastName: '张' },
  { id: 2, firstName: '四', lastName: '李' },
  { id: 3, firstName: '五', lastName: '王' }
]);

// 自定义插槽
const slotColumns: JCTableColumn[] = [
  { name: 'name', label: '姓名', width: 120 },
  { name: 'status', label: '状态', width: 120 },
  { name: 'email', label: '邮箱', width: 200 }
];

const slotRows = ref([
  { id: 1, name: '张三', status: 'active', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', status: 'disabled', email: 'lisi@example.com' }
]);

// 固定表头
const fixedHeaderColumns: JCTableColumn[] = [
  { name: 'name', label: '姓名', width: 120 },
  { name: 'age', label: '年龄', width: 100 },
  { name: 'email', label: '邮箱', width: 200 },
  { name: 'phone', label: '电话', width: 150 }
];

const fixedHeaderRows = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', phone: '13800138000' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com', phone: '13800138001' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', phone: '13800138002' },
  { id: 4, name: '赵六', age: 32, email: 'zhaoliu@example.com', phone: '13800138003' },
  { id: 5, name: '钱七', age: 27, email: 'qianqi@example.com', phone: '13800138004' }
]);

// 空数据提示
const emptyColumns: JCTableColumn[] = [
  { name: 'name', label: '姓名', width: 120 },
  { name: 'age', label: '年龄', width: 100 },
  { name: 'email', label: '邮箱', width: 200 }
];

const emptyRows = ref([]);

// 完整示例
const completeColumns: JCTableColumn[] = [
  { name: 'name', label: '姓名', width: 120 },
  { name: 'email', label: '邮箱', width: 200, copy: true, maxWidth: 180 },
  { name: 'department', label: '部门', width: 150, maxWidth: 120 },
  { 
    name: 'salary', 
    label: '薪资', 
    width: 120, 
    align: 'right',
    format: (value) => `¥${value.toLocaleString()}`
  },
  { 
    name: 'status', 
    label: '状态', 
    width: 100,
    clickable: true,
    onClick: (value, row) => {
      console.log('点击状态:', value, row);
    }
  }
];

const completeRows = ref([
  { 
    id: 1, 
    name: '张三', 
    email: 'zhangsan@example.com', 
    department: '技术部',
    salary: 15000,
    status: 'active'
  },
  { 
    id: 2, 
    name: '李四', 
    email: 'lisi@example.com', 
    department: '产品部',
    salary: 12000,
    status: 'active'
  },
  { 
    id: 3, 
    name: '王五', 
    email: 'wangwu@example.com', 
    department: '设计部',
    salary: 10000,
    status: 'disabled'
  }
]);
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
