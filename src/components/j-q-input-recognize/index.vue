<template>
  <div class="j-q-input-recognize">
    <j-q-input
      ref="inputRef"
      v-model="inputValue"
      type="textarea"
      :rules="computedInputRules"
      :dense="dense"
      :outlined="outlined"
      :disable="disable"
      :readonly="readonly"
      :maxlength="maxlength"
      @change="handleChange as any"
    />
    <div v-if="recognizedItems.length > 0" class="recognized-section">
      <div class="recognized-label">{{ t('messages.inputRecognize.recognized') }}</div>
      <div class="recognized-items">
        <span v-for="(item, index) in recognizedItems" :key="index" class="my-label black">
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import JQInput from 'src/components/j-q-input/index.vue';
import { useI18n } from 'src/composables/useI18n.ts';

// 防抖函数
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  }) as T;
}

type TRule = RegExp | ((value: string) => boolean | string);
type TInputRule = (value: string) => boolean | string;

export default defineComponent({
  name: 'JQInputRecognize',
  components: {
    JQInput,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    /**
     * 最大识别数量
     */
    max: {
      type: Number,
      default: undefined,
    },
    /**
     * 输入框验证规则（用于 j-q-input 的 rules）
     */
    inputRules: {
      type: Array as PropType<TInputRule[]>,
      default: () => [],
    },
    /**
     * 识别规则，用于验证识别出的每个项目
     * 可以是正则表达式或验证函数
     * 正则：匹配则通过
     * 函数：返回 true 或字符串（字符串表示错误信息）
     */
    recognizeRules: {
      type: Array as PropType<TRule[]>,
      default: () => [],
    },
    /**
     * 验证规则（向后兼容，等同于 recognizeRules）
     * @deprecated 请使用 recognizeRules
     */
    rules: {
      type: Array as PropType<TRule[]>,
      default: () => [],
    },
    /**
     * 是否允许重复项
     */
    allowDuplicate: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: [String, Number],
      default: undefined,
    },
  },
  emits: {
    'update:modelValue': (value: string) => true,
    change: (value: string, recognizedItems: string[]) => true,
    'update:recognizedItems': (items: string[]) => true,
  },
  setup(props, { emit, expose }) {
    const { t } = useI18n();
    const inputRef = ref<InstanceType<typeof JQInput> | null>(null);
    const inputValue = ref(props.modelValue);
    const recognizedItems = ref<string[]>([]);

    // 解析输入内容：支持逗号、空格、换行分隔
    const parseInput = (value: string): string[] => {
      if (!value || !value.trim()) {
        return [];
      }

      // 使用正则表达式分割：逗号、空格、换行、制表符
      const items = value
        .split(/[,，\s\n\r\t]+/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      // 根据 allowDuplicate 决定是否去重
      if (props.allowDuplicate) {
        return items;
      } else {
        return Array.from(new Set(items));
      }
    };

    // 获取识别规则（优先使用 recognizeRules，向后兼容 rules）
    const getRecognizeRules = (): TRule[] => {
      if (props.recognizeRules.length > 0) {
        return props.recognizeRules;
      }
      return props.rules;
    };

    // 验证单个项目（多个规则是"或"的关系，只要有一个通过即可）
    const validateItem = (item: string): boolean | string => {
      const rules = getRecognizeRules();
      if (rules.length === 0) {
        return true;
      }

      const errors: string[] = [];

      for (const rule of rules) {
        if (rule instanceof RegExp) {
          // 正则表达式：匹配则通过
          if (rule.test(item)) {
            return true; // 只要有一个规则通过，就返回 true
          }
        } else if (typeof rule === 'function') {
          // 验证函数：返回 true 或错误信息
          const result = rule(item);
          if (result === true) {
            return true; // 只要有一个规则通过，就返回 true
          } else if (typeof result === 'string') {
            // 收集错误信息
            errors.push(result);
          }
        }
      }

      // 所有规则都不通过，返回第一个错误信息或 false
      return errors.length > 0 ? errors[0] : false;
    };

    // 验证所有识别出的项目
    const validateItems = (items: string[]): string[] => {
      return items.filter((item) => {
        const result = validateItem(item);
        return result === true;
      });
    };

    // 更新识别结果
    const updateRecognizedItems = (value: string) => {
      const parsed = parseInput(value);
      const validated = validateItems(parsed);

      // 应用最大数量限制
      const maxCount = props.max ?? Infinity;
      if (validated.length > maxCount) {
        recognizedItems.value = validated.slice(0, maxCount);
      } else {
        recognizedItems.value = validated;
      }
    };

    // 监听输入值变化
    watch(
      () => inputValue.value,
      (newValue) => {
        updateRecognizedItems(newValue);
        emit('update:modelValue', newValue);
      },
      { immediate: true }
    );

    // 监听外部 modelValue 变化
    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue !== inputValue.value) {
          inputValue.value = newValue;
        }
      }
    );

    // 监听 recognizedItems 变化（使用防抖）
    const emitRecognizedItemsDebounced = debounce((items: string[]) => {
      emit('update:recognizedItems', items);
    }, 300);

    watch(
      () => recognizedItems.value,
      (newItems) => {
        emitRecognizedItemsDebounced(newItems);
      },
      { deep: true }
    );

    const handleChange = (value: string) => {
      emit('change', value, recognizedItems.value);
    };

    // 检查 inputRules 中是否包含 required 规则
    const hasRequiredRule = computed(() => {
      return props.inputRules.some((rule) => {
        // 检查是否是 required 规则（通过尝试验证空字符串）
        const result = rule('');
        return result !== true;
      });
    });

    // 计算输入框验证规则（用于 j-q-input）
    const computedInputRules = computed(() => {
      const rules: Array<(val: string) => boolean | string> = [];

      // 添加用户传入的 inputRules
      if (props.inputRules.length > 0) {
        rules.push(...props.inputRules);
      }

      // 如果有 required 规则，验证 recognizedItems 是否为空
      if (hasRequiredRule.value) {
        rules.push((val: string) => {
          if (val && val.trim()) {
            // 输入框有内容，检查是否识别出有效项
            if (recognizedItems.value.length === 0) {
              return t('messages.inputRecognize.noValidItems');
            }
          }
          return true;
        });
      }

      // 最大数量验证
      const maxCount = props.max;
      if (maxCount !== undefined) {
        rules.push((val: string) => {
          const parsed = parseInput(val);
          const validated = validateItems(parsed);
          if (validated.length > maxCount) {
            return t('messages.inputRecognize.maxItems', { max: maxCount });
          }
          return true;
        });
      }

      return rules;
    });

    expose({
      validate: () => {
        const ref = inputRef.value as any;
        return ref?.validate?.() ?? false;
      },
      resetValidation: () => {
        const ref = inputRef.value as any;
        ref?.resetValidation?.();
      },
      recognizedItems: computed(() => recognizedItems.value),
    });

    return {
      t,
      inputRef,
      inputValue,
      recognizedItems,
      computedInputRules,
      handleChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.j-q-input-recognize {
  width: 100%;
}

.recognized-section {
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
}

.recognized-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--j-color-grey);
  margin-bottom: 8px;
}

.recognized-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
