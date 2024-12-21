import { FormFieldAnswer } from './FormFieldAnswer';

export interface FormSubmit {
  subId?: number;
  email?: string;
  formId: string;
  answers: FormFieldAnswer[];
}
