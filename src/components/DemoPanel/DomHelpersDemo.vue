<template>
  <div class="helpers-demo-wrapper">
    <div class="demo-section">
      <h4>copyToClipboard - 复制到剪贴板</h4>
      <div class="demo-input-group">
        <q-input
          v-model="copyText"
          label="要复制的文本"
          outlined
          dense
          style="max-width: 400px"
        />
        <j-q-button label="复制" type="primary" @click="runCopyToClipboard" />
      </div>
      <div v-if="copyResult" class="demo-result">
        <div class="result-label">结果：</div>
        <div class="result-content">{{ copyResult }}</div>
      </div>
    </div>

    <div class="demo-section">
      <h4>downloadText - 下载文本文件</h4>
      <div class="demo-input-group">
        <q-input
          v-model="downloadContent"
          label="文件内容"
          outlined
          dense
          type="textarea"
          rows="3"
          style="flex: 1"
        />
        <q-input
          v-model="downloadFilename"
          label="文件名"
          outlined
          dense
          style="max-width: 200px"
        />
      </div>
      <div style="margin-top: 12px">
        <j-q-button label="下载" type="primary" @click="runDownloadText" />
      </div>
    </div>

    <div class="demo-section">
      <h4>scrollToTop - 回到顶部</h4>
      <div style="margin-top: 12px">
        <j-q-button label="平滑滚动到顶部" type="primary" @click="runScrollToTop" />
      </div>
      <div class="demo-note">
        提示：滚动页面后再点击按钮测试效果
      </div>
    </div>

    <div class="demo-section">
      <h4>getWindowSize - 获取窗口尺寸</h4>
      <div style="margin-top: 12px">
        <j-q-button label="获取" type="primary" @click="runGetWindowSize" />
      </div>
      <div v-if="windowSizeResult" class="demo-result">
        <div class="result-label">当前窗口尺寸：</div>
        <pre class="result-json">{{ windowSizeResult }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQButton, jqTool } from 'qcpt';

const copyText = ref('Hello World');
const copyResult = ref('');

const downloadContent = ref('这是测试文件的内容\n第二行\n第三行');
const downloadFilename = ref('test.txt');

const windowSizeResult = ref('');

const runCopyToClipboard = async () => {
  const success = await jqTool.helper.dom.copyToClipboard(copyText.value);
  copyResult.value = success ? '复制成功！' : '复制失败';
};

const runDownloadText = () => {
  jqTool.helper.dom.downloadText(downloadContent.value, downloadFilename.value);
};

const runScrollToTop = () => {
  jqTool.helper.dom.scrollToTop();
};

const runGetWindowSize = () => {
  const size = jqTool.helper.dom.getWindowSize();
  windowSizeResult.value = JSON.stringify(size, null, 2);
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
