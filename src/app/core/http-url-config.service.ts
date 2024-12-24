import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpUrlConfigService {
  baseUrl: string = 'http://localhost:9080';

  constructor() {}

  getForm(formId: string): string {
    return `${this.baseUrl}/api/v1/forms/${formId}`;
  }

  getAdminForms(): string {
    return `${this.baseUrl}/api/v1/forms`;
  }

  submitForm(formId: string): string {
    return `${this.baseUrl}/api/v1/forms/${formId}/submits`;
  }

  getResponses(formId: string): string {
    return `${this.baseUrl}/api/v1/responses/${formId}`;
  }

  addForm(): string {
    return `${this.baseUrl}/api/v1/forms`;
  }
}
