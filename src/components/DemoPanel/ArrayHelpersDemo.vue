<template>
  <div class="helpers-demo-wrapper">
    <q-tabs
      v-model="currentTab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
    >
      <q-tab name="unique" label="数组去重" />
      <q-tab name="tree" label="树形化" />
      <q-tab name="sort" label="排序" />
      <q-tab name="stats" label="统计" />
      <q-tab name="ops" label="数组操作" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="currentTab" animated class="tab-panels">
      <!-- 数组去重 -->
      <q-tab-panel name="unique">
        <div class="demo-section">
          <h4>uniqueArray - 基础去重</h4>
          <div class="demo-input-group">
            <q-input
              v-model="uniqueInput"
              label="输入数组（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="3"
              style="width: 100%"
              hint='例如：[1,2,2,3,3,4]'
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行去重" type="primary" @click="runUniqueArray" />
          </div>
          <div v-if="uniqueResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ uniqueResult }}</pre>
          </div>
          <div v-if="uniqueError" class="demo-error">
            错误：{{ uniqueError }}
          </div>
        </div>

        <div class="demo-section">
          <h4>uniqueArrayByKey - 对象数组去重</h4>
          <div class="demo-input-group">
            <q-input
              v-model="uniqueByKeyInput"
              label="输入对象数组（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="5"
              style="width: 100%"
              hint='例如：[{"id":1,"name":"a"},{"id":2,"name":"b"},{"id":1,"name":"c"}]'
            />
            <q-input
              v-model="uniqueKeyInput"
              label="去重字段"
              outlined
              dense
              style="max-width: 200px"
              hint="例如：id"
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行去重" type="primary" @click="runUniqueByKey" />
          </div>
          <div v-if="uniqueByKeyResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ uniqueByKeyResult }}</pre>
          </div>
          <div v-if="uniqueByKeyError" class="demo-error">
            错误：{{ uniqueByKeyError }}
          </div>
        </div>
      </q-tab-panel>

      <!-- 树形化 -->
      <q-tab-panel name="tree">
        <div class="demo-section">
          <h4>arrayToTree - 扁平数组转树</h4>
          <div class="demo-input-group">
            <q-input
              v-model="arrayToTreeInput"
              label="输入扁平数组（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="8"
              style="width: 100%"
              hint='例如：[{"id":1,"parentId":null,"name":"A"},{"id":2,"parentId":1,"name":"A-1"}]'
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行转换" type="primary" @click="runArrayToTree" />
          </div>
          <div v-if="arrayToTreeResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ arrayToTreeResult }}</pre>
          </div>
          <div v-if="arrayToTreeError" class="demo-error">
            错误：{{ arrayToTreeError }}
          </div>
        </div>
      </q-tab-panel>

      <!-- 排序 -->
      <q-tab-panel name="sort">
        <div class="demo-section">
          <h4>sortBy - 根据字段排序</h4>
          <div class="demo-input-group">
            <q-input
              v-model="sortInput"
              label="输入对象数组（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="5"
              style="width: 100%"
              hint='例如：[{"age":30},{"age":20},{"age":25}]'
            />
            <q-input
              v-model="sortKeyInput"
              label="排序字段"
              outlined
              dense
              style="max-width: 150px"
              hint="例如：age"
            />
            <q-select
              v-model="sortOrderInput"
              :options="['asc', 'desc']"
              label="排序方式"
              outlined
              dense
              style="max-width: 120px"
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行排序" type="primary" @click="runSortBy" />
          </div>
          <div v-if="sortResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ sortResult }}</pre>
          </div>
          <div v-if="sortError" class="demo-error">
            错误：{{ sortError }}
          </div>
        </div>
      </q-tab-panel>

      <!-- 统计 -->
      <q-tab-panel name="stats">
        <div class="demo-section">
          <h4>数组统计方法</h4>
          <div class="demo-input-group">
            <q-input
              v-model="statsInput"
              label="输入数字数组（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="3"
              style="width: 100%"
              hint='例如：[1,2,3,4,5]'
            />
          </div>
          <div style="margin-top: 12px; display: flex; gap: 12px; flex-wrap: wrap">
            <j-q-button label="求和" type="primary" @click="runSum" />
            <j-q-button label="平均值" type="primary" @click="runAverage" />
            <j-q-button label="最大值" type="primary" @click="runMax" />
            <j-q-button label="最小值" type="primary" @click="runMin" />
          </div>
          <div v-if="statsResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ statsResult }}</div>
          </div>
          <div v-if="statsError" class="demo-error">
            错误：{{ statsError }}
          </div>
        </div>
      </q-tab-panel>

      <!-- 数组操作 -->
      <q-tab-panel name="ops">
        <div class="demo-section">
          <h4>chunkArray - 数组分块</h4>
          <div class="demo-input-group">
            <q-input
              v-model="chunkInput"
              label="输入数组（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="3"
              style="width: 100%"
              hint='例如：[1,2,3,4,5]'
            />
            <q-input
              v-model.number="chunkSizeInput"
              label="每块大小"
              outlined
              dense
              type="number"
              style="max-width: 150px"
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行分块" type="primary" @click="runChunkArray" />
          </div>
          <div v-if="chunkResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ chunkResult }}</pre>
          </div>
          <div v-if="chunkError" class="demo-error">
            错误：{{ chunkError }}
          </div>
        </div>

        <div class="demo-section">
          <h4>shuffle - 数组打乱</h4>
          <div class="demo-input-group">
            <q-input
              v-model="shuffleInput"
              label="输入数组（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="3"
              style="width: 100%"
              hint='例如：[1,2,3,4,5]'
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行打乱" type="primary" @click="runShuffle" />
          </div>
          <div v-if="shuffleResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ shuffleResult }}</pre>
          </div>
          <div v-if="shuffleError" class="demo-error">
            错误：{{ shuffleError }}
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQButton, jqTool } from 'qcpt';

const currentTab = ref('unique');

// 数组去重
const uniqueInput = ref('[1,2,2,3,3,4]');
const uniqueResult = ref('');
const uniqueError = ref('');

const uniqueByKeyInput = ref('[{"id":1,"name":"a"},{"id":2,"name":"b"},{"id":1,"name":"c"}]');
const uniqueKeyInput = ref('id');
const uniqueByKeyResult = ref('');
const uniqueByKeyError = ref('');

// 树形化
const arrayToTreeInput = ref('[{"id":1,"parentId":null,"name":"A"},{"id":2,"parentId":1,"name":"A-1"},{"id":3,"parentId":1,"name":"A-2"}]');
const arrayToTreeResult = ref('');
const arrayToTreeError = ref('');

// 排序
const sortInput = ref('[{"age":30},{"age":20},{"age":25}]');
const sortKeyInput = ref('age');
const sortOrderInput = ref('asc');
const sortResult = ref('');
const sortError = ref('');

// 统计
const statsInput = ref('[1,2,3,4,5]');
const statsResult = ref('');
const statsError = ref('');

// 数组操作
const chunkInput = ref('[1,2,3,4,5]');
const chunkSizeInput = ref(2);
const chunkResult = ref('');
const chunkError = ref('');

const shuffleInput = ref('[1,2,3,4,5]');
const shuffleResult = ref('');
const shuffleError = ref('');

// 执行函数
const runUniqueArray = () => {
  try {
    uniqueError.value = '';
    const arr = JSON.parse(uniqueInput.value);
    const result = jqTool.helper.array.uniqueArray(arr);
    uniqueResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    uniqueError.value = error.message;
    uniqueResult.value = '';
  }
};

const runUniqueByKey = () => {
  try {
    uniqueByKeyError.value = '';
    const arr = JSON.parse(uniqueByKeyInput.value);
    const result = jqTool.helper.array.uniqueArrayByKey(arr, uniqueKeyInput.value);
    uniqueByKeyResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    uniqueByKeyError.value = error.message;
    uniqueByKeyResult.value = '';
  }
};

const runArrayToTree = () => {
  try {
    arrayToTreeError.value = '';
    const arr = JSON.parse(arrayToTreeInput.value);
    const result = jqTool.helper.array.arrayToTree(arr);
    arrayToTreeResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    arrayToTreeError.value = error.message;
    arrayToTreeResult.value = '';
  }
};

const runSortBy = () => {
  try {
    sortError.value = '';
    const arr = JSON.parse(sortInput.value);
    const result = jqTool.helper.array.sortBy(arr, sortKeyInput.value, sortOrderInput.value as 'asc' | 'desc');
    sortResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    sortError.value = error.message;
    sortResult.value = '';
  }
};

const runSum = () => {
  try {
    statsError.value = '';
    const arr = JSON.parse(statsInput.value);
    const result = jqTool.helper.array.sum(arr);
    statsResult.value = `求和：${result}`;
  } catch (error: any) {
    statsError.value = error.message;
    statsResult.value = '';
  }
};

const runAverage = () => {
  try {
    statsError.value = '';
    const arr = JSON.parse(statsInput.value);
    const result = jqTool.helper.array.average(arr);
    statsResult.value = `平均值：${result}`;
  } catch (error: any) {
    statsError.value = error.message;
    statsResult.value = '';
  }
};

const runMax = () => {
  try {
    statsError.value = '';
    const arr = JSON.parse(statsInput.value);
    const result = jqTool.helper.array.max(arr);
    statsResult.value = `最大值：${result}`;
  } catch (error: any) {
    statsError.value = error.message;
    statsResult.value = '';
  }
};

const runMin = () => {
  try {
    statsError.value = '';
    const arr = JSON.parse(statsInput.value);
    const result = jqTool.helper.array.min(arr);
    statsResult.value = `最小值：${result}`;
  } catch (error: any) {
    statsError.value = error.message;
    statsResult.value = '';
  }
};

const runChunkArray = () => {
  try {
    chunkError.value = '';
    const arr = JSON.parse(chunkInput.value);
    const result = jqTool.helper.array.chunkArray(arr, chunkSizeInput.value);
    chunkResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    chunkError.value = error.message;
    chunkResult.value = '';
  }
};

const runShuffle = () => {
  try {
    shuffleError.value = '';
    const arr = JSON.parse(shuffleInput.value);
    const result = jqTool.helper.array.shuffle(arr);
    shuffleResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    shuffleError.value = error.message;
    shuffleResult.value = '';
  }
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';

.helpers-demo-wrapper {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.tab-panels {
  background: transparent;
}
</style>
