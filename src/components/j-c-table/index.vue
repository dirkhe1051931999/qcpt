<template>
  <div class="j-c-table-wrapper" >
    <div 
      class="j-c-table-container" 
      ref="tableContainerRef" 
      :class="{ 
        'j-c-table-container--empty': !rows || rows.length === 0,
        'j-c-table-container--fixed-header': fixedHeader
      }"
      :style="getContainerStyle()"
    >
      <table class="j-c-table">
        <thead>
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="column.name || index"
              :class="[
                'j-c-table__header-cell',
                {
                  'j-c-table__header-cell--pinned-left': column.pinLeft || (index === 0 && firstColumnPinned),
                  'j-c-table__header-cell--pinned-right': column.pinRight || (index === columns.length - 1 && lastColumnPinned),
                },
              ]"
              :style="getHeaderCellStyle(column, index)"
            >
              <slot :name="`header-${column.name}`" :column="column" :index="index">
                <div class="j-c-table__header-content">
                  {{ column.label || column.name }}
                </div>
              </slot>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="getRowKey(row, rowIndex)" class="j-c-table__body-row">
            <td
              v-for="(column, colIndex) in columns"
              :key="column.name || colIndex"
              :class="[
                'j-c-table__body-cell',
                {
                  'j-c-table__body-cell--pinned-left': column.pinLeft || (colIndex === 0 && firstColumnPinned),
                  'j-c-table__body-cell--pinned-right': column.pinRight || (colIndex === columns.length - 1 && lastColumnPinned),
                },
              ]"
              :style="getBodyCellStyle(column, colIndex)"
            >
              <slot :name="`body-${column.name}`" :row="row" :column="column" :value="getCellValue(row, column)" :row-index="rowIndex" :col-index="colIndex">
                <div class="j-c-table__cell-wrapper">
                  <j-c-tooltip 
                    v-if="column.maxWidth || column.wrapCount"
                    :content="formatCellValue(row, column)" 
                    :disabled="!shouldShowTooltip(rowIndex, colIndex, column)"
                  >
                    <div
                      :ref="(el) => setCellRef(el, rowIndex, colIndex)"
                      class="j-c-table__cell-content"
                      :class="[getCellContentClass(column), { 'j-c-table__cell-content--clickable': isClickable(column, row) }]"
                      :style="getCellContentStyle(column)"
                      @click="handleCellClick(column, row)"
                    >
                      {{ formatCellValue(row, column) }}
                    </div>
                  </j-c-tooltip>
                  <div 
                    v-else 
                    class="j-c-table__cell-content"
                    :class="{ 'j-c-table__cell-content--clickable': isClickable(column, row) }"
                    @click="handleCellClick(column, row)"
                  >
                    {{ formatCellValue(row, column) }}
                  </div>
                  <div v-if="column.copy" class="j-c-table__cell-suffix">
                    <j-c-copy :text="getCopyValue(row, column)" />
                  </div>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 空数据提示 -->
    <div v-if="!rows || rows.length === 0" class="j-c-table__empty">
      <slot name="empty">
        {{ emptyText }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, PropType, ref, watch } from 'vue';
import JCCopy from 'components/j-c-copy/index.vue';
import JCTooltip from '../j-c-tooltip/index.vue';

export interface JCTableColumn {
  /** 列的唯一标识 */
  name: string;
  /** 列的显示标题 */
  label?: string;
  /** 数据字段名（默认使用 name） */
  field?: string | ((row: any) => any);
  /** 格式化函数 */
  format?: (value: any, row: any) => string;
  /** 列宽度 */
  width?: string | number;
  /** 最小宽度 */
  minWidth?: string | number;
  /** 最大宽度（超出时省略） */
  maxWidth?: string | number;
  /** 最多显示几行（超出后省略，1-3） */
  wrapCount?: number;
  /** 是否显示省略号 tooltip（默认 true） */
  ellipsisTooltip?: boolean;
  /** 是否显示复制按钮 */
  copy?: boolean;
  /** 是否可点击，可以是 boolean 或 Function */
  clickable?: boolean | ((value: any, row: any) => boolean);
  /** 点击事件回调 */
  onClick?: (value: any, row: any) => void;
  /** 固定在左侧 */
  pinLeft?: boolean;
  /** 固定在右侧 */
  pinRight?: boolean;
  /** 文本对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 自定义 class */
  class?: string;
  /** 自定义 style */
  style?: string | Record<string, any>;
}

export default defineComponent({
  name: 'JCTable',
  components: {
    JCCopy,
    JCTooltip,
  },
  props: {
    /** 列配置 */
    columns: {
      type: Array as PropType<JCTableColumn[]>,
      required: true,
    },
    /** 行数据 */
    rows: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    /** 行的唯一标识字段 */
    rowKey: {
      type: String,
      default: 'id',
    },
    /** 空数据提示文本 */
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    /** 是否固定第一列 */
    firstColumnPinned: {
      type: Boolean,
      default: false,
    },
    /** 是否固定最后一列 */
    lastColumnPinned: {
      type: Boolean,
      default: false,
    },
    /** 是否固定表头 */
    fixedHeader: {
      type: Boolean,
      default: true,
    },
    /** 表体最大高度 */
    maxBodyHeight: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
  },
  setup(props) {
    const tableContainerRef = ref<HTMLElement | null>(null);
    const cellRefs = ref<Map<string, HTMLElement>>(new Map());
    const tooltipVisibility = ref<Map<string, boolean>>(new Map());

    /** 获取行的唯一 key */
    const getRowKey = (row: any, index: number) => {
      if (props.rowKey && row[props.rowKey] !== undefined) {
        return row[props.rowKey];
      }
      return index;
    };

    /** 获取单元格的值 */
    const getCellValue = (row: any, column: JCTableColumn) => {
      if (typeof column.field === 'function') {
        return column.field(row);
      }
      const field = column.field || column.name;
      return row[field];
    };

    /** 格式化单元格的值 */
    const formatCellValue = (row: any, column: JCTableColumn) => {
      const value = getCellValue(row, column);
      if (column.format && typeof column.format === 'function') {
        return column.format(value, row);
      }
      if (value === null || value === undefined) {
        return '-';
      }
      return String(value);
    };

    /** 获取复制的值 */
    const getCopyValue = (row: any, column: JCTableColumn) => {
      const value = getCellValue(row, column);
      if (value === null || value === undefined || value === '') {
        return '';
      }
      return String(value);
    };

    /** 判断单元格是否可点击 */
    const isClickable = (column: JCTableColumn, row: any): boolean => {
      if (!column.onClick) return false;
      if (column.clickable === undefined || column.clickable === null) return true;
      if (typeof column.clickable === 'boolean') return column.clickable;
      if (typeof column.clickable === 'function') {
        const value = getCellValue(row, column);
        return column.clickable(value, row);
      }
      return false;
    };

    /** 处理单元格点击事件 */
    const handleCellClick = (column: JCTableColumn, row: any) => {
      if (!isClickable(column, row) || !column.onClick) return;
      const value = getCellValue(row, column);
      column.onClick(value, row);
    };

    /** 标准化宽度值 */
    const normalizeSize = (size?: string | number): string | undefined => {
      if (size === undefined || size === null) return undefined;
      return typeof size === 'number' ? `${size}px` : size;
    };

    /** 获取表头单元格样式 */
    const getHeaderCellStyle = (column: JCTableColumn, index: number) => {
      const styles: Record<string, any> = {};

      if (column.width) {
        styles.width = normalizeSize(column.width);
      }
      if (column.minWidth) {
        styles.minWidth = normalizeSize(column.minWidth);
      }
      if (column.align) {
        styles.textAlign = column.align;
      }

      // 固定列的阴影定位
      if (column.pinLeft || (index === 0 && props.firstColumnPinned)) {
        const leftOffset = calculateLeftOffset(index);
        styles.left = leftOffset;
      }
      if (column.pinRight || (index === props.columns.length - 1 && props.lastColumnPinned)) {
        const rightOffset = calculateRightOffset(index);
        styles.right = rightOffset;
      }

      return styles;
    };

    /** 获取表体单元格样式 */
    const getBodyCellStyle = (column: JCTableColumn, index: number) => {
      const styles: Record<string, any> = {};

      if (column.width) {
        styles.width = normalizeSize(column.width);
      }
      if (column.minWidth) {
        styles.minWidth = normalizeSize(column.minWidth);
      }
      if (column.align) {
        styles.textAlign = column.align;
      }

      // 固定列的阴影定位
      if (column.pinLeft || (index === 0 && props.firstColumnPinned)) {
        const leftOffset = calculateLeftOffset(index);
        styles.left = leftOffset;
      }
      if (column.pinRight || (index === props.columns.length - 1 && props.lastColumnPinned)) {
        const rightOffset = calculateRightOffset(index);
        styles.right = rightOffset;
      }

      return styles;
    };

    /** 计算固定列的左侧偏移 */
    const calculateLeftOffset = (colIndex: number): string => {
      // 简化实现，使用固定宽度或百分比
      // 实际应根据前面列的宽度累加
      return '0px';
    };

    /** 计算固定列的右侧偏移 */
    const calculateRightOffset = (colIndex: number): string => {
      // 简化实现
      return '0px';
    };

    /** 获取单元格内容的 class */
    const getCellContentClass = (column: JCTableColumn) => {
      const classes: string[] = [];

      if (column.wrapCount) {
        const lines = Math.min(Math.max(1, column.wrapCount), 3);
        if (lines === 1) {
          classes.push('j-c-table__cell-content--ellipsis-1');
        } else {
          classes.push('j-c-table__cell-content--ellipsis-multi');
        }
      }

      if (column.class) {
        classes.push(column.class);
      }

      return classes;
    };

    /** 获取单元格内容的 style */
    const getCellContentStyle = (column: JCTableColumn) => {
      const styles: Record<string, any> = {};

      if (column.maxWidth) {
        styles.maxWidth = normalizeSize(column.maxWidth);
      }

      if (column.wrapCount && column.wrapCount > 1) {
        styles['-webkit-line-clamp'] = column.wrapCount;
      }

      if (column.style) {
        if (typeof column.style === 'string') {
          return `${column.style}; max-width: ${normalizeSize(column.maxWidth) || 'none'};`;
        }
        Object.assign(styles, column.style);
      }

      return styles;
    };

    /** 设置单元格引用 */
    const setCellRef = (el: any, rowIndex: number, colIndex: number) => {
      const key = `${rowIndex}-${colIndex}`;
      if (el) {
        cellRefs.value.set(key, el);
        nextTick(() => {
          updateTooltipVisibility(key);
        });
      }
    };

    /** 更新 tooltip 可见性 */
    const updateTooltipVisibility = (key: string) => {
      const el = cellRefs.value.get(key);
      if (!el) {
        tooltipVisibility.value.set(key, false);
        return;
      }

      // 检测是否有溢出
      const isOverflowing = el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
      tooltipVisibility.value.set(key, isOverflowing);
    };

    /** 判断是否需要显示 tooltip */
    const shouldShowTooltip = (rowIndex: number, colIndex: number, column: JCTableColumn) => {
      // 如果 ellipsisTooltip 为 false，不显示 tooltip
      if (column.ellipsisTooltip === false) {
        return false;
      }
      // 默认显示 tooltip（当文本溢出时）
      const key = `${rowIndex}-${colIndex}`;
      return tooltipVisibility.value.get(key) || false;
    };

    /** 批量更新所有 tooltip */
    const updateAllTooltips = () => {
      nextTick(() => {
        cellRefs.value.forEach((_, key) => {
          updateTooltipVisibility(key);
        });
      });
    };

    /** 获取容器样式 */
    const getContainerStyle = () => {
      const styles: Record<string, any> = {};
      
      if (props.maxBodyHeight) {
        const height = typeof props.maxBodyHeight === 'number' ? `${props.maxBodyHeight}px` : props.maxBodyHeight;
        styles.maxHeight = height;
        styles.overflowY = 'auto';
      }
      
      return styles;
    };

    // 监听 rows 变化
    watch(
      () => props.rows,
      () => {
        cellRefs.value.clear();
        tooltipVisibility.value.clear();
        updateAllTooltips();
      },
      { deep: true }
    );

    // 监听 columns 变化
    watch(
      () => props.columns,
      () => {
        cellRefs.value.clear();
        tooltipVisibility.value.clear();
        updateAllTooltips();
      },
      { deep: true }
    );

    onMounted(() => {
      updateAllTooltips();
    });

    return {
      tableContainerRef,
      getRowKey,
      getCellValue,
      formatCellValue,
      getCopyValue,
      isClickable,
      handleCellClick,
      getHeaderCellStyle,
      getBodyCellStyle,
      getCellContentClass,
      getCellContentStyle,
      setCellRef,
      shouldShowTooltip,
      getContainerStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
