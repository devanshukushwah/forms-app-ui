import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../../../common/interface/FormField';
import { CalendarModule } from 'primeng/calendar';
import { AppUtilService } from '../../../services/app-util.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-date-field',
  standalone: true,
  imports: [CalendarModule, ReactiveFormsModule, CommonModule, InputTextModule],
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.scss',
})
export class DateFieldComponent implements OnInit {
  @Input() formField!: FormField;
  @Input() formGroup!: FormGroup;
  value!: string;

  constructor(public appUtilService: AppUtilService) {}

  ngOnInit(): void {
    this.value = this.formGroup
      .get(this.appUtilService.getFieldControlName(this.formField))
      ?.value?.toString();
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);

    // Define month names in short format
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const day = d.getDate().toString().padStart(2, '0'); // Ensures two-digit day (e.g., 01)
    const month = monthNames[d.getMonth()]; // Get month abbreviation
    const year = d.getFullYear(); // Get full year

    return `${day}-${month}-${year}`;
  }
}
