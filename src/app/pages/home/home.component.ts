import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { ButtonModule } from 'primeng/button';
import { NavigateService } from '../../core/navigate.service';
import { ClientsLogosComponent } from '../../components/clients-logos/clients-logos.component';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { PricingComponent } from '../../components/pricing/pricing.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LogoComponent,
    ButtonModule,
    ClientsLogosComponent,
    PricingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(public navigateService: NavigateService) {}
}
