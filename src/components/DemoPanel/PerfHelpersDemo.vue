<template>
  <div class="helpers-demo-wrapper">
    <div class="demo-section">
      <h4>debounce - 防抖函数</h4>
      <div class="demo-input-group">
        <q-input
          v-model="debounceText"
          label="输入文本（300ms 防抖）"
          outlined
          dense
          style="max-width: 400px"
          @input="debouncedInput"
        />
      </div>
      <div v-if="debounceResult" class="demo-result">
        <div class="result-label">防抖后的值：</div>
        <div class="result-content">{{ debounceResult }}</div>
        <div class="result-type">更新时间：{{ debounceTime }}</div>
      </div>
      <div class="demo-note">
        提示：快速输入文本，防抖函数会在停止输入 300ms 后才执行
      </div>
    </div>

    <div class="demo-section">
      <h4>throttle - 节流函数</h4>
      <div class="demo-input-group">
        <j-q-button label="点击测试（500ms 节流）" type="primary" @click="throttledClick" />
      </div>
      <div v-if="throttleResult" class="demo-result">
        <div class="result-label">节流执行次数：</div>
        <div class="result-content">{{ throttleResult }}</div>
        <div class="result-type">最后执行时间：{{ throttleTime }}</div>
      </div>
      <div class="demo-note">
        提示：快速多次点击按钮，节流函数每 500ms 最多执行一次
      </div>
    </div>

    <div class="demo-section">
      <h4>once - 只执行一次</h4>
      <div style="margin-top: 12px">
        <j-q-button label="点击测试" type="primary" @click="onceClick" />
      </div>
      <div v-if="onceResult" class="demo-result">
        <div class="result-label">执行次数：</div>
        <div class="result-content">{{ onceResult }}</div>
      </div>
      <div class="demo-note">
        提示：无论点击多少次，函数只会执行一次
      </div>
    </div>

    <div class="demo-section">
      <h4>measureTime - 测量执行时间</h4>
      <div style="margin-top: 12px">
        <j-q-button label="执行耗时操作" type="primary" @click="runMeasureTime" />
      </div>
      <div v-if="measureResult" class="demo-result">
        <div class="result-label">执行时间：</div>
        <div class="result-content">{{ measureResult }}</div>
      </div>
      <div class="demo-note">
        提示：打开浏览器控制台查看详细的性能日志
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQButton, jqTool } from 'qcpt';

// 防抖
const debounceText = ref('');
const debounceResult = ref('');
const debounceTime = ref('');

const debouncedFn = jqTool.helper.perf.debounce((text: string) => {
  debounceResult.value = text;
  debounceTime.value = new Date().toLocaleTimeString();
}, 300);

const debouncedInput = () => {
  debouncedFn(debounceText.value);
};

// 节流
const throttleResult = ref(0);
const throttleTime = ref('');

const throttledFn = jqTool.helper.perf.throttle(() => {
  throttleResult.value++;
  throttleTime.value = new Date().toLocaleTimeString();
}, 500);

const throttledClick = () => {
  throttledFn();
};

// 只执行一次
const onceResult = ref(0);

const onceFn = jqTool.helper.perf.once(() => {
  onceResult.value = 1;
});

const onceClick = () => {
  onceFn();
};

// 测量时间
const measureResult = ref('');

const slowFunction = () => {
  // 模拟耗时操作
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  return sum;
};

const measuredFn = jqTool.helper.perf.measureTime(slowFunction, '耗时操作');

const runMeasureTime = () => {
  const start = performance.now();
  measuredFn();
  const end = performance.now();
  measureResult.value = `${(end - start).toFixed(2)} ms`;
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';
</style>
