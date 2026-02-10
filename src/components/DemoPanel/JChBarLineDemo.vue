<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <j-ch-bar-line
          :labels="basicLabels"
          :datasets="basicDatasets"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>多组数据混合</h4>
        <j-ch-bar-line
          :labels="multiLabels"
          :datasets="multiDatasets"
          :height="350"
        />
      </div>

      <div class="demo-section">
        <h4>销售与目标对比</h4>
        <j-ch-bar-line
          :labels="salesLabels"
          :datasets="salesDatasets"
          :height="350"
        />
      </div>

      <div class="demo-section">
        <h4>自定义高度</h4>
        <j-ch-bar-line
          :labels="customHeightLabels"
          :datasets="customHeightDatasets"
          :height="250"
        />
      </div>

      <div class="demo-section">
        <h4>自定义配置（隐藏图例）</h4>
        <j-ch-bar-line
          :labels="customOptionsLabels"
          :datasets="customOptionsDatasets"
          :options="customOptions"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>年度数据分析</h4>
        <j-ch-bar-line
          :labels="yearlyLabels"
          :datasets="yearlyDatasets"
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
        <j-ch-bar-line
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
import { JChBarLine, JQButton } from 'qcpt';
import type { ChartDataset, ChartOptions } from 'chart.js/auto';

// 基础用法数据
const basicLabels = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日']);
const basicDatasets = ref<ChartDataset<'bar' | 'line'>[]>([
  {
    type: 'bar',
    label: '访问量',
    data: [120, 200, 150, 180, 220, 250, 300],
    backgroundColor: '#3b82f6',
  },
  {
    type: 'line',
    label: '平均值',
    data: [200, 200, 200, 200, 200, 200, 200],
    borderColor: '#ef4444',
    backgroundColor: '#ef4444',
  }
]);

// 多组数据混合
const multiLabels = ref(['1月', '2月', '3月', '4月', '5月', '6月']);
const multiDatasets = ref<ChartDataset<'bar' | 'line'>[]>([
  {
    type: 'bar',
    label: '线上销售',
    data: [320, 280, 350, 400, 450, 520],
    backgroundColor: '#3b82f6',
  },
  {
    type: 'bar',
    label: '线下销售',
    data: [220, 240, 210, 280, 320, 360],
    backgroundColor: '#10b981',
  },
  {
    type: 'line',
    label: '总销售趋势',
    data: [540, 520, 560, 680, 770, 880],
    borderColor: '#f59e0b',
    backgroundColor: '#f59e0b',
  }
]);

// 销售与目标对比
const salesLabels = ref(['Q1', 'Q2', 'Q3', 'Q4']);
const salesDatasets = ref<ChartDataset<'bar' | 'line'>[]>([
  {
    type: 'bar',
    label: '实际销售',
    data: [2500, 3200, 2800, 4100],
    backgroundColor: '#3b82f6',
  },
  {
    type: 'line',
    label: '销售目标',
    data: [3000, 3000, 3500, 4000],
    borderColor: '#ef4444',
    backgroundColor: '#ef4444',
  }
]);

// 自定义高度数据
const customHeightLabels = ref(['产品A', '产品B', '产品C', '产品D', '产品E']);
const customHeightDatasets = ref<ChartDataset<'bar' | 'line'>[]>([
  {
    type: 'bar',
    label: '销量',
    data: [150, 220, 180, 240, 200],
    backgroundColor: '#8b5cf6',
  },
  {
    type: 'line',
    label: '目标',
    data: [200, 200, 200, 200, 200],
    borderColor: '#ec4899',
    backgroundColor: '#ec4899',
  }
]);

// 自定义配置数据（隐藏图例）
const customOptionsLabels = ref(['08:00', '10:00', '12:00', '14:00', '16:00', '18:00']);
const customOptionsDatasets = ref<ChartDataset<'bar' | 'line'>[]>([
  {
    type: 'bar',
    label: '请求数',
    data: [450, 520, 680, 590, 620, 480],
    backgroundColor: '#06b6d4',
  },
  {
    type: 'line',
    label: '成功率',
    data: [95, 98, 92, 96, 94, 97],
    borderColor: '#10b981',
    backgroundColor: '#10b981',
  }
]);

// 自定义配置项（隐藏图例）
const customOptions = ref<Partial<ChartOptions<'bar' | 'line'>>>({
  plugins: {
    legend: {
      display: false,
    }
  }
});

// 年度数据分析
const yearlyLabels = ref(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']);
const yearlyDatasets = ref<ChartDataset<'bar' | 'line'>[]>([
  {
    type: 'bar',
    label: '营收',
    data: [580, 620, 590, 680, 720, 750, 800, 780, 820, 900, 950, 1000],
    backgroundColor: '#3b82f6',
  },
  {
    type: 'bar',
    label: '成本',
    data: [320, 350, 340, 380, 400, 420, 450, 440, 460, 500, 520, 550],
    backgroundColor: '#f59e0b',
  },
  {
    type: 'line',
    label: '利润',
    data: [260, 270, 250, 300, 320, 330, 350, 340, 360, 400, 430, 450],
    borderColor: '#10b981',
    backgroundColor: '#10b981',
  }
]);

// 动态更新数据
const dynamicLabels = ref(['周一', '周二', '周三', '周四', '周五']);
const dynamicDatasets = ref<ChartDataset<'bar' | 'line'>[]>([
  {
    type: 'bar',
    label: '订单量',
    data: [85, 120, 95, 140, 110],
    backgroundColor: '#3b82f6',
  },
  {
    type: 'line',
    label: '转化率',
    data: [65, 70, 68, 75, 72],
    borderColor: '#ec4899',
    backgroundColor: '#ec4899',
  }
]);

// 刷新数据
const refreshData = () => {
  dynamicDatasets.value = [
    {
      type: 'bar',
      label: '订单量',
      data: dynamicLabels.value.map(() => Math.floor(Math.random() * 100) + 80),
      backgroundColor: '#3b82f6',
    },
    {
      type: 'line',
      label: '转化率',
      data: dynamicLabels.value.map(() => Math.floor(Math.random() * 20) + 60),
      borderColor: '#ec4899',
      backgroundColor: '#ec4899',
    }
  ];
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
