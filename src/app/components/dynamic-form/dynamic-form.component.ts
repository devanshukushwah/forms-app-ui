import { Component, Input } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicFormFieldHostComponent } from '../dynamic-form-field-host/dynamic-form-field-host.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DynamicFormFieldHostComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
  @Input() formFields!: FormField[];
  @Input() formGroup!: FormGroup;
}
