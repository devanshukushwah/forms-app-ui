import { Component, Input } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-form-field-factory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './form-field-factory.component.html',
  styleUrl: './form-field-factory.component.scss',
})
export class FormFieldFactoryComponent {
  @Input() formFields: FormField[] = [];
  @Input() respFormGroup!: FormGroup;
}
