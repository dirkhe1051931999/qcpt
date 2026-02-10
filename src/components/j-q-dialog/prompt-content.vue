<template>
  <div class="j-q-dialog-prompt-content">
    <!-- text/textarea 输入框 -->
    <j-q-input
      v-if="type === 'text' || type === 'textarea'"
      ref="inputRef"
      v-model="inputValue"
      :placeholder="placeholder"
      :type="type"
      :rules="rules"
      :maxlength="maxlength"
      v-bind="inputProps"
      @keyup.enter="onEnterKey"
    />
    <!-- select 选择框 -->
    <j-q-select
      v-else-if="type === 'select'"
      ref="selectRef"
      v-model="inputValue"
      :placeholder="placeholder"
      :rules="rules"
      :options="options"
      :option-label="optionLabel"
      :option-value="optionValue"
      :multiple="multiple"
      v-bind="selectProps"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref, watch } from 'vue';
import JQInput from 'components/j-q-input/index.vue';
import JQSelect from 'components/j-q-select/index.vue';
import type { QInputProps } from 'quasar';

export default defineComponent({
  name: 'JQDialogPromptContent',
  components: {
    JQInput,
    JQSelect,
  },
  props: {
    /** 初始值 */
    modelValue: {
      type: [String, Number, Array, Object] as PropType<any>,
      default: '',
    },
    /** 输入框占位符 */
    placeholder: {
      type: String,
      default: '',
    },
    /** 输入类型：text、textarea 或 select */
    type: {
      type: String as PropType<'text' | 'textarea' | 'select'>,
      default: 'text',
    },
    /** 验证规则 */
    rules: {
      type: Array as () => QInputProps['rules'],
      default: () => [],
    },
    /** 最大长度（text/textarea 使用） */
    maxlength: {
      type: [String, Number] as PropType<string | number | null>,
      default: 64,
    },
    /** 额外的输入框属性（text/textarea 使用） */
    inputProps: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    /** 下拉选项（select 使用） */
    options: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    /** 选项显示字段（select 使用） */
    optionLabel: {
      type: String,
      default: 'label',
    },
    /** 选项值字段（select 使用） */
    optionValue: {
      type: String,
      default: 'value',
    },
    /** 是否多选（select 使用） */
    multiple: {
      type: Boolean,
      default: false,
    },
    /** 额外的选择框属性（select 使用） */
    selectProps: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    /** dialog 实例（由 DialogProvider 注入） */
    dialogInstance: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: {
    'update:modelValue': (value: any) => true,
  },
  setup(props, { emit, expose }) {
    const inputRef = ref<InstanceType<typeof JQInput> | null>(null);
    const selectRef = ref<InstanceType<typeof JQSelect> | null>(null);
    const inputValue = ref<any>(props.modelValue);

    // 同步 inputValue 到父组件
    watch(inputValue, (newVal) => {
      emit('update:modelValue', newVal);
    });

    // 同步 props.modelValue 到 inputValue
    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal !== inputValue.value) {
          inputValue.value = newVal;
        }
      }
    );

    // 回车键处理（仅对 text 类型生效）
    const onEnterKey = () => {
      if (props.type === 'text') {
        handleClickConfirm();
      }
    };

    // 确认按钮处理（由 DialogProvider 调用）
    const handleClickConfirm = async () => {
      // 根据类型获取对应的 ref
      const ref = props.type === 'select' ? selectRef.value : inputRef.value;

      // 验证输入
      const isValid = await (ref as any)?.validate?.();

      if (isValid !== false) {
        if (props.dialogInstance?.resolve) {
          // 返回 value 和 dialogInstance
          props.dialogInstance.resolve({
            value: inputValue.value,
            dialogInstance: props.dialogInstance,
          });
        }
      }
    };

    // 取消按钮处理（由 DialogProvider 调用）
    const handleClickCancel = () => {
      if (props.dialogInstance?.reject) {
        props.dialogInstance.reject();
      }
      props.dialogInstance?.close?.();
    };

    expose({
      handleClickConfirm,
      handleClickCancel,
    });

    return {
      inputRef,
      selectRef,
      inputValue,
      onEnterKey,
    };
  },
});
</script>

<style lang="scss" scoped></style>