<template>
  <div class="i18n-demo-wrapper">
    <!-- 语言切换器 -->
    <div class="language-switcher">
      <div class="switcher-header">
        <q-icon name="language" size="20px" color="primary" />
        <span class="current-lang">当前语言: {{ currentLocale }}</span>
      </div>
      <q-btn-toggle
        v-model="currentLocale"
        toggle-color="primary"
        :options="[
          { label: '中文', value: 'zh-CN' },
          { label: 'English', value: 'en-US' }
        ]"
        @update:model-value="handleLocaleChange"
      />
    </div>

    <q-separator style="margin: 20px 0" />

    <q-tabs
      v-model="currentTab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
    >
      <q-tab name="basic" label="基础翻译" />
      <q-tab name="interpolation" label="变量插值" />
      <q-tab name="application" label="实际应用" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="currentTab" animated class="tab-panels">
      <!-- 基础翻译 -->
      <q-tab-panel name="basic">
        <div class="demo-section">
          <h4>操作 (action)</h4>
          <div class="translation-grid">
            <div v-for="key in actionKeys" :key="key" class="translation-item">
              <code class="key-name">action.{{ key }}</code>
              <div class="translation-value">{{ t(`action.${key}`) }}</div>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>消息 (messages)</h4>
          <div class="translation-grid">
            <div v-for="key in messageKeys" :key="key" class="translation-item">
              <code class="key-name">messages.{{ key }}</code>
              <div class="translation-value">{{ t(`messages.${key}`) }}</div>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>表单验证规则 (messages.formRules)</h4>
          <div class="translation-grid">
            <div v-for="key in formRuleKeys" :key="key" class="translation-item">
              <code class="key-name">messages.formRules.{{ key }}</code>
              <div class="translation-value">{{ t(`messages.formRules.${key}`) }}</div>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>日期时间 (messages.date)</h4>
          <div class="translation-grid">
            <div v-for="key in dateKeys" :key="key" class="translation-item">
              <code class="key-name">messages.date.{{ key }}</code>
              <div class="translation-value">{{ t(`messages.date.${key}`) }}</div>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>文件上传 (messages.jQFile)</h4>
          <div class="translation-grid">
            <div v-for="key in fileKeys" :key="key" class="translation-item">
              <code class="key-name">messages.jQFile.{{ key }}</code>
              <div class="translation-value">{{ t(`messages.jQFile.${key}`) }}</div>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>分页 (messages.pagination)</h4>
          <div class="translation-grid">
            <div v-for="key in paginationKeys" :key="key" class="translation-item">
              <code class="key-name">messages.pagination.{{ key }}</code>
              <div class="translation-value">{{ t(`messages.pagination.${key}`) }}</div>
            </div>
          </div>
        </div>

        <div class="demo-section">
          <h4>表格 (table)</h4>
          <div class="translation-grid">
            <div class="translation-item">
              <code class="key-name">table.action</code>
              <div class="translation-value">{{ t('table.action') }}</div>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 变量插值 -->
      <q-tab-panel name="interpolation">
        <div class="interpolation-section">
          <h4>分页总数</h4>
          <div class="interpolation-demo">
            <div class="controls">
              <q-input
                v-model.number="totalItems"
                type="number"
                outlined
                dense
                label="总数 (total)"
                style="width: 200px"
              />
            </div>
            <div class="result-box">
              <div class="code-line">
                <code>t('messages.pagination.total', { total: {{ totalItems }} })</code>
              </div>
              <div class="result">
                {{ t('messages.pagination.total', { total: totalItems }) }}
              </div>
            </div>
          </div>
        </div>

        <div class="interpolation-section">
          <h4>数值范围验证</h4>
          <div class="interpolation-demo">
            <div class="controls">
              <q-input
                v-model.number="minValue"
                type="number"
                outlined
                dense
                label="最小值 (min)"
                style="width: 150px"
              />
              <q-input
                v-model.number="maxValue"
                type="number"
                outlined
                dense
                label="最大值 (max)"
                style="width: 150px"
              />
            </div>
            <div class="result-box">
              <div class="code-line">
                <code>t('messages.formRules.rangeNumber', { min: {{ minValue }}, max: {{ maxValue }} })</code>
              </div>
              <div class="result">
                {{ t('messages.formRules.rangeNumber', { min: minValue, max: maxValue }) }}
              </div>
            </div>
          </div>
        </div>

        <div class="interpolation-section">
          <h4>文件类型限制</h4>
          <div class="interpolation-demo">
            <div class="controls">
              <q-input
                v-model="fileType"
                outlined
                dense
                label="文件类型 (type)"
                hint="例如：PDF, DOC, DOCX"
                style="width: 300px"
              />
            </div>
            <div class="result-box">
              <div class="code-line">
                <code>t('messages.jQFile.file_type_is', { type: '{{ fileType }}' })</code>
              </div>
              <div class="result">
                {{ t('messages.jQFile.file_type_is', { type: fileType }) }}
              </div>
            </div>
          </div>
        </div>

        <div class="interpolation-section">
          <h4>文件大小限制</h4>
          <div class="interpolation-demo">
            <div class="controls">
              <q-input
                v-model="fileSize"
                outlined
                dense
                label="文件大小 (size)"
                hint="例如：10 MB"
                style="width: 200px"
              />
            </div>
            <div class="result-box">
              <div class="code-line">
                <code>t('messages.jQFile.max_file_size', { size: '{{ fileSize }}' })</code>
              </div>
              <div class="result">
                {{ t('messages.jQFile.max_file_size', { size: fileSize }) }}
              </div>
            </div>
          </div>
        </div>

        <div class="interpolation-section">
          <h4>最大项数限制</h4>
          <div class="interpolation-demo">
            <div class="controls">
              <q-input
                v-model.number="maxItems"
                type="number"
                outlined
                dense
                label="最大项数 (max)"
                style="width: 200px"
              />
            </div>
            <div class="result-box">
              <div class="code-line">
                <code>t('messages.formRules.arrMaxLength', { max: {{ maxItems }} })</code>
              </div>
              <div class="result">
                {{ t('messages.formRules.arrMaxLength', { max: maxItems }) }}
              </div>
            </div>
          </div>
        </div>

        <div class="interpolation-section">
          <h4>重复项提示</h4>
          <div class="interpolation-demo">
            <div class="controls">
              <q-input
                v-model="duplicateValue"
                outlined
                dense
                label="重复值 (value)"
                style="width: 200px"
              />
            </div>
            <div class="result-box">
              <div class="code-line">
                <code>t('messages.formRules.duplicateItemNotAllowed', { value: '{{ duplicateValue }}' })</code>
              </div>
              <div class="result">
                {{ t('messages.formRules.duplicateItemNotAllowed', { value: duplicateValue }) }}
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <!-- 实际应用 -->
      <q-tab-panel name="application">
        <div class="application-section">
          <h4>搜索表单</h4>
          <div class="form-demo">
            <q-card flat bordered>
              <q-card-section>
                <div class="row q-col-gutter-md">
                  <div class="col-4">
                    <q-input
                      v-model="searchForm.name"
                      outlined
                      dense
                      :label="t('messages.pleaseEnter')"
                      :hint="`${t('messages.pleaseEnter')}${currentLocale === 'zh-CN' ? '姓名' : ' name'}`"
                    />
                  </div>
                  <div class="col-4">
                    <q-select
                      v-model="searchForm.status"
                      outlined
                      dense
                      :options="statusOptions"
                      :label="t('messages.pleaseSelect')"
                      :hint="`${t('messages.pleaseSelect')}${currentLocale === 'zh-CN' ? '状态' : ' status'}`"
                    />
                  </div>
                  <div class="col-4">
                    <div class="row q-gutter-sm">
                      <q-btn
                        :label="t('action.query')"
                        color="primary"
                        @click="handleSearch"
                      />
                      <q-btn
                        :label="t('action.reset')"
                        outline
                        @click="handleReset"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="application-section">
          <h4>数据表格</h4>
          <div class="table-demo">
            <q-card flat bordered>
              <q-card-section>
                <div class="table-header">
                  <div class="table-info">
                    {{ t('messages.pagination.total', { total: tableData.length }) }}
                  </div>
                  <q-btn
                    :label="t('action.add')"
                    color="primary"
                    size="sm"
                    @click="handleAdd"
                  />
                </div>
                <table class="demo-table">
                  <thead>
                    <tr>
                      <th>{{ currentLocale === 'zh-CN' ? '姓名' : 'Name' }}</th>
                      <th>{{ currentLocale === 'zh-CN' ? '邮箱' : 'Email' }}</th>
                      <th>{{ currentLocale === 'zh-CN' ? '状态' : 'Status' }}</th>
                      <th>{{ t('table.action') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in tableData" :key="item.id">
                      <td>{{ item.name }}</td>
                      <td>{{ item.email }}</td>
                      <td>
                        <q-chip
                          :color="item.status === 'active' ? 'positive' : 'grey'"
                          text-color="white"
                          size="sm"
                        >
                          {{ item.status }}
                        </q-chip>
                      </td>
                      <td>
                        <a href="#" class="link-type" @click.prevent>{{ t('action.detail') }}</a>
                        <span class="separator">|</span>
                        <a href="#" class="link-type" @click.prevent>{{ t('action.update') }}</a>
                        <span class="separator">|</span>
                        <a href="#" class="delete-type" @click.prevent>{{ t('action.delete') }}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="application-section">
          <h4>表单验证</h4>
          <div class="validation-demo">
            <q-card flat bordered>
              <q-card-section>
                <div class="row q-col-gutter-md">
                  <div class="col-6">
                    <q-input
                      v-model="validationForm.username"
                      outlined
                      dense
                      :label="`${currentLocale === 'zh-CN' ? '用户名' : 'Username'} *`"
                      :error="!validationForm.username && validationSubmitted"
                      :error-message="t('messages.formRules.required')"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      v-model="validationForm.email"
                      outlined
                      dense
                      :label="`${currentLocale === 'zh-CN' ? '邮箱' : 'Email'} *`"
                      :error="validationForm.email && !isValidEmail(validationForm.email)"
                      :error-message="t('messages.formRules.emailInvalid')"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      v-model.number="validationForm.age"
                      type="number"
                      outlined
                      dense
                      :label="`${currentLocale === 'zh-CN' ? '年龄' : 'Age'} (1-150)`"
                      :error="validationForm.age && (validationForm.age < 1 || validationForm.age > 150)"
                      :error-message="t('messages.formRules.rangeNumber', { min: 1, max: 150 })"
                    />
                  </div>
                  <div class="col-12">
                    <div class="row q-gutter-sm">
                      <q-btn
                        :label="t('action.confirm')"
                        color="primary"
                        @click="handleValidationSubmit"
                      />
                      <q-btn
                        :label="t('action.cancel')"
                        outline
                        @click="handleValidationCancel"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="application-section">
          <h4>对话框</h4>
          <div class="dialog-demo">
            <div class="button-group">
              <q-btn
                :label="`${currentLocale === 'zh-CN' ? '打开确认对话框' : 'Open Confirm Dialog'}`"
                color="primary"
                @click="confirmDialog = true"
              />
              <q-btn
                :label="`${currentLocale === 'zh-CN' ? '显示加载状态' : 'Show Loading'}`"
                color="secondary"
                @click="handleLoading"
              />
            </div>

            <q-dialog v-model="confirmDialog">
              <q-card style="min-width: 350px">
                <q-card-section>
                  <div class="text-h6">{{ currentLocale === 'zh-CN' ? '确认操作' : 'Confirm Operation' }}</div>
                </q-card-section>

                <q-card-section>
                  {{ currentLocale === 'zh-CN' ? '您确定要执行此操作吗？' : 'Are you sure you want to perform this action?' }}
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    :label="t('action.cancel')"
                    v-close-popup
                  />
                  <q-btn
                    flat
                    :label="t('action.confirm')"
                    color="primary"
                    v-close-popup
                    @click="handleConfirm"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'qcpt';

const { t, setLocale, getLocale } = useI18n();

const currentTab = ref('basic');
const currentLocale = ref<'zh-CN' | 'en-US'>('zh-CN');

// 翻译键列表
const actionKeys = ['confirm', 'cancel', 'query', 'reset', 'add', 'update', 'delete', 'detail', 'expandAll', 'collapseAll', 'viewAll', 'loading', 'addNewItem'];
const messageKeys = ['success', 'error', 'pleaseEnter', 'pleaseSelect', 'noData', 'loading', 'pleasePressEnterEnter'];
const formRuleKeys = ['required', 'emailInvalid', 'positiveInt', 'nonNegativeInt', 'percentageInvalid', 'over0', 'less100', 'invalidInput', 'alreadyExists'];
const dateKeys = ['start', 'end', 'confirm', 'hour', 'minute', 'second', 'scrollTooltip'];
const fileKeys = ['click_or_drag_file', 'unsupportFileFormat'];
const paginationKeys = ['pieces_page', 'goto'];

// 变量插值相关
const totalItems = ref(100);
const minValue = ref(0);
const maxValue = ref(100);
const fileType = ref('PDF, DOC, DOCX');
const fileSize = ref('10 MB');
const maxItems = ref(5);
const duplicateValue = ref('张三');

// 搜索表单
const searchForm = ref({
  name: '',
  status: null,
});

const statusOptions = ref([
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]);

// 表格数据
const tableData = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', status: 'active' },
  { id: 2, name: '李四', email: 'lisi@example.com', status: 'inactive' },
  { id: 3, name: '王五', email: 'wangwu@example.com', status: 'active' },
]);

// 验证表单
const validationForm = ref({
  username: '',
  email: '',
  age: null as number | null,
});

const validationSubmitted = ref(false);
const confirmDialog = ref(false);

// 方法
const handleLocaleChange = async (value: 'zh-CN' | 'en-US') => {
  await setLocale(value);
  // 切换后更新重复值示例
  duplicateValue.value = value === 'zh-CN' ? '张三' : 'John';
};

const handleSearch = () => {
  console.log('Search:', searchForm.value);
};

const handleReset = () => {
  searchForm.value = { name: '', status: null };
};

const handleAdd = () => {
  console.log('Add new item');
};

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleValidationSubmit = () => {
  validationSubmitted.value = true;
  if (validationForm.value.username && validationForm.value.email && isValidEmail(validationForm.value.email)) {
    console.log('Form submitted:', validationForm.value);
  }
};

const handleValidationCancel = () => {
  validationForm.value = { username: '', email: '', age: null };
  validationSubmitted.value = false;
};

const handleLoading = () => {
  console.log(t('action.loading'));
};

const handleConfirm = () => {
  console.log('Confirmed');
};

onMounted(() => {
  currentLocale.value = getLocale();
});
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// 组件特定样式
.i18n-demo-wrapper {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 语言切换器 */
.language-switcher {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  color: white;
}

.switcher-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.current-lang {
  font-weight: 600;
  font-size: 14px;
}

.tab-panels {
  background: transparent;
}

/* 基础翻译 */






.translation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
}

.translation-item {
  background: #f5f6fa;
  padding: 12px;
  border-radius: 6px;
  border-left: 3px solid #0B5CFF;
  transition: all 0.2s;
}

.translation-item:hover {
  background: #e8eaf0;
  transform: translateX(2px);
}

.key-name {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
  font-family: 'Courier New', monospace;
}

.translation-value {
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
}

/* 变量插值 */
.interpolation-section {
  margin-bottom: 32px;
  padding: 20px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.interpolation-section h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--sl-color-text);
}

.interpolation-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.result-box {
  background: #f5f6fa;
  padding: 16px;
  border-radius: 6px;
  border-left: 4px solid #2da641;
}

.code-line {
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #ddd;
}

.code-line code {
  font-size: 13px;
  color: #666;
  font-family: 'Courier New', monospace;
}

.result {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
}

/* 实际应用 */
.application-section {
  margin-bottom: 32px;
}

.application-section h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--sl-color-text);
}

.form-demo,
.table-demo,
.validation-demo,
.dialog-demo {
  margin-bottom: 16px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.table-info {
  font-size: 14px;
  color: #666;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
}

.demo-table th,
.demo-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.demo-table th {
  background: #f5f6fa;
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.demo-table td {
  color: #666;
  font-size: 14px;
}

.demo-table tbody tr:hover {
  background: #f9f9f9;
}

.separator {
  color: #ddd;
  margin: 0 8px;
  user-select: none;
}
</style>
