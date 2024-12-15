import { FormField } from './FormField';

export interface Form {
  id: string;
  title: string;
  description: string;
  formFields: FormField[];
}
