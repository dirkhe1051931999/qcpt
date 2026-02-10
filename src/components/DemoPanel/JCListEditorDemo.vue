<template>
  <div class="demo-wrapper">
    <div class="demo-examples">
      <div class="demo-section">
        <h4>基础用法</h4>
        <p class="demo-hint">点击右侧的添加按钮可以添加新项，点击删除按钮可以删除项（至少保留1项）</p>
        <JCListEditor 
          v-model="basicList" 
          label="标签列表"
          hint="请输入标签名称"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(basicList, null, 2) }}</pre>
        </div>
      </div>

      <div class="demo-section">
        <h4>必填项</h4>
        <JCListEditor 
          v-model="requiredList" 
          label="必填标签列表"
          required
        />
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(requiredList, null, 2) }}</pre>
        </div>
      </div>

      <div class="demo-section">
        <h4>限制最大数量</h4>
        <p class="demo-hint">最多只能添加 3 个项目，达到上限后添加按钮会消失</p>
        <JCListEditor 
          v-model="limitedList" 
          label="标签列表（最多3个）"
          hint="请输入标签"
          :max-items="3"
        />
        <div class="demo-value">
          <p>项目数量: {{ limitedList.length }} / 3</p>
          <p v-if="limitedList.length >= 3" style="color: #999; margin-top: 4px;">已达到最大数量限制</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>表单验证</h4>
        <JCListEditor 
          v-model="validatedList" 
          label="邮箱列表"
          hint="请输入邮箱地址"
          :rules="emailRules"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(validatedList, null, 2) }}</pre>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义占位符</h4>
        <p class="demo-hint">当没有 label 时，会显示默认占位符；设置了 placeholder 则显示自定义占位符</p>
        <JCListEditor 
          v-model="placeholderList" 
          label="标签列表"
          hint="请输入标签名称"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(placeholderList, null, 2) }}</pre>
        </div>
      </div>

      <div class="demo-section">
        <h4>单一项初始状态</h4>
        <p class="demo-hint">组件默认至少有一项，删除按钮只在有多项时显示</p>
        <JCListEditor 
          v-model="singleItemList" 
          label="标签列表"
          hint="请输入标签"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(singleItemList, null, 2) }}</pre>
          <p style="margin-top: 8px;">只有一项时，删除按钮不会显示</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>自定义新增项默认值</h4>
        <p class="demo-hint">点击添加按钮时，新项会使用 default-new-value 的值</p>
        <JCListEditor 
          v-model="defaultValueList" 
          label="标签列表"
          hint="请输入标签"
          default-new-value="新标签"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(defaultValueList, null, 2) }}</pre>
        </div>
      </div>

      <div class="demo-section">
        <h4>只读模式</h4>
        <p class="demo-hint">只读模式下无法编辑和添加/删除项</p>
        <JCListEditor 
          v-model="readonlyList" 
          label="标签列表（只读）"
          readonly
        />
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(readonlyList, null, 2) }}</pre>
        </div>
      </div>

      <div class="demo-section">
        <h4>最小项数限制</h4>
        <p class="demo-hint">至少保留一项，无法删除最后一项</p>
        <JCListEditor 
          v-model="minItemsList" 
          label="标签列表（至少1项）"
          hint="请输入标签"
        />
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(minItemsList, null, 2) }}</pre>
          <p style="margin-top: 8px;">当前有 {{ minItemsList.length }} 项（至少保留1项）</p>
        </div>
      </div>

      <div class="demo-section">
        <h4>使用 after 插槽</h4>
        <p class="demo-hint">after 插槽会在每个输入框后显示</p>
        <JCListEditor 
          v-model="slotList" 
          label="标签列表"
          hint="请输入标签"
        >
          <template #after>
            <q-icon name="info" size="16px" color="grey" style="margin-left: 4px;" />
          </template>
        </JCListEditor>
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(slotList, null, 2) }}</pre>
        </div>
      </div>

      <div class="demo-section">
        <h4>完整示例（表单组合）</h4>
        <p class="demo-hint">结合必填、验证规则、最大数量限制等功能</p>
        <div class="q-gutter-md">
            <JCListEditor 
            v-model="completeList" 
            label="技能标签"
            hint="请输入技能名称"
            required
            :max-items="5"
            :rules="skillRules"
            default-new-value=""
          />
        </div>
        <div class="demo-value">
          <p><strong>当前值:</strong></p>
          <pre>{{ JSON.stringify(completeList, null, 2) }}</pre>
          <p style="margin-top: 8px;">已添加 {{ completeList.length }} 个技能（最多5个）</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JCListEditor } from 'qcpt';
import { QIcon } from 'quasar';

// 基础列表（至少需要一个空字符串作为初始值）
const basicList = ref<string[]>(['标签1', '标签2']);

// 必填列表
const requiredList = ref<string[]>(['必填项1']);

// 限制数量的列表
const limitedList = ref<string[]>(['项目1']);

// 验证列表
const validatedList = ref<string[]>(['test@example.com']);

// 占位符列表
const placeholderList = ref<string[]>(['']);

// 单一项列表
const singleItemList = ref<string[]>(['']);

// 默认值列表
const defaultValueList = ref<string[]>(['标签1']);

// 只读列表
const readonlyList = ref<string[]>(['只读项1', '只读项2', '只读项3']);

// 最小项数列表
const minItemsList = ref<string[]>(['项目1']);

// 插槽列表
const slotList = ref<string[]>(['带提示的标签1', '带提示的标签2']);

// 完整示例列表
const completeList = ref<string[]>(['Vue']);

// 邮箱验证规则
const emailRules = [
  (val: string) => !!val || '邮箱不能为空',
  (val: string) => /.+@.+\..+/.test(val) || '请输入有效的邮箱地址'
];

// 技能验证规则
const skillRules = [
  (val: string) => !!val || '技能名称不能为空',
  (val: string) => val.length >= 2 || '技能名称至少2个字符',
  (val: string) => val.length <= 20 || '技能名称最多20个字符'
];
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
