<template>
  <q-btn-dropdown
    ref="qBtnDropdownRef"
    :class="computedClass"
    :ripple="false"
    no-caps
    dense
    unelevated
    no-focus
    no-refocus
    :dropdown-icon="computedIcon"
    :label="label"
    :disable="disabled"
    :menu-anchor="menuAnchor"
    :menu-self="menuSelf"
    :menu-offset="menuOffset"
    v-bind="$attrs"
    v-if="filteredItems.length > 0"
  >
    <template #label v-if="$slots.label">
      <slot name="label"></slot>
    </template>

    <template #default>
      <div class="j-q-button-dropdown-list">
        <slot>
          <q-list>
            <q-item
              v-for="(item, index) in filteredItems"
              :key="index"
              clickable
              v-close-popup
              :disable="item.disabled"
              @click="handleItemClick(item)"
            >
              <q-item-section v-if="item.icon" avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </slot>
      </div>
    </template>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, ref, Ref, SlotsType } from 'vue';
import { QBtnDropdown, QList, QItem, QItemSection, QItemLabel, QIcon, type QBtnDropdownProps } from 'quasar';
import {
  JQButtonDropdownSize,
  JQButtonDropdownType,
  type JQButtonDropdownSizeType,
  type JQButtonDropdownTypeType,
  type JQButtonDropdownItem,
  type JQButtonDropdownSlots,
  type JQButtonDropdownExpose,
} from './types';
import { PAGE_PERMISSION_KEY, PAGE_ACTION_PERMISSION_KEY } from '../j-c-permission/index.vue';

// 重新导出类型，方便外部直接从组件导入
export * from './types';

export default defineComponent({
  name: 'JQButtonDropdown',
  components: {
    QBtnDropdown,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QIcon,
  },
  inheritAttrs: false,
  props: {
    /**
     * 按钮标签文字
     * @default ''
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * 下拉菜单项列表
     * @default []
     */
    items: {
      type: Array as PropType<JQButtonDropdownItem[]>,
      default: () => [],
    },
    /**
     * 按钮大小
     * @default 'large'
     */
    size: {
      type: String as PropType<JQButtonDropdownSizeType>,
      default: JQButtonDropdownSize.LARGE,
      validator: (value: JQButtonDropdownSizeType) =>
        Object.values(JQButtonDropdownSize).includes(value),
    },
    /**
     * 按钮类型
     * @default 'primary'
     */
    type: {
      type: String as PropType<JQButtonDropdownTypeType>,
      default: JQButtonDropdownType.PRIMARY,
      validator: (value: JQButtonDropdownTypeType) =>
        Object.values(JQButtonDropdownType).includes(value),
    },
    /**
     * 下拉箭头图标
     * @default null
     */
    dropdownIcon: {
      type: String,
      default: null,
    },
    /**
     * 是否禁用
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * 菜单锚点位置（相对于按钮）
     * @default 'bottom left'
     */
    menuAnchor: {
      type: String as PropType<QBtnDropdownProps['menuAnchor']>,
      default: 'bottom left',
    },
    /**
     * 菜单自身定位点
     * @default 'top left'
     */
    menuSelf: {
      type: String as PropType<QBtnDropdownProps['menuSelf']>,
      default: 'top left',
    },
    /**
     * 菜单偏移量 [x, y]
     * @default [0, 4]
     */
    menuOffset: {
      type: Array as PropType<QBtnDropdownProps['menuOffset']>,
      default: () => [0, 4],
    },
  },
  emits: {
    /**
     * 选择菜单项事件
     * @param item 选中的菜单项
     */
    select: (item: JQButtonDropdownItem) => true,
  },

  slots: Object as SlotsType<JQButtonDropdownSlots>,
  setup(props, { emit, expose }) {
    const qBtnDropdownRef = ref<InstanceType<typeof QBtnDropdown> | null>(null);

    // 注入权限列表
    const globalPermissionIds = inject<Ref<string[]>>(PAGE_PERMISSION_KEY, ref([]));
    const globalActionPermissionIds = inject<Ref<string[]>>(PAGE_ACTION_PERMISSION_KEY, ref([]));

    // 根据权限过滤菜单项
    const filteredItems = computed(() => {
      return props.items.filter((item) => {
        // 如果没有 code，默认显示
        if (!item.code) {
          return true;
        }
        // 检查是否有权限
        return globalPermissionIds.value.includes(item.code) || globalActionPermissionIds.value.includes(item.code);
      });
    });

    const computedIcon = computed(() => {
      return props.dropdownIcon || props.type === JQButtonDropdownType.SECONDARY ? 'app:dropdown-btn' : 'app:dropdown-btn-white';
    });

    const computedClass = computed(() => {
      const sizeMap: Record<JQButtonDropdownSizeType, string> = {
        [JQButtonDropdownSize.LARGE]: 'lg',
        [JQButtonDropdownSize.NORMAL]: 'md',
        [JQButtonDropdownSize.SMALL]: 'sm',
      };
      return {
        'j-q-button-dropdown': true,
        [`j-q-button-dropdown--${sizeMap[props.size]}`]: true,
        [`j-q-button-dropdown--${props.type}`]: true,
      };
    });

    const handleItemClick = (item: JQButtonDropdownItem) => {
      emit('select', item);
      if (item.onClick) {
        item.onClick();
      }
    };

    // 暴露给外部的方法和属性
    const exposed: JQButtonDropdownExpose = {
      get $el() {
        return qBtnDropdownRef.value?.$el as HTMLElement | undefined;
      },
      show: () => {
        qBtnDropdownRef.value?.show();
      },
      hide: () => {
        qBtnDropdownRef.value?.hide();
      },
      toggle: () => {
        qBtnDropdownRef.value?.toggle();
      },
    };

    expose(exposed);

    return {
      qBtnDropdownRef,
      computedClass,
      computedIcon,
      filteredItems,
      handleItemClick,
    };
  },
});
</script>

<style lang="scss" scoped src="./index.scss"></style>

<!-- 下拉菜单列表样式（在 body 层级渲染，需要非 scoped 样式） -->
<style lang="scss">
.j-q-button-dropdown-list {
  padding: 8px;
  box-shadow: 0px 4px 8px 0px #D7DBEC;
  border: 1px solid #E6E9F4;
  border-radius: 12px;
  .q-list {
    min-width: 160px;
    .q-item {
      height: 36px;
      min-height: 36px;
      padding: 0 8px;
      border-radius: 6px;

      &:hover {
        background: #f5f6fa;
      }

      &.q-item--disabled {
        opacity: 0.5;
      }
    }

    .q-item__label {
      font-size: 14px;
      color: var(--j-color-dark-strong);
    }
  }
}
</style>
