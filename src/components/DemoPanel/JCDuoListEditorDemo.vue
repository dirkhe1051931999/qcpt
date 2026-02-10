<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法（inline 模式）</h4>
        <p class="demo-hint">inline 模式下，添加/删除按钮需要在 item-content 插槽中自定义。删除按钮只在项数大于 minItems 时显示。</p>
        <JCDuoListEditor 
          v-model="basicList" 
          :default-new-item="{ name: '', value: '' }"
          :min-items="1"
          :max-items="5"
          action-mode="inline"
        >
          <template #item-content="{ item, index, addItem, removeItem, canAdd, canRemove, isLast }">
            <div class="item-row">
              <div class="item-inputs">
                <JQFormLabel label="名称">
                  <JQInput v-model="item.name" style="margin-right: 12px;" />
                </JQFormLabel>
                <JQFormLabel label="值">
                  <JQInput v-model="item.value" />
                </JQFormLabel>
              </div>
              <div class="item-actions">
                <JQButton 
                  v-if="canAdd && isLast" 
                  icon="add" 
                  type="primary" 
                  flat 
                  @click="addItem(index + 1)" 
                />
                <JQButton 
                  v-if="canRemove" 
                  icon="remove" 
                  type="negative" 
                  flat 
                  @click="removeItem(index)" 
                />
              </div>
            </div>
          </template>
        </JCDuoListEditor>
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(basicList, null, 2) }}</pre>
          <p style="margin-top: 8px;">当前有 {{ basicList.length }} 项（最少1项，最多5项）</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>紧凑模式（compact mode）</h4>
        <p class="demo-hint">compact 模式下，删除按钮在每项的右上角（只在项数大于 minItems 时显示），添加按钮在底部。minItems=0 时允许删除所有项。</p>
        <JCDuoListEditor 
          v-model="compactList" 
          :default-new-item="{ category: '', description: '' }"
          :min-items="0"
          :max-items="3"
          action-mode="compact"
        >
          <template #item-content="{ item }">
            <div class="compact-content">
              <JQFormLabel label="分类" class="q-mb-md">
                <JQInput v-model="item.category" />
              </JQFormLabel>
              <JQFormLabel label="描述">
                <JQInput v-model="item.description" type="textarea" />
              </JQFormLabel>
            </div>
          </template>
          <template #list-footer-actions="{ addItem, canAdd, nextIndex }">
            <div class="text-right q-mt-md">
              <JQButton 
                v-if="canAdd" 
                label="添加项目" 
                icon="add" 
                type="primary" 
                @click="addItem(nextIndex)" 
              />
            </div>
          </template>
        </JCDuoListEditor>
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(compactList, null, 2) }}</pre>
          <p style="margin-top: 8px;">当前有 {{ compactList.length }} 项（最少0项，最多3项）</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>复杂示例（表单组合）</h4>
        <p class="demo-hint">结合多个表单控件，展示联动选择等功能。minItems=1 时至少保留一项。</p>
        <JCDuoListEditor 
          v-model="complexList" 
          :default-new-item="{ department: '', position: '', level: '' }"
          :min-items="1"
          :max-items="4"
          action-mode="compact"
          :show-remove-button="true"
        >
          <template #item-content="{ item }">
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <JQFormLabel label="部门" required>
                  <JQSelect 
                    v-model="item.department" 
                    :options="departmentOptions"
                    @update:model-value="onDepartmentChange(item)"
                  />
                </JQFormLabel>
              </div>
              <div class="col-6">
                <JQFormLabel label="职位" required>
                  <JQSelect 
                    v-model="item.position" 
                    :options="positionOptions[item.department] || []"
                    :disable="!item.department"
                  />
                </JQFormLabel>
              </div>
              <div class="col-12">
                <JQFormLabel label="级别">
                  <JQInput v-model="item.level" hint="例如：初级、中级、高级" />
                </JQFormLabel>
              </div>
            </div>
          </template>
          <template #list-footer-actions="{ addItem, canAdd, nextIndex }">
            <div class="text-right q-mt-md">
              <JQButton 
                v-if="canAdd" 
                label="添加岗位" 
                icon="add" 
                type="primary" 
                @click="addItem(nextIndex)" 
              />
            </div>
          </template>
        </JCDuoListEditor>
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(complexList, null, 2) }}</pre>
          <p style="margin-top: 8px;">已添加 {{ complexList.length }} 个岗位（最少1个，最多4个）</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>最小/最大限制</h4>
        <p class="demo-hint">最小项数: 2，最大项数: 3。当项数等于 minItems 时，删除按钮不会显示；达到 maxItems 时，添加按钮不会显示。</p>
        <JCDuoListEditor 
          v-model="limitedList" 
          :default-new-item="{ text: '' }"
          :min-items="2"
          :max-items="3"
          action-mode="compact"
        >
          <template #item-content="{ item, index }">
            <JQFormLabel :label="'项目 ' + (index + 1)">
              <JQInput v-model="item.text" />
            </JQFormLabel>
          </template>
        </JCDuoListEditor>
        <div class="demo-value">
          <p>项目数量: {{ limitedList.length }} (最少2项，最多3项)</p>
          <p v-if="limitedList.length <= 2" style="color: #999; margin-top: 4px;">已达到最小数量，无法删除</p>
          <p v-if="limitedList.length >= 3" style="color: #999; margin-top: 4px;">已达到最大数量，无法添加</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>隐藏添加/删除按钮</h4>
        <p class="demo-hint">通过 show-add-button 和 show-remove-button 控制按钮显示。compact 模式下，删除按钮在右上角；添加按钮在底部。</p>
        <JCDuoListEditor 
          v-model="noButtonList" 
          :default-new-item="{ content: '' }"
          :min-items="0"
          :max-items="5"
          action-mode="compact"
          :show-add-button="false"
          :show-remove-button="false"
        >
          <template #item-content="{ item }">
            <JQFormLabel label="内容">
              <JQInput v-model="item.content" />
            </JQFormLabel>
          </template>
        </JCDuoListEditor>
        <div class="demo-value">
          <p>当前有 {{ noButtonList.length }} 个项目（无法添加或删除）</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>使用 updateItem 方法</h4>
        <p class="demo-hint">updateItem 方法可以更新指定索引的项，支持对象合并或直接替换</p>
        <JCDuoListEditor 
          v-model="updateItemList" 
          :default-new-item="{ name: '', value: '' }"
          :min-items="1"
          :max-items="3"
          action-mode="compact"
        >
          <template #item-content="{ item, index, updateItem }">
            <div class="compact-content">
              <JQFormLabel label="名称" class="q-mb-md">
                <JQInput 
                  :model-value="item.name" 
                  @update:model-value="updateItem(index, { ...item, name: $event })"
                />
              </JQFormLabel>
              <JQFormLabel label="值">
                <JQInput 
                  :model-value="item.value" 
                  @update:model-value="updateItem(index, { ...item, value: $event })"
                />
              </JQFormLabel>
            </div>
          </template>
        </JCDuoListEditor>
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(updateItemList, null, 2) }}</pre>
        </div>
      </div>

      <div class="demo-section">
        <h4>minItems=0 允许删除所有项</h4>
        <p class="demo-hint">组件默认值为 [{}]。当 minItems=0 时，可以删除所有项。注意：删除所有项后，列表会变成空数组 []</p>
        <JCDuoListEditor 
          v-model="emptyList" 
          :default-new-item="{ text: '' }"
          :min-items="0"
          :max-items="3"
          action-mode="compact"
        >
          <template #item-content="{ item }">
            <JQFormLabel label="内容">
              <JQInput v-model="item.text" />
            </JQFormLabel>
          </template>
        </JCDuoListEditor>
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(emptyList, null, 2) }}</pre>
          <p style="margin-top: 8px;">当前有 {{ emptyList.length }} 项（minItems=0，允许删除所有项）</p>
          <p v-if="emptyList.length === 0" style="color: #999; margin-top: 4px;">列表已为空，点击底部添加按钮可以添加新项</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCDuoListEditor, JQInput, JQButton, JQFormLabel, JQSelect } from 'qcpt';

// 基础列表（默认至少有一个空对象）
const basicList = ref([
  { name: '键1', value: '值1' },
  { name: '键2', value: '值2' },
]);

// 紧凑模式列表
const compactList = ref([
  { category: '技术', description: '前端开发相关' },
]);

// 复杂列表
const complexList = ref([
  { department: 'tech', position: 'frontend', level: '中级' },
]);

// 限制数量的列表
const limitedList = ref([
  { text: '项目一' },
  { text: '项目二' },
]);

// 无按钮列表
const noButtonList = ref([
  { content: '固定内容1' },
  { content: '固定内容2' },
]);

// updateItem 示例列表
const updateItemList = ref([
  { name: '项目1', value: '值1' },
]);

// 空列表（minItems=0 时允许为空，初始值设为默认值 [{}]）
const emptyList = ref<Array<{ text: string }>>([{}]);

// 部门选项
const departmentOptions = [
  { label: '技术部', value: 'tech' },
  { label: '产品部', value: 'product' },
  { label: '运营部', value: 'operations' },
  { label: '市场部', value: 'marketing' },
];

// 职位选项（根据部门动态变化）
const positionOptions = ref<Record<string, any>>({
  tech: [
    { label: '前端工程师', value: 'frontend' },
    { label: '后端工程师', value: 'backend' },
    { label: '测试工程师', value: 'tester' },
  ],
  product: [
    { label: '产品经理', value: 'pm' },
    { label: '产品设计师', value: 'designer' },
  ],
  operations: [
    { label: '运营专员', value: 'specialist' },
    { label: '运营经理', value: 'manager' },
  ],
  marketing: [
    { label: '市场专员', value: 'specialist' },
    { label: '市场经理', value: 'manager' },
  ],
});

// 部门变化时清空职位
const onDepartmentChange = (item: any) => {
  item.position = '';
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
