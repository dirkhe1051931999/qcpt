<template>
  <q-field
    class="j-q-date-month"
    :class="{
      'j-q-date-month--table': label,
      'j-q-date-month--form': !label,
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
      <div class="month-picker-value-display">
        <slot name="value-display">{{ computedValueDisplay }}</slot>
      </div>
    </template>
    <template #append>
      <q-icon v-if="computedValue && clearable && !computedDisabled" name="app:clear" class="cursor-pointer q-field__focusable-action" @click.stop.prevent="computedValue = void 0" size="16px" />
    </template>
    <q-popup-proxy v-model="popupVisible">
      <j-q-month-selector v-model="computedValue" v-bind="monthProps" />
    </q-popup-proxy>
  </q-field>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';
import type { QFieldProps } from 'quasar';
import { QField, QIcon, QPopupProxy } from 'quasar';
import { useI18n } from 'src/composables/useI18n.ts';
import JQMonthSelector from './JQMonthSelector.vue';

type TModelValue = any;
type TLocale = string | string[];
type TValueDisplayFn = (value: TModelValue) => any;
type TOptionDisabledFn = (optionValue: number, options: { rangeStartValue?: number }) => boolean;

export default defineComponent({
  name: 'JQDateMonth',
  components: { QField, QIcon, QPopupProxy, JQMonthSelector },
  props: {
    modelValue: { type: [String, Number, Object] as PropType<TModelValue> },
    clearable: { type: Boolean, default: true },
    dense: { type: Boolean as PropType<QFieldProps['dense']>, default: true },
    disable: { type: Boolean as PropType<QFieldProps['disable']> },
    label: { type: String as PropType<QFieldProps['label']> },
    locale: { type: [String, Array] as PropType<TLocale> },
    optionDisabledFn: { type: Function as PropType<TOptionDisabledFn> },
    outlined: { type: Boolean as PropType<QFieldProps['outlined']>, default: true },
    range: { type: Boolean, default: void 0 },
    rules: { type: Array as () => QFieldProps['rules'] },
    valueDisplayFn: { type: Function as PropType<TValueDisplayFn> },
  },
  emits: {
    'update:modelValue': (value: TModelValue) => true,
  },
  setup(props, { emit }) {
    const { t, locale: i18nLocale } = useI18n();

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

    const computedValueDisplayFormatter = computed(() => {
      const locale = props.locale || i18nLocale.value;
      return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'numeric' });
    });
    const computedValueDisplay = computed(() => {
      if (props.valueDisplayFn) return props.valueDisplayFn(computedValue.value);
      if (!computedValue.value) return computedValue.value;
      try {
        if (props.range) {
          const { from, to } = computedValue.value;
          const fromStr = computedValueDisplayFormatter.value.format(new Date(from));
          const toStr = computedValueDisplayFormatter.value.format(new Date(to));
          return `${fromStr} - ${toStr}`;
        }
        return computedValueDisplayFormatter.value.format(new Date(computedValue.value));
      } catch (error) {
        return computedValue.value;
      }
    });

    const popupVisible = ref(false);

    const monthProps = computed(() => ({
      locale: props.locale,
      optionDisabledFn: props.optionDisabledFn,
      range: props.range,
    }));

    return {
      t,
      computedValue,
      computedDisabled,
      computedValueDisplay,
      popupVisible,
      monthProps,
    };
  },
});
</script>

<style lang="scss">
@use './index.scss';
</style>
