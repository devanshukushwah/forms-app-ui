import { Component, Input } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-form-field-edit-factory',
  standalone: true,
  imports: [CommonModule, FormFieldComponent, CardModule],
  templateUrl: './form-field-edit-factory.component.html',
  styleUrl: './form-field-edit-factory.component.scss',
})
export class FormFieldEditFactoryComponent {
  @Input() formFields!: FormField[];

  constructor() {}
}
