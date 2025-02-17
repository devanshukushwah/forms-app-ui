import { FieldAttribute } from './FieldAttribute';

export interface FormField {
  fieldId: number;
  required: boolean;
  fieldType: string;
  fieldTitle: string;
  formId: string;
  attributes: FieldAttribute[];
}
