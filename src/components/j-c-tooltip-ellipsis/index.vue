<template>
  <j-c-tooltip 
    class="j-c-tooltip-ellipsis-wrapper"
    :content="content" 
    :placement="placement" 
    :effect="effect" 
    :max-width="maxWidth" 
    :offset="offset" 
    :disabled="!canShowTooltip"
    v-model="tooltipVisible"
  >
    <div ref="contentRef" class="j-c-tooltip-ellipsis__content" :class="[ellipsisClass, $attrs.class]" :style="computedStyle" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <slot>{{ content }}</slot>
    </div>
  </j-c-tooltip>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, type PropType, ref } from 'vue';
import JCTooltip from '../j-c-tooltip/index.vue';
import type { TooltipEffect, TooltipPlacement } from '../j-c-tooltip/types';

export default defineComponent({
  name: 'JCTooltipEllipsis',
  inheritAttrs: false,
  components: {
    JCTooltip,
  },
  props: {
    content: {
      type: String,
      default: '',
    },
    contentStyle: {
      type: String,
      default: '',
    },
    effect: {
      type: String as PropType<TooltipEffect>,
      default: 'dark',
    },
    lines: {
      type: Number,
      default: 1,
      validator: (value: number) => value > 0,
    },
    maxWidth: {
      type: String,
      default: '300px',
    },
    offset: {
      type: Number,
      default: 12,
    },
    placement: {
      type: String as PropType<TooltipPlacement>,
      default: 'top',
    },
  },

  setup(props) {
    /* ========== 响应式数据 ========== */
    const canShowTooltip = ref(false);
    const contentRef = ref<HTMLElement>();
    const isHovering = ref(false);
    const tooltipVisible = ref(false);

    /* ========== 计算属性 ========== */
    const computedStyle = computed(() => {
      const baseStyle = props.contentStyle;
      if (props.lines > 1) {
        return `${baseStyle}; -webkit-line-clamp: ${props.lines};`;
      }
      return baseStyle;
    });

    const ellipsisClass = computed(() => {
      return props.lines === 1 ? 'ellipsis' : 'ellipsis-multi';
    });

    /* ========== 方法 ========== */
    const checkOverflow = (el: HTMLElement): boolean => {
      if (props.lines === 1) {
        // 单行：比较 scrollWidth 和 clientWidth
        return el.scrollWidth > el.clientWidth;
      } else {
        // 多行：比较 scrollHeight 和 clientHeight
        return el.scrollHeight > el.clientHeight;
      }
    };

    const handleMouseEnter = () => {
      isHovering.value = true;
      if (contentRef.value) {
        const isOverflowing = checkOverflow(contentRef.value);
        canShowTooltip.value = isOverflowing;
        if (isOverflowing) {
          nextTick(() => {
            tooltipVisible.value = true;
          });
        }
      }
    };

    const handleMouseLeave = () => {
      isHovering.value = false;
      tooltipVisible.value = false;
    };

    /* ========== 返回 ========== */
    return {
      canShowTooltip,
      checkOverflow,
      computedStyle,
      contentRef,
      ellipsisClass,
      handleMouseEnter,
      handleMouseLeave,
      isHovering,
      tooltipVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
.j-c-tooltip-ellipsis-wrapper {
  display: block;
  width: 100%;
}

.j-c-tooltip-ellipsis__content {
  display: block;
  width: 100%;
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ellipsis-multi {
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>