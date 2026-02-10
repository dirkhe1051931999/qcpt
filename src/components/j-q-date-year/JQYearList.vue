<template>
  <ul class="j-q-year-list">
    <li
      v-for="yearItem in computedYearItems"
      :key="yearItem"
      class="year-item"
      :class="{
        'year-item--active': isItemActive(yearItem),
      }"
    >
      <q-btn class="year-handler" :color="isItemActive(yearItem) ? 'primary' : void 0" :flat="!isItemActive(yearItem)" unelevated @click="pickItem(yearItem)">
        {{ yearItem }}
      </q-btn>
    </li>
  </ul>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import { QBtn } from 'quasar';

type TModelValue = any;

const toDate = (value: any): Date | null => {
  if (value === null || typeof value === 'undefined') return null;
  if (value instanceof Date) return value;
  if (typeof value === 'number') return new Date(value);
  if (typeof value === 'string') {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
};

export default defineComponent({
  name: 'JQYearList',
  components: { QBtn },
  props: {
    intervalStartYear: { type: Number, required: true },
    modelValue: { type: [String, Number, Object, Array, Date] as PropType<TModelValue> },
  },
  emits: {
    'update:modelValue': (value: TModelValue) => true,
  },
  setup(props, { emit }) {
    const computedYearItems = computed(() => {
      return new Array(20).fill(0).map((_value, index) => props.intervalStartYear + index);
    });

    const isItemActive = (yearItem: number) => {
      if (!props.modelValue) return false;
      const dateValue = toDate(props.modelValue);
      return dateValue?.getFullYear() === yearItem;
    };

    const pickItem = (yearItem: number) => {
      emit('update:modelValue', new Date(yearItem, 0));
    };

    return {
      computedYearItems,
      isItemActive,
      pickItem,
    };
  },
});
</script>
