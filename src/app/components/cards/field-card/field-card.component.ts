import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormFieldService } from '../../../services/form-field.service';
import { NavigateService } from '../../../core/navigate.service';
import { FormField } from '../../../common/interface/FormField';
import { ResponseModel } from '../../../common/interface/ResponseModel';

interface FieldType {
  type: string;
}

@Component({
  selector: 'app-field-card',
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
  templateUrl: './field-card.component.html',
  styleUrl: './field-card.component.scss',
})
export class FieldCardComponent {
  @Input() edit: boolean = false;
  @Input() submit: boolean = false;
  @Input() view: boolean = false;

  @Input() formField!: FormField;
  @Input() submitFormGroup!: FormGroup;
  @Input() viewFormGroup!: FormGroup;
  @Input() idx!: number;
  formGroup!: FormGroup;

  fieldTypes: string[] = ['input', 'date', 'radio'];
  selectedFieldTypes: string = 'input';

  isLoading: boolean = false;
  isDeleteLoading = false;

  @Output() deleteFormField: EventEmitter<any> = new EventEmitter();

  constructor(
    private formFieldService: FormFieldService,
    private fb: FormBuilder,
    private navigateService: NavigateService
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

  handleDeleteFormField(): void {
    this.isDeleteLoading = true;

    this.formFieldService
      .deleteFormField(
        this.formField.formId, // formId
        this.formField.fieldId // fieldId
      )
      .subscribe(
        (res) => {
          if (res.success) {
            this.deleteFormField.emit(this.idx);
          }
        },
        () => {
          this.isDeleteLoading = false;
        }
      );
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
