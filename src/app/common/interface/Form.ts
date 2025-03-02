import { FormField } from './FormField';

export interface Form {
  formId: string;
  title: string;
  description: string;
  multipleSubmit: boolean;
  formFields: FormField[];
  createdDate?: Date;
  submitsCount?: number | null;
}
