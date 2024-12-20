import { FormFieldAnswer } from './FormFieldAnswer';

export interface FormSubmit {
  email?: string;
  formId: string;
  answers: FormFieldAnswer[];
}
