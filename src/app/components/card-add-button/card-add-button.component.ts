import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card-add-button',
  standalone: true,
  imports: [CardModule],
  templateUrl: './card-add-button.component.html',
  styleUrl: './card-add-button.component.scss',
})
export class CardAddButtonComponent {}
