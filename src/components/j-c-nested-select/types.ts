export interface NestedSelectOption {
  label: string;
  value: string | number;
  children?: NestedSelectOption[];
  parent?: NestedSelectOption;
}

export type NestedSelectModelValue = string | number | null | undefined;

export interface JCNestedSelectProps {
  clearable?: boolean;
  closeOnSelect?: boolean;
  customClass?: string;
  disable?: boolean;
  displayValueFn?: (value: NestedSelectModelValue, options: NestedSelectOption[]) => string;
  ellipsis?: boolean;
  label?: string;
  maxWidth?: string | number;
  modelValue?: NestedSelectModelValue;
  options: NestedSelectOption[];
  optionsOrigin?: NestedSelectOption[];
  popupContentClass?: string;
  readonly?: boolean;
  smInput?: boolean;
}

export interface JCNestedSelectEmits {
  (e: 'update:modelValue', value: NestedSelectModelValue): void;
  (e: 'change', value: NestedSelectModelValue): void;
}
