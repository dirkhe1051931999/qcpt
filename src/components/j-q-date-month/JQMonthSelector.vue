<template>
  <q-card class="j-q-month-selector" flat>
    <q-card-section
      class="month-selector__inner"
      :style="{ minWidth: yearPopupVisible ? '395px' : '320px', minHeight: yearPopupVisible ? '250px' : '290px', paddingBottom: yearPopupVisible ? '0px' : '16px' }"
    >
      <div class="month-year-nav">
        <q-btn dense flat icon="navigate_before" round style="font-size: 10px" @click="setYear(year - 1)" />
        <q-btn dense flat :label="String(year)" @click="openYearPopup" />
        <q-btn dense flat icon="navigate_next" round style="font-size: 10px" @click="setYear(year + 1)" />
      </div>
      <div v-if="yearPopupVisible" class="month-year-popup">
        <j-q-year-selector :model-value="yearDate" @update:model-value="handleYearUpdate" />
      </div>
      <div class="month-options-container">
        <Transition :name="computedOptionsContainerName">
          <j-q-month-list
            :key="year"
            :model-value="computedValue"
            :locale="locale"
            :option-disabled-fn="optionDisabledFn"
            :range="range"
            :range-start-value="rangeStartValue"
            :year="year"
            @pick="pick"
          />
        </Transition>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';
import { QBtn, QCard, QCardSection } from 'quasar';
import JQMonthList from './JQMonthList.vue';
import JQYearSelector from '../j-q-date-year/JQYearSelector.vue';

type TModelValue = any;
type TLocale = string | string[];
type TOptionDisabledFn = (optionValue: number, options: { rangeStartValue?: number }) => boolean;

export default defineComponent({
  name: 'JQMonthSelector',
  components: { QBtn, QCard, QCardSection, JQMonthList, JQYearSelector },
  props: {
    modelValue: { type: [String, Number, Object] as PropType<TModelValue> },
    locale: { type: [String, Array] as PropType<TLocale> },
    optionDisabledFn: { type: Function as PropType<TOptionDisabledFn> },
    range: { type: Boolean, default: void 0 },
  },
  emits: {
    'update:modelValue': (value: TModelValue) => true,
  },
  setup(props, { emit }) {
    const NOW = new Date();

    const innerValue = ref<TModelValue>(void 0);
    const computedValue = computed({
      get() {
        return props.modelValue ?? innerValue.value;
      },
      set(val) {
        emit('update:modelValue', val);
        innerValue.value = val;
      },
    });
    watch(
      () => props.modelValue,
      (val) => {
        innerValue.value = val;
      }
    );

    const year = ref(NOW.getFullYear());
    const yearDirection = ref<'l' | 'r' | undefined>(void 0);
    const yearPopupVisible = ref(false);

    const yearDate = computed(() => new Date(year.value, 0));

    const setYear = (newYear: number) => {
      if (year.value < newYear) {
        yearDirection.value = 'l';
      } else if (newYear < year.value) {
        yearDirection.value = 'r';
      }
      year.value = newYear;
      closeYearPopup();
    };

    const handleYearUpdate = (val: any) => {
      setYear(new Date(val).getFullYear());
    };

    const openYearPopup = () => {
      yearPopupVisible.value = true;
    };

    const closeYearPopup = () => {
      yearPopupVisible.value = false;
    };

    (() => {
      if (!computedValue.value) return;
      let initalVal = computedValue.value;
      if (props.range) {
        const { from } = computedValue.value;
        initalVal = from;
      }
      year.value = new Date(initalVal).getFullYear() || NOW.getFullYear();
    })();

    const computedOptionsContainerName = computed(() => {
      if (yearDirection.value) return `options-container-${yearDirection.value}`;
      return 'options-container';
    });

    const rangeStartValue = ref<number | undefined>(void 0);
    const pick = (value: number) => {
      let newValue: TModelValue = value;
      if (props.range) {
        if (!rangeStartValue.value) {
          rangeStartValue.value = value;
          return;
        }
        newValue = { from: Math.min(rangeStartValue.value, value), to: Math.max(rangeStartValue.value, value) };
        rangeStartValue.value = void 0;
      }
      computedValue.value = newValue;
    };

    return {
      computedValue,
      year,
      yearDate,
      yearPopupVisible,
      computedOptionsContainerName,
      rangeStartValue,
      setYear,
      handleYearUpdate,
      openYearPopup,
      closeYearPopup,
      pick,
    };
  },
});
</script>
