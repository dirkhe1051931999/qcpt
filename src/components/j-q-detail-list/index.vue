<template>
  <!-- 上下布局 -->
  <div v-if="layout === 'vertical'" class="row" :class="gutter">
    <template v-for="item in visibleItems" :key="item.name">
      <div :class="[`col-${item.span || 6}`]" class="detail-item-container">
        <div class="q-mb-xs text-grey text-caption row items-center">
          {{ item.label }}
          <j-c-tooltip v-if="item.tip" :content="item.tip" placement="top">
            <q-icon name="app:question" size="14px" class="q-ml-xs tip-icon" />
          </j-c-tooltip>
        </div>
        <div class="detail-value-wrapper row items-center no-wrap" :class="`text-${item.align || 'left'}`">
          <div class="detail-value text-body2" :class="{ clickable: isClickable(item), 'text-ellipsis': item.detail }" @click="handleClick(item)">
            <template v-if="slots[`item-value-${item.name}`]">
              <slot :name="`item-value-${item.name}`" :value="data[item.name]" :item="item" :data="data" :field-name="item.name" />
            </template>
            <template v-else-if="item.html">
              <div v-html="getDefaultValue(item)" :class="[getOptionClass(item), 'html-content']" :style="getHtmlStyle(item)"></div>
            </template>
            <template v-else-if="item.detail">
              <span :class="getOptionClass(item)">{{ getDefaultValue(item) }}</span>
            </template>
            <template v-else>
              <j-c-tooltip-ellipsis :content="getDefaultValue(item)" :lines="item.whiteSpace || 1" :class="getOptionClass(item)"></j-c-tooltip-ellipsis>
            </template>
          </div>
          <div class="detail-value-suffix q-ml-xs" v-if="item.copy || item.detail || slots[`item-suffix-${item.name}`]">
            <template v-if="slots[`item-suffix-${item.name}`]">
              <slot :name="`item-suffix-${item.name}`" :value="data[item.name]" :item="item" :data="data" :field-name="item.name" />
            </template>
            <template v-else>
              <j-c-copy v-if="item.copy" :text="getCopyValue(item)" />
              <span v-if="item.detail" class="link-type q-ml-xs" @click="handleDetailClick(item)">{{ t('action.detail') }}</span>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>

  <!-- 左右布局 - space-between -->
  <div v-else-if="layout === 'horizontal-between'" class="row horizontal-between-container" :class="gutter">
    <template v-for="item in visibleItems" :key="item.name">
      <div :class="[`col-${item.span || 6}`]">
        <div class="item item-between">
          <div class="label row items-center">
            {{ item.label }}
            <j-c-tooltip v-if="item.tip" :content="item.tip" placement="top">
              <q-icon name="app:question" size="14px" class="q-ml-xs tip-icon" />
            </j-c-tooltip>
          </div>
          <div class="value-wrapper row items-center no-wrap">
            <div class="value" :class="{ clickable: isClickable(item), 'text-ellipsis': item.detail }" @click="handleClick(item)">
              <template v-if="slots[`item-value-${item.name}`]">
                <slot :name="`item-value-${item.name}`" :value="data[item.name]" :item="item" :data="data" :field-name="item.name" />
              </template>
              <template v-else-if="item.html">
                <div v-html="getDefaultValue(item)" :class="[getOptionClass(item), 'html-content']" :style="getHtmlStyle(item)"></div>
              </template>
              <template v-else-if="item.detail">
                <span :class="getOptionClass(item)">{{ getDefaultValue(item) }}</span>
              </template>
              <template v-else>
                <j-c-tooltip-ellipsis :content="getDefaultValue(item)" :lines="item.whiteSpace || 1" :class="getOptionClass(item)"></j-c-tooltip-ellipsis>
              </template>
            </div>
            <div class="value-suffix q-ml-xs" v-if="item.copy || item.detail || slots[`item-suffix-${item.name}`]">
              <template v-if="slots[`item-suffix-${item.name}`]">
                <slot :name="`item-suffix-${item.name}`" :value="data[item.name]" :item="item" :data="data" :field-name="item.name" />
              </template>
              <template v-else>
                <j-c-copy v-if="item.copy" :text="getCopyValue(item)" />
                <span v-if="item.detail" class="link-type q-ml-xs" @click="handleDetailClick(item)">{{ t('action.detail') }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>

  <!-- 左右布局 - 左对齐 -->
  <div v-else-if="layout === 'horizontal-left'" class="row horizontal-left-container" :class="gutter" :style="containerStyle">
    <template v-for="item in visibleItems" :key="item.name">
      <div :class="[`col-${item.span || 6}`]">
        <div class="item item-left">
          <div class="label row items-center">
            {{ item.label }}
            <j-c-tooltip v-if="item.tip" :content="item.tip" placement="top">
              <q-icon name="app:question" size="14px" class="q-ml-xs tip-icon" />
            </j-c-tooltip>
          </div>
          <div class="value-wrapper row items-center no-wrap">
            <div class="value" :class="{ clickable: isClickable(item), 'text-ellipsis': item.detail }" @click="handleClick(item)">
              <template v-if="slots[`item-value-${item.name}`]">
                <slot :name="`item-value-${item.name}`" :value="data[item.name]" :item="item" :data="data" :field-name="item.name" />
              </template>
              <template v-else-if="item.html">
                <div v-html="getDefaultValue(item)" :class="[getOptionClass(item), 'html-content']" :style="getHtmlStyle(item)"></div>
              </template>
              <template v-else-if="item.detail">
                <span :class="getOptionClass(item)">{{ getDefaultValue(item) }}</span>
              </template>
              <template v-else>
                <j-c-tooltip-ellipsis :content="getDefaultValue(item)" :lines="item.whiteSpace || 1" :class="getOptionClass(item)"></j-c-tooltip-ellipsis>
              </template>
            </div>
            <div class="value-suffix q-ml-xs" v-if="item.copy || item.detail || slots[`item-suffix-${item.name}`]">
              <template v-if="slots[`item-suffix-${item.name}`]">
                <slot :name="`item-suffix-${item.name}`" :value="data[item.name]" :item="item" :data="data" :field-name="item.name" />
              </template>
              <template v-else>
                <j-c-copy v-if="item.copy" :text="getCopyValue(item)" />
                <span v-if="item.detail" class="link-type q-ml-xs" @click="handleDetailClick(item)">{{ t('action.detail') }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import type { PropType, SlotsType } from 'vue';
import { computed, defineComponent } from 'vue';
import { QIcon } from 'quasar';
import JCTooltipEllipsis from 'components/j-c-tooltip-ellipsis/index.vue';
import JCCopy from 'components/j-c-copy/index.vue';
import JCTooltip from '../j-c-tooltip/index.vue';
import { formatDate } from 'src/utils/tool.ts';
import { useI18n } from 'src/composables/useI18n.ts';

export interface DetailItem {
  name: string;
  label: string;
  span?: number;
  align?: 'left' | 'right' | 'center';
  date?: boolean | string;
  options?: Record<string, any>[];
  findByKey?: string;
  displayKey?: string;
  tip?: string;
  whiteSpace?: number; // 最大行数，超过后显示省略号，默认为1
  onClick?: (value: string) => void; // 点击监听函数
  clickable?: boolean | ((row: TDetailData) => boolean); // 是否可点击，可以是 boolean 或 Function
  format?: (value: any, row: TDetailData) => any;
  visible?: boolean | ((row: TDetailData) => boolean);
  html?: boolean; // 是否支持HTML渲染
  copy?: boolean; // 是否显示复制按钮
  detail?: boolean; // 是否显示详情按钮
  onDetailClick?: (value: string, row: TDetailData) => void; // 详情按钮点击回调
}

type TDetailData = Record<string, any>;

export default defineComponent({
  name: 'JQDetailList',
  components: {
    JCTooltipEllipsis,
    JCCopy,
    QIcon,
    JCTooltip,
  },
  props: {
    items: {
      type: Array as PropType<DetailItem[]>,
      required: true,
    },
    data: {
      type: Object as PropType<TDetailData>,
      required: true,
    },
    gutter: {
      type: String,
      default: 'q-col-gutter-md',
    },
    layout: {
      type: String as PropType<'vertical' | 'horizontal-between' | 'horizontal-left'>,
      default: 'vertical',
    },
    labelWidth: {
      type: String,
      default: '100px',
    },
  },
  slots: Object as SlotsType<
    Record<`item-value-${string}`, { value: any; item: DetailItem; data: TDetailData; fieldName: string }> &
      Record<`item-suffix-${string}`, { value: any; item: DetailItem; data: TDetailData; fieldName: string }>
  >,
  setup(props, { slots }) {
    const { t } = useI18n();

    const isItemVisible = (item: DetailItem): boolean => {
      if (item.visible === undefined || item.visible === null) return true;
      if (typeof item.visible === 'boolean') return item.visible;
      if (typeof item.visible === 'function') {
        return item.visible(props.data);
      }
      return true;
    };

    const visibleItems = computed(() => {
      return props.items.filter((item) => isItemVisible(item));
    });

    const containerStyle = computed(() => {
      if (props.layout === 'horizontal-left') {
        return {
          '--label-width': props.labelWidth,
        };
      }
      return {};
    });

    const computedSlotItems = computed(() => {
      return props.items.filter((item) => {
        return Reflect.has(slots, `item-value-${item.name}`);
      });
    });
    const getOptionLabel = (item: DetailItem, value: any): any => {
      const { options, findByKey, displayKey = 'label' } = item;
      if (!options || !findByKey) {
        return value;
      }
      const foundItem = options.find((option) => String(option[findByKey]) === String(value));
      return foundItem ? foundItem[displayKey] : value;
    };

    const getDefaultValue = (item: DetailItem) => {
      let value = props.data[item.name];
      if (value === null || value === undefined || value === '') {
        return '-';
      }
      if (item.options && item.findByKey) {
        value = getOptionLabel(item, value);
      }
      if (item.format && typeof item.format === 'function') {
        value = item.format(value, props.data);
      }
      if (item.date) {
        if (item.date === true && typeof item.date === 'boolean') {
          return formatDate(value);
        } else if (typeof item.date === 'string') {
          return formatDate(value, item.date);
        }
      }

      return String(value);
    };

    const getOptionClass = (item: DetailItem): any => {
      let value = props.data[item.name];
      const { options, findByKey } = item;
      if (!options || !findByKey) {
        return '';
      }
      const foundItem = options.find((option) => String(option[findByKey]) === String(value));
      return foundItem ? foundItem.class : '';
    };

    // 判断是否可点击
    const isClickable = (item: DetailItem): boolean => {
      if (!item.onClick) return false;
      if (item.clickable === undefined || item.clickable === null) return true;
      if (typeof item.clickable === 'boolean') return item.clickable;
      if (typeof item.clickable === 'function') {
        return item.clickable(props.data);
      }
      return false;
    };

    // 处理点击事件
    const handleClick = (item: DetailItem) => {
      if (!isClickable(item) || !item.onClick) return;
      const value = getDefaultValue(item);
      item.onClick(value);
    };

    // 获取HTML渲染的样式，支持whiteSpace属性
    const getHtmlStyle = (item: DetailItem) => {
      const lines = item.whiteSpace || 1;
      return {
        '-webkit-line-clamp': lines,
      };
    };

    // 获取要复制的值（与显示值保持一致，但不包含HTML）
    const getCopyValue = (item: DetailItem) => {
      let value = props.data[item.name];
      if (value === null || value === undefined || value === '') {
        return '';
      }
      // 如果使用了 options，获取显示值
      if (item.options && item.findByKey) {
        value = getOptionLabel(item, value);
      }
      // 如果使用了 format，获取格式化后的值
      if (item.format && typeof item.format === 'function') {
        value = item.format(value, props.data);
        // 如果 format 返回的是 HTML，需要提取纯文本
        if (typeof value === 'string' && value.includes('<')) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = value;
          value = tempDiv.textContent || tempDiv.innerText || '';
        }
      }
      // 如果使用了 date，格式化日期
      if (item.date) {
        if (item.date === true && typeof item.date === 'boolean') {
          return formatDate(value);
        } else if (typeof item.date === 'string') {
          return formatDate(value, item.date);
        }
      }
      return String(value);
    };

    // 处理详情按钮点击事件
    const handleDetailClick = (item: DetailItem) => {
      if (!item.onDetailClick) return;
      const value = getDefaultValue(item);
      item.onDetailClick(value, props.data);
    };

    return {
      t,
      visibleItems,
      getOptionClass,
      computedSlotItems,
      getDefaultValue,
      getCopyValue,
      slots,
      containerStyle,
      isClickable,
      handleClick,
      getHtmlStyle,
      handleDetailClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.detail-item-container {
  min-width: 0;
}

.detail-value-wrapper {
  width: 100%;
  min-width: 0;
}

.detail-value {
  flex: 1;
  min-width: 0;

  &.clickable {
    display: inline-block;
    cursor: pointer;
    color: var(--j-color-primary);
  }

  &.text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.detail-value-suffix {
  flex-shrink: 0;
}

.html-content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
// 左右布局 - space-between
.horizontal-between-container {
  .item-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;

    &:last-child {
      padding-bottom: 0;
    }

    .label {
      color: #7e84a3;
      font-size: 12px;
    }

    .value-wrapper {
      min-width: 0;
      justify-content: flex-end;
    }

    .value {
      flex: 1;
      min-width: 0;
      text-align: right;

      &.clickable {
        display: inline-block;
        cursor: pointer;
        color: var(--j-color-primary);
      }

      &.text-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .value-suffix {
      flex-shrink: 0;
    }
  }
}

// 左右布局 - 左对齐
.horizontal-left-container {
  .item-left {
    display: grid;
    grid-template-columns: var(--label-width, 100px) 1fr;
    align-items: center;
    padding-bottom: 12px;

    &:last-child {
      padding-bottom: 0;
    }

    .label {
      color: #7e84a3;
      font-size: 12px;
    }

    .value-wrapper {
      min-width: 0;
      max-width: 300px;

      @media (min-width: 1440px) {
        max-width: 400px;
      }
    }

    .value {
      flex: 1;
      min-width: 0;

      &.clickable {
        display: inline-block;
        cursor: pointer;
        color: var(--j-color-primary);
      }

      &.text-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .value-suffix {
      flex-shrink: 0;
    }
  }
}
</style>
