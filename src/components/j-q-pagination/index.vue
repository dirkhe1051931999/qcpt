<template>
  <div class="j-q-pagination">
    <div class="row items-center justify-end">
      <div class="pagination-total">
        <span>{{ t('messages.pagination.total', { total: internalInfo.total }) }}</span>
      </div>
      <q-select
        class="pagination-size-select"
        v-model="internalInfo.pageSize"
        :options="pageSizeOptions"
        dropdown-icon="expand_more"
        @update:model-value="handlePageSizeChange"
        dense
        outlined
        options-dense
        autocomplete="false"
        popup-content-class="j-q-select-popup select-popup-content height1"
      />
      <div class="pagination-suffix">
        <span>{{ t('messages.pagination.pieces_page') }}</span>
      </div>
      <q-pagination
        v-model="internalInfo.currentPage"
        :input="false"
        :max-pages="6"
        :max="totalPages"
        @update:model-value="handlePageChange"
        direction-links
        icon-prev="app:navigation-arrow-left"
        icon-next="app:navigation-arrow-right"
        color="grey"
        active-color="primary"
        active-text-color="white"
        :ripple="false"
      ></q-pagination>
      <p class="pagination-goto-text">
        {{ t('messages.pagination.goto') }}
      </p>
      <q-input
        :autofocus="false"
        v-model.trim="internalInfo.inputPage"
        @keyup.enter="handleJumpToPage"
        autocapitalize="off"
        autocomplete="new-password"
        autocorrect="off"
        dense
        outlined
        :placeholder="pagePlaceholder"
        class="pagination-jump-input"
        :mask="pageMask"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue';
import { QInput, QPagination, QSelect } from 'quasar';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from './index';
import { useI18n } from 'src/composables/useI18n.ts';

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  total: number;
}

interface InternalPaginationState extends PaginationConfig {
  inputPage: string | number;
}

export default defineComponent({
  name: 'JQPagination',
  components: {
    QSelect,
    QPagination,
    QInput,
  },
  props: {
    // 当前页码
    currentPage: {
      type: Number,
      default: 1,
    },
    // 每页显示数量
    pageSize: {
      type: Number,
      default: DEFAULT_PAGE_SIZE,
    },
    // 总条数
    total: {
      type: Number,
      default: 0,
    },
    // 每页显示数量选项
    pageSizeOptions: {
      type: Array as () => number[],
      default: () => DEFAULT_PAGE_SIZE_OPTIONS,
    },
  },
  emits: ['update:currentPage', 'update:pageSize', 'change'],
  setup(props, { emit }) {
    const { t } = useI18n();

    /* --- 内部状态定义 --- */
    const internalInfo = reactive<InternalPaginationState>({
      currentPage: props.currentPage,
      pageSize: props.pageSize,
      total: props.total,
      inputPage: '',
    });

    /* --- Computed 计算属性 --- */

    // 计算总页数
    const totalPages = computed(() => {
      const { total, pageSize } = internalInfo;
      const pages = Math.ceil(total / pageSize);
      return pages < 1 ? 1 : pages;
    });

    // 计算跳转输入框的占位符
    const pagePlaceholder = computed(() => {
      return `${internalInfo.currentPage} / ${totalPages.value}`;
    });

    // 计算跳转输入框的掩码
    const pageMask = computed(() => {
      const total = totalPages.value.toString();
      return Array(total.length).fill('#').join('');
    });

    /* --- Watch 侦听器 --- */

    // 监听外部 Props 变化，同步内部状态
    watch(
      () => props.currentPage,
      (newVal) => {
        internalInfo.currentPage = newVal;
      }
    );

    watch(
      () => props.pageSize,
      (newVal) => {
        internalInfo.pageSize = newVal;
      }
    );

    watch(
      () => props.total,
      (newVal) => {
        internalInfo.total = newVal;
      }
    );

    /* --- Event Methods 事件处理 --- */

    // 发送变化事件
    const emitChange = () => {
      const payload: PaginationConfig = {
        currentPage: internalInfo.currentPage,
        pageSize: internalInfo.pageSize,
        total: internalInfo.total,
      };
      emit('update:currentPage', internalInfo.currentPage);
      emit('update:pageSize', internalInfo.pageSize);
      emit('change', payload);
    };

    // 处理每页显示数量变化
    const handlePageSizeChange = () => {
      // 改变每页显示数量时，重置到第一页
      internalInfo.currentPage = 1;
      emitChange();
    };

    // 处理页码变化
    const handlePageChange = () => {
      // 确保页码在有效范围内
      if (internalInfo.currentPage < 1) internalInfo.currentPage = 1;
      if (internalInfo.currentPage > totalPages.value) {
        internalInfo.currentPage = totalPages.value;
      }
      emitChange();
    };

    // 处理跳转输入框
    const handleJumpToPage = () => {
      if (internalInfo.inputPage) {
        let targetPage = Number(internalInfo.inputPage);

        if (isNaN(targetPage) || targetPage < 1) {
          targetPage = 1;
        } else if (targetPage > totalPages.value) {
          targetPage = totalPages.value;
        }

        internalInfo.currentPage = targetPage;
        internalInfo.inputPage = '';
        emitChange();
      }
    };

    /* --- Return --- */
    return {
      t,
      internalInfo,
      totalPages,
      pagePlaceholder,
      pageMask,
      handlePageSizeChange,
      handlePageChange,
      handleJumpToPage,
    };
  },
});
</script>

<style lang="scss">
@use './index';
</style>
