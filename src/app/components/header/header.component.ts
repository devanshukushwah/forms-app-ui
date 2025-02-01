import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { NavigateService } from '../../core/navigate.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(public navigateService: NavigateService) {}
}
