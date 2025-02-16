import { FieldAttribute } from './FieldAttribute';

export interface FormField {
  fieldId: number;
  fieldType: string;
  fieldTitle: string;
  formId: string;
  attributes: FieldAttribute[];
}
