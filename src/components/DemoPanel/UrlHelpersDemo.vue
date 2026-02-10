<template>
  <div class="helpers-demo-wrapper">
    <div class="demo-section">
      <h4>parseQuery - 解析 URL 参数</h4>
      <div class="demo-input-group">
        <q-input
          v-model="parseQueryInput"
          label="输入 URL 或查询字符串"
          outlined
          dense
          style="width: 100%"
          hint="例如：?name=Tom&age=20"
        />
        <j-q-button label="执行" type="primary" @click="runParseQuery" />
      </div>
      <div v-if="parseQueryResult" class="demo-result">
        <div class="result-label">结果：</div>
        <pre class="result-json">{{ parseQueryResult }}</pre>
      </div>
    </div>

    <div class="demo-section">
      <h4>stringifyQuery - 对象转 URL 参数</h4>
      <div class="demo-input-group">
        <q-input
          v-model="stringifyInput"
          label="输入对象（JSON 格式）"
          outlined
          dense
          type="textarea"
          rows="4"
          style="width: 100%"
          hint='例如：{"name":"Tom","age":20}'
        />
        <j-q-button label="执行" type="primary" @click="runStringifyQuery" />
      </div>
      <div v-if="stringifyResult" class="demo-result">
        <div class="result-label">结果：</div>
        <div class="result-content">{{ stringifyResult }}</div>
      </div>
      <div v-if="stringifyError" class="demo-error">
        错误：{{ stringifyError }}
      </div>
    </div>

    <div class="demo-section">
      <h4>joinUrl - 拼接 URL</h4>
      <div class="demo-input-group">
        <q-input v-model="joinPart1" label="部分1" outlined dense style="flex: 1" />
        <q-input v-model="joinPart2" label="部分2" outlined dense style="flex: 1" />
        <q-input v-model="joinPart3" label="部分3" outlined dense style="flex: 1" />
        <j-q-button label="拼接" type="primary" @click="runJoinUrl" />
      </div>
      <div v-if="joinResult" class="demo-result">
        <div class="result-label">结果：</div>
        <div class="result-content">{{ joinResult }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQButton, jqTool } from 'qcpt';

const parseQueryInput = ref('?name=Tom&age=20');
const parseQueryResult = ref('');

const stringifyInput = ref('{"name":"Tom","age":20}');
const stringifyResult = ref('');
const stringifyError = ref('');

const joinPart1 = ref('http://example.com/');
const joinPart2 = ref('/api/');
const joinPart3 = ref('users/123');
const joinResult = ref('');

const runParseQuery = () => {
  const result = jqTool.helper.url.parseQuery(parseQueryInput.value);
  parseQueryResult.value = JSON.stringify(result, null, 2);
};

const runStringifyQuery = () => {
  try {
    stringifyError.value = '';
    const obj = JSON.parse(stringifyInput.value);
    stringifyResult.value = jqTool.helper.url.stringifyQuery(obj);
  } catch (error: any) {
    stringifyError.value = error.message;
    stringifyResult.value = '';
  }
};

const runJoinUrl = () => {
  joinResult.value = jqTool.helper.url.joinUrl(joinPart1.value, joinPart2.value, joinPart3.value);
};

// 初始化执行
runParseQuery();
runJoinUrl();
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
