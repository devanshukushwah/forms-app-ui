import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-column.component.html',
  styleUrl: './date-column.component.scss',
})
export class DateColumnComponent {
  @Input() date!: string;
}
