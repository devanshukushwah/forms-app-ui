import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { NavigateService } from '../../core/navigate.service';
import { LogoComponent } from '../logo/logo.component';
import { KeycloakService } from '../../services/keycloak.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, LogoComponent, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  firstLastname: string = '';

  constructor(
    public navigateService: NavigateService,
    public keyCloakService: KeycloakService
  ) {}

  async ngOnInit() {
    const user = await this.keyCloakService.loadUserProfile();
    if (user) {
      this.firstLastname = user?.firstName + ' ' + user?.lastName;
    }
  }
}
