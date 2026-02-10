<template>
  <div class="j-q-autocomplete">
    <q-input
      :class="{
        'j-q-input--table': label,
        'j-q-input--form': !label,
      }"
      v-bind="$attrs"
      :label="label"
      :model-value="modelValue"
      @update:model-value="onUpdateValue"
      @focus="onFocus"
      @blur="onBlur"
      @clear="onClear"
      :spellcheck="false"
      autocapitalize="off"
      autocomplete="new-password"
      autocorrect="off"
      clear-icon="app:clear"
      clearable
      dense
      dropdown-icon="expand_more"
      outlined
      ref="inputRef"
    >
    </q-input>
    <div class="j-q-autocomplete-list-container" v-show="historyParams.visible && historyParams.filterList.length">
      <ul>
        <li v-for="item in historyParams.filterList" :key="item.id">
          <div class="list-item-content" @mousedown="onSelectItem(item)">
            <j-c-tooltip :content="item.value" placement="right" :disabled="tooltipDisabled" :offset="tooltipOffset">
              <span class="value">
                {{ item.value }}
              </span>
            </j-c-tooltip>
          </div>
          <q-icon
            v-if="deletable"
            name="app:clear"
            class="delete-icon q-ml-xs"
            @mousedown.stop="onDeleteItem(item)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue';
import { QIcon, QInput } from 'quasar';
import JCTooltip from '../j-c-tooltip/index.vue';

// 假设的存储类型
export interface HistoryItem {
  id: number;
  value: string;
}

const getUserCommonInputSearchHistoryParams = () => {
  return localStorage.getItem('APP_SEARCH_HISTORY') || '{}';
};
const setUserCommonInputSearchHistoryParams = (data: string) => {
  localStorage.setItem('APP_SEARCH_HISTORY', data);
};

export default defineComponent({
  name: 'JQAutocomplete',
  components: {
    JCTooltip,
    QIcon,
    QInput,
  },
  emits: ['update:model-value'],
  props: {
    deletable: { type: Boolean, default: false },
    label: { type: String, default: '' },
    maxLength: { type: Number, default: 5 },
    modelValue: { type: [String, null] as PropType<string | null | undefined>, required: true },
    searchKey: { type: String, required: true },
    tooltipDisabled: { type: Boolean, default: false },
  },
  setup(props, { emit, expose }) {
    // --- 状态定义 ---
    const inputRef = ref<any>(null);

    // 用 reactive 声明所有可变状态
    const historyParams = reactive({
      filterList: [] as HistoryItem[],
      list: [] as HistoryItem[],
      uniqueKey: `search_history_${props.searchKey}`,
      visible: false,
    });

    // --- 计算属性 ---
    const tooltipOffset = computed(() => (props.deletable ? 25 : 15));
    const uniqueKey = computed(() => `search_history_${props.searchKey}`);

    // --- 生命周期：初始化加载历史记录 ---
    onMounted(() => {
      loadHistoryFromStorage();
    });

    // --- 监听 modelValue 变化以过滤列表 ---
    watch(
      () => props.modelValue,
      (newVal: any) => {
        // 当 modelValue 改变时，过滤列表
        historyParams.filterList = historyParams.list.filter((item: HistoryItem) => item.value.includes(newVal));
      }
    );

    // --- 核心逻辑函数 ---
    const loadHistoryFromStorage = () => {
      try {
        const storedData = getUserCommonInputSearchHistoryParams();
        const historyParamsMap = JSON.parse(storedData);
        historyParams.list = historyParamsMap[uniqueKey.value] || [];
      } catch (e) {
        console.error('Failed to load search history:', e);
        historyParams.list = [];
      }
    };

    const onFocus = () => {
      // 每次 focus 时重新加载历史，以防其他地方修改了存储
      loadHistoryFromStorage();

      const currentValue = props.modelValue;
      if (!currentValue) {
        historyParams.filterList = historyParams.list;
      } else {
        historyParams.filterList = historyParams.list.filter((item: HistoryItem) => item.value.includes(currentValue));
      }
      historyParams.visible = true;
    };

    const onBlur = () => {
      // 延迟关闭，以允许 onSelectItem 的 mousedown 事件先触发
      historyParams.visible = false;
    };

    const onClear = () => {
      // 清空输入框时，显示所有历史记录
      historyParams.filterList = historyParams.list;
      inputRef.value.blur();
    };

    const onDeleteItem = (item: HistoryItem) => {
      // 从内存列表中删除
      const index = historyParams.list.findIndex((i) => i.id === item.id);
      if (index > -1) {
        historyParams.list.splice(index, 1);
      }

      // 从过滤列表中删除
      const filterIndex = historyParams.filterList.findIndex((i) => i.id === item.id);
      if (filterIndex > -1) {
        historyParams.filterList.splice(filterIndex, 1);
      }

      // 更新 Local Storage
      let historyParamsMap: Record<string, HistoryItem[]>;
      try {
        historyParamsMap = JSON.parse(getUserCommonInputSearchHistoryParams());
      } catch (e) {
        historyParamsMap = {};
      }

      historyParamsMap[uniqueKey.value] = historyParams.list;
      setUserCommonInputSearchHistoryParams(JSON.stringify(historyParamsMap));
    };

    const onUpdateValue = (value: string | number | null) => {
      const stringValue = String(value ?? '');
      // 1. 同步更新 v-model
      emit('update:model-value', stringValue);

      // 2. 根据新值过滤列表 (watch 也会做，但这里同步执行更快)
      historyParams.filterList = historyParams.list.filter((item: HistoryItem) => item.value.includes(stringValue));
    };

    const onSelectItem = (item: HistoryItem) => {
      // 选中项后，更新 v-model 并隐藏列表
      emit('update:model-value', item.value);
      historyParams.visible = false;
    };

    // 供外部或父组件调用的保存历史记录的方法
    const saveHistory = (value: string) => {
      if (!value) return;

      // 1. 检查并更新内存列表
      if (historyParams.list.find((item) => item.value === value)) return;

      if (historyParams.list.length >= props.maxLength) {
        historyParams.list.pop();
      }
      historyParams.list.unshift({ id: +new Date(), value });

      // 2. 更新 Local Storage
      let historyParamsMap: Record<string, HistoryItem[]>;
      try {
        historyParamsMap = JSON.parse(getUserCommonInputSearchHistoryParams());
      } catch (e) {
        historyParamsMap = {};
      }

      historyParamsMap[uniqueKey.value] = historyParams.list;
      setUserCommonInputSearchHistoryParams(JSON.stringify(historyParamsMap));
    };
    expose({ saveHistory });
    return {
      historyParams,
      inputRef,
      onBlur,
      onClear,
      onDeleteItem,
      onFocus,
      onSelectItem,
      onUpdateValue,
      saveHistory,
      tooltipOffset,
      uniqueKey,
    };
  },
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
