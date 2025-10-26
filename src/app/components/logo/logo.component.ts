import { Component } from '@angular/core';
import { NavigateService } from '../../core/navigate.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  constructor(public navigateService: NavigateService) {}
}
