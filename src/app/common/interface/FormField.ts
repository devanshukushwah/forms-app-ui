import { FieldAttribute } from './FieldAttribute';

export interface FormField {
  fieldId: number;
  fieldType: string;
  formId: string;
  attributes: FieldAttribute[];
}
