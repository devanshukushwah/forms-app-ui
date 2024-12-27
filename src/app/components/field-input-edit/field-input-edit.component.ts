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

@Component({
  selector: 'app-field-input-edit',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './field-input-edit.component.html',
  styleUrl: './field-input-edit.component.scss',
})
export class FieldInputEditComponent implements OnInit {
  @Input() formField!: FormField;
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
          // console.log(res);
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
}
