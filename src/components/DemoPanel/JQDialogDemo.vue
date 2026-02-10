<template>
  <div class="dialog-demo-wrapper">
    <q-tabs
      v-model="currentTab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
    >
      <q-tab name="basic" label="基础对话框" />
      <q-tab name="prompt" label="输入对话框" />
      <q-tab name="position" label="位置与样式" />
      <q-tab name="advanced" label="高级用法" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="currentTab" animated class="tab-panels">
      <!-- 基础对话框 -->
      <q-tab-panel name="basic">
        <div class="demo-section">
          <h4>标准对话框</h4>
          <p class="desc">使用 DialogProvider.register 创建基础对话框</p>
          <div class="button-group">
            <q-btn
              label="打开标准对话框"
              color="primary"
              @click="openBasicDialog"
            />
            <q-btn
              label="自定义内容对话框"
              color="secondary"
              @click="openCustomContentDialog"
            />
            <q-btn
              label="无头部对话框"
              color="accent"
              @click="openNoHeaderDialog"
            />
          </div>
          <div class="code-example">
            <pre>{{ basicDialogCode }}</pre>
          </div>
        </div>

        <div class="demo-section">
          <h4>自定义组件对话框</h4>
          <p class="desc">传入自定义 Vue 组件</p>
          <div class="button-group">
            <q-btn
              label="表单对话框"
              color="primary"
              @click="openFormDialog"
            />
            <q-btn
              label="详情对话框"
              color="secondary"
              @click="openDetailDialog"
            />
          </div>
          <div class="code-example">
            <pre>{{ componentDialogCode }}</pre>
          </div>
        </div>
      </q-tab-panel>

      <!-- 输入对话框 -->
      <q-tab-panel name="prompt">
        <div class="demo-section">
          <h4>文本输入 (dialogType: 'text')</h4>
          <p class="desc">快速获取用户输入的文本，支持验证规则</p>
          <div class="button-group">
            <q-btn
              label="输入名称"
              color="primary"
              @click="openTextPrompt"
            />
            <q-btn
              label="必填输入"
              color="secondary"
              @click="openRequiredTextPrompt"
            />
            <q-btn
              label="带默认值"
              color="accent"
              @click="openTextPromptWithDefault"
            />
          </div>
          <div v-if="promptResult" class="result-box">
            <strong>输入结果：</strong> {{ promptResult }}
          </div>
          <div class="code-example">
            <pre>{{ textPromptCode }}</pre>
          </div>
        </div>

        <div class="demo-section">
          <h4>多行文本输入 (dialogType: 'textarea')</h4>
          <p class="desc">用于获取多行文本内容</p>
          <div class="button-group">
            <q-btn
              label="输入备注"
              color="primary"
              @click="openTextareaPrompt"
            />
            <q-btn
              label="带字数限制"
              color="secondary"
              @click="openTextareaWithLimit"
            />
          </div>
          <div v-if="textareaResult" class="result-box">
            <strong>输入结果：</strong>
            <pre>{{ textareaResult }}</pre>
          </div>
          <div class="code-example">
            <pre>{{ textareaPromptCode }}</pre>
          </div>
        </div>

        <div class="demo-section">
          <h4>下拉选择 (dialogType: 'select')</h4>
          <p class="desc">从选项列表中选择</p>
          <div class="button-group">
            <q-btn
              label="单选"
              color="primary"
              @click="openSelectPrompt"
            />
            <q-btn
              label="多选"
              color="secondary"
              @click="openMultipleSelectPrompt"
            />
            <q-btn
              label="带默认选项"
              color="accent"
              @click="openSelectWithDefault"
            />
          </div>
          <div v-if="selectResult" class="result-box">
            <strong>选择结果：</strong> {{ JSON.stringify(selectResult) }}
          </div>
          <div class="code-example">
            <pre>{{ selectPromptCode }}</pre>
          </div>
        </div>
      </q-tab-panel>

      <!-- 位置与样式 -->
      <q-tab-panel name="position">
        <div class="demo-section">
          <h4>不同位置</h4>
          <p class="desc">通过 position 属性控制对话框位置</p>
          <div class="button-group">
            <q-btn
              label="标准居中"
              color="primary"
              @click="openDialog('standard')"
            />
            <q-btn
              label="右侧面板"
              color="secondary"
              @click="openDialog('right')"
            />
            <q-btn
              label="顶部"
              color="accent"
              @click="openDialog('top')"
            />
            <q-btn
              label="底部"
              color="positive"
              @click="openDialog('bottom')"
            />
            <q-btn
              label="左侧"
              color="warning"
              @click="openDialog('left')"
            />
          </div>
          <div class="code-example">
            <pre>{{ positionCode }}</pre>
          </div>
        </div>

        <div class="demo-section">
          <h4>自定义尺寸</h4>
          <p class="desc">控制对话框的宽度和高度</p>
          <div class="button-group">
            <q-btn
              label="小尺寸 (400px)"
              color="primary"
              @click="openSizedDialog(400, 200)"
            />
            <q-btn
              label="中尺寸 (600px)"
              color="secondary"
              @click="openSizedDialog(600, 400)"
            />
            <q-btn
              label="大尺寸 (800px)"
              color="accent"
              @click="openSizedDialog(800, 600)"
            />
            <q-btn
              label="响应式 (50vw)"
              color="positive"
              @click="openSizedDialog('50vw', 'auto')"
            />
          </div>
          <div class="code-example">
            <pre>{{ sizeCode }}</pre>
          </div>
        </div>
      </q-tab-panel>

      <!-- 高级用法 -->
      <q-tab-panel name="advanced">
        <div class="demo-section">
          <h4>对话框控制</h4>
          <p class="desc">通过 dialogInstance 控制对话框行为</p>
          <div class="button-group">
            <q-btn
              label="加载状态"
              color="primary"
              @click="openLoadingDialog"
            />
            <q-btn
              label="动态按钮文本"
              color="secondary"
              @click="openDynamicButtonDialog"
            />
            <q-btn
              label="隐藏确认按钮"
              color="accent"
              @click="openNoConfirmDialog"
            />
          </div>
          <div class="code-example">
            <pre>{{ controlCode }}</pre>
          </div>
        </div>

        <div class="demo-section">
          <h4>关闭控制</h4>
          <p class="desc">控制对话框的关闭方式</p>
          <div class="button-group">
            <q-btn
              label="禁止 ESC 关闭"
              color="primary"
              @click="openNoEscDialog"
            />
            <q-btn
              label="禁止遮罩关闭"
              color="secondary"
              @click="openNoMaskDialog"
            />
            <q-btn
              label="完全模态"
              color="accent"
              @click="openModalDialog"
            />
          </div>
          <div class="code-example">
            <pre>{{ closeControlCode }}</pre>
          </div>
        </div>

        <div class="demo-section">
          <h4>Promise 用法</h4>
          <p class="desc">输入对话框返回 Promise，可以用 async/await</p>
          <div class="button-group">
            <q-btn
              label="确认删除"
              color="negative"
              @click="confirmDelete"
            />
            <q-btn
              label="表单提交"
              color="primary"
              @click="submitForm"
            />
          </div>
          <div v-if="asyncResult" class="result-box">
            <strong>执行结果：</strong> {{ asyncResult }}
          </div>
          <div class="code-example">
            <pre>{{ promiseCode }}</pre>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref, h, defineAsyncComponent } from 'vue';
import { DialogProvider } from 'qcpt';

const currentTab = ref('basic');
const promptResult = ref('');
const textareaResult = ref('');
const selectResult = ref<any>(null);
const asyncResult = ref('');

// ==================== 基础对话框 ====================

const openBasicDialog = () => {
  DialogProvider.register({
    title: '标准对话框',
    content: h('div', { class: 'q-pa-md' }, [
      h('p', '这是一个使用 DialogProvider.register 创建的标准对话框。'),
      h('p', '你可以通过点击确认或取消按钮来关闭对话框。'),
    ]),
    maxWidth: 500,
  });
};

const openCustomContentDialog = () => {
  DialogProvider.register({
    title: '自定义内容',
    content: h('div', { class: 'q-pa-md' }, [
      h('h5', { style: 'margin-top: 0' }, '功能特点：'),
      h('ul', [
        h('li', '支持自定义 Vue 组件或 render 函数'),
        h('li', '可以传递 props 和事件监听'),
        h('li', '完全的样式控制'),
      ]),
      h('div', { class: 'q-mt-md q-pa-md', style: 'background: #f5f6fa; border-radius: 4px' }, [
        h('strong', '提示：'),
        h('span', ' 这个内容框使用了自定义样式'),
      ]),
    ]),
    maxWidth: 600,
  });
};

const openNoHeaderDialog = () => {
  DialogProvider.register({
    showHeader: false,
    content: h('div', { class: 'q-pa-lg text-center' }, [
      h('div', { class: 'text-h6 q-mb-md' }, '无头部对话框'),
      h('p', '这个对话框隐藏了头部，适合创建简洁的提示框。'),
    ]),
    maxWidth: 400,
  });
};

// ==================== 自定义组件对话框 ====================

// 表单组件
const FormComponent = {
  props: ['dialogInstance'],
  setup(props: any) {
    const formData = ref({
      name: '',
      email: '',
      role: null,
    });

    const handleClickConfirm = async () => {
      console.log('表单数据:', formData.value);
      props.dialogInstance.close();
    };

    return () =>
      h('div', { class: 'q-pa-md' }, [
        h('div', { class: 'q-gutter-md' }, [
          h('div', [
            h('label', { class: 'text-caption' }, '姓名'),
            h('input', {
              class: 'q-input q-mt-sm',
              style: 'width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px',
              value: formData.value.name,
              onInput: (e: any) => (formData.value.name = e.target.value),
              placeholder: '请输入姓名',
            }),
          ]),
          h('div', [
            h('label', { class: 'text-caption' }, '邮箱'),
            h('input', {
              class: 'q-input q-mt-sm',
              style: 'width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px',
              value: formData.value.email,
              onInput: (e: any) => (formData.value.email = e.target.value),
              placeholder: '请输入邮箱',
              type: 'email',
            }),
          ]),
        ]),
      ]);
  },
};

const openFormDialog = () => {
  DialogProvider.register({
    title: '表单对话框',
    component: FormComponent,
    maxWidth: 500,
  });
};

// 详情组件
const DetailComponent = {
  setup() {
    const data = {
      id: '12345',
      name: '张三',
      email: 'zhangsan@example.com',
      role: '管理员',
      createTime: '2024-01-01 12:00:00',
      status: '已激活',
    };

    return () =>
      h('div', { class: 'q-pa-md' }, [
        h('table', { style: 'width: 100%; border-collapse: collapse' }, [
          ...Object.entries(data).map(([key, value]) =>
            h('tr', { style: 'border-bottom: 1px solid #eee' }, [
              h('td', { style: 'padding: 12px; font-weight: 600; width: 120px' }, key),
              h('td', { style: 'padding: 12px' }, value),
            ])
          ),
        ]),
      ]);
  },
};

const openDetailDialog = () => {
  DialogProvider.register({
    title: '用户详情',
    component: DetailComponent,
    maxWidth: 600,
    showFooter: false, // 详情页不需要底部按钮
  });
};

// ==================== 输入对话框 ====================

const openTextPrompt = async () => {
  try {
    const result = await DialogProvider.register({
      title: '请输入名称',
      dialogType: 'text',
      text: {
        placeholder: '请输入名称',
        modelValue: '',
      },
    });
    promptResult.value = result.value;
  } catch {
    promptResult.value = '用户取消了输入';
  }
};

const openRequiredTextPrompt = async () => {
  try {
    const result = await DialogProvider.register({
      title: '必填字段',
      dialogType: 'text',
      text: {
        placeholder: '此字段为必填项',
        modelValue: '',
        rules: [(val: string) => !!val || '此字段不能为空'],
      },
    });
    promptResult.value = result.value;
  } catch {
    promptResult.value = '用户取消了输入';
  }
};

const openTextPromptWithDefault = async () => {
  try {
    const result = await DialogProvider.register({
      title: '编辑名称',
      dialogType: 'text',
      text: {
        placeholder: '请输入名称',
        modelValue: '默认名称',
      },
    });
    promptResult.value = result.value;
  } catch {
    promptResult.value = '用户取消了输入';
  }
};

const openTextareaPrompt = async () => {
  try {
    const result = await DialogProvider.register({
      title: '请输入备注',
      dialogType: 'textarea',
      textarea: {
        placeholder: '请输入备注信息...',
        modelValue: '',
      },
    });
    textareaResult.value = result.value;
  } catch {
    textareaResult.value = '用户取消了输入';
  }
};

const openTextareaWithLimit = async () => {
  try {
    const result = await DialogProvider.register({
      title: '输入备注（最多200字）',
      dialogType: 'textarea',
      textarea: {
        placeholder: '请输入备注信息...',
        modelValue: '',
        maxlength: 200,
      },
    });
    textareaResult.value = result.value;
  } catch {
    textareaResult.value = '用户取消了输入';
  }
};

const openSelectPrompt = async () => {
  try {
    const result = await DialogProvider.register({
      title: '选择角色',
      dialogType: 'select',
      select: {
        placeholder: '请选择角色',
        modelValue: null,
        options: [
          { label: '管理员', value: 'admin' },
          { label: '编辑者', value: 'editor' },
          { label: '查看者', value: 'viewer' },
        ],
      },
    });
    selectResult.value = result.value;
  } catch {
    selectResult.value = '用户取消了选择';
  }
};

const openMultipleSelectPrompt = async () => {
  try {
    const result = await DialogProvider.register({
      title: '选择标签（多选）',
      dialogType: 'select',
      select: {
        placeholder: '请选择标签',
        modelValue: [],
        multiple: true,
        options: [
          { label: '前端', value: 'frontend' },
          { label: '后端', value: 'backend' },
          { label: '运维', value: 'devops' },
          { label: '测试', value: 'test' },
        ],
      },
    });
    selectResult.value = result.value;
  } catch {
    selectResult.value = '用户取消了选择';
  }
};

const openSelectWithDefault = async () => {
  try {
    const result = await DialogProvider.register({
      title: '选择状态',
      dialogType: 'select',
      select: {
        placeholder: '请选择状态',
        modelValue: 'active',
        options: [
          { label: '已激活', value: 'active' },
          { label: '未激活', value: 'inactive' },
          { label: '已禁用', value: 'disabled' },
        ],
      },
    });
    selectResult.value = result.value;
  } catch {
    selectResult.value = '用户取消了选择';
  }
};

// ==================== 位置与样式 ====================

const openDialog = (position: any) => {
  DialogProvider.register({
    title: `位置: ${position}`,
    position,
    content: h('div', { class: 'q-pa-md' }, [
      h('p', `这个对话框的位置是：${position}`),
      h('p', '右侧面板特别适合用作表单编辑或详情查看。'),
    ]),
    maxWidth: position === 'right' ? 500 : 600,
  });
};

const openSizedDialog = (width: any, height: any) => {
  DialogProvider.register({
    title: `尺寸: ${width} x ${height}`,
    content: h('div', { class: 'q-pa-md' }, [
      h('p', `宽度: ${width}`),
      h('p', `高度: ${height}`),
      h('div', { class: 'q-mt-md', style: 'background: #f5f6fa; padding: 16px; border-radius: 4px' }, [
        '你可以使用像素值 (如 400) 或相对单位 (如 50vw)',
      ]),
    ]),
    maxWidth: width,
    minHeight: height,
  });
};

// ==================== 高级用法 ====================

const openLoadingDialog = async () => {
  const dialogInstance = await DialogProvider.register({
    title: '加载中',
    content: h('div', { class: 'q-pa-md' }, '正在获取数据，请稍候...'),
  });

  // 显示加载状态
  dialogInstance.setLoading(true);

  // 模拟异步操作
  setTimeout(() => {
    dialogInstance.setLoading(false);
    dialogInstance.changeCancelText('关闭');
    dialogInstance.changeConfirmText('重新加载');
  }, 2000);
};

const openDynamicButtonDialog = () => {
  const dialogInstance = DialogProvider.register({
    title: '动态按钮文本',
    content: h('div', { class: 'q-pa-md' }, [
      h('p', '按钮文本可以动态修改'),
      h('button', {
        class: 'q-btn q-btn--standard q-btn--rectangle bg-primary text-white q-mt-md',
        style: 'padding: 8px 16px; border-radius: 4px; border: none; cursor: pointer',
        onClick: async () => {
          const instance = await dialogInstance;
          instance.changeCancelText('不保存');
          instance.changeConfirmText('保存');
        },
      }, '修改按钮文本'),
    ]),
  });
};

const openNoConfirmDialog = () => {
  DialogProvider.register({
    title: '提示信息',
    showConfirm: false,
    content: h('div', { class: 'q-pa-md' }, [
      h('p', '这个对话框隐藏了确认按钮'),
      h('p', '只显示取消按钮用于关闭'),
    ]),
  });
};

const openNoEscDialog = () => {
  DialogProvider.register({
    title: '禁止 ESC 关闭',
    closeOnEsc: false,
    content: h('div', { class: 'q-pa-md' }, [
      h('p', '按 ESC 键无法关闭此对话框'),
      h('p', '必须点击按钮才能关闭'),
    ]),
  });
};

const openNoMaskDialog = () => {
  DialogProvider.register({
    title: '禁止遮罩关闭',
    closeOnMask: false,
    content: h('div', { class: 'q-pa-md' }, [
      h('p', '点击遮罩无法关闭此对话框'),
      h('p', '必须点击按钮才能关闭'),
    ]),
  });
};

const openModalDialog = () => {
  DialogProvider.register({
    title: '完全模态对话框',
    closeOnEsc: false,
    closeOnMask: false,
    content: h('div', { class: 'q-pa-md' }, [
      h('p', '这是一个完全模态对话框'),
      h('p', 'ESC 和点击遮罩都无法关闭'),
      h('p', '必须通过按钮操作'),
    ]),
  });
};

// ==================== Promise 用法 ====================

const confirmDelete = async () => {
  try {
    const result = await DialogProvider.register({
      title: '确认删除',
      dialogType: 'text',
      text: {
        placeholder: '请输入"确认"以继续删除',
        modelValue: '',
        rules: [(val: string) => val === '确认' || '请输入"确认"'],
      },
    });
    asyncResult.value = `删除操作已确认，输入值: ${result.value}`;
  } catch {
    asyncResult.value = '删除操作已取消';
  }
};

const submitForm = async () => {
  try {
    const name = await DialogProvider.register({
      title: '步骤 1: 输入姓名',
      dialogType: 'text',
      text: {
        placeholder: '请输入姓名',
        modelValue: '',
        rules: [(val: string) => !!val || '姓名不能为空'],
      },
    });

    const email = await DialogProvider.register({
      title: '步骤 2: 输入邮箱',
      dialogType: 'text',
      text: {
        placeholder: '请输入邮箱',
        modelValue: '',
        rules: [(val: string) => /\S+@\S+\.\S+/.test(val) || '邮箱格式不正确'],
      },
    });

    asyncResult.value = `表单提交成功！姓名: ${name.value}, 邮箱: ${email.value}`;
  } catch {
    asyncResult.value = '表单提交已取消';
  }
};

// ==================== 代码示例 ====================

const basicDialogCode = `// 基础对话框
DialogProvider.register({
  title: '标准对话框',
  content: h('div', '对话框内容'),
  maxWidth: 500,
});

// 无头部对话框
DialogProvider.register({
  showHeader: false,
  content: h('div', '简洁的提示框'),
  maxWidth: 400,
});`;

const componentDialogCode = `// 自定义组件
const MyComponent = {
  props: ['dialogInstance'],
  setup(props) {
    const handleConfirm = () => {
      // 处理逻辑
      props.dialogInstance.close();
    };
    return () => h('div', '组件内容');
  }
};

DialogProvider.register({
  title: '表单对话框',
  component: MyComponent,
  maxWidth: 500,
});`;

const textPromptCode = `// 文本输入
const result = await DialogProvider.register({
  title: '请输入名称',
  dialogType: 'text',
  text: {
    placeholder: '请输入名称',
    modelValue: '',
    rules: [(val) => !!val || '不能为空'],
  },
});
console.log(result.value); // 用户输入的值`;

const textareaPromptCode = `// 多行文本输入
const result = await DialogProvider.register({
  title: '请输入备注',
  dialogType: 'textarea',
  textarea: {
    placeholder: '请输入备注...',
    modelValue: '',
    maxlength: 200,
  },
});`;

const selectPromptCode = `// 下拉选择
const result = await DialogProvider.register({
  title: '选择角色',
  dialogType: 'select',
  select: {
    placeholder: '请选择',
    modelValue: null,
    options: [
      { label: '管理员', value: 'admin' },
      { label: '编辑者', value: 'editor' },
    ],
    multiple: false, // 或 true 表示多选
  },
});`;

const positionCode = `// 不同位置
DialogProvider.register({
  title: '右侧面板',
  position: 'right', // 'standard' | 'right' | 'top' | 'bottom' | 'left'
  content: h('div', '内容'),
  maxWidth: 500,
});`;

const sizeCode = `// 自定义尺寸
DialogProvider.register({
  title: '对话框',
  maxWidth: 600,        // 数字或字符串 '50vw'
  minHeight: 400,       // 数字或字符串 'auto'
  content: h('div', '内容'),
});`;

const controlCode = `// 对话框控制
const dialogInstance = await DialogProvider.register({
  title: '对话框',
  content: h('div', '内容'),
});

// 显示/隐藏加载状态
dialogInstance.setLoading(true);

// 修改按钮文本
dialogInstance.changeCancelText('不保存');
dialogInstance.changeConfirmText('保存');

// 隐藏确认按钮
dialogInstance.setShowConfirm(false);

// 关闭对话框
dialogInstance.close();`;

const closeControlCode = `// 关闭控制
DialogProvider.register({
  title: '对话框',
  closeOnEsc: false,    // 禁止 ESC 关闭
  closeOnMask: false,   // 禁止点击遮罩关闭
  content: h('div', '内容'),
});`;

const promiseCode = `// Promise 用法（仅限输入对话框）
try {
  const result = await DialogProvider.register({
    title: '确认操作',
    dialogType: 'text',
    text: {
      placeholder: '请输入"确认"',
      rules: [(val) => val === '确认' || '请输入"确认"'],
    },
  });
  console.log('用户确认:', result.value);
} catch {
  console.log('用户取消');
}`;
</script>

<style scoped lang="scss">
@import './demo-common.scss';

// Dialog Demo 特殊样式已在 demo-common.scss 中定义
</style>
