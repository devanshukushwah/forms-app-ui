import { Component, Input } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import { FieldInputComponent } from '../field-input/field-input.component';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field-factory',
  standalone: true,
  imports: [FieldInputComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './form-field-factory.component.html',
  styleUrl: './form-field-factory.component.scss',
})
export class FormFieldFactoryComponent {
  @Input() formFields: FormField[] = [];
  @Input() respFormGroup!: FormGroup;
}
