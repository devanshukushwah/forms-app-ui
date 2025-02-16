import { Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FieldAttribute } from '../../common/interface/FieldAttribute';
import { ButtonModule } from 'primeng/button';
import { FormFieldService } from '../../services/form-field.service';
import { ResponseModel } from '../../common/interface/ResponseModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Input() edit: boolean = false;
  @Input() submit: boolean = false;
  @Input() view: boolean = false;

  @Input() formField!: FormField;
  @Input() submitFormGroup!: FormGroup;
  @Input() viewFormGroup!: FormGroup;
  formGroup!: FormGroup;
  title: string = '';

  constructor(private formFieldService: FormFieldService) {}

  ngOnInit(): void {
    const attributes: FieldAttribute[] = this.formField.attributes;
    attributes.forEach((attribute: FieldAttribute) => {
      if (attribute.attr === 'title') {
        this.title = attribute.value;
      }
    });

    this.formGroup = new FormGroup({
      title: new FormControl(this.title),
    });
  }

  handleSave(): void {
    const title: string = this.formGroup.get('title')?.value;
    const attributes: FieldAttribute[] = this.formField.attributes;
    const attrField = attributes.find(
      (attribute: FieldAttribute) => attribute.attr === 'title'
    );
    if (attrField) {
      attrField.value = title;
    }

    if (this.formField.fieldId >= 1) {
      this.formFieldService
        .putFormField(
          this.formField.formId,
          this.formField.fieldId,
          this.formField
        )
        .subscribe((res) => {
          if (res.success) {
            this.formGroup.markAsPristine(); // Mark form as pristine
            this.formGroup.markAsUntouched(); // Mark form as untouched
            this.formGroup.updateValueAndValidity(); // Update form validity
          }
        });
    } else {
      this.formFieldService
        .postFormField(this.formField.formId, this.formField)
        .subscribe((res: ResponseModel<FormField>) => {
          if (res.success) {
            this.formField = res.data;

            this.formGroup = new FormGroup({
              title: new FormControl(res.data.attributes[0].value),
            });
          }
        });
    }
  }

  getString(obj: any): string {
    if (obj) {
      return obj.toString();
    }

    return '';
  }
}
