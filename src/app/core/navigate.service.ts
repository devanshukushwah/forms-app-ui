import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  constructor(private router: Router) {}

  navigateToForm(): void {
    this.router.navigate(['/form']);
  }

  navigateToFormByFormId(formId: string): void {
    this.router.navigate([`/form/${formId}`]);
  }
}
