<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <j-ch-bar
          :labels="basicLabels"
          :datasets="basicDatasets"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>多组数据对比</h4>
        <j-ch-bar
          :labels="multiLabels"
          :datasets="multiDatasets"
          :height="350"
        />
      </div>

      <div class="demo-section">
        <h4>自定义柱子样式</h4>
        <j-ch-bar
          :labels="customStyleLabels"
          :datasets="customStyleDatasets"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>自定义高度</h4>
        <j-ch-bar
          :labels="customHeightLabels"
          :datasets="customHeightDatasets"
          :height="200"
        />
      </div>

      <div class="demo-section">
        <h4>自定义配置（隐藏图例）</h4>
        <j-ch-bar
          :labels="customOptionsLabels"
          :datasets="customOptionsDatasets"
          :options="customOptions"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>月度销售数据</h4>
        <j-ch-bar
          :labels="monthlyLabels"
          :datasets="monthlyDatasets"
          :height="400"
        />
      </div>

      <div class="demo-section">
        <h4>动态更新数据</h4>
        <div style="margin-bottom: 16px;">
          <j-q-button 
            label="刷新数据" 
            type="primary"
            icon="refresh"
            @click="refreshData"
          />
        </div>
        <j-ch-bar
          :labels="dynamicLabels"
          :datasets="dynamicDatasets"
          :height="300"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JChBar, JQButton } from 'qcpt';
import type { ChartDataset, ChartOptions } from 'chart.js/auto';

// 基础用法数据
const basicLabels = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日']);
const basicDatasets = ref<ChartDataset<'bar'>[]>([
  {
    label: '访问量',
    data: [120, 200, 150, 180, 220, 250, 300],
    backgroundColor: '#3b82f6',
  }
]);

// 多组数据对比
const multiLabels = ref(['1月', '2月', '3月', '4月', '5月', '6月']);
const multiDatasets = ref<ChartDataset<'bar'>[]>([
  {
    label: '销售量',
    data: [320, 280, 350, 400, 450, 520],
    backgroundColor: '#3b82f6',
  },
  {
    label: '退货量',
    data: [30, 25, 40, 35, 28, 32],
    backgroundColor: '#ef4444',
  },
  {
    label: '库存量',
    data: [200, 220, 180, 190, 210, 240],
    backgroundColor: '#10b981',
  }
]);

// 自定义柱子样式
const customStyleLabels = ref(['产品A', '产品B', '产品C', '产品D']);
const customStyleDatasets = ref<ChartDataset<'bar'>[]>([
  {
    label: '销量',
    data: [450, 380, 520, 390],
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    maxBarThickness: 50,
    borderWidth: 2,
    borderColor: '#6d28d9',
  }
]);

// 自定义高度数据
const customHeightLabels = ref(['Q1', 'Q2', 'Q3', 'Q4']);
const customHeightDatasets = ref<ChartDataset<'bar'>[]>([
  {
    label: '季度收入',
    data: [2500, 3200, 2800, 4100],
    backgroundColor: '#f59e0b',
  }
]);

// 自定义配置数据（隐藏图例）
const customOptionsLabels = ref(['服务器1', '服务器2', '服务器3', '服务器4', '服务器5']);
const customOptionsDatasets = ref<ChartDataset<'bar'>[]>([
  {
    label: 'CPU 使用率',
    data: [45, 62, 38, 75, 50],
    backgroundColor: '#06b6d4',
  }
]);

// 自定义配置项（隐藏图例）
const customOptions = ref<Partial<ChartOptions<'bar'>>>({
  plugins: {
    legend: {
      display: false,
    }
  }
});

// 月度销售数据
const monthlyLabels = ref(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']);
const monthlyDatasets = ref<ChartDataset<'bar'>[]>([
  {
    label: '线上销售',
    data: [580, 620, 590, 680, 720, 750, 800, 780, 820, 900, 950, 1000],
    backgroundColor: '#3b82f6',
  },
  {
    label: '线下销售',
    data: [420, 450, 440, 480, 500, 520, 550, 540, 560, 600, 620, 650],
    backgroundColor: '#10b981',
  }
]);

// 动态更新数据
const dynamicLabels = ref(['产品A', '产品B', '产品C', '产品D', '产品E']);
const dynamicDatasets = ref<ChartDataset<'bar'>[]>([
  {
    label: '销量',
    data: [150, 220, 180, 240, 200],
    backgroundColor: '#ec4899',
  }
]);

// 刷新数据
const refreshData = () => {
  dynamicDatasets.value = [
    {
      label: '销量',
      data: dynamicLabels.value.map(() => Math.floor(Math.random() * 300) + 100),
      backgroundColor: '#ec4899',
    }
  ];
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
