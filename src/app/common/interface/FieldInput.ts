import { FieldAttribute } from './FieldAttribute';
import { FormField } from './FormField';

export interface FieldInput {
  fieldId: number;
  formId: string;
  fieldType: string;
  attrId: number | undefined;
  title: string | undefined;
  value: string;
}
