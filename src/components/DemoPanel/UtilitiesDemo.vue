<template>
  <div class="utilities-demo-wrapper">
    <q-tabs
      v-model="currentTab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
    >
      <q-tab name="dataFormat" label="数据格式化" />
      <q-tab name="formatters" label="格式化函数" />
      <q-tab name="fileDownload" label="文件下载" />
      <q-tab name="treeData" label="树形数据" />
      <q-tab name="form" label="表单工具" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="currentTab" animated class="tab-panels">
      <!-- 数据格式化 -->
      <q-tab-panel name="dataFormat">
        <div class="demo-section">
          <h4>formatSize - 格式化文件大小</h4>
          <div class="demo-input-group">
            <q-input
              v-model.number="formatSizeInput"
              type="number"
              label="输入文件大小（字节）"
              outlined
              dense
              style="max-width: 300px"
            />
            <j-q-button label="执行" type="primary" @click="runFormatSize" />
          </div>
          <div class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ formatSizeResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>convertDataUnit - 单位转换</h4>
          <div class="demo-input-group">
            <q-input
              v-model.number="convertDataInput"
              type="number"
              label="输入值"
              outlined
              dense
              style="max-width: 200px"
            />
            <q-select
              v-model="convertFromUnit"
              :options="unitOptions"
              label="从"
              outlined
              dense
              style="max-width: 120px"
            />
            <q-select
              v-model="convertToUnit"
              :options="unitOptions"
              label="到"
              outlined
              dense
              style="max-width: 120px"
            />
            <j-q-button label="执行" type="primary" @click="runConvertDataUnit" />
          </div>
          <div class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ convertDataResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>defaultFill - 默认填充</h4>
          <div class="demo-input-group">
            <q-input
              v-model="defaultFillInput"
              label="输入值（留空测试空值处理）"
              outlined
              dense
              style="max-width: 300px"
              clearable
            />
            <j-q-button label="执行" type="primary" @click="runDefaultFill" />
          </div>
          <div class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ defaultFillResult }}</div>
          </div>
          <div class="demo-note">
            提示：可以尝试输入 null、0、空字符串等值
          </div>
        </div>

        <div class="demo-section">
          <h4>formatDate - 格式化日期</h4>
          <div class="demo-input-group">
            <q-input
              v-model="formatDateInput"
              label="输入日期"
              outlined
              dense
              style="max-width: 300px"
              hint="留空使用当前时间"
            />
            <q-input
              v-model="formatDateFormat"
              label="格式"
              outlined
              dense
              style="max-width: 200px"
            />
            <j-q-button label="执行" type="primary" @click="runFormatDate" />
          </div>
          <div class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ formatDateResult }}</div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 文件下载 -->
      <q-tab-panel name="fileDownload">
        <div class="demo-section">
          <h4>JQDownloadFile - 下载文件</h4>
          <div class="demo-input-group">
            <q-input
              v-model="downloadFileName"
              label="文件名"
              outlined
              dense
              style="max-width: 300px"
            />
            <q-input
              v-model="downloadFileContent"
              label="文件内容"
              outlined
              dense
              type="textarea"
              rows="3"
              style="flex: 1; max-width: 400px"
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="下载文本文件" type="primary" @click="runDownloadFile" />
          </div>
          <div class="demo-note">
            点击按钮将下载一个包含您输入内容的文本文件
          </div>
        </div>

        <div class="demo-section">
          <h4>generateDownloadFileName - 生成文件名</h4>
          <div class="demo-input-group">
            <q-input
              v-model="generateFileNamePrefix"
              label="文件名前缀"
              outlined
              dense
              style="max-width: 200px"
            />
            <q-input
              v-model="generateFileNameExt"
              label="扩展名"
              outlined
              dense
              style="max-width: 120px"
            />
            <j-q-button label="执行" type="primary" @click="runGenerateFileName" />
          </div>
          <div class="demo-result">
            <div class="result-label">生成的文件名：</div>
            <div class="result-content">{{ generateFileNameResult }}</div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 树形数据 -->
      <q-tab-panel name="treeData">
        <div class="demo-section">
          <h4>transformTreeUseLabelAndValue - 转换树形数据</h4>
          <div class="demo-input-group">
            <q-input
              v-model="treeDataInput"
              label="输入树形数据（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="8"
              style="width: 100%"
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行转换" type="primary" @click="runTransformTree" />
          </div>
          <div v-if="transformTreeResult" class="demo-result">
            <div class="result-label">转换结果：</div>
            <pre class="result-json">{{ transformTreeResult }}</pre>
          </div>
          <div v-if="transformTreeError" class="demo-error">
            错误：{{ transformTreeError }}
          </div>
        </div>
      </q-tab-panel>

      <!-- 表单工具 -->
      <q-tab-panel name="form">
        <div class="demo-section">
          <h4>formUtils.val2Str - 值转字符串</h4>
          <div class="demo-input-group">
            <q-input
              v-model="val2StrInput"
              label="输入值"
              outlined
              dense
              style="max-width: 300px"
              clearable
            />
            <j-q-button label="执行" type="primary" @click="runVal2Str" />
          </div>
          <div class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ val2StrResult }}</div>
            <div class="result-type">类型：{{ val2StrType }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>formUtils.valSplit - 值分割</h4>
          <div class="demo-input-group">
            <q-input
              v-model="valSplitInput"
              label="输入逗号分隔的值"
              outlined
              dense
              style="max-width: 400px"
              hint="例如：1,2,3 或 a, b, c"
            />
            <j-q-button label="执行" type="primary" @click="runValSplit" />
          </div>
          <div class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ valSplitResult }}</pre>
          </div>
        </div>

        <div class="demo-section">
          <h4>formUtils.obj2Arr - 对象转数组</h4>
          <div class="demo-input-group">
            <q-input
              v-model="obj2ArrInput"
              label="输入对象数组（JSON 格式）"
              outlined
              dense
              type="textarea"
              rows="6"
              style="width: 100%"
              hint='例如：[{"id": 1, "name": "张三"}, {"id": 2, "name": "李四"}]'
            />
            <q-input
              v-model="obj2ArrKey"
              label="要提取的键名"
              outlined
              dense
              style="max-width: 200px"
              hint="例如：id"
            />
          </div>
          <div style="margin-top: 12px">
            <j-q-button label="执行" type="primary" @click="runObj2Arr" />
          </div>
          <div v-if="obj2ArrResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ obj2ArrResult }}</pre>
          </div>
          <div v-if="obj2ArrError" class="demo-error">
            错误：{{ obj2ArrError }}
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQButton, jqTool } from 'qcpt';

const currentTab = ref('dataFormat');

// 数据格式化相关
const formatSizeInput = ref(1048576);
const formatSizeResult = ref('');

const convertDataInput = ref(1024);
const convertFromUnit = ref('B');
const convertToUnit = ref('KB');
const unitOptions = ['B', 'KB', 'MB', 'GB', 'TB'];
const convertDataResult = ref('');

const defaultFillInput = ref('');
const defaultFillResult = ref('');

const formatDateInput = ref('');
const formatDateFormat = ref('YYYY-MM-DD HH:mm:ss');
const formatDateResult = ref('');

// 文件下载相关
const downloadFileName = ref('test.txt');
const downloadFileContent = ref('这是测试文件的内容');

const generateFileNamePrefix = ref('report');
const generateFileNameExt = ref('xlsx');
const generateFileNameResult = ref('');

// 树形数据相关
const treeDataInput = ref(`[
  {
    "id": 1,
    "name": "节点1",
    "children": [
      { "id": 2, "name": "子节点1" },
      { "id": 3, "name": "子节点2" }
    ]
  }
]`);
const transformTreeResult = ref('');
const transformTreeError = ref('');

// 表单工具相关
const val2StrInput = ref('123');
const val2StrResult = ref('');
const val2StrType = ref('');

const valSplitInput = ref('1, 2, 3');
const valSplitResult = ref('');

const obj2ArrInput = ref(`[
  {"id": 1, "name": "张三"},
  {"id": 2, "name": "李四"}
]`);
const obj2ArrKey = ref('id');
const obj2ArrResult = ref('');
const obj2ArrError = ref('');

// 执行函数
const runFormatSize = () => {
  formatSizeResult.value = jqTool.formatSize({ size: formatSizeInput.value });
};

const runConvertDataUnit = () => {
  convertDataResult.value = jqTool.convertDataUnit(
    convertDataInput.value,
    convertFromUnit.value as any,
    convertToUnit.value as any
  );
};

const runDefaultFill = () => {
  const inputValue = defaultFillInput.value === '' ? null : defaultFillInput.value;
  defaultFillResult.value = JSON.stringify(jqTool.defaultFill(inputValue));
};

const runFormatDate = () => {
  const dateInput = formatDateInput.value || new Date();
  formatDateResult.value = jqTool.formatDate(dateInput, formatDateFormat.value);
};

const runDownloadFile = () => {
  const blob = new Blob([downloadFileContent.value], { type: 'text/plain;charset=utf-8' });
  jqTool.JQDownloadFile(blob, downloadFileName.value);
};

const runGenerateFileName = () => {
  generateFileNameResult.value = jqTool.generateDownloadFileName(
    generateFileNamePrefix.value,
    generateFileNameExt.value
  );
};

const runTransformTree = () => {
  try {
    transformTreeError.value = '';
    const data = JSON.parse(treeDataInput.value);
    const result = jqTool.transformTreeUseLabelAndValue(data, {
      optionLabel: 'name',
      optionValue: 'id',
      optionChildren: 'children'
    });
    transformTreeResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    transformTreeError.value = error.message;
    transformTreeResult.value = '';
  }
};

const runVal2Str = () => {
  const inputValue = val2StrInput.value === '' ? null : val2StrInput.value;
  const result = jqTool.formUtils.val2Str(inputValue);
  val2StrResult.value = JSON.stringify(result);
  val2StrType.value = typeof result;
};

const runValSplit = () => {
  const result = jqTool.formUtils.valSplit(valSplitInput.value);
  valSplitResult.value = JSON.stringify(result, null, 2);
};

const runObj2Arr = () => {
  try {
    obj2ArrError.value = '';
    const data = JSON.parse(obj2ArrInput.value);
    const result = jqTool.formUtils.obj2Arr(data, obj2ArrKey.value);
    obj2ArrResult.value = JSON.stringify(result, null, 2);
  } catch (error: any) {
    obj2ArrError.value = error.message;
    obj2ArrResult.value = '';
  }
};

// 初始化执行一次
runFormatSize();
runConvertDataUnit();
runDefaultFill();
runFormatDate();
runGenerateFileName();
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.utilities-demo-wrapper {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.tab-panels {
  background: transparent;
}







.demo-input-group {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.demo-result {
  background: #f5f6fa;
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 12px;
}

.result-label {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  margin-bottom: 6px;
}

.result-content {
  font-size: 14px;
  color: #2c3e50;
  font-family: 'Courier New', monospace;
  font-weight: 500;
}

.result-type {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  font-style: italic;
}

.result-json {
  font-size: 13px;
  color: #2c3e50;
  font-family: 'Courier New', monospace;
  margin: 0;
  padding: 8px;
  background: white;
  border-radius: 4px;
  overflow-x: auto;
}

.demo-note {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  font-style: italic;
}

.demo-error {
  background: #fee;
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 12px;
  color: #c00;
  font-size: 13px;
}
</style>