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
      <q-tab name="random" label="随机数" />
      <q-tab name="range" label="数字范围" />
      <q-tab name="precise" label="精确计算" />
      <q-tab name="percent" label="百分比" />
      <q-tab name="format" label="格式化" />
      <q-tab name="judge" label="数字判断" />
      <q-tab name="math" label="数学运算" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="currentTab" animated class="tab-panels">
      <!-- 随机数 -->
      <q-tab-panel name="random">
        <div class="demo-section">
          <h4>random - 生成随机整数</h4>
          <div class="demo-input-group">
            <q-input v-model.number="randomMin" label="最小值（包含）" outlined dense type="number" style="max-width: 150px" />
            <q-input v-model.number="randomMax" label="最大值（包含）" outlined dense type="number" style="max-width: 150px" />
            <j-q-button label="生成" type="primary" @click="runRandom" />
          </div>
          <div v-if="randomResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ randomResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>randomFloat - 生成随机浮点数</h4>
          <div class="demo-input-group">
            <q-input v-model.number="floatMin" label="最小值（包含）" outlined dense type="number" step="0.01" style="max-width: 150px" />
            <q-input v-model.number="floatMax" label="最大值（不包含）" outlined dense type="number" step="0.01" style="max-width: 150px" />
            <q-input v-model.number="floatDecimals" label="小数位数" outlined dense type="number" style="max-width: 150px" />
            <j-q-button label="生成" type="primary" @click="runRandomFloat" />
          </div>
          <div v-if="floatResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ floatResult }}</div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 数字范围 -->
      <q-tab-panel name="range">
        <div class="demo-section">
          <h4>range - 生成数字序列</h4>
          <div class="demo-input-group">
            <q-input v-model.number="rangeStart" label="开始" outlined dense type="number" style="max-width: 150px" />
            <q-input v-model.number="rangeEnd" label="结束（包含）" outlined dense type="number" style="max-width: 150px" />
            <q-input v-model.number="rangeStep" label="步长" outlined dense type="number" style="max-width: 150px" />
            <j-q-button label="生成" type="primary" @click="runRange" />
          </div>
          <div v-if="rangeResult" class="demo-result">
            <div class="result-label">结果：</div>
            <pre class="result-json">{{ rangeResult }}</pre>
          </div>
        </div>

        <div class="demo-section">
          <h4>clamp - 限制数字在范围内</h4>
          <div class="demo-input-group">
            <q-input v-model.number="clampValue" label="数值" outlined dense type="number" style="max-width: 150px" />
            <q-input v-model.number="clampMin" label="最小值" outlined dense type="number" style="max-width: 150px" />
            <q-input v-model.number="clampMax" label="最大值" outlined dense type="number" style="max-width: 150px" />
            <j-q-button label="执行" type="primary" @click="runClamp" />
          </div>
          <div v-if="clampResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ clampResult }}</div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 精确计算 -->
      <q-tab-panel name="precise">
        <div class="demo-section">
          <h4>精确四则运算（解决 JavaScript 精度问题）</h4>
          <div class="demo-input-group">
            <q-input v-model.number="num1" label="数字1" outlined dense type="number" step="0.01" style="max-width: 150px" />
            <q-input v-model.number="num2" label="数字2" outlined dense type="number" step="0.01" style="max-width: 150px" />
          </div>
          <div style="margin-top: 12px; display: flex; gap: 12px; flex-wrap: wrap">
            <j-q-button label="加法 (add)" type="primary" @click="runAdd" />
            <j-q-button label="减法 (subtract)" type="primary" @click="runSubtract" />
            <j-q-button label="乘法 (multiply)" type="primary" @click="runMultiply" />
            <j-q-button label="除法 (divide)" type="primary" @click="runDivide" />
          </div>
          <div v-if="calcResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ calcResult }}</div>
          </div>
          <div class="demo-note">
            提示：尝试 0.1 + 0.2，原生 JavaScript 结果为 0.30000000000000004，使用 add 方法得到 0.3
          </div>
        </div>

        <div class="demo-section">
          <h4>精确舍入</h4>
          <div class="demo-input-group">
            <q-input v-model.number="roundValue" label="数值" outlined dense type="number" step="0.0001" style="max-width: 200px" />
            <q-input v-model.number="roundDecimals" label="保留小数位" outlined dense type="number" style="max-width: 150px" />
          </div>
          <div style="margin-top: 12px; display: flex; gap: 12px; flex-wrap: wrap">
            <j-q-button label="四舍五入 (round)" type="primary" @click="runRound" />
            <j-q-button label="向上舍入 (ceil)" type="primary" @click="runCeil" />
            <j-q-button label="向下舍入 (floor)" type="primary" @click="runFloor" />
            <j-q-button label="toFixed" type="primary" @click="runToFixed" />
          </div>
          <div v-if="roundResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ roundResult }}</div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 百分比 -->
      <q-tab-panel name="percent">
        <div class="demo-section">
          <h4>percentage - 计算百分比</h4>
          <div class="demo-input-group">
            <q-input v-model.number="percentValue" label="当前值" outlined dense type="number" style="max-width: 150px" />
            <q-input v-model.number="percentTotal" label="总值" outlined dense type="number" style="max-width: 150px" />
            <q-input v-model.number="percentDecimals" label="保留小数位" outlined dense type="number" style="max-width: 150px" />
            <j-q-button label="计算" type="primary" @click="runPercentage" />
          </div>
          <div v-if="percentResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ percentResult }}%</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>百分比与小数互转</h4>
          <div class="demo-input-group">
            <q-input v-model.number="convertInput" label="输入值" outlined dense type="number" step="0.01" style="max-width: 200px" />
          </div>
          <div style="margin-top: 12px; display: flex; gap: 12px; flex-wrap: wrap">
            <j-q-button label="百分比转小数" type="primary" @click="runPercentToDecimal" />
            <j-q-button label="小数转百分比" type="primary" @click="runDecimalToPercent" />
          </div>
          <div v-if="convertResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ convertResult }}</div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 格式化 -->
      <q-tab-panel name="format">
        <div class="demo-section">
          <h4>padZero - 数字补零</h4>
          <div class="demo-input-group">
            <q-input v-model.number="padZeroNum" label="数字" outlined dense type="number" style="max-width: 150px" />
            <q-input v-model.number="padZeroLength" label="总长度" outlined dense type="number" style="max-width: 150px" />
            <j-q-button label="执行" type="primary" @click="runPadZero" />
          </div>
          <div v-if="padZeroResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ padZeroResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>toChineseNumber - 数字转中文</h4>
          <div class="demo-input-group">
            <q-input v-model.number="chineseInput" label="输入数字（0-99999）" outlined dense type="number" style="max-width: 300px" />
            <j-q-button label="转换" type="primary" @click="runToChineseNumber" />
          </div>
          <div v-if="chineseResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ chineseResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>toChineseMoney - 数字转大写金额</h4>
          <div class="demo-input-group">
            <q-input v-model.number="moneyInput" label="输入金额" outlined dense type="number" step="0.01" style="max-width: 300px" />
            <j-q-button label="转换" type="primary" @click="runToChineseMoney" />
          </div>
          <div v-if="moneyResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ moneyResult }}</div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 数字判断 -->
      <q-tab-panel name="judge">
        <div class="demo-section">
          <h4>奇偶判断</h4>
          <div class="demo-input-group">
            <q-input v-model.number="judgeNum" label="输入数字" outlined dense type="number" style="max-width: 200px" />
          </div>
          <div style="margin-top: 12px; display: flex; gap: 12px; flex-wrap: wrap">
            <j-q-button label="判断是否为偶数" type="primary" @click="runIsEven" />
            <j-q-button label="判断是否为奇数" type="primary" @click="runIsOdd" />
          </div>
          <div v-if="judgeResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ judgeResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>isPrime - 判断是否为质数</h4>
          <div class="demo-input-group">
            <q-input v-model.number="primeNum" label="输入数字" outlined dense type="number" style="max-width: 200px" />
            <j-q-button label="判断" type="primary" @click="runIsPrime" />
          </div>
          <div v-if="primeResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ primeResult ? '是质数' : '不是质数' }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>inRange - 判断是否在范围内</h4>
          <div class="demo-input-group">
            <q-input v-model.number="inRangeValue" label="数值" outlined dense type="number" style="max-width: 150px" />
            <q-input v-model.number="inRangeMin" label="最小值" outlined dense type="number" style="max-width: 150px" />
            <q-input v-model.number="inRangeMax" label="最大值" outlined dense type="number" style="max-width: 150px" />
            <j-q-button label="判断" type="primary" @click="runInRange" />
          </div>
          <div v-if="inRangeResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ inRangeResult ? '在范围内' : '不在范围内' }}</div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 数学运算 -->
      <q-tab-panel name="math">
        <div class="demo-section">
          <h4>基础数学运算</h4>
          <div class="demo-input-group">
            <q-input v-model.number="mathNum" label="输入数字" outlined dense type="number" style="max-width: 200px" />
          </div>
          <div style="margin-top: 12px; display: flex; gap: 12px; flex-wrap: wrap">
            <j-q-button label="绝对值 (abs)" type="primary" @click="runAbs" />
            <j-q-button label="平方根 (sqrt)" type="primary" @click="runSqrt" />
            <j-q-button label="阶乘 (factorial)" type="primary" @click="runFactorial" />
          </div>
          <div v-if="mathResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ mathResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>pow - 幂运算</h4>
          <div class="demo-input-group">
            <q-input v-model.number="powBase" label="底数" outlined dense type="number" style="max-width: 150px" />
            <q-input v-model.number="powExponent" label="指数" outlined dense type="number" style="max-width: 150px" />
            <j-q-button label="计算" type="primary" @click="runPow" />
          </div>
          <div v-if="powResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ powResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>最大公约数和最小公倍数</h4>
          <div class="demo-input-group">
            <q-input v-model.number="gcdA" label="数字 A" outlined dense type="number" style="max-width: 150px" />
            <q-input v-model.number="gcdB" label="数字 B" outlined dense type="number" style="max-width: 150px" />
          </div>
          <div style="margin-top: 12px; display: flex; gap: 12px; flex-wrap: wrap">
            <j-q-button label="最大公约数 (gcd)" type="primary" @click="runGcd" />
            <j-q-button label="最小公倍数 (lcm)" type="primary" @click="runLcm" />
          </div>
          <div v-if="gcdResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ gcdResult }}</div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQButton, jqTool } from 'qcpt';

const currentTab = ref('random');

// 随机数
const randomMin = ref(1);
const randomMax = ref(10);
const randomResult = ref<number | null>(null);

const floatMin = ref(1);
const floatMax = ref(10);
const floatDecimals = ref(2);
const floatResult = ref<number | null>(null);

// 数字范围
const rangeStart = ref(1);
const rangeEnd = ref(5);
const rangeStep = ref(1);
const rangeResult = ref('');

const clampValue = ref(15);
const clampMin = ref(0);
const clampMax = ref(10);
const clampResult = ref<number | null>(null);

// 精确计算
const num1 = ref(0.1);
const num2 = ref(0.2);
const calcResult = ref<number | null>(null);

const roundValue = ref(1.2345);
const roundDecimals = ref(2);
const roundResult = ref<number | string | null>(null);

// 百分比
const percentValue = ref(25);
const percentTotal = ref(100);
const percentDecimals = ref(2);
const percentResult = ref<number | null>(null);

const convertInput = ref(25);
const convertResult = ref<number | null>(null);

// 格式化
const padZeroNum = ref(5);
const padZeroLength = ref(3);
const padZeroResult = ref('');

const chineseInput = ref(12345);
const chineseResult = ref('');

const moneyInput = ref(123.45);
const moneyResult = ref('');

// 数字判断
const judgeNum = ref(4);
const judgeResult = ref<string | null>(null);

const primeNum = ref(7);
const primeResult = ref<boolean | null>(null);

const inRangeValue = ref(5);
const inRangeMin = ref(0);
const inRangeMax = ref(10);
const inRangeResult = ref<boolean | null>(null);

// 数学运算
const mathNum = ref(-5);
const mathResult = ref<number | null>(null);

const powBase = ref(2);
const powExponent = ref(3);
const powResult = ref<number | null>(null);

const gcdA = ref(12);
const gcdB = ref(8);
const gcdResult = ref<number | null>(null);

// 执行函数
const runRandom = () => {
  randomResult.value = jqTool.helper.number.random(randomMin.value, randomMax.value);
};

const runRandomFloat = () => {
  floatResult.value = jqTool.helper.number.randomFloat(floatMin.value, floatMax.value, floatDecimals.value);
};

const runRange = () => {
  const result = jqTool.helper.number.range(rangeStart.value, rangeEnd.value, rangeStep.value);
  rangeResult.value = JSON.stringify(result, null, 2);
};

const runClamp = () => {
  clampResult.value = jqTool.helper.number.clamp(clampValue.value, clampMin.value, clampMax.value);
};

const runAdd = () => {
  calcResult.value = jqTool.helper.number.add(num1.value, num2.value);
};

const runSubtract = () => {
  calcResult.value = jqTool.helper.number.subtract(num1.value, num2.value);
};

const runMultiply = () => {
  calcResult.value = jqTool.helper.number.multiply(num1.value, num2.value);
};

const runDivide = () => {
  calcResult.value = jqTool.helper.number.divide(num1.value, num2.value);
};

const runRound = () => {
  roundResult.value = jqTool.helper.number.round(roundValue.value, roundDecimals.value);
};

const runCeil = () => {
  roundResult.value = jqTool.helper.number.ceil(roundValue.value, roundDecimals.value);
};

const runFloor = () => {
  roundResult.value = jqTool.helper.number.floor(roundValue.value, roundDecimals.value);
};

const runToFixed = () => {
  roundResult.value = jqTool.helper.number.toFixed(roundValue.value, roundDecimals.value);
};

const runPercentage = () => {
  percentResult.value = jqTool.helper.number.percentage(percentValue.value, percentTotal.value, percentDecimals.value);
};

const runPercentToDecimal = () => {
  convertResult.value = jqTool.helper.number.percentToDecimal(convertInput.value);
};

const runDecimalToPercent = () => {
  convertResult.value = jqTool.helper.number.decimalToPercent(convertInput.value);
};

const runPadZero = () => {
  padZeroResult.value = jqTool.helper.number.padZero(padZeroNum.value, padZeroLength.value);
};

const runToChineseNumber = () => {
  chineseResult.value = jqTool.helper.number.toChineseNumber(chineseInput.value);
};

const runToChineseMoney = () => {
  moneyResult.value = jqTool.helper.number.toChineseMoney(moneyInput.value);
};

const runIsEven = () => {
  const result = jqTool.helper.number.isEven(judgeNum.value);
  judgeResult.value = result ? '是偶数' : '不是偶数';
};

const runIsOdd = () => {
  const result = jqTool.helper.number.isOdd(judgeNum.value);
  judgeResult.value = result ? '是奇数' : '不是奇数';
};

const runIsPrime = () => {
  primeResult.value = jqTool.helper.number.isPrime(primeNum.value);
};

const runInRange = () => {
  inRangeResult.value = jqTool.helper.number.inRange(inRangeValue.value, inRangeMin.value, inRangeMax.value);
};

const runAbs = () => {
  mathResult.value = jqTool.helper.number.abs(mathNum.value);
};

const runSqrt = () => {
  mathResult.value = jqTool.helper.number.sqrt(mathNum.value);
};

const runFactorial = () => {
  mathResult.value = jqTool.helper.number.factorial(mathNum.value);
};

const runPow = () => {
  powResult.value = jqTool.helper.number.pow(powBase.value, powExponent.value);
};

const runGcd = () => {
  gcdResult.value = jqTool.helper.number.gcd(gcdA.value, gcdB.value);
};

const runLcm = () => {
  gcdResult.value = jqTool.helper.number.lcm(gcdA.value, gcdB.value);
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
