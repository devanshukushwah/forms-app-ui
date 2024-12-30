import { FormFieldAnswer } from './FormFieldAnswer';

export interface FormSubmit {
  subId?: number;
  email?: string | null;
  formId: string;
  createdDate?: Date;
  answers: FormFieldAnswer[];
}
