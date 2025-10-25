import { Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { TextFieldComponent } from '../fields/text-field/text-field.component';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AppUtilService } from '../../services/app-util.service';
import { DateFieldComponent } from '../fields/date-field/date-field.component';
import { RadioFieldComponent } from '../fields/radio-field/radio-field.component';

@Component({
  selector: 'app-dynamic-form-field-host',
  standalone: true,
  imports: [
    TextFieldComponent,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DateFieldComponent,
    RadioFieldComponent,
  ],
  templateUrl: './dynamic-form-field-host.component.html',
  styleUrl: './dynamic-form-field-host.component.scss',
})
export class DynamicFormFieldHostComponent {
  @Input() formField!: FormField;
  @Input() formGroup!: FormGroup;

  constructor(public appUtilService: AppUtilService) {}
}
