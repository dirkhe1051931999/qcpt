<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">使用 v-model:current-page 和 v-model:page-size 进行双向绑定，total 设置总条数</p>
        <JQPagination
          v-model:current-page="basicPagination.currentPage"
          v-model:page-size="basicPagination.pageSize"
          :total="basicPagination.total"
          @change="handleBasicChange"
        />
        <div class="demo-value">
          <p>当前页码: {{ basicPagination.currentPage }}</p>
          <p>每页数量: {{ basicPagination.pageSize }}</p>
          <p>总条数: {{ basicPagination.total }}</p>
          <p>总页数: {{ Math.ceil(basicPagination.total / basicPagination.pageSize) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义每页显示数量选项</h4>
        <p class="demo-hint">使用 page-size-options 属性自定义每页显示数量的选项</p>
        <JQPagination
          v-model:current-page="customOptionsPagination.currentPage"
          v-model:page-size="customOptionsPagination.pageSize"
          :total="customOptionsPagination.total"
          :page-size-options="[5, 10, 20, 50, 100]"
        />
        <div class="demo-value">
          <p>当前页码: {{ customOptionsPagination.currentPage }}</p>
          <p>每页数量: {{ customOptionsPagination.pageSize }}</p>
          <p>总条数: {{ customOptionsPagination.total }}</p>
          <p>可选每页数量: [5, 10, 20, 50, 100]</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>大数据量分页</h4>
        <p class="demo-hint">展示大数据量场景下的分页效果</p>
        <JQPagination
          v-model:current-page="largeDataPagination.currentPage"
          v-model:page-size="largeDataPagination.pageSize"
          :total="largeDataPagination.total"
        />
        <div class="demo-value">
          <p>当前页码: {{ largeDataPagination.currentPage }}</p>
          <p>每页数量: {{ largeDataPagination.pageSize }}</p>
          <p>总条数: {{ largeDataPagination.total.toLocaleString() }}</p>
          <p>总页数: {{ Math.ceil(largeDataPagination.total / largeDataPagination.pageSize) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>小数据量分页</h4>
        <p class="demo-hint">数据量较少时，分页组件会自动调整显示</p>
        <JQPagination
          v-model:current-page="smallDataPagination.currentPage"
          v-model:page-size="smallDataPagination.pageSize"
          :total="smallDataPagination.total"
        />
        <div class="demo-value">
          <p>当前页码: {{ smallDataPagination.currentPage }}</p>
          <p>每页数量: {{ smallDataPagination.pageSize }}</p>
          <p>总条数: {{ smallDataPagination.total }}</p>
          <p>总页数: {{ Math.ceil(smallDataPagination.total / smallDataPagination.pageSize) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>单页数据</h4>
        <p class="demo-hint">当数据量小于等于每页数量时，分页组件仍然显示</p>
        <JQPagination
          v-model:current-page="singlePagePagination.currentPage"
          v-model:page-size="singlePagePagination.pageSize"
          :total="singlePagePagination.total"
        />
        <div class="demo-value">
          <p>当前页码: {{ singlePagePagination.currentPage }}</p>
          <p>每页数量: {{ singlePagePagination.pageSize }}</p>
          <p>总条数: {{ singlePagePagination.total }}</p>
          <p>总页数: {{ Math.ceil(singlePagePagination.total / singlePagePagination.pageSize) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>change 事件监听</h4>
        <p class="demo-hint">change 事件会在页码或每页数量变化时触发，包含完整的分页信息</p>
        <JQPagination
          v-model:current-page="eventPagination.currentPage"
          v-model:page-size="eventPagination.pageSize"
          :total="eventPagination.total"
          @change="handleEventChange"
        />
        <div class="demo-value">
          <p>当前页码: {{ eventPagination.currentPage }}</p>
          <p>每页数量: {{ eventPagination.pageSize }}</p>
          <p>总条数: {{ eventPagination.total }}</p>
          <p v-if="lastChangeEvent" style="margin-top: 8px; color: #4caf50;">
            最后触发事件: {{ JSON.stringify(lastChangeEvent) }}
          </p>
        </div>
      </div>

      <div class="demo-section">
        <h4>完整示例（数据列表）</h4>
        <p class="demo-hint">结合数据列表展示完整的分页功能</p>
        <div style="margin-bottom: 16px;">
          <div 
            v-for="item in displayData" 
            :key="item.id" 
            style="padding: 8px; border-bottom: 1px solid #eee;"
          >
            {{ item.name }}
          </div>
        </div>
        <JQPagination
          v-model:current-page="listPagination.currentPage"
          v-model:page-size="listPagination.pageSize"
          :total="listPagination.total"
          @change="handleListChange"
        />
        <div class="demo-value">
          <p>当前页码: {{ listPagination.currentPage }}</p>
          <p>每页数量: {{ listPagination.pageSize }}</p>
          <p>总条数: {{ listPagination.total }}</p>
          <p>当前显示: {{ displayData.length }} 条数据</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>手动管理分页状态</h4>
        <p class="demo-hint">手动管理分页状态，适合需要自定义逻辑的场景</p>
        <JQPagination
          v-model:current-page="manualPagination.currentPage"
          v-model:page-size="manualPagination.pageSize"
          :total="manualPagination.total"
          @change="handleManualChange"
        />
        <div class="demo-value">
          <p>当前页码: {{ manualPagination.currentPage }}</p>
          <p>每页数量: {{ manualPagination.pageSize }}</p>
          <p>总条数: {{ manualPagination.total }}</p>
          <p style="margin-top: 8px;">分页参数: {{ JSON.stringify({ currentPage: manualPagination.currentPage, pageSize: manualPagination.pageSize }) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { JQPagination } from 'qcpt';
import type { PaginationConfig } from 'qcpt';

// 基础用法
const basicPagination = ref({
  currentPage: 1,
  pageSize: 15,
  total: 100,
});

const handleBasicChange = (pagination: PaginationConfig) => {
  console.log('基础分页变化:', pagination);
};

// 自定义每页显示数量选项
const customOptionsPagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 500,
});

// 大数据量分页
const largeDataPagination = ref({
  currentPage: 1,
  pageSize: 50,
  total: 10000,
});

// 小数据量分页
const smallDataPagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 25,
});

// 单页数据
const singlePagePagination = ref({
  currentPage: 1,
  pageSize: 15,
  total: 10,
});

// change 事件监听
const eventPagination = ref({
  currentPage: 1,
  pageSize: 15,
  total: 150,
});

const lastChangeEvent = ref<PaginationConfig | null>(null);

const handleEventChange = (pagination: PaginationConfig) => {
  lastChangeEvent.value = pagination;
  console.log('分页变化:', pagination);
};

// 完整示例（数据列表）
interface DataItem {
  id: number;
  name: string;
}

const allData = ref<DataItem[]>([]);
const listPagination = ref({
  currentPage: 1,
  pageSize: 5,
  total: 0,
});

// 初始化数据
const initData = () => {
  const items: DataItem[] = [];
  for (let i = 1; i <= 50; i++) {
    items.push({
      id: i,
      name: `数据项 ${i}`,
    });
  }
  allData.value = items;
  listPagination.value.total = items.length;
};

initData();

const displayData = computed(() => {
  const start = (listPagination.value.currentPage - 1) * listPagination.value.pageSize;
  const end = start + listPagination.value.pageSize;
  return allData.value.slice(start, end);
});

const handleListChange = (pagination: PaginationConfig) => {
  console.log('列表分页变化:', pagination);
  // 在实际项目中，这里会重新加载数据
};

// 手动管理分页状态
const manualPagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 200,
});

const handleManualChange = (pagination: PaginationConfig) => {
  console.log('手动分页变化:', pagination);
  // 在实际项目中，这里可以根据分页参数重新加载数据
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
