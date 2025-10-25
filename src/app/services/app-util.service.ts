import { Injectable } from '@angular/core';
import { FormField } from '../common/interface/FormField';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AppUtilService {
  constructor(private fb: FormBuilder) {}

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

  // Check if the field has the required validator
  checkFieldIsRequired(fromField: FormField, formGroup: FormGroup): boolean {
    const control = formGroup.get(this.getFieldControlName(fromField));
    return control?.hasValidator(Validators.required) ?? false;
  }
}
