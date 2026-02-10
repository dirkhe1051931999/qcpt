<template>
  <q-card class="j-q-year-selector" flat>
    <q-card-section class="year-selector__inner">
      <div class="year-nav">
        <q-btn dense :disable="intervalStart <= MIN_INTERVAL_START" flat icon="navigate_before" round @click="setInterval(intervalStart - INTERVAL_DELTA)" />
        <div class="year-year-container">
          <Transition :name="computedYearContainerTransitionName">
            <j-q-year-list :key="computedIntervalStart" :interval-start-year="computedIntervalStart" :model-value="computedValue" @update:model-value="computedValue = $event" />
          </Transition>
        </div>
        <q-btn dense :disable="MAX_INTERVAL_START <= intervalStart" flat icon="navigate_next" round @click="setInterval(intervalStart + INTERVAL_DELTA)" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';
import { QBtn, QCard, QCardSection } from 'quasar';
import JQYearList from './JQYearList.vue';

type TModelValue = any;

const MIN_INTERVAL_START = 1900;
const MAX_INTERVAL_START = 275740;
const INTERVAL_DELTA = 20;

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
  name: 'JQYearSelector',
  components: { QBtn, QCard, QCardSection, JQYearList },
  props: {
    modelValue: { type: [String, Number, Object, Array, Date] as PropType<TModelValue> },
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

    const computedYearValue = computed(() => {
      const dateValue = toDate(computedValue.value);
      return dateValue?.getFullYear();
    });

    const intervalStart = ref(MIN_INTERVAL_START + INTERVAL_DELTA * ((((computedYearValue.value ?? NOW.getFullYear()) - MIN_INTERVAL_START) / INTERVAL_DELTA) | 0));

    const computedIntervalStart = computed({
      get() {
        return Math.min(Math.max(MIN_INTERVAL_START, intervalStart.value), MAX_INTERVAL_START);
      },
      set(val) {
        intervalStart.value = val;
      },
    });

    const yearDirection = ref<'l' | 'r' | undefined>(void 0);

    const setInterval = (newIntervalStartYear: number) => {
      if (intervalStart.value < newIntervalStartYear) {
        yearDirection.value = 'l';
      } else if (newIntervalStartYear < intervalStart.value) {
        yearDirection.value = 'r';
      }
      intervalStart.value = newIntervalStartYear;
    };

    const computedYearContainerTransitionName = computed(() => {
      if (yearDirection.value) return `year-container-${yearDirection.value}`;
      return 'year-container';
    });

    return {
      MIN_INTERVAL_START,
      MAX_INTERVAL_START,
      INTERVAL_DELTA,
      computedValue,
      intervalStart,
      computedIntervalStart,
      computedYearContainerTransitionName,
      setInterval,
    };
  },
});
</script>
