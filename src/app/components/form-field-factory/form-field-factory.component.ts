import { Component, Input } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import { FieldInputComponent } from '../field-input/field-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field-factory',
  standalone: true,
  imports: [FieldInputComponent, CommonModule],
  templateUrl: './form-field-factory.component.html',
  styleUrl: './form-field-factory.component.scss',
})
export class FormFieldFactoryComponent {
  @Input() formFields: FormField[] = [];
}
