<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <j-q-button-dropdown 
          label="操作"
          :items="basicItems"
          @select="handleSelect"
        />
        <p class="demo-value">选中: {{ selectedItem || '(未选择)' }}</p>
      </div>

      <div class="demo-section">
        <h4>按钮类型</h4>
        <div class="q-gutter-sm">
          <j-q-button-dropdown 
            label="主要按钮"
            type="primary"
            :items="basicItems"
          />
          
          <j-q-button-dropdown 
            label="次要按钮"
            type="secondary"
            :items="basicItems"
          />
        </div>
      </div>

      <div class="demo-section">
        <h4>按钮尺寸</h4>
        <div class="q-gutter-sm">
          <j-q-button-dropdown 
            label="大按钮"
            size="large"
            :items="basicItems"
          />
          
          <j-q-button-dropdown 
            label="正常按钮"
            size="normal"
            :items="basicItems"
          />
          
          <j-q-button-dropdown 
            label="小按钮"
            size="small"
            :items="basicItems"
          />
        </div>
      </div>

      <div class="demo-section">
        <h4>带图标的菜单项</h4>
        <j-q-button-dropdown 
          label="操作"
          :items="iconItems"
          @select="handleSelect"
        />
      </div>

      <div class="demo-section">
        <h4>菜单项点击回调</h4>
        <j-q-button-dropdown 
          label="操作"
          :items="callbackItems"
          @select="handleSelect"
        />
        <p class="demo-value">最后操作: {{ lastAction || '(无)' }}</p>
      </div>

      <div class="demo-section">
        <h4>禁用菜单项</h4>
        <j-q-button-dropdown 
          label="操作"
          :items="disabledItems"
        />
      </div>

      <div class="demo-section">
        <h4>自定义下拉图标</h4>
        <j-q-button-dropdown 
          label="操作"
          :items="basicItems"
          dropdown-icon="arrow_drop_down"
        />
      </div>

      <div class="demo-section">
        <h4>自定义菜单位置</h4>
        <j-q-button-dropdown 
          label="右对齐菜单"
          :items="basicItems"
          menu-anchor="bottom right"
          menu-self="top right"
          :menu-offset="[10, 10]"
        />
      </div>

      <div class="demo-section">
        <h4>禁用按钮</h4>
        <j-q-button-dropdown 
          label="禁用的下拉按钮"
          :items="basicItems"
          disabled
        />
      </div>

      <div class="demo-section">
        <h4>自定义按钮标签</h4>
        <j-q-button-dropdown :items="basicItems">
          <template #label>
            <q-icon name="more_vert" />
            <span style="margin-left: 4px;">更多操作</span>
          </template>
        </j-q-button-dropdown>
      </div>

      <div class="demo-section">
        <h4>方法调用</h4>
        <div class="q-gutter-sm">
          <j-q-button-dropdown 
            ref="dropdownRef"
            label="操作"
            :items="basicItems"
          />
          
          <q-btn @click="showMenu" label="显示菜单" size="sm" outline />
          <q-btn @click="hideMenu" label="隐藏菜单" size="sm" outline />
          <q-btn @click="toggleMenu" label="切换菜单" size="sm" outline />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQButtonDropdown } from 'qcpt';
import type { JQButtonDropdownItem } from 'qcpt';

const selectedItem = ref('');
const lastAction = ref('');
const dropdownRef = ref();

const basicItems: JQButtonDropdownItem[] = [
  { label: '选项 1', value: '1' },
  { label: '选项 2', value: '2' },
  { label: '选项 3', value: '3' }
];

const iconItems: JQButtonDropdownItem[] = [
  { label: '编辑', value: 'edit', icon: 'edit' },
  { label: '删除', value: 'delete', icon: 'delete' },
  { label: '查看', value: 'view', icon: 'visibility' }
];

const callbackItems: JQButtonDropdownItem[] = [
  { 
    label: '编辑', 
    value: 'edit',
    icon: 'edit',
    onClick: () => {
      lastAction.value = '编辑被点击';
    }
  },
  { 
    label: '删除', 
    value: 'delete',
    icon: 'delete',
    onClick: () => {
      lastAction.value = '删除被点击';
    }
  },
  { 
    label: '复制', 
    value: 'copy',
    icon: 'content_copy',
    onClick: () => {
      lastAction.value = '复制被点击';
    }
  }
];

const disabledItems: JQButtonDropdownItem[] = [
  { label: '可用选项', value: '1' },
  { label: '禁用选项', value: '2', disabled: true },
  { label: '另一个可用选项', value: '3' }
];

const handleSelect = (item: JQButtonDropdownItem) => {
  selectedItem.value = item.label;
  console.log('选择了:', item);
};

const showMenu = () => {
  dropdownRef.value?.show();
};

const hideMenu = () => {
  dropdownRef.value?.hide();
};

const toggleMenu = () => {
  dropdownRef.value?.toggle();
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
