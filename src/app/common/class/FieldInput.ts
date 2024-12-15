import { FieldAttribute } from '../interface/FieldAttribute';
import { FormField } from '../interface/FormField';

export class FieldInput {
  id: number;
  formId: string;
  fieldType: string;
  title: string | undefined;
  value: string | undefined;
  constructor(formField: FormField) {
    this.id = formField.id;
    this.fieldType = formField.fieldType;
    this.formId = formField.formId;
    formField.attributes.forEach((item) => {
      if (item.attr == 'title') {
        this.title = item.value;
      }
    });
  }
}
