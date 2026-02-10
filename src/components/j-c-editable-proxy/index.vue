<template>
  <div class="row items-end no-wrap jc-editable-proxy">
    <div class="q-pr-sm display-value">
      <slot name="display">
        <span>{{ modelValue }}</span>
      </slot>
    </div>
    <j-c-permission :code="code" :rm-dom="true">
      <q-icon name="app:edit" class="cursor-pointer" :size="iconSize" :style="iconStyle">
        <q-popup-proxy ref="popupRef" transition-show="jump-down" transition-hide="jump-up" :breakpoint="400" @show="handleProxyShow">
          <q-card :style="{ width: popupWidth }">
            <q-card-section class="q-pt-md q-px-md q-pb-none">
              <slot name="editor" :temp-value="tempValue" :update-temp-value="updateTempValue" :set-editor-ref="setEditorRef" />
            </q-card-section>
            <q-card-actions align="right" class="q-pb-md q-px-md" :class="{ 'q-pt-none': noSpacing || (autoDetect ? hasDetectedRules : required), 'q-pt-md': !noSpacing && (autoDetect ? !hasDetectedRules : !required) }">
              <j-q-button :label="t('action.confirm')" @click="handleSave" :loading="saveLoading" />
            </q-card-actions>
          </q-card>
        </q-popup-proxy>
      </q-icon>
    </j-c-permission>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, type SlotsType, watch } from 'vue';
import { QCard, QCardActions, QCardSection, QIcon, QPopupProxy } from 'quasar';
import JCPermission from '../j-c-permission/index.vue';
import { useI18n } from '../../composables/useI18n';
import JQButton from 'components/j-q-button/index.vue';

type ModelValueType = any;

export interface QInputRef {
  validate: () => boolean;
  resetValidation: () => void;
}

export default defineComponent({
  name: 'JCEditableProxy',
  components: {
    JCPermission,
    QPopupProxy,
    QIcon,
    QCard,
    QCardSection,
    QCardActions,
    JQButton,
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: null as unknown as PropType<ModelValueType>,
      default: null,
    },
    iconSize: {
      type: String,
      default: '18px',
    },
    popupWidth: {
      type: String,
      default: '300px',
    },
    code: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: true,
    },
    noSpacing: {
      type: Boolean,
      default: false,
    },
    autoDetect: {
      type: Boolean,
      default: true,
    },
    iconStyle: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'saved', 'confirm'],
  slots: Object as SlotsType<{
    display: void;
    editor: {
      tempValue: ModelValueType;
      updateTempValue: (val: ModelValueType) => void;
      setEditorRef: (ref: QInputRef | null) => void;
    };
  }>,
  setup(props, { emit }) {
    const { t } = useI18n();
    const popupRef = ref<InstanceType<typeof QPopupProxy> | null>(null);
    const tempValue = ref<ModelValueType>(props.modelValue);
    const editorRef = ref<QInputRef | null>(null);
    const saveLoading = ref(false);

    const updateTempValue = (val: ModelValueType) => {
      tempValue.value = val;
    };

    watch(
      () => props.modelValue,
      (newVal) => {
        tempValue.value = newVal;
      },
      { immediate: true }
    );

    const handleProxyShow = () => {
      tempValue.value = props.modelValue ?? '';
    };

    interface DoneOptions {
      success?: boolean;
      close?: boolean;
      resetValue?: boolean;
    }

    const handleSave = async () => {
      let validationPassed = true;

      if (editorRef.value && typeof editorRef.value.validate === 'function') {
        validationPassed = editorRef.value.validate();
      }

      if (!validationPassed) {
        return;
      }
      if (tempValue.value !== props.modelValue) {
        saveLoading.value = true;
        const done = (options: DoneOptions = {}) => {
          const { success = true, close = success, resetValue = !success } = options;
          saveLoading.value = false;
          if (success) {
            handleSuccessfulSave();
            return;
          }
          if (resetValue) {
            tempValue.value = props.modelValue ?? '';
            editorRef.value?.resetValidation?.();
          }
          if (close) {
            popupRef.value?.hide();
          }
        };
        emit('confirm', tempValue.value, done);
        return;
      }

      popupRef.value?.hide();
    };

    const hasDetectedRules = ref(false);

    const setEditorRef = (refInstance: QInputRef | null) => {
      editorRef.value = refInstance;
      
      // 自动检测是否有 rules（仅当 autoDetect 开启时）
      if (props.autoDetect && refInstance) {
        const el = refInstance as any;
        
        // 多种方式检测 Quasar 表单组件的 rules 属性
        const rulesArray = 
          el.$props?.rules ||  // Vue 3 组件实例的 props
          el.$attrs?.rules ||  // attrs 传递的 rules
          el.rules;            // 直接访问 rules
        
        if (Array.isArray(rulesArray) && rulesArray.length > 0) {
          hasDetectedRules.value = true;
        } else {
          hasDetectedRules.value = false;
        }
      }
    };

    const handleSuccessfulSave = () => {
      emit('update:modelValue', tempValue.value);
      emit('saved', tempValue.value);

      popupRef.value?.hide();
    };

    return {
      t,
      hasDetectedRules,
      saveLoading,
      popupRef,
      tempValue,
      updateTempValue,
      handleProxyShow,
      handleSave,
      editorRef,
      setEditorRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.jc-editable-proxy {
  display: inline-flex;

  .display-value {
    word-break: break-all;
  }
}
</style>