<template>
  <ul class="j-q-month-list">
    <li
      v-for="monthItem in computedMonthItems"
      :key="`${monthItem.YYYY}-${monthItem.MI}`"
      class="month-item"
      :class="{
        'month-item--ranging-from': isItemRangingFrom(monthItem),
        'month-item--ranging-in': isItemRangingIn(monthItem),
        'month-item--ranging-to': isItemRangingTo(monthItem),
        'month-item--active': isItemActive(monthItem),
        'month-item--active-from': isItemActiveFrom(monthItem),
        'month-item--active-in': isItemActiveIn(monthItem),
        'month-item--active-to': isItemActiveTo(monthItem),
      }"
      @mouseenter="strokeItem($event, monthItem)"
    >
      <q-btn
        class="month-handler"
        :color="isItemRanging(monthItem) || isItemActive(monthItem) ? 'primary' : void 0"
        :disable="isItemDisabled(monthItem)"
        :flat="!isItemActive(monthItem)"
        unelevated
        @click="pickItem(monthItem)"
      >
        {{ itemValueDisplayFormatter.format(new Date(monthItem.YYYY, monthItem.MI)) }}
      </q-btn>
    </li>
  </ul>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import { QBtn } from 'quasar';
import { useI18n } from 'src/composables/useI18n.ts';

type TModelValue = any;
type TOptionDisabledFn = (optionValue: number, options: { rangeStartValue?: number }) => boolean;
type TLocale = string | string[];

export interface IMonthItem {
  MI: number;
  YYYY: number;
}

export default defineComponent({
  name: 'JQMonthList',
  components: { QBtn },
  props: {
    modelValue: { type: [String, Number, Object] as PropType<TModelValue> },
    locale: { type: [String, Array] as PropType<TLocale> },
    optionDisabledFn: { type: Function as PropType<TOptionDisabledFn> },
    range: { type: Boolean, default: void 0 },
    rangeStartValue: { type: Number, default: void 0 },
    year: { type: Number, required: true },
  },
  emits: {
    pick: (value: number) => true,
  },
  setup(props, { emit }) {
    const { locale: i18nLocale } = useI18n();

    const computedMonthItems = computed<IMonthItem[]>(() => {
      return new Array(12).fill(0).map((_value, index) => {
        return { YYYY: props.year, MI: index };
      });
    });

    const itemValueDisplayFormatter = computed(() => {
      const locale = props.locale || i18nLocale.value;
      return new Intl.DateTimeFormat(locale, { month: 'short' });
    });

    const strokingValue = ref<number | undefined>(void 0);
    const computedRangingValue = computed(() => {
      if (!props.range || !props.rangeStartValue || !strokingValue.value) return;
      return { from: Math.min(props.rangeStartValue, strokingValue.value), to: Math.max(props.rangeStartValue, strokingValue.value) };
    });

    const strokeItem = (e: Event, monthItem: IMonthItem) => {
      const { YYYY, MI } = monthItem;
      strokingValue.value = new Date(YYYY, MI).getTime();
    };

    const isItemRangingFrom = (monthItem: IMonthItem) => {
      if (!computedRangingValue.value) return false;
      const { YYYY, MI } = monthItem;
      return new Date(YYYY, MI).getTime() === computedRangingValue.value.from;
    };

    const isItemRangingIn = (monthItem: IMonthItem) => {
      if (!computedRangingValue.value) return false;
      const { YYYY, MI } = monthItem;
      const date = new Date(YYYY, MI).getTime();
      return computedRangingValue.value.from < date && date < computedRangingValue.value.to;
    };

    const isItemRangingTo = (monthItem: IMonthItem) => {
      if (!computedRangingValue.value) return false;
      const { YYYY, MI } = monthItem;
      return new Date(YYYY, MI).getTime() === computedRangingValue.value.to;
    };

    const isItemRanging = (monthItem: IMonthItem) => {
      return isItemRangingFrom(monthItem) || isItemRangingIn(monthItem) || isItemRangingTo(monthItem);
    };

    const isItemDisabled = (monthItem: IMonthItem) => {
      const { YYYY, MI } = monthItem;
      return props.optionDisabledFn?.(new Date(YYYY, MI).getTime(), { rangeStartValue: props.rangeStartValue });
    };

    const pickItem = (monthItem: IMonthItem) => {
      const { YYYY, MI } = monthItem;
      emit('pick', new Date(YYYY, MI).getTime());
    };

    const isItemActiveFrom = (monthItem: IMonthItem) => {
      if (!props.modelValue) return false;
      if (!props.range) return false;
      const fromDate = new Date(props.modelValue.from);
      const { YYYY, MI } = monthItem;
      return fromDate.getFullYear() === YYYY && fromDate.getMonth() === MI;
    };

    const isItemActiveIn = (monthItem: IMonthItem) => {
      if (!props.modelValue) return false;
      if (!props.range) return false;
      const { from, to } = props.modelValue;
      const { YYYY, MI } = monthItem;
      const itemTs = new Date(YYYY, MI).getTime();
      return new Date(from).getTime() < itemTs && itemTs < new Date(to).getTime();
    };

    const isItemActiveTo = (monthItem: IMonthItem) => {
      if (!props.modelValue) return false;
      if (!props.range) return false;
      const toDate = new Date(props.modelValue.to);
      const { YYYY, MI } = monthItem;
      return toDate.getFullYear() === YYYY && toDate.getMonth() === MI;
    };

    const isItemActive = (monthItem: IMonthItem) => {
      if (!props.modelValue) return false;
      if (props.range) return isItemActiveFrom(monthItem) || isItemActiveTo(monthItem);
      const valueDate = new Date(props.modelValue);
      const { YYYY, MI } = monthItem;
      return valueDate.getFullYear() === YYYY && valueDate.getMonth() === MI;
    };

    return {
      computedMonthItems,
      itemValueDisplayFormatter,
      strokeItem,
      isItemRangingFrom,
      isItemRangingIn,
      isItemRangingTo,
      isItemRanging,
      isItemDisabled,
      pickItem,
      isItemActiveFrom,
      isItemActiveIn,
      isItemActiveTo,
      isItemActive,
    };
  },
});
</script>
