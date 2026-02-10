<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">嵌套选择器支持多级嵌套选项，选中值会显示完整的路径信息，格式为：选项标签 (父级 > 祖父级)</p>
        <JCNestedSelect
          v-model="basicValue"
          :options="basicOptions"
          label="选择选项"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ basicValue || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>显示值:</strong> {{ getDisplayValue(basicValue, basicOptions) || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>表格模式</h4>
        <p class="demo-hint">设置 label 属性会自动应用表格样式，适合在表格中使用</p>
        <JCNestedSelect
          v-model="tableValue"
          :options="tableOptions"
          label="选择选项"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ tableValue || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>小尺寸输入框</h4>
        <p class="demo-hint">使用 smInput 属性启用小尺寸输入框，适合紧凑布局</p>
        <JCNestedSelect
          v-model="smValue"
          :options="smOptions"
          sm-input
        />
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ smValue || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>省略号模式</h4>
        <p class="demo-hint">使用 ellipsis 和 maxWidth 属性，当显示值过长时自动省略</p>
        <JCNestedSelect
          v-model="ellipsisValue"
          :options="ellipsisOptions"
          label="选择选项"
          ellipsis
          :max-width="200"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ ellipsisValue || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>完整显示值:</strong> {{ getDisplayValue(ellipsisValue, ellipsisOptions) || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义显示值</h4>
        <p class="demo-hint">使用 displayValueFn 属性自定义选中值的显示格式，例如使用 / 连接符</p>
        <JCNestedSelect
          v-model="customDisplayValue"
          :options="customDisplayOptions"
          label="选择选项"
          :display-value-fn="customDisplayFn"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ customDisplayValue || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>自定义显示格式:</strong> 使用 / 连接符</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用和只读</h4>
        <p class="demo-hint">使用 disable 或 readonly 属性控制组件状态</p>
        <div style="margin-bottom: 12px;">
          <JCNestedSelect
            v-model="disabledValue"
            :options="disabledOptions"
            label="禁用状态"
            disable
          />
        </div>
        <JCNestedSelect
          v-model="readonlyValue"
          :options="readonlyOptions"
          label="只读状态"
          readonly
        />
        <div class="demo-value">
          <p><strong>禁用状态值:</strong> {{ disabledValue || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>只读状态值:</strong> {{ readonlyValue || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>选择后不关闭菜单</h4>
        <p class="demo-hint">设置 closeOnSelect=false，选择后菜单不会自动关闭，方便连续选择</p>
        <JCNestedSelect
          v-model="closeOnSelectValue"
          :options="closeOnSelectOptions"
          label="选择选项"
          :close-on-select="false"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ closeOnSelectValue || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>提示:</strong> 选择后菜单不会自动关闭</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>监听值变化</h4>
        <p class="demo-hint">监听 change 事件获取值变化，可以在控制台查看输出</p>
        <JCNestedSelect
          v-model="changeValue"
          :options="changeOptions"
          label="选择选项"
          @change="handleChange"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ changeValue || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>变化次数:</strong> {{ changeCount }}</p>
          <p style="margin-top: 4px; font-size: 12px; color: #999;">提示：打开浏览器控制台查看 change 事件输出</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>地区选择示例</h4>
        <p class="demo-hint">实际应用场景：地区选择，展示省市区三级联动</p>
        <JCNestedSelect
          v-model="regionValue"
          :options="regionOptions"
          label="选择地区"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ regionValue || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>显示值:</strong> {{ getDisplayValue(regionValue, regionOptions) || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>部门选择示例</h4>
        <p class="demo-hint">实际应用场景：部门选择，展示公司-部门-小组的层级结构</p>
        <JCNestedSelect
          v-model="departmentValue"
          :options="departmentOptions"
          label="选择部门"
          ellipsis
          :max-width="250"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ departmentValue || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>显示值:</strong> {{ getDisplayValue(departmentValue, departmentOptions) || '(空)' }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>不可清空</h4>
        <p class="demo-hint">设置 clearable=false，隐藏清空按钮</p>
        <JCNestedSelect
          v-model="noClearableValue"
          :options="noClearableOptions"
          label="选择选项"
          :clearable="false"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong> {{ noClearableValue || '(空)' }}</p>
          <p style="margin-top: 4px;"><strong>提示:</strong> 无法清空已选择的值</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCNestedSelect } from 'qcpt';
import type { NestedSelectOption, NestedSelectModelValue } from 'qcpt';

// 基础用法
const basicValue = ref<string | number | null>(null);
const basicOptions: NestedSelectOption[] = [
  {
    label: '一级选项1',
    value: 'level1-1',
    children: [
      {
        label: '二级选项1',
        value: 'level2-1',
        children: [
          { label: '三级选项1', value: 'level3-1' },
          { label: '三级选项2', value: 'level3-2' }
        ]
      },
      { label: '二级选项2', value: 'level2-2' }
    ]
  },
  {
    label: '一级选项2',
    value: 'level1-2',
    children: [
      { label: '二级选项3', value: 'level2-3' }
    ]
  }
];

// 表格模式
const tableValue = ref<string | number | null>('level3-1');
const tableOptions: NestedSelectOption[] = [
  {
    label: '一级选项1',
    value: 'level1-1',
    children: [
      {
        label: '二级选项1',
        value: 'level2-1',
        children: [
          { label: '三级选项1', value: 'level3-1' }
        ]
      }
    ]
  }
];

// 小尺寸输入框
const smValue = ref<string | number | null>(null);
const smOptions: NestedSelectOption[] = [
  {
    label: '选项1',
    value: 1,
    children: [
      { label: '子选项1', value: 2 },
      { label: '子选项2', value: 3 }
    ]
  },
  {
    label: '选项2',
    value: 4
  }
];

// 省略号模式
const ellipsisValue = ref<string | number | null>('deep-3');
const ellipsisOptions: NestedSelectOption[] = [
  {
    label: '一级选项1',
    value: 'level1-1',
    children: [
      {
        label: '二级选项1',
        value: 'level2-1',
        children: [
          {
            label: '三级选项1',
            value: 'level3-1',
            children: [
              { label: '四级选项1', value: 'deep-1' },
              { label: '四级选项2', value: 'deep-2' },
              { label: '四级选项3', value: 'deep-3' }
            ]
          }
        ]
      }
    ]
  }
];

// 自定义显示值
const customDisplayValue = ref<string | number | null>('level3-1');
const customDisplayOptions: NestedSelectOption[] = [
  {
    label: '一级选项1',
    value: 'level1-1',
    children: [
      {
        label: '二级选项1',
        value: 'level2-1',
        children: [
          { label: '三级选项1', value: 'level3-1' }
        ]
      }
    ]
  }
];

const customDisplayFn = (value: NestedSelectModelValue, options: NestedSelectOption[]): string => {
  if (!value) return '';
  
  const findOptionWithPath = (opts: NestedSelectOption[], path: string[] = []): { option: NestedSelectOption; path: string[] } | null => {
    for (const opt of opts) {
      const currentPath = [...path, opt.label];
      if (opt.value === value) {
        return { option: opt, path: currentPath };
      }
      if (opt.children) {
        const found = findOptionWithPath(opt.children, currentPath);
        if (found) return found;
      }
    }
    return null;
  };
  
  const result = findOptionWithPath(options);
  if (!result) return '';
  
  return result.path.join(' / ');
};

// 禁用和只读
const disabledValue = ref<string | number | null>('level2-1');
const disabledOptions: NestedSelectOption[] = [
  {
    label: '选项1',
    value: 'level1-1',
    children: [
      { label: '子选项1', value: 'level2-1' }
    ]
  }
];

const readonlyValue = ref<string | number | null>('level2-2');
const readonlyOptions: NestedSelectOption[] = [
  {
    label: '选项1',
    value: 'level1-1',
    children: [
      { label: '子选项1', value: 'level2-1' },
      { label: '子选项2', value: 'level2-2' }
    ]
  }
];

// 选择后不关闭菜单
const closeOnSelectValue = ref<string | number | null>(null);
const closeOnSelectOptions: NestedSelectOption[] = [
  {
    label: '选项1',
    value: 1,
    children: [
      { label: '子选项1', value: 2 },
      { label: '子选项2', value: 3 }
    ]
  },
  {
    label: '选项2',
    value: 4
  }
];

// 监听值变化
const changeValue = ref<string | number | null>(null);
const changeCount = ref(0);
const changeOptions: NestedSelectOption[] = [
  {
    label: '选项1',
    value: 1,
    children: [
      { label: '子选项1', value: 2 }
    ]
  }
];

const handleChange = (value: NestedSelectModelValue) => {
  changeCount.value++;
  console.log('change 事件触发，选中的值:', value);
};

// 地区选择示例
const regionValue = ref<string | number | null>(null);
const regionOptions: NestedSelectOption[] = [
  {
    label: '北京市',
    value: 'beijing',
    children: [
      {
        label: '东城区',
        value: 'dongcheng',
        children: [
          { label: '东华门街道', value: 'donghuamen' },
          { label: '景山街道', value: 'jingshan' }
        ]
      },
      {
        label: '西城区',
        value: 'xicheng',
        children: [
          { label: '西长安街街道', value: 'xichanganjie' },
          { label: '新街口街道', value: 'xinjiekou' }
        ]
      }
    ]
  },
  {
    label: '上海市',
    value: 'shanghai',
    children: [
      {
        label: '黄浦区',
        value: 'huangpu',
        children: [
          { label: '南京东路街道', value: 'nanjingdonglu' },
          { label: '外滩街道', value: 'waitan' }
        ]
      }
    ]
  }
];

// 部门选择示例
const departmentValue = ref<string | number | null>(null);
const departmentOptions: NestedSelectOption[] = [
  {
    label: '技术部',
    value: 'tech',
    children: [
      {
        label: '前端组',
        value: 'frontend',
        children: [
          { label: 'Vue 小组', value: 'vue-team' },
          { label: 'React 小组', value: 'react-team' }
        ]
      },
      {
        label: '后端组',
        value: 'backend',
        children: [
          { label: 'Java 小组', value: 'java-team' },
          { label: 'Node.js 小组', value: 'nodejs-team' }
        ]
      }
    ]
  },
  {
    label: '产品部',
    value: 'product',
    children: [
      {
        label: '产品设计组',
        value: 'design',
        children: [
          { label: 'UI 设计', value: 'ui-design' },
          { label: 'UX 设计', value: 'ux-design' }
        ]
      }
    ]
  }
];

// 不可清空
const noClearableValue = ref<string | number | null>('level2-1');
const noClearableOptions: NestedSelectOption[] = [
  {
    label: '选项1',
    value: 'level1-1',
    children: [
      { label: '子选项1', value: 'level2-1' }
    ]
  }
];

// 辅助函数：获取显示值
const getDisplayValue = (value: NestedSelectModelValue, options: NestedSelectOption[]): string => {
  if (!value) return '';
  
  const findOptionWithPath = (opts: NestedSelectOption[], path: string[] = []): { option: NestedSelectOption; path: string[] } | null => {
    for (const opt of opts) {
      const currentPath = [...path, opt.label];
      if (opt.value === value) {
        return { option: opt, path: currentPath };
      }
      if (opt.children) {
        const found = findOptionWithPath(opt.children, currentPath);
        if (found) return found;
      }
    }
    return null;
  };
  
  const result = findOptionWithPath(options);
  if (!result) return '';
  
  if (result.path.length > 1) {
    const label = result.path.pop()!;
    return `${label} (${result.path.join(' > ')})`;
  }
  
  return result.path[0] || '';
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.demo-value p:last-child {
  margin-bottom: 0;
}
</style>
