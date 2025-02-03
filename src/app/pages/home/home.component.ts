import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { ButtonModule } from 'primeng/button';
import { NavigateService } from '../../core/navigate.service';
import { ClientsLogosComponent } from '../../components/clients-logos/clients-logos.component';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LogoComponent,
    ButtonModule,
    ClientsLogosComponent,
    PricingComponent,
    CardModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  pricingCards = [
    {
      title: 'Free Plan',
      price: {
        amount: '₹0',
        period: 'per month',
        tag: 'Demo',
      },
      features: [
        '10 Form Creations',
        'No Analytics',
        'No Support',
        'No Branding',
      ],
    },
    {
      title: 'Basic Plan',
      price: {
        amount: '₹499',
        period: 'per month',
        tag: 'Best Value',
      },
      features: [
        '1000 Form Creations',
        'Passive Analytics',
        'Shared Support',
        'No Branding',
      ],
    },
    {
      title: 'Pro Plan',
      price: {
        amount: '₹4999',
        period: 'per month',
        tag: 'Most Popular',
      },
      features: [
        'Unlimited Form Creations',
        'Real-time Analytics',
        'Priority Support',
        'Custom Branding',
      ],
    },
  ];

  constructor(public navigateService: NavigateService) {}
}
