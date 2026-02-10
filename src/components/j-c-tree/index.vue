<template>
  <q-tree
    ref="main"
    v-model:ticked="computedValue"
    default-expand-all
    :label-key="optionLabel"
    :node-key="optionValue"
    :nodes="processedOptions"
    :tick-strategy="tickStrategy"
    :no-nodes-label="t('messages.noData')"
  >
    <template #default-header="scope">
      <j-c-tooltip-ellipsis 
        :content="scope.node[optionLabel]" 
        content-style="max-width: 300px;"
      />
    </template>
  </q-tree>
</template>
<script lang="ts">
import { QTree, type QTreeProps } from 'quasar';
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { useI18n } from 'src/composables/useI18n.ts';
import JCTooltipEllipsis from 'components/j-c-tooltip-ellipsis/index.vue';

type ModelValue = (string | number)[];
type Option = any;
type TickStrategy = QTreeProps['tickStrategy'];

export default defineComponent({
  name: 'JCTree',
  components: {
    JCTooltipEllipsis,
    QTree,
  },
  props: {
    modelValue: { type: Array as PropType<ModelValue> },
    multiple: { type: Boolean, default: false },
    options: { type: Array as PropType<Option[]>, default: () => [] },
    optionLabel: { type: String, default: 'label' },
    optionValue: { type: String, default: 'value' },
    tickStrategy: { type: String as PropType<TickStrategy>, default: 'strict' },
    leafOnly: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, expose }) {
    const mainRef = ref<InstanceType<typeof QTree> | null>(null);
    const { t } = useI18n();

    const innerValue = ref<ModelValue>(props.modelValue ?? []);
    const isStrictSingle = computed(() => props.tickStrategy === 'strict' && !props.multiple);

    // 处理 options，给父节点添加 noTick 属性
    const processedOptions = computed(() => {
      if (!props.leafOnly) return props.options;

      const processNodes = (nodes: Option[]): Option[] => {
        return nodes.map((node) => {
          const newNode = { ...node };

          // 如果节点有子节点，说明是父节点，设置 noTick 为 true
          if (node.children && node.children.length > 0) {
            newNode.noTick = true;
            newNode.children = processNodes(node.children);
          }

          return newNode;
        });
      };

      return processNodes(props.options);
    });

    const computedValue = computed<ModelValue>({
      get() {
        return props.modelValue ?? innerValue.value;
      },
      set(val) {
        let finalVal = val;

        if (isStrictSingle.value) {
          const valArray = Array.isArray(finalVal) ? finalVal : [];
          const lastItem = valArray.length > 0 ? valArray[valArray.length - 1] : undefined;
          finalVal = lastItem ? [lastItem] : [];
        }
        innerValue.value = finalVal;
        emit('update:modelValue', finalVal);
      },
    });

    watch(
      () => props.modelValue,
      (val) => {
        innerValue.value = val ?? [];
      }
    );

    expose({
      qTreeRef: mainRef,
    });

    return {
      t,
      mainRef,
      computedValue,
      processedOptions,
    };
  },
});
</script>