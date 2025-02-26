import { Attribute, Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormArray,
  FormBuilder,
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
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RadioButtonModule } from 'primeng/radiobutton';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

interface FieldType {
  type: string;
}

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    ToggleButtonModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    DropdownModule,
    CalendarModule,
    RadioButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
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

  fieldTypes: string[] = ['input', 'date', 'radio'];
  selectedFieldTypes: string = 'input';

  isLoading: boolean = false;

  constructor(
    private formFieldService: FormFieldService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      fieldTitle: [this.formField?.fieldTitle || '', Validators.required],
      required: [this.formField?.required || false, Validators.required],
      fieldType: [this.formField?.fieldType || 'input', Validators.required],
      attributes: this.fb.array(this.initializeOptions()), // Using FormArray
    });
  }

  // Initialize options
  initializeOptions(): FormGroup[] {
    const options = this.formField.attributes
      .sort((a, b) => {
        if (a?.sqc && b?.sqc) {
          return a.sqc - b.sqc;
        } else return 0;
      })
      .map((item) => item.value);

    if (options) {
      return options.map((option) =>
        this.fb.group({
          attr: 'radio',
          value: [option, Validators.required],
          sqc: 1,
        })
      );
    }

    return ['Option 1'].map((option) =>
      this.fb.group({
        attr: 'radio',
        value: [null, Validators.required],
        sqc: 1,
      })
    );
  }

  // Get options as FormArray
  get attributes(): FormArray {
    return this.formGroup.get('attributes') as FormArray;
  }

  // Add new option dynamically
  addOption(): void {
    this.attributes.push(
      this.fb.group({
        attr: 'radio',
        value: [null, Validators.required],
        sqc: this.attributes.length + 1,
      })
    );
  }

  // Remove an option
  removeOption(index: number): void {
    if (this.attributes.length > 1) {
      this.attributes.removeAt(index);
      this.formGroup.markAsDirty(); // Mark form as dirty to enable update button
    }
  }

  handleSave(): void {
    if (!this.formGroup) return;

    this.formField = {
      ...this.formField,
      ...this.formGroup.value,
    };

    this.startLoading();
    if (this.formField.fieldId >= 1) {
      this.formFieldService
        .putFormField(
          this.formField.formId,
          this.formField.fieldId,
          this.formField
        )
        .subscribe(
          (res) => {
            if (res.success) {
              this.formGroup.markAsPristine(); // Mark form as pristine
              this.formGroup.markAsUntouched(); // Mark form as untouched
              this.formGroup.updateValueAndValidity(); // Update form validity
            }
            this.stopLoading();
          },
          () => {
            this.stopLoading();
          }
        );
    } else {
      this.formFieldService
        .postFormField(this.formField.formId, this.formField)
        .subscribe(
          (res: ResponseModel<FormField>) => {
            if (res.success) {
              this.formField = res.data;
              this.formGroup.markAsPristine(); // Mark form as pristine
              this.formGroup.markAsUntouched(); // Mark form as untouched
              this.formGroup.updateValueAndValidity(); // Update form validity
            }
            this.stopLoading();
          },
          () => {
            this.stopLoading();
          }
        );
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

  // Check if the field has the required validator
  isRequiredField(controlName: string): boolean {
    const formGroup = this.viewFormGroup
      ? this.viewFormGroup
      : this.submitFormGroup;

    const control = formGroup.get(controlName);
    return control?.hasValidator(Validators.required) ?? false;
  }

  startLoading(): void {
    this.isLoading = true;
  }

  stopLoading(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
