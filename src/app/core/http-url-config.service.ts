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

  putForm(formId: string): string {
    return `${this.baseUrl}/api/v1/forms/${formId}`;
  }

  putFormField(formId: string, fieldId: number): string {
    return `${this.baseUrl}/api/v1/forms/${formId}/formFields/${fieldId}`;
  }

  postFormField(formId: string): string {
    return `${this.baseUrl}/api/v1/forms/${formId}/formFields`;
  }

  getFormSubmission(subId: number): string {
    return `${this.baseUrl}/api/v1/form-submit/${subId}`;
  }
}
