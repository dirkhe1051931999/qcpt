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
      <q-tab name="clone" label="对象拷贝" />
      <q-tab name="merge" label="对象合并" />
      <q-tab name="pick" label="属性操作" />
      <q-tab name="convert" label="对象转换" />
      <q-tab name="filter" label="对象过滤" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="currentTab" animated class="tab-panels">
      <!-- 对象拷贝 -->
      <q-tab-panel name="clone">
        <div class="demo-section">
          <h4>deepClone - 深拷贝</h4>
          <div class="demo-input-group">
            <q-input
              v-model="cloneInput"
              label="输入对象（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="5"
              style="width: 100%"
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行深拷贝" type="primary" @click="runDeepClone" />
          </div>
          <div v-if="cloneResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ cloneResult }}</pre>
          </div>
          <div v-if="cloneError" class="demo-error">
            错误：{{ cloneError }}
          </div>
        </div>
      </q-tab-panel>

      <!-- 对象合并 -->
      <q-tab-panel name="merge">
        <div class="demo-section">
          <h4>deepMerge - 深度合并对象</h4>
          <div class="demo-input-group">
            <q-input
              v-model="mergeInput1"
              label="对象1（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="4"
              style="width: 100%"
            />
            <q-input
              v-model="mergeInput2"
              label="对象2（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="4"
              style="width: 100%"
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行合并" type="primary" @click="runDeepMerge" />
          </div>
          <div v-if="mergeResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ mergeResult }}</pre>
          </div>
          <div v-if="mergeError" class="demo-error">
            错误：{{ mergeError }}
          </div>
        </div>
      </q-tab-panel>

      <!-- 属性操作 -->
      <q-tab-panel name="pick">
        <div class="demo-section">
          <h4>pick - 选取对象属性</h4>
          <div class="demo-input-group">
            <q-input
              v-model="pickObjInput"
              label="输入对象（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="4"
              style="width: 100%"
            />
            <q-input
              v-model="pickKeysInput"
              label="要选取的属性（逗号分隔）"
              outlined
              dense
              style="width: 100%"
              hint="例如：a,c"
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行" type="primary" @click="runPick" />
          </div>
          <div v-if="pickResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ pickResult }}</pre>
          </div>
          <div v-if="pickError" class="demo-error">
            错误：{{ pickError }}
          </div>
        </div>

        <div class="demo-section">
          <h4>get - 获取深层属性</h4>
          <div class="demo-input-group">
            <q-input
              v-model="getObjInput"
              label="输入对象（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="4"
              style="width: 100%"
            />
            <q-input
              v-model="getPathInput"
              label="属性路径"
              outlined
              dense
              style="width: 100%"
              hint="例如：user.info.name"
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行" type="primary" @click="runGet" />
          </div>
          <div v-if="getResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ getResult }}</div>
          </div>
          <div v-if="getError" class="demo-error">
            错误：{{ getError }}
          </div>
        </div>
      </q-tab-panel>

      <!-- 对象转换 -->
      <q-tab-panel name="convert">
        <div class="demo-section">
          <h4>keysToCamelCase - 键名转驼峰</h4>
          <div class="demo-input-group">
            <q-input
              v-model="camelInput"
              label="输入对象（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="5"
              style="width: 100%"
              hint='例如：{"user_name":"Tom","user_age":20}'
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行" type="primary" @click="runKeysToCamelCase" />
          </div>
          <div v-if="camelResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ camelResult }}</pre>
          </div>
          <div v-if="camelError" class="demo-error">
            错误：{{ camelError }}
          </div>
        </div>

        <div class="demo-section">
          <h4>toQueryString - 对象转 URL 参数</h4>
          <div class="demo-input-group">
            <q-input
              v-model="queryInput"
              label="输入对象（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="4"
              style="width: 100%"
              hint='例如：{"name":"Tom","age":20}'
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行" type="primary" @click="runToQueryString" />
          </div>
          <div v-if="queryResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ queryResult }}</div>
          </div>
          <div v-if="queryError" class="demo-error">
            错误：{{ queryError }}
          </div>
        </div>
      </q-tab-panel>

      <!-- 对象过滤 -->
      <q-tab-panel name="filter">
        <div class="demo-section">
          <h4>removeEmpty - 移除空值</h4>
          <div class="demo-input-group">
            <q-input
              v-model="removeEmptyInput"
              label="输入对象（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="5"
              style="width: 100%"
              hint='例如：{"a":1,"b":null,"c":"","d":0}'
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行" type="primary" @click="runRemoveEmpty" />
          </div>
          <div v-if="removeEmptyResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ removeEmptyResult }}</pre>
          </div>
          <div v-if="removeEmptyError" class="demo-error">
            错误：{{ removeEmptyError }}
          </div>
        </div>

        <div class="demo-section">
          <h4>flattenObject - 扁平化对象</h4>
          <div class="demo-input-group">
            <q-input
              v-model="flattenInput"
              label="输入嵌套对象（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="5"
              style="width: 100%"
              hint='例如：{"a":1,"b":{"c":2,"d":{"e":3}}}'
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行" type="primary" @click="runFlattenObject" />
          </div>
          <div v-if="flattenResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ flattenResult }}</pre>
          </div>
          <div v-if="flattenError" class="demo-error">
            错误：{{ flattenError }}
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQButton, jqTool } from 'qcpt';

const currentTab = ref('clone');

// 对象拷贝
const cloneInput = ref('{"a":1,"b":{"c":2},"d":[1,2,3]}');
const cloneResult = ref('');
const cloneError = ref('');

// 对象合并
const mergeInput1 = ref('{"a":1,"b":{"c":2}}');
const mergeInput2 = ref('{"b":{"d":3},"e":4}');
const mergeResult = ref('');
const mergeError = ref('');

// 属性操作 - pick
const pickObjInput = ref('{"a":1,"b":2,"c":3}');
const pickKeysInput = ref('a,c');
const pickResult = ref('');
const pickError = ref('');

// 属性操作 - get
const getObjInput = ref('{"user":{"info":{"name":"Tom"}}}');
const getPathInput = ref('user.info.name');
const getResult = ref<any>(null);
const getError = ref('');

// 对象转换 - camelCase
const camelInput = ref('{"user_name":"Tom","user_age":20}');
const camelResult = ref('');
const camelError = ref('');

// 对象转换 - queryString
const queryInput = ref('{"name":"Tom","age":20}');
const queryResult = ref('');
const queryError = ref('');

// 对象过滤 - removeEmpty
const removeEmptyInput = ref('{"a":1,"b":null,"c":"","d":0}');
const removeEmptyResult = ref('');
const removeEmptyError = ref('');

// 对象过滤 - flatten
const flattenInput = ref('{"a":1,"b":{"c":2,"d":{"e":3}}}');
const flattenResult = ref('');
const flattenError = ref('');

// 执行函数
const runDeepClone = () => {
  try {
    cloneError.value = '';
    const obj = JSON.parse(cloneInput.value);
    const result = jqTool.helper.object.deepClone(obj);
    cloneResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    cloneError.value = error.message;
    cloneResult.value = '';
  }
};

const runDeepMerge = () => {
  try {
    mergeError.value = '';
    const obj1 = JSON.parse(mergeInput1.value);
    const obj2 = JSON.parse(mergeInput2.value);
    const result = jqTool.helper.object.deepMerge(obj1, obj2);
    mergeResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    mergeError.value = error.message;
    mergeResult.value = '';
  }
};

const runPick = () => {
  try {
    pickError.value = '';
    const obj = JSON.parse(pickObjInput.value);
    const keys = pickKeysInput.value.split(',').map(k => k.trim());
    const result = jqTool.helper.object.pick(obj, keys);
    pickResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    pickError.value = error.message;
    pickResult.value = '';
  }
};

const runGet = () => {
  try {
    getError.value = '';
    const obj = JSON.parse(getObjInput.value);
    const result = jqTool.helper.object.get(obj, getPathInput.value, undefined);
    getResult.value = JSON.stringify(result);
  } catch (error: any) {
    getError.value = error.message;
    getResult.value = null;
  }
};

const runKeysToCamelCase = () => {
  try {
    camelError.value = '';
    const obj = JSON.parse(camelInput.value);
    const result = jqTool.helper.object.keysToCamelCase(obj);
    camelResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    camelError.value = error.message;
    camelResult.value = '';
  }
};

const runToQueryString = () => {
  try {
    queryError.value = '';
    const obj = JSON.parse(queryInput.value);
    const result = jqTool.helper.object.toQueryString(obj);
    queryResult.value = result;
  } catch (error: any) {
    queryError.value = error.message;
    queryResult.value = '';
  }
};

const runRemoveEmpty = () => {
  try {
    removeEmptyError.value = '';
    const obj = JSON.parse(removeEmptyInput.value);
    const result = jqTool.helper.object.removeEmpty(obj);
    removeEmptyResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    removeEmptyError.value = error.message;
    removeEmptyResult.value = '';
  }
};

const runFlattenObject = () => {
  try {
    flattenError.value = '';
    const obj = JSON.parse(flattenInput.value);
    const result = jqTool.helper.object.flattenObject(obj);
    flattenResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    flattenError.value = error.message;
    flattenResult.value = '';
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
