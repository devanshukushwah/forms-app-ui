import { FieldAttribute } from './FieldAttribute';

export interface FormField {
  id: number;
  fieldType: string;
  formId: string;
  attributes: FieldAttribute[];
}
