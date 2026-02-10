<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <j-ch-line
          :labels="basicLabels"
          :datasets="basicDatasets"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>多条折线</h4>
        <j-ch-line
          :labels="multiLabels"
          :datasets="multiDatasets"
          :height="350"
          unit-name="件"
        />
      </div>

      <div class="demo-section">
        <h4>自定义高度</h4>
        <j-ch-line
          :labels="customHeightLabels"
          :datasets="customHeightDatasets"
          :height="200"
        />
      </div>

      <div class="demo-section">
        <h4>自定义配置（隐藏图例）</h4>
        <j-ch-line
          :labels="customOptionsLabels"
          :datasets="customOptionsDatasets"
          :options="customOptions"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>月度数据趋势</h4>
        <j-ch-line
          :labels="monthlyLabels"
          :datasets="monthlyDatasets"
          :height="400"
          unit-name="万元"
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
        <j-ch-line
          :labels="dynamicLabels"
          :datasets="dynamicDatasets"
          :height="300"
          unit-name="℃"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JChLine, JQButton } from 'qcpt';
import type { ChartDataset, ChartOptions } from 'chart.js/auto';

// 基础用法数据
const basicLabels = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日']);
const basicDatasets = ref<ChartDataset<'line'>[]>([
  {
    label: '访问量',
    data: [120, 200, 150, 180, 220, 250, 300],
    borderColor: '#3b82f6',
    backgroundColor: '#3b82f6',
  }
]);

// 多条折线数据
const multiLabels = ref(['1月', '2月', '3月', '4月', '5月', '6月']);
const multiDatasets = ref<ChartDataset<'line'>[]>([
  {
    label: '销售量',
    data: [320, 280, 350, 400, 450, 520],
    borderColor: '#3b82f6',
    backgroundColor: '#3b82f6',
  },
  {
    label: '库存量',
    data: [200, 220, 180, 190, 210, 240],
    borderColor: '#10b981',
    backgroundColor: '#10b981',
  },
  {
    label: '退货量',
    data: [30, 25, 40, 35, 28, 32],
    borderColor: '#ef4444',
    backgroundColor: '#ef4444',
  }
]);

// 自定义高度数据
const customHeightLabels = ref(['Q1', 'Q2', 'Q3', 'Q4']);
const customHeightDatasets = ref<ChartDataset<'line'>[]>([
  {
    label: '季度收入',
    data: [2500, 3200, 2800, 4100],
    borderColor: '#8b5cf6',
    backgroundColor: '#8b5cf6',
  }
]);

// 自定义配置数据
const customOptionsLabels = ref(['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']);
const customOptionsDatasets = ref<ChartDataset<'line'>[]>([
  {
    label: 'CPU 使用率',
    data: [45, 52, 48, 65, 70, 55, 60],
    borderColor: '#f59e0b',
    backgroundColor: '#f59e0b',
  }
]);

// 自定义配置项（隐藏图例）
const customOptions = ref<Partial<ChartOptions<'line'>>>({
  plugins: {
    legend: {
      display: false,
    }
  }
});

// 月度数据趋势
const monthlyLabels = ref(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']);
const monthlyDatasets = ref<ChartDataset<'line'>[]>([
  {
    label: '营收',
    data: [580, 620, 590, 680, 720, 750, 800, 780, 820, 900, 950, 1000],
    borderColor: '#3b82f6',
    backgroundColor: '#3b82f6',
  },
  {
    label: '成本',
    data: [320, 350, 340, 380, 400, 420, 450, 440, 460, 500, 520, 550],
    borderColor: '#f59e0b',
    backgroundColor: '#f59e0b',
  },
  {
    label: '利润',
    data: [260, 270, 250, 300, 320, 330, 350, 340, 360, 400, 430, 450],
    borderColor: '#10b981',
    backgroundColor: '#10b981',
  }
]);

// 动态更新数据
const dynamicLabels = ref(['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']);
const dynamicDatasets = ref<ChartDataset<'line'>[]>([
  {
    label: '温度',
    data: [18, 16, 20, 28, 25, 22],
    borderColor: '#ef4444',
    backgroundColor: '#ef4444',
  }
]);

// 刷新数据
const refreshData = () => {
  dynamicDatasets.value = [
    {
      label: '温度',
      data: dynamicLabels.value.map(() => Math.floor(Math.random() * 20) + 15),
      borderColor: '#ef4444',
      backgroundColor: '#ef4444',
    }
  ];
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
