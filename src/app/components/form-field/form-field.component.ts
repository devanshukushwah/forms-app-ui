import { Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FieldAttribute } from '../../common/interface/FieldAttribute';
import { ButtonModule } from 'primeng/button';
import { FormFieldService } from '../../services/form-field.service';
import { ResponseModel } from '../../common/interface/ResponseModel';
import { CommonModule, DatePipe } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

interface FieldType {
  type: string;
}

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    DropdownModule,
    CalendarModule,
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

  fieldTypes: FieldType[] | undefined;
  selectedFieldTypes: FieldType = { type: 'input' };

  date: Date | undefined;

  constructor(private formFieldService: FormFieldService) {}

  ngOnInit(): void {
    // const attributes: FieldAttribute[] = this.formField.attributes;
    // attributes.forEach((attribute: FieldAttribute) => {
    //   if (attribute.attr === 'title') {
    //     this.title = attribute.value;
    //   }
    // });

    console.log(this.viewFormGroup);

    this.formGroup = new FormGroup({
      fieldTitle: new FormControl(
        this.formField.fieldTitle,
        Validators.required
      ),
    });

    this.fieldTypes = [{ type: 'input' }, { type: 'date' }];

    if (this.formField?.fieldType) {
      const find = this.fieldTypes.find(
        (f) => f.type === this.formField.fieldType
      );

      if (find) {
        this.selectedFieldTypes = find;
      }
    }
  }

  handleSave(): void {
    this.formField.fieldTitle = this.formGroup.get('fieldTitle')?.value;
    // const attributes: FieldAttribute[] = this.formField.attributes;
    // const attrField = attributes.find(
    //   (attribute: FieldAttribute) => attribute.attr === 'title'
    // );
    // if (attrField) {
    //   attrField.value = title;
    // }
    this.formField.fieldType = this.selectedFieldTypes.type;

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
              fieldTitle: new FormControl(res.data.fieldTitle),
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

  onFieldTypeChange(): void {}

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);

    // Define month names in short format
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const day = d.getDate().toString().padStart(2, '0'); // Ensures two-digit day (e.g., 01)
    const month = monthNames[d.getMonth()]; // Get month abbreviation
    const year = d.getFullYear(); // Get full year

    return `${day}-${month}-${year}`;
  }
}
