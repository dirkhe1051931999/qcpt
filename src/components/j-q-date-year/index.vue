<template>
  <q-field
    class="j-q-date-year"
    :class="{
      'j-q-date-year--table': label,
      'j-q-date-year--form': !label,
    }"
    v-model="computedValue"
    :dense="dense"
    :disable="computedDisabled"
    :label="label"
    :outlined="outlined"
    :rules="rules"
    :title="computedValueDisplay"
  >
    <div class="float-placeholder" v-show="!computedValueDisplay && !label">
      {{ t('messages.pleaseSelect') }}
    </div>
    <template #control>
      <div class="year-picker-value-display">
        <slot name="value-display">{{ computedValueDisplay }}</slot>
      </div>
    </template>
    <template #append>
      <q-icon
        v-if="computedValue && clearable && !computedDisabled"
        name="app:clear"
        class="cursor-pointer q-field__focusable-action"
        @click.stop.prevent="computedValue = void 0"
        size="16px"
        color="grey"
      />
    </template>
    <q-popup-proxy v-model="popupVisible">
      <j-q-year-selector v-model="computedValue" v-bind="yearProps" />
    </q-popup-proxy>
  </q-field>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';
import type { QFieldProps } from 'quasar';
import { QField, QIcon, QPopupProxy } from 'quasar';
import { useI18n } from 'src/composables/useI18n.ts';
import JQYearSelector from './JQYearSelector.vue';

type TModelValue = any;
type TValueDisplayFn = (value: TModelValue) => any;

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
  name: 'JQDateYear',
  components: { QField, QIcon, QPopupProxy, JQYearSelector },
  props: {
    modelValue: { type: [String, Number, Object, Date] as PropType<TModelValue> },
    clearable: { type: Boolean, default: true },
    dense: { type: Boolean as PropType<QFieldProps['dense']>, default: true },
    disable: { type: Boolean as PropType<QFieldProps['disable']> },
    label: { type: String as PropType<QFieldProps['label']> },
    outlined: { type: Boolean as PropType<QFieldProps['outlined']>, default: true },
    rules: { type: Array as () => QFieldProps['rules'] },
    valueDisplayFn: { type: Function as PropType<TValueDisplayFn> },
  },
  emits: {
    'update:modelValue': (value: TModelValue) => true,
  },
  setup(props, { emit }) {
    const { t } = useI18n();

    const innerValue = ref<TModelValue>(void 0);
    const computedValue = computed({
      get() {
        return props.modelValue ?? innerValue.value;
      },
      set(val) {
        emit('update:modelValue', val);
        innerValue.value = val;
        val && (popupVisible.value = false);
      },
    });
    watch(
      () => props.modelValue,
      (val) => {
        innerValue.value = val;
      }
    );

    const computedDisabled = computed(() => props.disable);

    const computedValueDisplay = computed(() => {
      if (props.valueDisplayFn) return props.valueDisplayFn(computedValue.value);
      if (!computedValue.value) return computedValue.value;
      try {
        const dateValue = toDate(computedValue.value);
        if (dateValue) {
          return dateValue.getFullYear().toString();
        }
        return computedValue.value;
      } catch (error) {
        return computedValue.value;
      }
    });

    const popupVisible = ref(false);

    const yearProps = computed(() => ({}));

    return {
      t,
      computedValue,
      computedDisabled,
      computedValueDisplay,
      popupVisible,
      yearProps,
    };
  },
});
</script>

<style lang="scss">
@use './index.scss';
</style>