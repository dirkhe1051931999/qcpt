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
      <q-tab name="desensitize" label="脱敏处理" />
      <q-tab name="capitalize" label="大小写转换" />
      <q-tab name="case" label="命名格式" />
      <q-tab name="number" label="数字格式化" />
      <q-tab name="card" label="卡号格式化" />
      <q-tab name="ops" label="字符串操作" />
      <q-tab name="html" label="HTML处理" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="currentTab" animated class="tab-panels">
      <!-- 脱敏处理 -->
      <q-tab-panel name="desensitize">
        <div class="demo-section">
          <h4>phoneDesensitize - 手机号脱敏</h4>
          <div class="demo-input-group">
            <q-input
              v-model="phoneInput"
              label="输入手机号"
              outlined
              dense
              style="max-width: 300px"
            />
            <j-q-button label="执行" type="primary" @click="runPhoneDesensitize" />
          </div>
          <div v-if="phoneResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ phoneResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>idCardDesensitize - 身份证号脱敏</h4>
          <div class="demo-input-group">
            <q-input
              v-model="idCardInput"
              label="输入身份证号"
              outlined
              dense
              style="max-width: 300px"
            />
            <j-q-button label="执行" type="primary" @click="runIdCardDesensitize" />
          </div>
          <div v-if="idCardResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ idCardResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>nameDesensitize - 姓名脱敏</h4>
          <div class="demo-input-group">
            <q-input
              v-model="nameInput"
              label="输入姓名"
              outlined
              dense
              style="max-width: 300px"
            />
            <j-q-button label="执行" type="primary" @click="runNameDesensitize" />
          </div>
          <div v-if="nameResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ nameResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>bankCardDesensitize - 银行卡号脱敏</h4>
          <div class="demo-input-group">
            <q-input
              v-model="bankCardInput"
              label="输入银行卡号"
              outlined
              dense
              style="max-width: 300px"
            />
            <j-q-button label="执行" type="primary" @click="runBankCardDesensitize" />
          </div>
          <div v-if="bankCardResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ bankCardResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>emailDesensitize - 邮箱脱敏</h4>
          <div class="demo-input-group">
            <q-input
              v-model="emailInput"
              label="输入邮箱"
              outlined
              dense
              style="max-width: 300px"
            />
            <j-q-button label="执行" type="primary" @click="runEmailDesensitize" />
          </div>
          <div v-if="emailResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ emailResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>addressDesensitize - 地址脱敏</h4>
          <div class="demo-input-group">
            <q-input
              v-model="addressInput"
              label="输入地址"
              outlined
              dense
              style="max-width: 400px"
            />
            <q-input
              v-model.number="addressKeepLength"
              label="保留长度"
              outlined
              dense
              type="number"
              style="max-width: 150px"
            />
            <j-q-button label="执行" type="primary" @click="runAddressDesensitize" />
          </div>
          <div v-if="addressResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ addressResult }}</div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 大小写转换 -->
      <q-tab-panel name="capitalize">
        <div class="demo-section">
          <h4>capitalize - 首字母大写</h4>
          <div class="demo-input-group">
            <q-input
              v-model="capitalizeInput"
              label="输入字符串"
              outlined
              dense
              style="max-width: 300px"
            />
            <j-q-button label="执行" type="primary" @click="runCapitalize" />
          </div>
          <div v-if="capitalizeResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ capitalizeResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>capitalizeWords - 每个单词首字母大写</h4>
          <div class="demo-input-group">
            <q-input
              v-model="capitalizeWordsInput"
              label="输入字符串"
              outlined
              dense
              style="max-width: 400px"
            />
            <j-q-button label="执行" type="primary" @click="runCapitalizeWords" />
          </div>
          <div v-if="capitalizeWordsResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ capitalizeWordsResult }}</div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 命名格式转换 -->
      <q-tab-panel name="case">
        <div class="demo-section">
          <h4>命名格式转换</h4>
          <div class="demo-input-group">
            <q-input
              v-model="caseInput"
              label="输入字符串"
              outlined
              dense
              style="max-width: 400px"
              hint="尝试输入 user_name 或 userName"
            />
          </div>
          <div style="margin-top: 12px; display: flex; gap: 12px; flex-wrap: wrap">
            <j-q-button label="转驼峰 (toCamelCase)" type="primary" @click="runToCamelCase" />
            <j-q-button label="转下划线 (toUnderlineCase)" type="primary" @click="runToUnderlineCase" />
            <j-q-button label="转中划线 (toKebabCase)" type="primary" @click="runToKebabCase" />
          </div>
          <div v-if="caseResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ caseResult }}</div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 数字格式化 -->
      <q-tab-panel name="number">
        <div class="demo-section">
          <h4>formatNumber - 千分位格式化</h4>
          <div class="demo-input-group">
            <q-input
              v-model.number="formatNumberInput"
              label="输入数字"
              outlined
              dense
              type="number"
              style="max-width: 300px"
            />
            <j-q-button label="执行" type="primary" @click="runFormatNumber" />
          </div>
          <div v-if="formatNumberResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ formatNumberResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>formatMoney - 金额格式化</h4>
          <div class="demo-input-group">
            <q-input
              v-model.number="formatMoneyInput"
              label="输入金额"
              outlined
              dense
              type="number"
              step="0.01"
              style="max-width: 200px"
            />
            <q-input
              v-model="moneyCurrency"
              label="货币符号"
              outlined
              dense
              style="max-width: 120px"
            />
            <q-input
              v-model.number="moneyDecimals"
              label="小数位"
              outlined
              dense
              type="number"
              style="max-width: 120px"
            />
            <j-q-button label="执行" type="primary" @click="runFormatMoney" />
          </div>
          <div v-if="formatMoneyResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ formatMoneyResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>formatFileSize - 文件大小格式化</h4>
          <div class="demo-input-group">
            <q-input
              v-model.number="fileSizeInput"
              label="输入字节数"
              outlined
              dense
              type="number"
              style="max-width: 300px"
            />
            <q-input
              v-model.number="fileSizeDecimals"
              label="小数位数"
              outlined
              dense
              type="number"
              style="max-width: 150px"
            />
            <j-q-button label="执行" type="primary" @click="runFormatFileSize" />
          </div>
          <div v-if="fileSizeResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ fileSizeResult }}</div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 卡号格式化 -->
      <q-tab-panel name="card">
        <div class="demo-section">
          <h4>formatBankCard - 格式化银行卡号</h4>
          <div class="demo-input-group">
            <q-input
              v-model="formatBankCardInput"
              label="输入银行卡号"
              outlined
              dense
              style="max-width: 300px"
            />
            <j-q-button label="执行" type="primary" @click="runFormatBankCard" />
          </div>
          <div v-if="formatBankCardResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ formatBankCardResult }}</div>
          </div>
          <div class="demo-note">
            提示：每 4 位添加一个空格
          </div>
        </div>

        <div class="demo-section">
          <h4>formatPhone - 格式化手机号</h4>
          <div class="demo-input-group">
            <q-input
              v-model="formatPhoneInput"
              label="输入手机号"
              outlined
              dense
              style="max-width: 300px"
            />
            <j-q-button label="执行" type="primary" @click="runFormatPhone" />
          </div>
          <div v-if="formatPhoneResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ formatPhoneResult }}</div>
          </div>
          <div class="demo-note">
            提示：格式为 138 1234 5678
          </div>
        </div>
      </q-tab-panel>

      <!-- 字符串操作 -->
      <q-tab-panel name="ops">
        <div class="demo-section">
          <h4>randomString - 生成随机字符串</h4>
          <div class="demo-input-group">
            <q-input
              v-model.number="randomLengthInput"
              label="长度"
              outlined
              dense
              type="number"
              style="max-width: 150px"
            />
            <q-select
              v-model="randomTypeInput"
              :options="['alpha', 'number', 'alphanumeric']"
              label="类型"
              outlined
              dense
              style="max-width: 200px"
            />
            <j-q-button label="生成" type="primary" @click="runRandomString" />
          </div>
          <div v-if="randomResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ randomResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>generateUUID - 生成唯一 ID</h4>
          <div class="demo-input-group">
            <q-input
              v-model="uuidPrefix"
              label="前缀（可选）"
              outlined
              dense
              style="max-width: 200px"
              clearable
            />
            <j-q-button label="生成" type="primary" @click="runGenerateUUID" />
          </div>
          <div v-if="uuidResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ uuidResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>truncate - 截断字符串</h4>
          <div class="demo-input-group">
            <q-input
              v-model="truncateInput"
              label="输入字符串"
              outlined
              dense
              style="max-width: 400px"
            />
            <q-input
              v-model.number="truncateLengthInput"
              label="最大长度"
              outlined
              dense
              type="number"
              style="max-width: 150px"
            />
            <q-input
              v-model="truncateSuffix"
              label="后缀"
              outlined
              dense
              style="max-width: 150px"
            />
            <j-q-button label="执行" type="primary" @click="runTruncate" />
          </div>
          <div v-if="truncateResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ truncateResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>字符串基础操作</h4>
          <div class="demo-input-group">
            <q-input
              v-model="basicOpsInput"
              label="输入字符串"
              outlined
              dense
              style="max-width: 300px"
            />
          </div>
          <div style="margin-top: 12px; display: flex; gap: 12px; flex-wrap: wrap">
            <j-q-button label="反转 (reverse)" type="primary" @click="runReverse" />
            <j-q-button label="判断为空 (isEmpty)" type="primary" @click="runIsEmpty" />
          </div>
          <div v-if="basicOpsResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ basicOpsResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>repeat - 重复字符串</h4>
          <div class="demo-input-group">
            <q-input
              v-model="repeatInput"
              label="输入字符串"
              outlined
              dense
              style="max-width: 200px"
            />
            <q-input
              v-model.number="repeatCount"
              label="重复次数"
              outlined
              dense
              type="number"
              style="max-width: 150px"
            />
            <j-q-button label="执行" type="primary" @click="runRepeat" />
          </div>
          <div v-if="repeatResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ repeatResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>padStart / padEnd - 补齐字符串</h4>
          <div class="demo-input-group">
            <q-input
              v-model="padInput"
              label="输入字符串"
              outlined
              dense
              style="max-width: 200px"
            />
            <q-input
              v-model.number="padLength"
              label="目标长度"
              outlined
              dense
              type="number"
              style="max-width: 150px"
            />
            <q-input
              v-model="padChar"
              label="填充字符"
              outlined
              dense
              style="max-width: 150px"
            />
          </div>
          <div style="margin-top: 12px; display: flex; gap: 12px; flex-wrap: wrap">
            <j-q-button label="左侧补齐 (padStart)" type="primary" @click="runPadStart" />
            <j-q-button label="右侧补齐 (padEnd)" type="primary" @click="runPadEnd" />
          </div>
          <div v-if="padResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ padResult }}</div>
          </div>
        </div>
      </q-tab-panel>

      <!-- HTML 处理 -->
      <q-tab-panel name="html">
        <div class="demo-section">
          <h4>removeHtmlTags - 移除 HTML 标签</h4>
          <div class="demo-input-group">
            <q-input
              v-model="removeHtmlInput"
              label="输入 HTML"
              outlined
              dense
              type="textarea"
              rows="3"
              style="width: 100%"
            />
            <j-q-button label="执行" type="primary" @click="runRemoveHtmlTags" />
          </div>
          <div v-if="removeHtmlResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ removeHtmlResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>escapeHtml - HTML 转义</h4>
          <div class="demo-input-group">
            <q-input
              v-model="escapeHtmlInput"
              label="输入 HTML"
              outlined
              dense
              type="textarea"
              rows="3"
              style="width: 100%"
            />
            <j-q-button label="转义" type="primary" @click="runEscapeHtml" />
          </div>
          <div v-if="escapeHtmlResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ escapeHtmlResult }}</div>
          </div>
        </div>

        <div class="demo-section">
          <h4>unescapeHtml - HTML 反转义</h4>
          <div class="demo-input-group">
            <q-input
              v-model="unescapeHtmlInput"
              label="输入已转义的 HTML"
              outlined
              dense
              type="textarea"
              rows="3"
              style="width: 100%"
            />
            <j-q-button label="反转义" type="primary" @click="runUnescapeHtml" />
          </div>
          <div v-if="unescapeHtmlResult" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content">{{ unescapeHtmlResult }}</div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQButton, jqTool } from 'qcpt';

const currentTab = ref('desensitize');

// 脱敏
const phoneInput = ref('13812345678');
const phoneResult = ref('');
const idCardInput = ref('320123199001011234');
const idCardResult = ref('');
const nameInput = ref('张三');
const nameResult = ref('');
const bankCardInput = ref('6222021234567890123');
const bankCardResult = ref('');
const emailInput = ref('test@example.com');
const emailResult = ref('');
const addressInput = ref('北京市朝阳区xxx街道xxx号');
const addressKeepLength = ref(6);
const addressResult = ref('');

// 大小写
const capitalizeInput = ref('hello');
const capitalizeResult = ref('');
const capitalizeWordsInput = ref('hello world');
const capitalizeWordsResult = ref('');

// 命名格式
const caseInput = ref('user_name');
const caseResult = ref('');

// 数字格式化
const formatNumberInput = ref(1234567);
const formatNumberResult = ref('');
const formatMoneyInput = ref(1234.56);
const moneyCurrency = ref('¥');
const moneyDecimals = ref(2);
const formatMoneyResult = ref('');
const fileSizeInput = ref(1234567);
const fileSizeDecimals = ref(2);
const fileSizeResult = ref('');

// 卡号格式化
const formatBankCardInput = ref('6222021234567890');
const formatBankCardResult = ref('');
const formatPhoneInput = ref('13812345678');
const formatPhoneResult = ref('');

// 字符串操作
const randomLengthInput = ref(8);
const randomTypeInput = ref('alphanumeric');
const randomResult = ref('');
const uuidPrefix = ref('');
const uuidResult = ref('');
const truncateInput = ref('这是一个很长的字符串需要被截断');
const truncateLengthInput = ref(5);
const truncateSuffix = ref('...');
const truncateResult = ref('');
const basicOpsInput = ref('hello');
const basicOpsResult = ref<any>(null);
const repeatInput = ref('ab');
const repeatCount = ref(3);
const repeatResult = ref('');
const padInput = ref('5');
const padLength = ref(3);
const padChar = ref('0');
const padResult = ref('');

// HTML
const removeHtmlInput = ref('<p>Hello <strong>World</strong></p>');
const removeHtmlResult = ref('');
const escapeHtmlInput = ref('<div>Hello & "World"</div>');
const escapeHtmlResult = ref('');
const unescapeHtmlInput = ref('&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;');
const unescapeHtmlResult = ref('');

// 执行函数
const runPhoneDesensitize = () => {
  phoneResult.value = jqTool.helper.string.phoneDesensitize(phoneInput.value);
};

const runIdCardDesensitize = () => {
  idCardResult.value = jqTool.helper.string.idCardDesensitize(idCardInput.value);
};

const runNameDesensitize = () => {
  nameResult.value = jqTool.helper.string.nameDesensitize(nameInput.value);
};

const runBankCardDesensitize = () => {
  bankCardResult.value = jqTool.helper.string.bankCardDesensitize(bankCardInput.value);
};

const runEmailDesensitize = () => {
  emailResult.value = jqTool.helper.string.emailDesensitize(emailInput.value);
};

const runAddressDesensitize = () => {
  addressResult.value = jqTool.helper.string.addressDesensitize(addressInput.value, addressKeepLength.value);
};

const runCapitalize = () => {
  capitalizeResult.value = jqTool.helper.string.capitalize(capitalizeInput.value);
};

const runCapitalizeWords = () => {
  capitalizeWordsResult.value = jqTool.helper.string.capitalizeWords(capitalizeWordsInput.value);
};

const runToCamelCase = () => {
  caseResult.value = jqTool.helper.string.toCamelCase(caseInput.value);
};

const runToUnderlineCase = () => {
  caseResult.value = jqTool.helper.string.toUnderlineCase(caseInput.value);
};

const runToKebabCase = () => {
  caseResult.value = jqTool.helper.string.toKebabCase(caseInput.value);
};

const runFormatNumber = () => {
  formatNumberResult.value = jqTool.helper.string.formatNumber(formatNumberInput.value);
};

const runFormatMoney = () => {
  formatMoneyResult.value = jqTool.helper.string.formatMoney(formatMoneyInput.value, {
    currency: moneyCurrency.value,
    decimals: moneyDecimals.value
  });
};

const runFormatFileSize = () => {
  fileSizeResult.value = jqTool.helper.string.formatFileSize(fileSizeInput.value, fileSizeDecimals.value);
};

const runFormatBankCard = () => {
  formatBankCardResult.value = jqTool.helper.string.formatBankCard(formatBankCardInput.value);
};

const runFormatPhone = () => {
  formatPhoneResult.value = jqTool.helper.string.formatPhone(formatPhoneInput.value);
};

const runRandomString = () => {
  randomResult.value = jqTool.helper.string.randomString(
    randomLengthInput.value,
    randomTypeInput.value as any
  );
};

const runGenerateUUID = () => {
  uuidResult.value = jqTool.helper.string.generateUUID(uuidPrefix.value || undefined);
};

const runTruncate = () => {
  truncateResult.value = jqTool.helper.string.truncate(
    truncateInput.value,
    truncateLengthInput.value,
    truncateSuffix.value
  );
};

const runReverse = () => {
  basicOpsResult.value = jqTool.helper.string.reverse(basicOpsInput.value);
};

const runIsEmpty = () => {
  basicOpsResult.value = jqTool.helper.string.isEmpty(basicOpsInput.value) ? '是空字符串' : '不是空字符串';
};

const runRepeat = () => {
  repeatResult.value = jqTool.helper.string.repeat(repeatInput.value, repeatCount.value);
};

const runPadStart = () => {
  padResult.value = jqTool.helper.string.padStart(padInput.value, padLength.value, padChar.value);
};

const runPadEnd = () => {
  padResult.value = jqTool.helper.string.padEnd(padInput.value, padLength.value, padChar.value);
};

const runRemoveHtmlTags = () => {
  removeHtmlResult.value = jqTool.helper.string.removeHtmlTags(removeHtmlInput.value);
};

const runEscapeHtml = () => {
  escapeHtmlResult.value = jqTool.helper.string.escapeHtml(escapeHtmlInput.value);
};

const runUnescapeHtml = () => {
  unescapeHtmlResult.value = jqTool.helper.string.unescapeHtml(unescapeHtmlInput.value);
};

// 初始化执行
runPhoneDesensitize();
runIdCardDesensitize();
runNameDesensitize();
runBankCardDesensitize();
runEmailDesensitize();
runAddressDesensitize();
runFormatNumber();
runFormatMoney();
runFormatFileSize();
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
