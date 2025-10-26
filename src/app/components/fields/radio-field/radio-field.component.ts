import { Component, Input } from '@angular/core';
import { FormField } from '../../../common/interface/FormField';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppUtilService } from '../../../services/app-util.service';

@Component({
  selector: 'app-radio-field',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RadioButtonModule],
  templateUrl: './radio-field.component.html',
  styleUrl: './radio-field.component.scss',
})
export class RadioFieldComponent {
  @Input() formField!: FormField;
  @Input() formGroup!: FormGroup;

  constructor(public appUtilService: AppUtilService) {}
}
