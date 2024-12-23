import { FormField } from './FormField';

export interface Form {
  formId: string;
  title: string;
  description: string;
  formFields: FormField[];
  createdDate?: Date;
}
