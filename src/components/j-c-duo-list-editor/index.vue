<template>
  <div>
    <div v-for="(item, index) in innerValue" :key="getKey(item, index)" class="q-mb-md list-item-row relative-position" :class="{ 'compact-item': actionMode === 'compact' }">
      <div class="col-grow">
        <slot
          name="item-content"
          :item="item"
          :index="index"
          :update-item="updateItem"
          :is-last="index === innerValue.length - 1"
          :add-item="addItem"
          :remove-item="removeItem"
          :can-add="innerValue.length < maxItems"
          :can-remove="innerValue.length > minItems"
          :mode="actionMode"
        >
        </slot>
      </div>
      <div v-if="actionMode === 'compact' && innerValue.length > minItems && showRemoveButton" class="compact-remove-btn">
        <q-btn icon="close" flat round dense color="grey" size="sm" @click="removeItem(index)" />
      </div>
    </div>
    <div v-if="actionMode === 'compact'" class="list-footer-actions">
      <slot name="list-footer-actions" :add-item="addItem" :can-add="innerValue.length < maxItems && showAddButton" :next-index="innerValue.length">
        <j-q-button v-if="innerValue.length < maxItems && showAddButton" :label="t('action.addNewItem')" type="primary" @click="addItem(innerValue.length)" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, type SlotsType } from 'vue';
import { QBtn } from 'quasar';
import { useI18n } from 'src/composables/useI18n.ts';

type TModelItem = any;
type TModelValue = TModelItem[];
type TActionMode = 'inline' | 'compact';

export default defineComponent({
  name: 'JCDuoListEditor',
  components: {
    QBtn,
  },
  props: {
    modelValue: {
      type: Array as PropType<TModelValue>,
      default: () => [{}],
    },
    defaultNewItem: { type: Object as PropType<TModelItem>, default: () => ({}) },
    minItems: { type: [String, Number] as PropType<number>, default: 1 },
    maxItems: { type: [String, Number] as PropType<number>, default: 5 },
    actionMode: {
      type: String as PropType<TActionMode>,
      default: 'inline',
      validator: (val: string) => ['inline', 'compact'].includes(val),
    },
    showAddButton: {
      type: Boolean,
      default: true,
    },
    showRemoveButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
  slots: Object as SlotsType<{
    'item-content': {
      item: TModelItem;
      index: number;
      updateItem: (index: number, newItem: TModelItem) => void;
      isLast: boolean;
      addItem: (index: number) => void;
      removeItem: (index: number) => void;
      canAdd: boolean;
      canRemove: boolean;
      mode: TActionMode;
    };
    'list-footer-actions': { addItem: (index: number) => void; canAdd: boolean; nextIndex: number };
  }>,
  setup(props, { emit }) {
    const { t } = useI18n();
    const innerValue = computed<TModelValue>({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val);
      },
    });

    // ... (getKey, updateItem, addItem, removeItem 逻辑保持不变)
    const getKey = (item: TModelItem, index: number) => {
      return item.id || item.key || index;
    };

    const updateItem = (index: number, newItem: TModelItem) => {
      const newValue = [...innerValue.value];

      if (typeof newItem === 'object' && !Array.isArray(newItem) && typeof newValue[index] === 'object' && !Array.isArray(newValue[index])) {
        newValue[index] = { ...newValue[index], ...newItem };
      } else {
        newValue[index] = newItem;
      }

      innerValue.value = newValue;
    };

    const addItem = (index: number) => {
      const newValue = [...innerValue.value];
      newValue.splice(index, 0, JSON.parse(JSON.stringify(props.defaultNewItem)));
      innerValue.value = newValue;
    };

    const removeItem = (index: number) => {
      if (innerValue.value.length <= props.minItems) return;

      const newValue = [...innerValue.value];
      newValue.splice(index, 1);
      innerValue.value = newValue;
    };

    return {
      innerValue,
      getKey,
      updateItem,
      addItem,
      removeItem,
      t,
    };
  },
});
</script>

<style lang="scss">
.list-item-row {
  position: relative;

  &:last-child {
    margin-bottom: 0 !important;
  }
}

.compact-item {
  border: 1px solid var(--j-color-grey-light);
  padding: 24px 32px 16px 16px;

  &.no-remove {
    padding: 16px;
  }

  border-radius: 4px;
}

.compact-remove-btn {
  position: absolute;
  top: 8px;
  right: 4px;
  z-index: 10;
}
</style>