import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  constructor(private router: Router) {}

  navigateToForm(): void {
    this.router.navigate(['/create']);
  }

  navigateToFormEdit(formId: string): void {
    this.router.navigate([`/edit/${formId}`]);
  }

  navigateToAdmin(): void {
    this.router.navigate(['/admin']);
  }

  navigateToSubmission(subId: string): void {
    this.router.navigate([`submission/${subId}`]);
  }
}
