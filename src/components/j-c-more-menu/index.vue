<template>
  <div v-if="hasVisibleActions || showEmptyPlaceholder" class="jc-more-menu">
    <template v-if="hasVisibleActions">
      <div class="jc-more-menu__icon">
        <slot name="trigger">
          <q-icon class="cursor-pointer" name="app:more-horizontal" :size="triggerSize" />
        </slot>
        <q-menu :fit="computedFit" :class="computedMenuClass" :offset="computedOffset" :anchor="computedAnchor" :self="computedSelf" v-bind="computedMenuAttrs">
          <q-list :dense="dense" :style="computedListStyle">
            <template v-for="(action, index) in actions" :key="action.key ?? index">
              <j-c-permission :rm-dom="action.rmDom ?? true" :code="action.permissionCode ?? null" :default-content="action.defaultContent ?? '-'">
                <q-item
                  v-if="shouldShowAction(action)"
                  :clickable="action.clickable ?? true"
                  v-close-popup="action.closePopup ?? true"
                  :disable="isActionDisabled(action)"
                  @click="handleActionClick(action)"
                >
                  <q-item-section v-if="hasMenuIconSlot(action)" side>
                    <slot :name="`menu-icon-${action.id}`" :action="action" :item="item" />
                  </q-item-section>
                  <q-item-section :title="getActionLabel(action)">
                    {{ getActionLabel(action) }}
                  </q-item-section>
                </q-item>
              </j-c-permission>
            </template>
          </q-list>
        </q-menu>
      </div>
    </template>
    <span v-else >-</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, type PropType, ref, type Ref } from 'vue';
import { QIcon, QItem, QItemSection, QList, QMenu } from 'quasar';
import type { QMenuProps } from 'quasar';
import JCPermission, { PAGE_ACTION_PERMISSION_KEY, PAGE_PERMISSION_KEY } from 'src/components/j-c-permission/index.vue';
import { useI18n } from 'src/composables/useI18n';

type BoolLike<T> = boolean | ((item: T) => boolean);
type LabelLike<T> = string | ((ctx: { item: T; action: JCMoreMenuAction<T> }) => string);
type TranslateFn = (key: string, variables?: Record<string, any>) => string;

export type JCMoreMenuAction<T = any> = {
  key?: string | number;
  /** 用于图标插槽的唯一标识（选填） */
  id?: string;
  /** 权限码；不传则默认当作有权限 */
  permissionCode?: string | null;
  /** 无权限时是否移除 DOM（默认 true） */
  rmDom?: boolean;
  /** 无权限且 rmDom=false 时显示的默认文案 */
  defaultContent?: string;
  /** 文案：优先 label，其次 i18nKey */
  label?: LabelLike<T>;
  i18nKey?: string;
  /** 是否可点击（默认 true） */
  clickable?: boolean;
  /** 点击后是否自动关闭弹层（默认 true） */
  closePopup?: boolean;
  /** 是否显示该 action（默认 true） */
  visible?: BoolLike<T>;
  /** 是否禁用该 action（默认 false） */
  disabled?: BoolLike<T>;
  /** 点击回调 */
  onClick?: (item: T) => void | Promise<void>;
};

export default defineComponent({
  name: 'JCMoreMenu',
  components: {
    QIcon,
    QMenu,
    QList,
    QItem,
    QItemSection,
    JCPermission,
  },
  props: {
    item: {
      type: null as unknown as PropType<any>,
      default: null,
    },
    actions: {
      type: Array as PropType<JCMoreMenuAction<any>[]>,
      default: () => [],
    },
    size: {
      type: String as PropType<'md' | 'lg'>,
      default: 'md',
    },
    fit: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    triggerSize: {
      type: String,
      default: '16px',
    },
    /**
     * size=lg 时生效：默认 offset/anchor/self/minWidth 贴近业务中的写法
     */
    offset: {
      type: Array as unknown as PropType<[number, number]>,
      default: undefined,
    },
    anchor: {
      type: String as PropType<QMenuProps['anchor']>,
      default: undefined,
    },
    self: {
      type: String as PropType<QMenuProps['self']>,
      default: undefined,
    },
    listMinWidth: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    menuClass: {
      type: [String, Array, Object] as PropType<any>,
      default: undefined,
    },
    translate: {
      type: Function as PropType<TranslateFn | undefined>,
      default: undefined,
    },
    showEmptyPlaceholder: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    action: (payload: { action: JCMoreMenuAction<any>; item: any }) => true,
  },
  setup(props, { emit, slots }) {
    const { t } = useI18n();
    const translate = computed<TranslateFn>(() => props.translate ?? t);

    // 注入权限列表
    const globalActionPermissionIds = inject<Ref<string[]>>(PAGE_ACTION_PERMISSION_KEY, ref([]));
    const globalPermissionIds = inject<Ref<string[]>>(PAGE_PERMISSION_KEY, ref([]));

    const resolveBoolLike = <T>(val: BoolLike<T> | undefined, item: T, defaultValue: boolean) => {
      if (typeof val === 'function') return Boolean(val(item));
      if (typeof val === 'boolean') return val;
      return defaultValue;
    };

    const isActionVisible = (action: JCMoreMenuAction<any>) => resolveBoolLike(action.visible, props.item, true);
    const isActionDisabled = (action: JCMoreMenuAction<any>) => resolveBoolLike(action.disabled, props.item, false);

    // 检查权限是否匹配
    const hasPermission = (permissionCode: string | null | undefined) => {
      // 如果没有传递权限码，则认为有权限
      if (!permissionCode) {
        return true;
      }
      // 检查权限码是否在权限列表中
      return globalPermissionIds.value.includes(permissionCode) || globalActionPermissionIds.value.includes(permissionCode);
    };

    // 检查 action 是否应该显示（同时检查 visible 和 permissionCode）
    const shouldShowAction = (action: JCMoreMenuAction<any>) => {
      // 如果 visible 为 false，则不显示
      if (!isActionVisible(action)) {
        return false;
      }
      // 检查权限是否匹配
      return hasPermission(action.permissionCode);
    };

    const hasVisibleActions = computed(() => props.actions.some((a) => shouldShowAction(a)));

    const computedFit = computed(() => {
      if (typeof props.fit === 'boolean') return props.fit;
      return props.size === 'md';
    });

    const computedOffset = computed(() => {
      if (props.size !== 'lg') return undefined;
      return props.offset ?? ([5, 10] as [number, number]);
    });

    const computedAnchor = computed<QMenuProps['anchor'] | undefined>(() => {
      if (props.size !== 'lg') return undefined;
      return props.anchor ?? 'bottom left';
    });

    const computedSelf = computed<QMenuProps['self'] | undefined>(() => {
      if (props.size !== 'lg') return undefined;
      return props.self ?? 'top start';
    });

    const computedListStyle = computed(() => {
      if (props.size !== 'lg') return undefined;
      const minWidth = props.listMinWidth ?? '80px';
      return { minWidth };
    });

    const computedMenuClass = computed(() => {
      return props.menuClass ?? undefined;
    });

    const computedMenuAttrs = computed<Record<string, string | undefined>>(() => {
      return { 'action-menu-size': props.size };
    });

    const getActionLabel = (action: JCMoreMenuAction<any>) => {
      if (typeof action.label === 'function') return action.label({ item: props.item, action });
      if (typeof action.label === 'string' && action.label) return action.label;
      if (action.i18nKey) return translate.value(action.i18nKey);
      return '';
    };

    const handleActionClick = async (action: JCMoreMenuAction<any>) => {
      emit('action', { action, item: props.item });
      if (action.onClick) {
        await action.onClick(props.item);
      }
    };

    // 检查是否有对应 action 的图标插槽
    const hasMenuIconSlot = (action: JCMoreMenuAction<any>) => {
      if (!action.id) return false;
      return !!slots[`menu-icon-${action.id}`];
    };

    return {
      hasVisibleActions,
      isActionVisible,
      isActionDisabled,
      shouldShowAction,
      size: computed(() => props.size),
      showEmptyPlaceholder: computed(() => props.showEmptyPlaceholder),
      computedFit,
      computedOffset,
      computedAnchor,
      computedSelf,
      computedListStyle,
      computedMenuClass,
      computedMenuAttrs,
      getActionLabel,
      handleActionClick,
      hasMenuIconSlot,
    };
  },
});
</script>

<style lang="scss" scoped>
.jc-more-menu {
  display: inline-flex;
  align-items: center;
}

.jc-more-menu__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>