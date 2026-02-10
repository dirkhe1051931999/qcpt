<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <j-ch-radar
          :labels="basicLabels"
          :datasets="basicDatasets"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>多组数据对比</h4>
        <j-ch-radar
          :labels="multiLabels"
          :datasets="multiDatasets"
          :height="350"
        />
      </div>

      <div class="demo-section">
        <h4>能力评估</h4>
        <p style="font-size: 12px; color: #666; margin-bottom: 12px;">
          六维能力模型对比分析
        </p>
        <j-ch-radar
          :labels="abilityLabels"
          :datasets="abilityDatasets"
          :height="400"
        />
      </div>

      <div class="demo-section">
        <h4>产品功能对比</h4>
        <j-ch-radar
          :labels="productLabels"
          :datasets="productDatasets"
          :height="350"
        />
      </div>

      <div class="demo-section">
        <h4>自定义高度</h4>
        <j-ch-radar
          :labels="customHeightLabels"
          :datasets="customHeightDatasets"
          :height="250"
        />
      </div>

      <div class="demo-section">
        <h4>自定义配置（隐藏图例）</h4>
        <j-ch-radar
          :labels="customOptionsLabels"
          :datasets="customOptionsDatasets"
          :options="customOptions"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>自定义填充和边框</h4>
        <j-ch-radar
          :labels="styleLabels"
          :datasets="styleDatasets"
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
        <j-ch-radar
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
import { JChRadar, JQButton } from 'qcpt';
import type { ChartDataset, ChartOptions } from 'chart.js/auto';

// 基础用法数据
const basicLabels = ref(['速度', '力量', '技巧', '防御', '体力']);
const basicDatasets = ref<ChartDataset<'radar'>[]>([
  {
    label: '角色A',
    data: [80, 90, 70, 60, 85],
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: 'rgba(59, 130, 246, 1)',
    borderWidth: 2
  }
]);

// 多组数据对比
const multiLabels = ref(['语文', '数学', '英语', '物理', '化学', '生物']);
const multiDatasets = ref<ChartDataset<'radar'>[]>([
  {
    label: '张三',
    data: [85, 92, 88, 78, 90, 82],
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: 'rgba(59, 130, 246, 1)',
    borderWidth: 2
  },
  {
    label: '李四',
    data: [78, 88, 85, 92, 85, 88],
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: 'rgba(16, 185, 129, 1)',
    borderWidth: 2
  },
  {
    label: '王五',
    data: [90, 75, 92, 80, 88, 85],
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderColor: 'rgba(245, 158, 11, 1)',
    borderWidth: 2
  }
]);

// 能力评估
const abilityLabels = ref(['沟通能力', '领导能力', '技术能力', '创新能力', '执行能力', '团队协作']);
const abilityDatasets = ref<ChartDataset<'radar'>[]>([
  {
    label: '候选人A',
    data: [90, 85, 95, 88, 92, 87],
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: 'rgba(59, 130, 246, 1)',
    borderWidth: 2
  },
  {
    label: '候选人B',
    data: [88, 92, 85, 90, 88, 95],
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: 'rgba(16, 185, 129, 1)',
    borderWidth: 2
  }
]);

// 产品功能对比
const productLabels = ref(['性能', '稳定性', '易用性', '扩展性', '安全性', '成本']);
const productDatasets = ref<ChartDataset<'radar'>[]>([
  {
    label: '方案A',
    data: [90, 85, 75, 80, 95, 70],
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: 'rgba(59, 130, 246, 1)',
    borderWidth: 2
  },
  {
    label: '方案B',
    data: [75, 90, 90, 70, 85, 85],
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderColor: 'rgba(139, 92, 246, 1)',
    borderWidth: 2
  }
]);

// 自定义高度数据
const customHeightLabels = ref(['指标1', '指标2', '指标3', '指标4', '指标5']);
const customHeightDatasets = ref<ChartDataset<'radar'>[]>([
  {
    label: '数据集',
    data: [65, 78, 82, 70, 88],
    backgroundColor: 'rgba(236, 72, 153, 0.2)',
    borderColor: 'rgba(236, 72, 153, 1)',
    borderWidth: 2
  }
]);

// 自定义配置数据（隐藏图例）
const customOptionsLabels = ref(['维度A', '维度B', '维度C', '维度D', '维度E']);
const customOptionsDatasets = ref<ChartDataset<'radar'>[]>([
  {
    label: '评分',
    data: [75, 85, 90, 70, 80],
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderColor: 'rgba(6, 182, 212, 1)',
    borderWidth: 2
  }
]);

// 自定义配置项（隐藏图例）
const customOptions = ref<Partial<ChartOptions<'radar'>>>({
  plugins: {
    legend: {
      display: false
    }
  }
});

// 自定义填充和边框
const styleLabels = ref(['创新性', '实用性', '美观度', '性价比', '用户体验']);
const styleDatasets = ref<ChartDataset<'radar'>[]>([
  {
    label: '设计方案A',
    data: [95, 80, 90, 70, 88],
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderColor: 'rgba(239, 68, 68, 1)',
    borderWidth: 3,
    fill: true
  },
  {
    label: '设计方案B',
    data: [75, 95, 85, 90, 92],
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    borderColor: 'rgba(16, 185, 129, 1)',
    borderWidth: 3,
    fill: true
  },
  {
    label: '设计方案C（不填充）',
    data: [85, 88, 92, 85, 90],
    backgroundColor: 'transparent',
    borderColor: 'rgba(245, 158, 11, 1)',
    borderWidth: 2,
    fill: false
  }
]);

// 动态更新数据
const dynamicLabels = ref(['A', 'B', 'C', 'D', 'E']);
const dynamicDatasets = ref<ChartDataset<'radar'>[]>([
  {
    label: '动态数据',
    data: [70, 80, 75, 85, 78],
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderColor: 'rgba(139, 92, 246, 1)',
    borderWidth: 2
  }
]);

// 刷新数据
const refreshData = () => {
  dynamicDatasets.value = [
    {
      label: '动态数据',
      data: dynamicLabels.value.map(() => Math.floor(Math.random() * 40) + 60),
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      borderColor: 'rgba(139, 92, 246, 1)',
      borderWidth: 2
    }
  ];
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
