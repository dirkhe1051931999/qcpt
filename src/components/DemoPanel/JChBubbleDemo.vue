<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <j-ch-bubble
          :datasets="basicDatasets"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>多组气泡数据</h4>
        <j-ch-bubble
          :datasets="multiDatasets"
          :height="350"
        />
      </div>

      <div class="demo-section">
        <h4>产品市场分析</h4>
        <p style="font-size: 12px; color: #666; margin-bottom: 12px;">
          X轴：市场份额(%)，Y轴：利润率(%)，气泡大小：销售额
        </p>
        <j-ch-bubble
          :datasets="marketDatasets"
          :height="350"
        />
      </div>

      <div class="demo-section">
        <h4>自定义高度</h4>
        <j-ch-bubble
          :datasets="customHeightDatasets"
          :height="250"
        />
      </div>

      <div class="demo-section">
        <h4>自定义配置（隐藏图例）</h4>
        <j-ch-bubble
          :datasets="customOptionsDatasets"
          :options="customOptions"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>自定义颜色和透明度</h4>
        <j-ch-bubble
          :datasets="colorDatasets"
          :height="350"
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
        <j-ch-bubble
          :datasets="dynamicDatasets"
          :height="300"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JChBubble, JQButton } from 'qcpt';
import type { ChartDataset, ChartOptions } from 'chart.js/auto';

// 气泡图数据点类型
interface BubbleDataPoint {
  x: number;
  y: number;
  r: number;
}

// 基础用法数据
const basicDatasets = ref<ChartDataset<'bubble', BubbleDataPoint[]>[]>([
  {
    label: '数据集A',
    data: [
      { x: 10, y: 20, r: 10 },
      { x: 15, y: 30, r: 15 },
      { x: 25, y: 25, r: 20 },
      { x: 35, y: 40, r: 12 },
      { x: 45, y: 35, r: 18 }
    ],
    backgroundColor: 'rgba(59, 130, 246, 0.6)'
  }
]);

// 多组气泡数据
const multiDatasets = ref<ChartDataset<'bubble', BubbleDataPoint[]>[]>([
  {
    label: '产品A',
    data: [
      { x: 10, y: 20, r: 15 },
      { x: 20, y: 30, r: 18 },
      { x: 30, y: 25, r: 20 },
      { x: 40, y: 35, r: 12 }
    ],
    backgroundColor: 'rgba(59, 130, 246, 0.6)'
  },
  {
    label: '产品B',
    data: [
      { x: 15, y: 40, r: 10 },
      { x: 25, y: 50, r: 22 },
      { x: 35, y: 45, r: 16 },
      { x: 45, y: 55, r: 14 }
    ],
    backgroundColor: 'rgba(16, 185, 129, 0.6)'
  },
  {
    label: '产品C',
    data: [
      { x: 12, y: 15, r: 12 },
      { x: 22, y: 20, r: 14 },
      { x: 32, y: 18, r: 18 },
      { x: 42, y: 25, r: 10 }
    ],
    backgroundColor: 'rgba(245, 158, 11, 0.6)'
  }
]);

// 产品市场分析数据
const marketDatasets = ref<ChartDataset<'bubble', BubbleDataPoint[]>[]>([
  {
    label: '旗舰产品',
    data: [
      { x: 25, y: 45, r: 25 },
      { x: 28, y: 48, r: 30 }
    ],
    backgroundColor: 'rgba(59, 130, 246, 0.7)'
  },
  {
    label: '中端产品',
    data: [
      { x: 35, y: 35, r: 20 },
      { x: 40, y: 38, r: 22 },
      { x: 45, y: 32, r: 18 }
    ],
    backgroundColor: 'rgba(16, 185, 129, 0.7)'
  },
  {
    label: '入门产品',
    data: [
      { x: 50, y: 25, r: 15 },
      { x: 55, y: 22, r: 12 },
      { x: 60, y: 20, r: 14 }
    ],
    backgroundColor: 'rgba(245, 158, 11, 0.7)'
  },
  {
    label: '新产品',
    data: [
      { x: 15, y: 30, r: 8 },
      { x: 18, y: 28, r: 10 }
    ],
    backgroundColor: 'rgba(139, 92, 246, 0.7)'
  }
]);

// 自定义高度数据
const customHeightDatasets = ref<ChartDataset<'bubble', BubbleDataPoint[]>[]>([
  {
    label: '销售数据',
    data: [
      { x: 20, y: 30, r: 15 },
      { x: 40, y: 50, r: 20 },
      { x: 60, y: 40, r: 18 },
      { x: 80, y: 60, r: 22 }
    ],
    backgroundColor: 'rgba(139, 92, 246, 0.6)'
  }
]);

// 自定义配置数据（隐藏图例）
const customOptionsDatasets = ref<ChartDataset<'bubble', BubbleDataPoint[]>[]>([
  {
    label: '数据点',
    data: [
      { x: 10, y: 15, r: 12 },
      { x: 25, y: 35, r: 18 },
      { x: 40, y: 25, r: 15 },
      { x: 55, y: 45, r: 20 },
      { x: 70, y: 35, r: 14 }
    ],
    backgroundColor: 'rgba(6, 182, 212, 0.6)'
  }
]);

// 自定义配置项（隐藏图例）
const customOptions = ref<Partial<ChartOptions<'bubble'>>>({
  plugins: {
    legend: {
      display: false
    }
  }
});

// 自定义颜色和透明度
const colorDatasets = ref<ChartDataset<'bubble', BubbleDataPoint[]>[]>([
  {
    label: '高价值客户',
    data: [
      { x: 60, y: 70, r: 25 },
      { x: 65, y: 75, r: 28 }
    ],
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    borderColor: 'rgba(239, 68, 68, 1)',
    borderWidth: 2
  },
  {
    label: '中价值客户',
    data: [
      { x: 40, y: 50, r: 18 },
      { x: 45, y: 55, r: 20 },
      { x: 50, y: 48, r: 16 }
    ],
    backgroundColor: 'rgba(245, 158, 11, 0.7)',
    borderColor: 'rgba(245, 158, 11, 1)',
    borderWidth: 1
  },
  {
    label: '潜在客户',
    data: [
      { x: 20, y: 30, r: 12 },
      { x: 25, y: 35, r: 14 },
      { x: 30, y: 32, r: 10 },
      { x: 35, y: 38, r: 13 }
    ],
    backgroundColor: 'rgba(59, 130, 246, 0.5)',
    borderColor: 'rgba(59, 130, 246, 1)',
    borderWidth: 1
  }
]);

// 动态更新数据
const dynamicDatasets = ref<ChartDataset<'bubble', BubbleDataPoint[]>[]>([
  {
    label: '动态数据',
    data: [
      { x: 20, y: 30, r: 15 },
      { x: 40, y: 50, r: 20 },
      { x: 60, y: 40, r: 18 },
      { x: 80, y: 60, r: 22 }
    ],
    backgroundColor: 'rgba(236, 72, 153, 0.6)'
  }
]);

// 刷新数据
const refreshData = () => {
  const count = 5;
  const newData: BubbleDataPoint[] = [];
  
  for (let i = 0; i < count; i++) {
    newData.push({
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 80) + 10,
      r: Math.floor(Math.random() * 20) + 10
    });
  }
  
  dynamicDatasets.value = [
    {
      label: '动态数据',
      data: newData,
      backgroundColor: 'rgba(236, 72, 153, 0.6)'
    }
  ];
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
