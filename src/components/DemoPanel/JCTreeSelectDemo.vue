<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法（带 label）</h4>
        <p class="demo-hint">最简单的用法，使用 label 属性显示标签。</p>
        <JCTreeSelect
          v-model="basicSelectedValue"
          :options="basicTreeData"
          option-label="label"
          option-value="value"
          label="选择节点"
        />
        <div class="demo-value">
          <p><strong>当前选中的值:</strong> {{ JSON.stringify(basicSelectedValue) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>基础用法（使用 form-label 包裹）</h4>
        <p class="demo-hint">使用 j-q-form-label 包裹组件，移除组件自身的 label 属性。</p>
        <JQFormLabel label="选择节点">
          <JCTreeSelect
            v-model="formLabelSelectedValue"
            :options="formLabelTreeData"
            option-label="label"
            option-value="value"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>当前选中的值:</strong> {{ JSON.stringify(formLabelSelectedValue) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>多选模式</h4>
        <p class="demo-hint">设置 multiple=true 启用多选模式。</p>
        <JQFormLabel label="多选节点">
          <JCTreeSelect
            v-model="multipleSelectedValues"
            :options="multipleTreeData"
            option-label="label"
            option-value="value"
            multiple
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>当前选中的值:</strong> {{ JSON.stringify(multipleSelectedValues) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>搜索功能</h4>
        <p class="demo-hint">默认启用搜索功能，可以通过 filterable 控制。输入关键词可以过滤树节点。</p>
        <JQFormLabel label="可搜索的树选择器">
          <JCTreeSelect
            v-model="filterableSelectedValue"
            :options="filterableTreeData"
            option-label="label"
            option-value="value"
            :filterable="true"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>当前选中的值:</strong> {{ JSON.stringify(filterableSelectedValue) }}</p>
          <p style="margin-top: 4px;"><strong>说明:</strong> 点击下拉框，在搜索框中输入关键词可以过滤节点</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>仅叶子节点可选</h4>
        <p class="demo-hint">使用 leafOnly 属性限制只能选择叶子节点（没有子节点的节点）。</p>
        <JQFormLabel label="仅叶子节点可选">
          <JCTreeSelect
            v-model="leafOnlySelectedValue"
            :options="leafOnlyTreeData"
            option-label="label"
            option-value="value"
            leaf-only
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>当前选中的值:</strong> {{ JSON.stringify(leafOnlySelectedValue) }}</p>
          <p style="margin-top: 4px;"><strong>说明:</strong> 只能选择叶子节点，父节点不可选</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义显示格式</h4>
        <p class="demo-hint">使用 valueDisplayFn 属性自定义选中值的显示格式。</p>
        <JQFormLabel label="自定义显示格式">
          <JCTreeSelect
            v-model="customDisplaySelectedValue"
            :options="customDisplayTreeData"
            option-label="label"
            option-value="value"
            :value-display-fn="formatDisplay"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>当前选中的值:</strong> {{ JSON.stringify(customDisplaySelectedValue) }}</p>
          <p style="margin-top: 4px;"><strong>说明:</strong> 使用自定义格式函数，显示格式为：节点1, 节点2</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>表单验证</h4>
        <p class="demo-hint">支持 Quasar 的 rules 验证。</p>
        <JQFormLabel label="必选节点" required>
          <JCTreeSelect
            v-model="validatedSelectedValue"
            :options="validatedTreeData"
            option-label="label"
            option-value="value"
            :rules="[
              val => val.length > 0 || '请至少选择一个节点'
            ]"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>当前选中的值:</strong> {{ JSON.stringify(validatedSelectedValue) }}</p>
          <p style="margin-top: 4px;"><strong>说明:</strong> 未选择时会显示验证错误</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>禁用和只读</h4>
        <p class="demo-hint">使用 disable 或 readonly 属性控制组件状态。</p>
        <div style="margin-bottom: 12px;">
          <JQFormLabel label="禁用状态">
            <JCTreeSelect
              v-model="disabledSelectedValue"
              :options="disabledTreeData"
              option-label="label"
              option-value="value"
              disable
            />
          </JQFormLabel>
        </div>
        <JQFormLabel label="只读状态">
          <JCTreeSelect
            v-model="readonlySelectedValue"
            :options="readonlyTreeData"
            option-label="label"
            option-value="value"
            readonly
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>禁用状态值:</strong> {{ JSON.stringify(disabledSelectedValue) }}</p>
          <p style="margin-top: 4px;"><strong>只读状态值:</strong> {{ JSON.stringify(readonlySelectedValue) }}</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>完整示例（部门选择）</h4>
        <p class="demo-hint">实际应用场景：部门选择，展示完整的树形结构。</p>
        <JQFormLabel label="选择部门" required>
          <JCTreeSelect
            v-model="departmentSelectedValue"
            :options="departmentTreeData"
            option-label="label"
            option-value="value"
            multiple
            :rules="[
              val => val.length > 0 || '请至少选择一个部门'
            ]"
          />
        </JQFormLabel>
        <div class="demo-value">
          <p><strong>当前选中的部门:</strong> {{ JSON.stringify(departmentSelectedValue) }}</p>
          <p style="margin-top: 4px;"><strong>功能:</strong> 多选、搜索、表单验证</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCTreeSelect, JQFormLabel } from 'qcpt';

// 基础用法（带 label）
const basicSelectedValue = ref<(string | number)[]>([]);
const basicTreeData = ref([
  {
    label: '节点1',
    value: 1,
    children: [
      { label: '子节点1', value: 2 },
      { label: '子节点2', value: 3 }
    ]
  },
  {
    label: '节点2',
    value: 4
  }
]);

// 基础用法（使用 form-label）
const formLabelSelectedValue = ref<(string | number)[]>([]);
const formLabelTreeData = ref([
  {
    label: '节点1',
    value: 1,
    children: [
      { label: '子节点1', value: 2 },
      { label: '子节点2', value: 3 }
    ]
  }
]);

// 多选模式
const multipleSelectedValues = ref<(string | number)[]>([2, 3]);
const multipleTreeData = ref([
  {
    label: '节点1',
    value: 1,
    children: [
      { label: '子节点1', value: 2 },
      { label: '子节点2', value: 3 }
    ]
  },
  {
    label: '节点2',
    value: 4,
    children: [
      { label: '子节点3', value: 5 }
    ]
  }
]);

// 搜索功能
const filterableSelectedValue = ref<(string | number)[]>([]);
const filterableTreeData = ref([
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
      { label: '产品设计组', value: 'design' }
    ]
  }
]);

// 仅叶子节点可选
const leafOnlySelectedValue = ref<(string | number)[]>([]);
const leafOnlyTreeData = ref([
  {
    label: '节点1',
    value: 1,
    children: [
      { label: '子节点1', value: 2 },
      { label: '子节点2', value: 3 }
    ]
  },
  {
    label: '节点2',
    value: 4,
    children: [
      { label: '子节点3', value: 5 }
    ]
  }
]);

// 自定义显示格式
const customDisplaySelectedValue = ref<(string | number)[]>([2, 3]);
const customDisplayTreeData = ref([
  {
    label: '节点1',
    value: 1,
    children: [
      { label: '子节点1', value: 2 },
      { label: '子节点2', value: 3 }
    ]
  }
]);

const formatDisplay = (value: (string | number)[], options: any[]): string => {
  const findNode = (nodes: any[], targetValue: string | number): any => {
    for (const node of nodes) {
      if (node.value === targetValue) return node;
      if (node.children) {
        const found = findNode(node.children, targetValue);
        if (found) return found;
      }
    }
    return null;
  };
  
  return value.map(v => {
    const node = findNode(options, v);
    return node ? node.label : String(v);
  }).join(', ');
};

// 表单验证
const validatedSelectedValue = ref<(string | number)[]>([]);
const validatedTreeData = ref([
  {
    label: '节点1',
    value: 1,
    children: [
      { label: '子节点1', value: 2 }
    ]
  }
]);

// 禁用和只读
const disabledSelectedValue = ref<(string | number)[]>([2]);
const disabledTreeData = ref([
  {
    label: '节点1',
    value: 1,
    children: [
      { label: '子节点1', value: 2 }
    ]
  }
]);

const readonlySelectedValue = ref<(string | number)[]>([2]);
const readonlyTreeData = ref([
  {
    label: '节点1',
    value: 1,
    children: [
      { label: '子节点1', value: 2 },
      { label: '子节点2', value: 3 }
    ]
  }
]);

// 完整示例（部门选择）
const departmentSelectedValue = ref<(string | number)[]>([]);
const departmentTreeData = ref([
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
  },
  {
    label: '运营部',
    value: 'operation'
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
