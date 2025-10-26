import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BaseIcon } from 'primeng/baseicon';
import { FormField } from '../../../common/interface/FormField';
import { AppUtilService } from '../../../services/app-util.service';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, CommonModule, BaseIcon],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
})
export class TextFieldComponent {
  @Input() formGroup!: FormGroup;
  @Input() formField!: FormField;

  constructor(public appUtilService: AppUtilService) {}

  getString(obj: any): string {
    return obj ? obj.toString() : '';
  }
}
