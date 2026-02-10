<template>
  <q-item 
    clickable 
    @click="handleClick" 
    :have-children-arrow="!!(option.children && option.children.length > 0)"
    v-close-popup="!hasChildren && closeOnSelect"
  >
    <q-item-section>{{ option.label }}</q-item-section>
    <q-item-section side v-if="hasChildren">
      <q-icon name="app:navigation-arrow-right" size="16px" />
    </q-item-section>
    <q-menu anchor="top end" self="top start" v-if="hasChildren" fit styling-menu-option parent-tree>
      <q-list dense>
        <nested-menu-item v-for="child in option.children" :key="child.value" :option="child" :selected-value="selectedValue" :close-on-select="closeOnSelect" @select="handleSelect" />
      </q-list>
    </q-menu>
  </q-item>
</template>

<script lang="ts">
import { QItem, QItemSection, QIcon, QMenu, QList, ClosePopup } from 'quasar';
import { computed, defineComponent, PropType } from 'vue';
import type { NestedSelectOption } from './types';

type TModelValue = string | number | null | undefined;

export default defineComponent({
  name: 'NestedMenuItem',
  components: {
    QItem,
    QItemSection,
    QIcon,
    QMenu,
    QList,
  },
  directives: {
    ClosePopup,
  },
  props: {
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    option: {
      type: Object as PropType<NestedSelectOption>,
      required: true,
    },
    selectedValue: {
      type: [String, Number] as PropType<TModelValue>,
      default: null,
    },
  },
  emits: {
    select: (value: TModelValue) => true,
  },
  setup(props, { emit }) {
    const hasChildren = computed(() => {
      return props.option.children && props.option.children.length > 0;
    });

    const handleSelect = (value: TModelValue) => {
      emit('select', value);
    };

    const handleClick = () => {
      if (!hasChildren.value) {
        emit('select', props.option.value);
      }
    };

    return {
      hasChildren,
      handleClick,
      handleSelect,
    };
  },
});
</script>

<style lang="scss"></style>
