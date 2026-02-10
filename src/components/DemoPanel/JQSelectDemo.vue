<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <JQSelect
          v-model="basicValue"
          :options="basicOptions"
          option-label="label"
          option-value="value"
          label="选择一个选项"
        />
        <p class="demo-value">当前值: {{ basicValue || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>多选</h4>
        <JQSelect
          v-model="multipleValue"
          :options="basicOptions"
          option-label="label"
          option-value="value"
          label="多选"
          multiple
        />
        <p class="demo-value">当前值: {{ multipleValue }}</p>
      </div>

      <div class="demo-section">
        <h4>多选带标签（Chips）</h4>
        <JQSelect
          v-model="chipsValue"
          :options="basicOptions"
          option-label="label"
          option-value="value"
          label="多选（标签）"
          multiple
          use-chips
        />
        <p class="demo-value">当前值: {{ chipsValue }}</p>
      </div>

      <div class="demo-section">
        <h4>可搜索</h4>
        <JQSelect
          v-model="filterableValue"
          :options="longOptions"
          option-label="label"
          option-value="value"
          label="可搜索"
          filterable
        />
        <p class="demo-value">当前值: {{ filterableValue || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>远程搜索（模拟）</h4>
        <JQSelect
          v-model="remoteValue"
          :options="remoteOptions"
          option-label="label"
          option-value="value"
          label="远程搜索"
          filterable
          :filter-fn="handleRemoteSearch"
          :loading="remoteLoading"
        />
        <p class="demo-value">当前值: {{ remoteValue || '(空)' }}</p>
      </div>

      <div class="demo-section">
        <h4>禁用状态</h4>
        <JQSelect
          v-model="disabledValue"
          :options="basicOptions"
          option-label="label"
          option-value="value"
          label="禁用选择器"
          disable
        />
      </div>

      <div class="demo-section">
        <h4>只读状态</h4>
        <JQSelect
          v-model="readonlyValue"
          :options="basicOptions"
          option-label="label"
          option-value="value"
          label="只读选择器"
          readonly
        />
      </div>

      <div class="demo-section">
        <h4>限制选择数量</h4>
        <JQSelect
          v-model="limitedValue"
          :options="basicOptions"
          option-label="label"
          option-value="value"
          label="最多选择2项"
          multiple
          :maxlength="2"
        />
        <p class="demo-value">当前值: {{ limitedValue }} (最多2项)</p>
      </div>

      <div class="demo-section">
        <h4>自定义显示值（插槽）</h4>
        <JQSelect
          v-model="customDisplayValue"
          :options="userOptions"
          option-label="name"
          option-value="id"
          label="选择用户"
        >
          <template #value-display>
            <div v-if="customDisplayValue" style="display: flex; align-items: center;">
              <span style="
                display: inline-block;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
                line-height: 24px;
                font-size: 12px;
                margin-right: 8px;
              ">{{ currentUser?.name?.charAt(0) }}</span>
              <span style="color: #667eea; font-weight: 500;">
                {{ currentUser?.name }} ({{ currentUser?.email }})
              </span>
            </div>
          </template>
        </JQSelect>
        <p class="demo-value">当前值: {{ customDisplayValue }}</p>
      </div>

      <div class="demo-section">
        <h4>自定义显示值（函数）</h4>
        <JQSelect
          v-model="productValue"
          :options="productOptions"
          option-label="name"
          option-value="id"
          :value-display-fn="formatProductDisplay"
          label="选择商品"
        />
        <p class="demo-value">当前值: {{ productValue }}</p>
      </div>

      <div class="demo-section">
        <h4>自定义标签显示（多选）</h4>
        <JQSelect
          v-model="customChipsValue"
          :options="tagOptions"
          option-label="name"
          option-value="id"
          label="选择标签"
          multiple
          use-chips
        >
          <template #chip-value-display="{ index }">
            <div style="display: flex; align-items: center;">
              <span style="margin-right: 4px;">{{ getTagIcon(index) }}</span>
              <span>{{ currentTags[index]?.name }}</span>
            </div>
          </template>
        </JQSelect>
        <p class="demo-value">当前值: {{ customChipsValue }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { JQSelect } from 'qcpt';

const basicValue = ref(null);
const multipleValue = ref([]);
const chipsValue = ref([]);
const filterableValue = ref(null);
const remoteValue = ref(null);
const disabledValue = ref(2);
const readonlyValue = ref(3);
const limitedValue = ref([]);
const customDisplayValue = ref(null);
const productValue = ref(null);
const customChipsValue = ref([]);

const basicOptions = ref([
  { label: '选项 1', value: 1 },
  { label: '选项 2', value: 2 },
  { label: '选项 3', value: 3 },
  { label: '选项 4', value: 4 },
  { label: '选项 5', value: 5 },
]);

const longOptions = ref([
  { label: 'Apple 苹果', value: 'apple' },
  { label: 'Banana 香蕉', value: 'banana' },
  { label: 'Cherry 樱桃', value: 'cherry' },
  { label: 'Durian 榴莲', value: 'durian' },
  { label: 'Elderberry 接骨木莓', value: 'elderberry' },
  { label: 'Fig 无花果', value: 'fig' },
  { label: 'Grape 葡萄', value: 'grape' },
  { label: 'Honeydew 哈密瓜', value: 'honeydew' },
]);

const userOptions = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' },
  { id: 3, name: '王五', email: 'wangwu@example.com' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com' },
]);

const productOptions = ref([
  { id: 1, name: 'MacBook Pro', price: 12999 },
  { id: 2, name: 'iPhone 15', price: 5999 },
  { id: 3, name: 'iPad Air', price: 4599 },
  { id: 4, name: 'AirPods Pro', price: 1999 },
]);

const tagOptions = ref([
  { id: 1, name: '前端', icon: '💻' },
  { id: 2, name: '后端', icon: '⚙️' },
  { id: 3, name: '设计', icon: '🎨' },
  { id: 4, name: '产品', icon: '💡' },
  { id: 5, name: '测试', icon: '🔍' },
]);

const remoteOptions = ref([]);
const remoteLoading = ref(false);

// 当前选中的用户
const currentUser = computed(() => 
  userOptions.value.find(u => u.id === customDisplayValue.value)
);

// 当前选中的标签列表
const currentTags = computed(() => 
  customChipsValue.value.map(id => tagOptions.value.find(t => t.id === id))
);

// 格式化商品显示
const formatProductDisplay = (value: number) => {
  const product = productOptions.value.find(p => p.id === value);
  return product ? `${product.name} - ¥${product.price}` : '';
};

// 获取标签图标
const getTagIcon = (index: number) => {
  return currentTags.value[index]?.icon || '🏷️';
};

// 模拟远程搜索
const handleRemoteSearch = (val: string, update: (options?: any[]) => void) => {
  if (val === '') {
    update([]);
    return;
  }

  remoteLoading.value = true;

  // 模拟 API 延迟
  setTimeout(() => {
    const filtered = [
      { label: `搜索结果: ${val} - 1`, value: `${val}-1` },
      { label: `搜索结果: ${val} - 2`, value: `${val}-2` },
      { label: `搜索结果: ${val} - 3`, value: `${val}-3` },
    ];
    update(filtered);
    remoteLoading.value = false;
  }, 500);
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
