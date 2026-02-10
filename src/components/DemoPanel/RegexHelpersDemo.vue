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
      <q-tab name="common" label="常用验证" />
      <q-tab name="network" label="网络验证" />
      <q-tab name="string" label="字符串验证" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="currentTab" animated class="tab-panels">
      <q-tab-panel name="common">
        <div class="demo-section">
          <h4>isPhone - 验证手机号</h4>
          <div class="demo-input-group">
            <q-input v-model="phoneInput" label="输入手机号" outlined dense style="max-width: 300px" />
            <j-q-button label="验证" type="primary" @click="runIsPhone" />
          </div>
          <div v-if="phoneResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content" :class="phoneResult ? 'valid' : 'invalid'">
              {{ phoneResult ? '✓ 有效' : '✗ 无效' }}
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>isEmail - 验证邮箱</h4>
          <div class="demo-input-group">
            <q-input v-model="emailInput" label="输入邮箱" outlined dense style="max-width: 300px" />
            <j-q-button label="验证" type="primary" @click="runIsEmail" />
          </div>
          <div v-if="emailResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content" :class="emailResult ? 'valid' : 'invalid'">
              {{ emailResult ? '✓ 有效' : '✗ 无效' }}
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>isIdCard - 验证身份证号</h4>
          <div class="demo-input-group">
            <q-input v-model="idCardInput" label="输入身份证号" outlined dense style="max-width: 300px" />
            <j-q-button label="验证" type="primary" @click="runIsIdCard" />
          </div>
          <div v-if="idCardResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content" :class="idCardResult ? 'valid' : 'invalid'">
              {{ idCardResult ? '✓ 有效' : '✗ 无效' }}
            </div>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="network">
        <div class="demo-section">
          <h4>isUrl - 验证 URL</h4>
          <div class="demo-input-group">
            <q-input v-model="urlInput" label="输入 URL" outlined dense style="width: 100%" />
            <j-q-button label="验证" type="primary" @click="runIsUrl" />
          </div>
          <div v-if="urlResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content" :class="urlResult ? 'valid' : 'invalid'">
              {{ urlResult ? '✓ 有效' : '✗ 无效' }}
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>isIP - 验证 IP 地址</h4>
          <div class="demo-input-group">
            <q-input v-model="ipInput" label="输入 IP" outlined dense style="max-width: 300px" />
            <j-q-button label="验证" type="primary" @click="runIsIP" />
          </div>
          <div v-if="ipResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content" :class="ipResult ? 'valid' : 'invalid'">
              {{ ipResult ? '✓ 有效' : '✗ 无效' }}
            </div>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="string">
        <div class="demo-section">
          <h4>isChinese - 验证纯中文</h4>
          <div class="demo-input-group">
            <q-input v-model="chineseInput" label="输入文本" outlined dense style="max-width: 300px" />
            <j-q-button label="验证" type="primary" @click="runIsChinese" />
          </div>
          <div v-if="chineseResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content" :class="chineseResult ? 'valid' : 'invalid'">
              {{ chineseResult ? '✓ 纯中文' : '✗ 非纯中文' }}
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>isNumber - 验证纯数字</h4>
          <div class="demo-input-group">
            <q-input v-model="numberInput" label="输入文本" outlined dense style="max-width: 300px" />
            <j-q-button label="验证" type="primary" @click="runIsNumber" />
          </div>
          <div v-if="numberResult !== null" class="demo-result">
            <div class="result-label">结果：</div>
            <div class="result-content" :class="numberResult ? 'valid' : 'invalid'">
              {{ numberResult ? '✓ 纯数字' : '✗ 非纯数字' }}
            </div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { JQButton, jqTool } from 'qcpt';

const currentTab = ref('common');

const phoneInput = ref('13812345678');
const phoneResult = ref<boolean | null>(null);

const emailInput = ref('test@example.com');
const emailResult = ref<boolean | null>(null);

const idCardInput = ref('320123199001011234');
const idCardResult = ref<boolean | null>(null);

const urlInput = ref('https://www.example.com');
const urlResult = ref<boolean | null>(null);

const ipInput = ref('192.168.1.1');
const ipResult = ref<boolean | null>(null);

const chineseInput = ref('中文测试');
const chineseResult = ref<boolean | null>(null);

const numberInput = ref('123456');
const numberResult = ref<boolean | null>(null);

const runIsPhone = () => {
  phoneResult.value = jqTool.helper.regex.isPhone(phoneInput.value);
};

const runIsEmail = () => {
  emailResult.value = jqTool.helper.regex.isEmail(emailInput.value);
};

const runIsIdCard = () => {
  idCardResult.value = jqTool.helper.regex.isIdCard(idCardInput.value);
};

const runIsUrl = () => {
  urlResult.value = jqTool.helper.regex.isUrl(urlInput.value);
};

const runIsIP = () => {
  ipResult.value = jqTool.helper.regex.isIP(ipInput.value);
};

const runIsChinese = () => {
  chineseResult.value = jqTool.helper.regex.isChinese(chineseInput.value);
};

const runIsNumber = () => {
  numberResult.value = jqTool.helper.regex.isNumber(numberInput.value);
};
</script>

<style scoped lang="scss">
@import './demo-common.scss';

.valid {
  color: #4caf50;
  font-weight: 600;
}

.invalid {
  color: #f44336;
  font-weight: 600;
}
</style>
