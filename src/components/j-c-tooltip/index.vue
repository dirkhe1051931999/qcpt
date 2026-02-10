<template>
  <div class="j-c-tooltip" ref="tooltipRef" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @click="handleClick">
    <slot></slot>
    <Teleport to="body">
      <Transition name="j-c-tooltip-fade">
        <div
          v-if="visible"
          ref="popperRef"
          class="j-c-tooltip__popper"
          :class="[`j-c-tooltip__popper--${effect}`, `is-${currentPlacement}`]"
          :style="{ maxWidth: maxWidth, ...popperStyle }"
          @mouseenter="handlePopperMouseEnter"
          @mouseleave="handlePopperMouseLeave"
        >
          <div class="j-c-tooltip__content">
            <slot name="content">{{ content }}</slot>
          </div>
          <div v-if="showArrow" class="j-c-tooltip__arrow" :style="arrowStyle"></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, type PropType, ref, watch } from 'vue';
import type { TooltipEffect, TooltipPlacement, TooltipTrigger } from './types';

export default defineComponent({
  name: 'JCTooltip',
  props: {
    content: {
      type: String,
      default: '',
    },
    placement: {
      type: String as PropType<TooltipPlacement>,
      default: 'top',
    },
    effect: {
      type: String as PropType<TooltipEffect>,
      default: 'dark',
    },
    trigger: {
      type: String as PropType<TooltipTrigger>,
      default: 'hover',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    openDelay: {
      type: Number,
      default: 0,
    },
    closeDelay: {
      type: Number,
      default: 200,
    },
    maxWidth: {
      type: String,
      default: '300px',
    },
    offset: {
      type: Number,
      default: 12,
    },
    modelValue: {
      type: Boolean,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const tooltipRef = ref<HTMLElement>();
    const popperRef = ref<HTMLElement>();
    const visible = ref(false);
    const currentPlacement = ref<TooltipPlacement>(props.placement);
    let openTimer: ReturnType<typeof setTimeout> | null = null;
    let closeTimer: ReturnType<typeof setTimeout> | null = null;

    const popperStyle = ref<Record<string, string>>({});
    const arrowStyle = ref<Record<string, string>>({});

    // 是否受控组件
    const isControlled = computed(() => props.modelValue !== undefined);

    // 计算 popper 位置
    const updatePopperPosition = () => {
      if (!tooltipRef.value || !popperRef.value) return;

      const triggerRect = tooltipRef.value.getBoundingClientRect();
      const popperRect = popperRef.value.getBoundingClientRect();
      const arrowSize = props.showArrow ? 6 : 0;
      const offset = props.offset;

      let top = 0;
      let left = 0;
      let placement = props.placement;

      // 根据位置计算坐标
      switch (placement) {
        case 'top':
          top = triggerRect.top - popperRect.height - offset;
          left = triggerRect.left + (triggerRect.width - popperRect.width) / 2;
          break;
        case 'top-start':
          top = triggerRect.top - popperRect.height - offset;
          left = triggerRect.left;
          break;
        case 'top-end':
          top = triggerRect.top - popperRect.height - offset;
          left = triggerRect.right - popperRect.width;
          break;
        case 'bottom':
          top = triggerRect.bottom + offset;
          left = triggerRect.left + (triggerRect.width - popperRect.width) / 2;
          break;
        case 'bottom-start':
          top = triggerRect.bottom + offset;
          left = triggerRect.left;
          break;
        case 'bottom-end':
          top = triggerRect.bottom + offset;
          left = triggerRect.right - popperRect.width;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - popperRect.height) / 2;
          left = triggerRect.left - popperRect.width - offset;
          break;
        case 'left-start':
          top = triggerRect.top;
          left = triggerRect.left - popperRect.width - offset;
          break;
        case 'left-end':
          top = triggerRect.bottom - popperRect.height;
          left = triggerRect.left - popperRect.width - offset;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - popperRect.height) / 2;
          left = triggerRect.right + offset;
          break;
        case 'right-start':
          top = triggerRect.top;
          left = triggerRect.right + offset;
          break;
        case 'right-end':
          top = triggerRect.bottom - popperRect.height;
          left = triggerRect.right + offset;
          break;
      }

      // 边界检测和自动调整
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // 检测是否超出视口
      if (top < 0) {
        // 上边界超出，尝试放到下方
        if (placement.startsWith('top')) {
          placement = placement.replace('top', 'bottom') as TooltipPlacement;
          top = triggerRect.bottom + offset;
        }
      } else if (top + popperRect.height > viewportHeight) {
        // 下边界超出，尝试放到上方
        if (placement.startsWith('bottom')) {
          placement = placement.replace('bottom', 'top') as TooltipPlacement;
          top = triggerRect.top - popperRect.height - offset;
        }
      }

      if (left < 0) {
        // 左边界超出
        left = 8;
      } else if (left + popperRect.width > viewportWidth) {
        // 右边界超出
        left = viewportWidth - popperRect.width - 8;
      }

      currentPlacement.value = placement;
      popperStyle.value = {
        top: `${top + window.scrollY}px`,
        left: `${left + window.scrollX}px`,
      };

      // 计算箭头位置
      if (props.showArrow) {
        const triggerCenter = {
          x: triggerRect.left + triggerRect.width / 2,
          y: triggerRect.top + triggerRect.height / 2,
        };

        if (placement.startsWith('top') || placement.startsWith('bottom')) {
          const arrowLeft = triggerCenter.x - left - window.scrollX;
          arrowStyle.value = {
            left: `${arrowLeft}px`,
          };
        } else if (placement.startsWith('left') || placement.startsWith('right')) {
          const arrowTop = triggerCenter.y - top - window.scrollY;
          arrowStyle.value = {
            top: `${arrowTop}px`,
          };
        }
      }
    };

    const show = () => {
      if (props.disabled) return;

      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }

      if (props.openDelay > 0) {
        openTimer = setTimeout(() => {
          visible.value = true;
          if (isControlled.value) {
            emit('update:modelValue', true);
          }
          nextTick(() => {
            requestAnimationFrame(() => {
              updatePopperPosition();
            });
          });
        }, props.openDelay);
      } else {
        visible.value = true;
        if (isControlled.value) {
          emit('update:modelValue', true);
        }
        nextTick(() => {
          requestAnimationFrame(() => {
            updatePopperPosition();
          });
        });
      }
    };

    const hide = () => {
      if (openTimer) {
        clearTimeout(openTimer);
        openTimer = null;
      }

      if (props.closeDelay > 0) {
        closeTimer = setTimeout(() => {
          visible.value = false;
          if (isControlled.value) {
            emit('update:modelValue', false);
          }
        }, props.closeDelay);
      } else {
        visible.value = false;
        if (isControlled.value) {
          emit('update:modelValue', false);
        }
      }
    };

    const handleMouseEnter = () => {
      if (props.trigger === 'hover') {
        show();
      }
    };

    const handleMouseLeave = () => {
      if (props.trigger === 'hover') {
        hide();
      }
    };

    const handleClick = () => {
      if (props.trigger === 'click') {
        if (visible.value) {
          hide();
        } else {
          show();
        }
      }
    };

    const handlePopperMouseEnter = () => {
      if (props.trigger === 'hover' && closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    };

    const handlePopperMouseLeave = () => {
      if (props.trigger === 'hover') {
        hide();
      }
    };

    // 监听外部控制
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== undefined) {
          visible.value = val;
          if (val) {
            nextTick(() => {
              updatePopperPosition();
            });
          }
        }
      }
    );

    // 点击外部关闭（仅在 click 触发方式下）
    const handleClickOutside = (event: MouseEvent) => {
      if (props.trigger !== 'click') return;
      if (!visible.value) return;

      const target = event.target as HTMLElement;
      if (tooltipRef.value?.contains(target) || popperRef.value?.contains(target)) {
        return;
      }

      hide();
    };

    // 监听窗口大小变化
    const handleResize = () => {
      if (visible.value) {
        updatePopperPosition();
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside, true);
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize, true);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside, true);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);

      if (openTimer) {
        clearTimeout(openTimer);
      }
      if (closeTimer) {
        clearTimeout(closeTimer);
      }
    });

    return {
      tooltipRef,
      popperRef,
      visible,
      currentPlacement,
      popperStyle,
      arrowStyle,
      handleMouseEnter,
      handleMouseLeave,
      handleClick,
      handlePopperMouseEnter,
      handlePopperMouseLeave,
    };
  },
});
</script>

<style lang="scss">
@use './index.scss';
</style>