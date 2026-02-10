<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>饼图 (Pie Chart)</h4>
        <j-ch-pie-doughnut
          type="pie"
          :labels="pieLabels"
          :datasets="pieDatasets"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>环形图 (Doughnut Chart)</h4>
        <j-ch-pie-doughnut
          type="doughnut"
          :labels="doughnutLabels"
          :datasets="doughnutDatasets"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>销售占比分析（饼图）</h4>
        <j-ch-pie-doughnut
          type="pie"
          :labels="salesLabels"
          :datasets="salesDatasets"
          :height="350"
        />
      </div>

      <div class="demo-section">
        <h4>用户分布（环形图）</h4>
        <j-ch-pie-doughnut
          type="doughnut"
          :labels="userLabels"
          :datasets="userDatasets"
          :height="350"
        />
      </div>

      <div class="demo-section">
        <h4>自定义高度</h4>
        <j-ch-pie-doughnut
          type="doughnut"
          :labels="customHeightLabels"
          :datasets="customHeightDatasets"
          :height="250"
        />
      </div>

      <div class="demo-section">
        <h4>自定义配置（隐藏图例）</h4>
        <j-ch-pie-doughnut
          type="pie"
          :labels="customOptionsLabels"
          :datasets="customOptionsDatasets"
          :options="customOptions"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>自定义颜色</h4>
        <j-ch-pie-doughnut
          type="doughnut"
          :labels="colorLabels"
          :datasets="colorDatasets"
          :height="300"
        />
      </div>

      <div class="demo-section">
        <h4>动态切换图表类型</h4>
        <div style="margin-bottom: 16px; display: flex; gap: 8px;">
          <j-q-button 
            :label="currentType === 'pie' ? '切换为环形图' : '切换为饼图'"
            type="primary"
            icon="swap_horiz"
            @click="toggleType"
          />
          <j-q-button 
            label="刷新数据" 
            type="secondary"
            icon="refresh"
            @click="refreshData"
          />
        </div>
        <j-ch-pie-doughnut
          :type="currentType"
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
import { JChPieDoughnut, JQButton } from 'qcpt';
import type { ChartDataset, ChartOptions } from 'chart.js/auto';

// 饼图数据
const pieLabels = ref(['产品A', '产品B', '产品C', '产品D', '产品E']);
const pieDatasets = ref<ChartDataset<'pie'>[]>([
  {
    label: '销量',
    data: [300, 250, 200, 150, 100],
    backgroundColor: [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(139, 92, 246, 0.8)'
    ]
  }
]);

// 环形图数据
const doughnutLabels = ref(['直接访问', '搜索引擎', '社交媒体', '邮件营销', '其他']);
const doughnutDatasets = ref<ChartDataset<'doughnut'>[]>([
  {
    label: '访问来源',
    data: [335, 310, 234, 135, 86],
    backgroundColor: [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(107, 114, 128, 0.8)'
    ]
  }
]);

// 销售占比分析
const salesLabels = ref(['华东地区', '华南地区', '华北地区', '西南地区', '东北地区', '西北地区']);
const salesDatasets = ref<ChartDataset<'pie'>[]>([
  {
    label: '销售额',
    data: [3500, 2800, 2200, 1800, 1200, 800],
    backgroundColor: [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(6, 182, 212, 0.8)'
    ]
  }
]);

// 用户分布
const userLabels = ref(['18-24岁', '25-34岁', '35-44岁', '45-54岁', '55岁以上']);
const userDatasets = ref<ChartDataset<'doughnut'>[]>([
  {
    label: '用户数',
    data: [2500, 4200, 3800, 2100, 1400],
    backgroundColor: [
      'rgba(139, 92, 246, 0.8)',
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)'
    ]
  }
]);

// 自定义高度数据
const customHeightLabels = ref(['已完成', '进行中', '未开始']);
const customHeightDatasets = ref<ChartDataset<'doughnut'>[]>([
  {
    label: '项目状态',
    data: [65, 25, 10],
    backgroundColor: [
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(107, 114, 128, 0.8)'
    ]
  }
]);

// 自定义配置数据（隐藏图例）
const customOptionsLabels = ref(['类型A', '类型B', '类型C', '类型D']);
const customOptionsDatasets = ref<ChartDataset<'pie'>[]>([
  {
    label: '数据分布',
    data: [40, 30, 20, 10],
    backgroundColor: [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)'
    ]
  }
]);

// 自定义配置项（隐藏图例）
const customOptions = ref<Partial<ChartOptions<'pie'>>>({
  plugins: {
    legend: {
      display: false
    }
  }
});

// 自定义颜色
const colorLabels = ref(['优秀', '良好', '及格', '不及格']);
const colorDatasets = ref<ChartDataset<'doughnut'>[]>([
  {
    label: '成绩分布',
    data: [35, 40, 20, 5],
    backgroundColor: [
      '#10b981',
      '#3b82f6',
      '#f59e0b',
      '#ef4444'
    ],
    borderColor: [
      '#059669',
      '#2563eb',
      '#d97706',
      '#dc2626'
    ],
    borderWidth: 2
  }
]);

// 动态切换图表类型
const currentType = ref<'pie' | 'doughnut'>('pie');
const dynamicLabels = ref(['一月', '二月', '三月', '四月', '五月']);
const dynamicDatasets = ref<ChartDataset<'pie' | 'doughnut'>[]>([
  {
    label: '月度数据',
    data: [120, 190, 150, 220, 180],
    backgroundColor: [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(139, 92, 246, 0.8)'
    ]
  }
]);

// 切换图表类型
const toggleType = () => {
  currentType.value = currentType.value === 'pie' ? 'doughnut' : 'pie';
};

// 刷新数据
const refreshData = () => {
  dynamicDatasets.value = [
    {
      label: '月度数据',
      data: dynamicLabels.value.map(() => Math.floor(Math.random() * 200) + 100),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)'
      ]
    }
  ];
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
