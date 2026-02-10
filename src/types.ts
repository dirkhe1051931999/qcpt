// Type definitions for jqTool
import type * as toolUtils from './utils/tool';
import type { val2Str, valSplit, dataCvSize, obj2Arr } from './components/j-q-dialog/form';
import type * as treeUtils from './components/j-c-tree/index';
import type { generateDownloadFileName, JQDownloadFile } from './components/j-q-file/download';
import type { formRules } from './components/j-q-dialog/index';
import type * as arrayUtils from './utils/helper/array';
import type * as domUtils from './utils/helper/dom';
import type * as numberUtils from './utils/helper/number';
import type * as objectUtils from './utils/helper/object';
import type * as perfUtils from './utils/helper/perf';
import type * as regexUtils from './utils/helper/regex';
import type * as stringUtils from './utils/helper/string';
import type * as urlUtils from './utils/helper/url';

export interface JQToolType extends Record<string, any> {
  // Top-level tree utils
  transformTreeUseLabelAndValue: typeof treeUtils.transformTreeUseLabelAndValue;
  // File utils
  JQDownloadFile: typeof JQDownloadFile;
  generateDownloadFileName: typeof generateDownloadFileName;
  // Form rules
  formRules: typeof formRules;
  // Array utils namespace
  array: typeof arrayUtils;
  // DOM utils namespace
  dom: typeof domUtils;
  // Form utils namespace
  formUtils: {
    val2Str: typeof val2Str;
    valSplit: typeof valSplit;
    dataCvSize: typeof dataCvSize;
    obj2Arr: typeof obj2Arr;
  };
  // Number utils namespace
  number: typeof numberUtils;
  // Object utils namespace
  object: typeof objectUtils;
  // Performance utils namespace
  perf: typeof perfUtils;
  // Regex utils namespace
  regex: typeof regexUtils;
  // String utils namespace
  string: typeof stringUtils;
  // Tree utils namespace
  treeUtils: typeof treeUtils;
  // URL utils namespace
  url: typeof urlUtils;
  // Tool utils (expanded)
  defaultFill: typeof toolUtils.defaultFill;
  formatSize: typeof toolUtils.formatSize;
  getUpperSize: typeof toolUtils.getUpperSize;
  defaultFormat: typeof toolUtils.defaultFormat;
  formatDate: typeof toolUtils.formatDate;
  defaultDateFormat: typeof toolUtils.defaultDateFormat;
  defaultDataFormat: typeof toolUtils.defaultDataFormat;
  defaultAutoDataFormat: typeof toolUtils.defaultAutoDataFormat;
}
