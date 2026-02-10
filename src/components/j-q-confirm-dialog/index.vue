<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" transition-show="jump-up" transition-hide="jump-down" persistent>
    <q-card class="jq-confirm-dialog">
      <q-card-section class="row items-center no-wrap title-section">
        <template v-if="icon">
          <q-icon v-if="isIconString" :name="icon as string" class="q-mr-sm" size="24px" />
          <component v-else :is="icon" class="q-mr-sm" />
        </template>
        <q-icon v-else-if="isDelete" name="app:delete-confirm" class="q-mr-sm" size="24px" />
        <div class="title">{{ title }}</div>
        <div class="close" v-if="showClose">
          <q-icon name="app:dialog-close" size="16px" class="icon" @click="onCloseClick"></q-icon>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none content-section" v-html="content"> </q-card-section>
      <q-card-section class="row q-gutter-sm justify-end footer-section">
        <j-q-button :label="computedCancelText" @click="onCancelClick" type="secondary" v-if="cancel" style="min-width: 80px" />
        <j-q-button :color="computedButtonColor" :label="computedConfirmText" @click="onOKClick" type="primary" style="min-width: 80px" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { QCard, QCardSection, QDialog, QIcon, useDialogPluginComponent } from 'quasar';
import JQButton from 'components/j-q-button/index.vue';
import { useI18n } from 'src/composables/useI18n.ts';
import type { PropType, VNode, Component as VueComponent } from 'vue';

export default defineComponent({
  name: 'dialogConfirmComponent',
  components: {
    QDialog,
    QCard,
    QCardSection,
    QIcon,
    JQButton,
  },
  emits: [...useDialogPluginComponent.emits],
  props: {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    confirmButtonText: { type: String, default: '' },
    cancelButtonText: { type: String, default: '' },
    cancel: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
    color: { type: String, default: '' },
    icon: { type: [String, Object] as PropType<string | VNode | VueComponent>, default: null },
    showClose: { type: Boolean, default: true },
  },
  setup(props) {
    const { t } = useI18n();
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const computedConfirmText = computed(() => {
      return props.confirmButtonText || t('action.confirm');
    });
    const computedCancelText = computed(() => {
      return props.cancelButtonText || t('action.cancel');
    });
    const computedButtonColor = computed(() => {
      return props.color || (props.isDelete ? 'negative' : 'primary');
    });
    const isIconString = computed(() => typeof props.icon === 'string');

    const onCloseClick = () => {
      onDialogCancel();
    };

    return {
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK();
      },
      onCancelClick: onDialogCancel,
      computedCancelText,
      computedConfirmText,
      computedButtonColor,
      isIconString,
      onCloseClick,
    };
  },
});
</script>
<style lang="scss">
.jq-confirm-dialog {
  width: 480px;
  border-radius: 12px !important;

  .title-section {
    padding: 24px 24px 8px;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    display: inline-flex;
    line-height: 24px;
  }

  .close {
    margin-left: auto;
    padding: 2px 4px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background: var(--my-grey-1);
    }
  }

  .content-section {
    padding: 24px;
    font-size: 14px;
    line-height: 21px;
  }

  .footer-section {
    padding: 8px 24px 24px;
  }
}
</style>