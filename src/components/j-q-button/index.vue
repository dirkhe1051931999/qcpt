<template>
  <j-c-tooltip
    :content="tooltipContent"
    :disabled="!tips"
    :placement="mergedTooltipConfig.placement"
    :effect="mergedTooltipConfig.effect"
    :trigger="mergedTooltipConfig.trigger"
    :show-arrow="mergedTooltipConfig.showArrow"
    :open-delay="mergedTooltipConfig.openDelay"
    :close-delay="mergedTooltipConfig.closeDelay"
    :max-width="mergedTooltipConfig.maxWidth"
    :offset="mergedTooltipConfig.offset"
    :model-value="mergedTooltipConfig.modelValue"
  >
    <q-btn :class="computedClass" :loading="loading" v-bind="$attrs" :icon="icon" @click="click" unelevated no-caps :ripple="false" ref="qBtnRef">
      <template #default>
        <span v-if="!icon && $slots.icon" class="j-q-button-prefix-icon">
          <slot name="icon"></slot>
        </span>
        <span :class="iconPadding">
          <slot>{{ label }}</slot>
        </span>
      </template>
      <template #loading v-if="$slots.loading">
        <slot name="loading"></slot>
      </template>
    </q-btn>
  </j-c-tooltip>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, SlotsType } from 'vue';
import { QBtn } from 'quasar';
import JCTooltip from '../j-c-tooltip/index.vue';
import { type JQButtonExpose, JQButtonSize, type JQButtonSizeType, type JQButtonSlots, JQButtonType, type JQButtonTypeType } from './types';
import type { TooltipProps } from '../j-c-tooltip/types';

// 重新导出类型，方便外部直接从组件导入
export * from './types';

export default defineComponent({
  name: 'JQButton',
  components: {
    QBtn,
    JCTooltip,
  },
  inheritAttrs: false,
  props: {
    /**
     * 按钮大小
     * @default 'large'
     */
    size: {
      type: String as PropType<JQButtonSizeType>,
      default: JQButtonSize.LARGE,
      validator: (value: JQButtonSizeType) => Object.values(JQButtonSize).includes(value),
    },
    /**
     * 按钮类型
     * @default 'primary'
     */
    type: {
      type: String as PropType<JQButtonTypeType>,
      default: JQButtonType.PRIMARY,
      validator: (value: JQButtonTypeType) => Object.values(JQButtonType).includes(value),
    },
    /**
     * 按钮标签文字
     * @default ''
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * 按钮图标 (Quasar icon name)
     * @default undefined
     */
    icon: {
      type: String,
      default: undefined,
    },
    /**
     * 按钮加载状态
     * @default false
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * 按钮提示文字 (tooltip)
     * @default ''
     */
    tips: {
      type: [String, Number],
      default: '',
    },
    /**
     * Tooltip 配置项
     * @default undefined
     */
    tooltipConfig: {
      type: Object as PropType<Omit<TooltipProps, 'content'>>,
      default: undefined,
    },
  },
  emits: {
    /**
     * 点击事件
     * @param e 原生点击事件
     */
    click: (e: Event) => true,
  },
  slots: Object as SlotsType<JQButtonSlots>,
  setup(props, { emit, expose, slots }) {
    const qBtnRef = ref<InstanceType<typeof QBtn> | null>(null);

    /* ========== 计算属性 ========== */
    // 将 tips 转换为字符串，避免传入数字时的类型警告
    const tooltipContent = computed(() => {
      return props.tips != null ? String(props.tips) : '';
    });

    const iconPadding = computed(() => {
      return { 'j-q-button-label': (slots.icon || props.icon) && (slots.default || props.label) };
    });

    const computedClass = computed(() => {
      const isPrimaryOrSecondary = props.type === JQButtonType.PRIMARY || props.type === JQButtonType.SECONDARY;
      if (isPrimaryOrSecondary) {
        const sizeMap: Record<JQButtonSizeType, string> = {
          [JQButtonSize.LARGE]: 'lg',
          [JQButtonSize.NORMAL]: 'md',
          [JQButtonSize.SMALL]: 'sm',
        };
        return {
          [`j-q-button--${sizeMap[props.size]}`]: true,
          'j-q-button': true,
          'j-q-button--primary': props.type === JQButtonType.PRIMARY,
          'j-q-button--secondary': props.type === JQButtonType.SECONDARY,
        };
      } else {
        return {
          'j-q-button--text': props.type === JQButtonType.TEXT,
        };
      }
    });

    // 默认 tooltip 配置
    const defaultTooltipConfig: Omit<TooltipProps, 'content' | 'disabled'> = {
      placement: 'top',
      effect: 'dark',
      trigger: 'hover',
      showArrow: true,
      openDelay: 0,
      closeDelay: 200,
      maxWidth: '300px',
      offset: 5,
    };

    // 合并用户配置和默认配置
    const mergedTooltipConfig = computed(() => {
      return {
        ...defaultTooltipConfig,
        ...props.tooltipConfig,
      };
    });

    /* ========== 方法 ========== */
    const click = (e: Event) => {
      emit('click', e);
    };

    // 暴露给外部的方法和属性
    const exposed: JQButtonExpose = {
      get $el() {
        return qBtnRef.value?.$el as HTMLElement | undefined;
      },
      click: () => {
        qBtnRef.value?.$el?.click();
      },
    };

    expose(exposed);

    return {
      click,
      computedClass,
      iconPadding,
      mergedTooltipConfig,
      qBtnRef,
      tooltipContent,
    };
  },
});
</script>

<style lang="scss" scoped src="./index.scss"></style>