import { Injectable } from '@angular/core';
import { FormField } from '../common/interface/FormField';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFieldAnswer } from '../common/interface/FormFieldAnswer';

@Injectable({
  providedIn: 'root',
})
export class AppUtilService {
  constructor(private fb: FormBuilder) {}

  /** To get form control name for a form field */
  getFieldControlName(formField: FormField): string {
    return 'fieldId_' + (formField.fieldId ? formField.fieldId.toString() : '');
  }

  /** To generate form group */
  generateFormGroupFromFormFields(formFields: FormField[]): FormGroup {
    let myFormGroupObj: any = {};

    formFields.forEach((field: FormField) => {
      myFormGroupObj[this.getFieldControlName(field)] = [
        null,
        field.required ? Validators.required : null,
      ];
    });

    return this.fb.group(myFormGroupObj);
  }

  /** To generate form group */
  generateFormGroupFromFormFieldAndAnswer(
    formFields: FormField[],
    answers: FormFieldAnswer[]
  ): FormGroup {
    const answersMap = answers.reduce((acc: any, obj: FormFieldAnswer) => {
      acc[obj.fieldId] = obj;
      return acc;
    }, {});

    let myFormGroupObj: any = {};
    for (let field of formFields) {
      myFormGroupObj[this.getFieldControlName(field)] = [
        { value: answersMap[field.fieldId]?.value || '', disabled: true },
      ];
    }

    return this.fb.group(myFormGroupObj);
  }

  /** Check if the field has the required validator */
  checkFieldIsRequired(fromField: FormField, formGroup: FormGroup): boolean {
    const control = formGroup.get(this.getFieldControlName(fromField));
    return control?.hasValidator(Validators.required) ?? false;
  }
}
