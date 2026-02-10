// ============ Components ============
// j-c series
import JCCopy from './components/j-c-copy/index.vue';
import JCDuoListEditor from './components/j-c-duo-list-editor/index.vue';
import JCEditableProxy from './components/j-c-editable-proxy/index.vue';
import JCFallback from './components/j-c-fallback/index.vue';
import JCFoldableList from './components/j-c-foldable-list/index.vue';
import JCFormatLookup from './components/j-c-format-lookup/index.vue';
import JCListEditor from './components/j-c-list-editor/index.vue';
import JCMoreMenu from './components/j-c-more-menu/index.vue';
import JCNestedSelect from './components/j-c-nested-select/index.vue';
import JCPermission from './components/j-c-permission/index.vue';
import JCTable from './components/j-c-table/index.vue';
import JCTabs from './components/j-c-tabs/index.vue';
import JCTitleLine from './components/j-c-title-line/index.vue';
import JCTooltip from './components/j-c-tooltip/index.vue';
import JCTooltipEllipsis from './components/j-c-tooltip-ellipsis/index.vue';
import JCTree from './components/j-c-tree/index.vue';
import JCTreeSelect from './components/j-c-tree-select/index.vue';

// j-ch series (Charts) - 从独立入口导入
export { JChBar, JChBarLine, JChBubble, JChLine, JChPieDoughnut, JChRadar } from './charts';

// j-q series (Quasar)
import JQAutocomplete from './components/j-q-autocomplete/index.vue';
import JQButtonDropdown from './components/j-q-button-dropdown/index.vue';
import JQConfirm from './components/j-q-confirm/index.vue';
import JQDate from './components/j-q-date/index.vue';
import JQDatetime from './components/j-q-datetime/index.vue';
import JQDateMonth from './components/j-q-date-month/index.vue';
import JQDateYear from './components/j-q-date-year/index.vue';
import JQDetailList from './components/j-q-detail-list/index.vue';
import JQDialog from './components/j-q-dialog/index.vue';
import JQFile from './components/j-q-file/index.vue';
import JQFormLabel from './components/j-q-form-label/index.vue';
import JQInput from './components/j-q-input/index.vue';
import JQInputRecognize from './components/j-q-input-recognize/index.vue';
import JQNewValue from './components/j-q-new-value/index.vue';
import JQOptionGroup from './components/j-q-option-group/index.vue';
import JQPopover from './components/j-q-popover/index.vue';
import JQSearchForm from './components/j-q-search-form/index.vue';
import JQSelect from './components/j-q-select/index.vue';
import JQTable from './components/j-q-table/index.vue';
import JQTooltip from './components/j-q-tooltip/index.vue';
import JQMessage from './components/j-q-message/index.ts';
import JQConfirmDialog from 'components/j-q-confirm-dialog/index.ts';
import JQButton from './components/j-q-button/index.vue';
import JQPagination from './components/j-q-pagination/index.vue';
// Import all utility functions
import { transformTreeUseLabelAndValue } from 'components/j-c-tree';
import { generateDownloadFileName, JQDownloadFile } from './components/j-q-file/download';
import * as toolUtils from './utils/tool';
import * as treeUtils from './components/j-c-tree';
import { formRules } from 'components/j-q-dialog/index.ts';
import * as formUtils from './components/j-q-dialog/form';
import * as arrayUtils from './utils/helper/array';
import * as domUtils from './utils/helper/dom';
import * as numberUtils from './utils/helper/number';
import * as objectUtils from './utils/helper/object';
import * as perfUtils from './utils/helper/perf';
import * as regexUtils from './utils/helper/regex';
import * as stringUtils from './utils/helper/string';
import * as urlUtils from './utils/helper/url';
import type { JQToolType } from './types';

// ============ Utilities & Services ============
export { DialogProvider } from './components/j-q-dialog/index';
export type { JQDialogRegisterProps, TextInputConfig, TextareaInputConfig, SelectInputConfig, DialogType, DialogPosition } from './components/j-q-dialog/index';
export { qcptInit } from './utils/init';
export type { QcptInitOptions, ColorConfig } from './utils/init';
export { qcptIconMapFn, composeIconMapFn } from './utils/icon-map';
export type { IconMapFn } from './utils/icon-map';
export { usePagePermissionSync, usePageActionPermissionSync } from './utils/storageSync';

// Export permission injection key
export { PAGE_PERMISSION_KEY, PAGE_ACTION_PERMISSION_KEY } from './components/j-c-permission/index.vue';

// Export j-c-nested-select types
export type { NestedSelectOption, NestedSelectModelValue, JCNestedSelectProps, JCNestedSelectEmits } from './components/j-c-nested-select/types';

// Export j-c-table types
export type { JCTableColumn, JCTableProps } from './components/j-c-table/types';

// Export j-c-tooltip types
export type { TooltipPlacement, TooltipEffect, TooltipTrigger, TooltipProps } from './components/j-c-tooltip/types';

// Export j-c-tooltip-ellipsis types
export type {
  JCTooltipEllipsisProps,
  JCTooltipEllipsisSlots,
  JCTooltipEllipsisComponent,
  JCTooltipEllipsisInstance
} from './components/j-c-tooltip-ellipsis/types';

// Export j-q-button types
export type { 
  JQButtonSize,
  JQButtonType,
  JQButtonSizeType,
  JQButtonTypeType,
  JQButtonProps,
  JQButtonEmits,
  JQButtonSlots,
  JQButtonExpose,
  JQButtonAllProps,
  JQButtonEmitsOptions,
  JQButtonComponent,
  JQButtonInstance,
  JQButtonTemplateProps
} from './components/j-q-button/types';

// Export j-q-button-dropdown types
export type {
  JQButtonDropdownSize,
  JQButtonDropdownType,
  JQButtonDropdownSizeType,
  JQButtonDropdownTypeType,
  JQButtonDropdownItem,
  JQButtonDropdownProps,
  JQButtonDropdownEmits,
  JQButtonDropdownSlots,
  JQButtonDropdownExpose,
  JQButtonDropdownAllProps,
  JQButtonDropdownEmitsOptions,
  JQButtonDropdownComponent,
  JQButtonDropdownInstance
} from './components/j-q-button-dropdown/types';

// Export j-q-confirm types
export type { 
  JQConfirmProps,
  JQConfirmEmits,
  JQConfirmSlots,
  JQConfirmExpose,
  JQConfirmEmitsOptions,
  JQConfirmComponent,
  JQConfirmInstance,
  JQConfirmTemplateProps
} from './components/j-q-confirm/types';

// Export j-q-confirm-dialog types
export type { 
  JQConfirmDialogShowParams,
  IJQConfirmDialog,
  ShowParams,
  IGlobalConfirm
} from './components/j-q-confirm-dialog/types';

// Export formUtils separately for direct access
export { formUtils };

// Export treeUtils separately for direct access
export { treeUtils };

// Export JQToolType for external use
export type { JQToolType };

// Export as jqTool namespace with proper typing
export const jqTool: JQToolType = {
  transformTreeUseLabelAndValue,
  JQDownloadFile,
  generateDownloadFileName,
  ...toolUtils,
  formRules,
  array: arrayUtils,
  dom: domUtils,
  formUtils,
  number: numberUtils,
  object: objectUtils,
  perf: perfUtils,
  regex: regexUtils,
  string: stringUtils,
  treeUtils,
  url: urlUtils,
};

// ============ i18n ============
export { useI18n, setLocale, getLocale } from './composables/useI18n';
export { t } from './composables/useI18n';
export type { Locale } from './i18n';

// ============ Components Export ============
export {
  JQMessage,
  JQConfirmDialog,
  // j-c series
  JCCopy,
  JCDuoListEditor,
  JCEditableProxy,
  JCFallback,
  JCFoldableList,
  JCFormatLookup,
  JCListEditor,
  JCMoreMenu,
  JCNestedSelect,
  JCPermission,
  JCTable,
  JCTabs,
  JCTitleLine,
  JCTooltip,
  JCTooltipEllipsis,
  JCTree,
  JCTreeSelect,
  // j-q series
  JQAutocomplete,
  JQConfirm,
  JQDate,
  JQDatetime,
  JQDateMonth,
  JQDateYear,
  JQDetailList,
  JQDialog,
  JQFile,
  JQFormLabel,
  JQInput,
  JQInputRecognize,
  JQNewValue,
  JQOptionGroup,
  JQPopover,
  JQSearchForm,
  JQSelect,
  JQTable,
  JQPagination,
  JQTooltip,
  JQButton,
  JQButtonDropdown,
};

// 注意: j-ch 图表组件已从 './charts' 导出，可以按需导入
