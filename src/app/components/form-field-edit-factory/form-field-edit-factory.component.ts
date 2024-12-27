import { Component, Input } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import { CommonModule } from '@angular/common';
import { FieldInputEditComponent } from '../field-input-edit/field-input-edit.component';

@Component({
  selector: 'app-form-field-edit-factory',
  standalone: true,
  imports: [CommonModule, FieldInputEditComponent],
  templateUrl: './form-field-edit-factory.component.html',
  styleUrl: './form-field-edit-factory.component.scss',
})
export class FormFieldEditFactoryComponent {
  @Input() formFields: FormField[] = [];
}
