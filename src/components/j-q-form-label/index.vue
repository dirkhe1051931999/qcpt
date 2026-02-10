<template>
  <div class="j-q-form-label" :class="[directionClass, { required: required }]">
    <div v-if="showLabel" class="form-label" :class="[labelClass, { required: required }]">
      <div class="row items-center">
        {{ label }}
        <j-c-tooltip v-if="tip" :content="tip" placement="top">
          <q-icon name="app:question" size="14px" class="q-ml-xs" />
        </j-c-tooltip>
      </div>

      <slot name="label-hint"></slot>
    </div>
    <div class="form-content">
      <div class="form-value" :class="valueClass">
        <div class="form-value__inner">
          <slot></slot>
        </div>
      </div>
      <div class="form-item-detail-wrapper">
        <slot name="form-item-detail"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { PropType, SlotsType } from 'vue';
import { computed, defineComponent } from 'vue';
import { QIcon } from 'quasar';
import JCTooltip from '../j-c-tooltip/index.vue';

type VueClass = string | Record<string, boolean> | (string | Record<string, boolean>)[];

export default defineComponent({
  name: 'JQFormLabel',
  components: {
    QIcon,
    JCTooltip,
  },
  props: {
    label: { type: String },
    labelClass: { type: [String, Object, Array] as PropType<VueClass> },
    valueClass: { type: [String, Object, Array] as PropType<VueClass> },
    vertical: { type: Boolean, default: false },
    horizontal: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    tip: { type: String, default: '' },
  },
  slots: Object as SlotsType<{
    default: void;
    'label-hint': void;
    'form-item-detail': void;
    label: void;
  }>,
  setup(props, { slots }) {
    const showLabel = computed(() => {
      const hasContent = !!props.label || !!slots.label;
      if (props.horizontal) {
        return true;
      }
      return hasContent;
    });
    const directionClass = computed(() => {
      if (props.vertical) {
        return 'form-label--vertical';
      }
      if (props.horizontal) {
        return 'form-label--horizontal';
      }
      return 'form-label--vertical';
    });
    return {
      directionClass,
      showLabel,
      slots,
    };
  },
});
</script>

<style lang="scss">
@use './index';
</style>
