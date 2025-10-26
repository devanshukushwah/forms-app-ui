import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field.component';
import { CardModule } from 'primeng/card';
import { FieldCardComponent } from '../cards/field-card/field-card.component';

@Component({
  selector: 'app-form-field-edit-factory',
  standalone: true,
  imports: [CommonModule, FormFieldComponent, CardModule, FieldCardComponent],
  templateUrl: './form-field-edit-factory.component.html',
  styleUrl: './form-field-edit-factory.component.scss',
})
export class FormFieldEditFactoryComponent {
  @Input() formFields!: FormField[];
  @Output() deleteFormField: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleDeleteFormField(data: any): void {
    this.deleteFormField.emit(data);
  }
}
