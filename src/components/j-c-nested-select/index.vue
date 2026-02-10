<template>
  <q-select
    ref="qSelectRef"
    :class="[
      'j-c-nested-select',
      {
        'j-c-nested-select--table': label,
        'j-c-nested-select--form': !label && !smInput,
        'j-c-nested-select--ellipsis': ellipsis,
        'j-q-input--sm': smInput && !label,
      },
      customClass
    ]"
    :style="ellipsis && maxWidth ? { '--max-width': computedMaxWidth } : undefined"
    v-model="innerValue"
    :options="optionsOrigin"
    :label="label"
    :spellcheck="false"
    autocapitalize="off"
    autocomplete="new-password"
    autocorrect="off"
    dense
    options-dense
    outlined
    emit-value
    :clearable="clearable"
    dropdown-icon="expand_more"
    clear-icon="app:clear"
    map-options
    :popup-content-class="popupContentClass"
    :disable="disable"
    :readonly="readonly"
    :title="ellipsis ? displayValue : undefined"
  >
    <template #selected>
      <span v-if="ellipsis" class="q-field__native--text">{{ displayValue }}</span>
      <span v-else>{{ displayValue }}</span>
    </template>
    <template #option></template>
    <q-menu fit styling-menu-option parent-tree>
      <q-list dense>
        <nested-menu-item v-for="data in options" :key="data.value" :option="data" :selected-value="innerValue" :close-on-select="closeOnSelect" @select="handleSelect" />
      </q-list>
    </q-menu>
  </q-select>
</template>

<script lang="ts">
import { QList, QMenu, QSelect } from 'quasar';
import { computed, defineComponent, PropType, ref } from 'vue';
import NestedMenuItem from './NestedMenuItem.vue';
import type { NestedSelectOption } from './types';

type TModelValue = string | number | null | undefined;

export default defineComponent({
  name: 'JCNestedSelect',
  components: {
    NestedMenuItem,
    QSelect,
    QMenu,
    QList,
  },
  props: {
    clearable: {
      type: Boolean,
      default: true,
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
      default: '',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    displayValueFn: {
      type: Function as PropType<(value: TModelValue, options: NestedSelectOption[]) => string>,
      default: undefined,
    },
    ellipsis: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    maxWidth: {
      type: [String, Number],
      default: '300px',
    },
    modelValue: {
      type: [String, Number] as PropType<TModelValue>,
      default: null,
    },
    options: {
      type: Array as PropType<NestedSelectOption[]>,
      required: true,
      default: () => [],
    },
    optionsOrigin: {
      type: Array as PropType<NestedSelectOption[]>,
      default: () => [],
    },
    popupContentClass: {
      type: String,
      default: 'select-popup-content height1',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    smInput: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue': (value: TModelValue) => true,
    change: (value: TModelValue) => true,
  },
  setup(props, { emit }) {
    const qSelectRef = ref<InstanceType<typeof QSelect> | null>(null);

    const computedMaxWidth = computed(() => {
      if (typeof props.maxWidth === 'number') {
        return `${props.maxWidth}px`;
      }
      return props.maxWidth;
    });

    const innerValue = computed<TModelValue>({
      get() {
        return props.modelValue ?? null;
      },
      set(val) {
        emit('update:modelValue', val);
        emit('change', val);
      },
    });

    const findOptionByValue = (value: TModelValue, optionsList: NestedSelectOption[]): NestedSelectOption | null => {
      if (value === null || value === undefined) {
        return null;
      }

      for (const option of optionsList) {
        if (option.value === value) {
          return option;
        }
        if (option.children && option.children.length > 0) {
          const found = findOptionByValue(value, option.children);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    const buildPathLabel = (option: NestedSelectOption): string => {
      const path: string[] = [];
      let current: NestedSelectOption | undefined = option;

      while (current) {
        path.unshift(current.label);
        current = current.parent;
      }

      if (path.length > 1) {
        const label = path.pop()!;
        return `${label} (${path.join(' > ')})`;
      }

      return path[0] || '';
    };

    const displayValue = computed(() => {
      if (!innerValue.value) {
        return '';
      }

      const searchOptions = props.optionsOrigin.length > 0 ? props.optionsOrigin : props.options;

      if (props.displayValueFn) {
        return props.displayValueFn(innerValue.value, searchOptions);
      }

      const option = findOptionByValue(innerValue.value, searchOptions);
      if (!option) {
        return '';
      }

      return buildPathLabel(option);
    });

    const handleSelect = (value: TModelValue) => {
      innerValue.value = value;
    };

    return {
      computedMaxWidth,
      displayValue,
      handleSelect,
      innerValue,
      qSelectRef,
    };
  },
});
</script>

<style lang="scss">
@use "./index.scss";
</style>
