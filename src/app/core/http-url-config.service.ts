import { Injectable } from '@angular/core';
import { PageRequest } from '../common/interface/PageRequest';

@Injectable({
  providedIn: 'root',
})
export class HttpUrlConfigService {
  baseUrl: string = 'http://localhost:9080';

  constructor() {}

  getForm(formId: string): string {
    return `${this.baseUrl}/api/v1/forms/${formId}`;
  }

  getAdminForms(pageRequest: PageRequest): string {
    const { page, size } = pageRequest;
    return `${this.baseUrl}/api/v1/forms?page=${page}&size=${size}`;
    // return `${this.baseUrl}/api/v1/forms`;
  }

  submitForm(formId: string): string {
    return `${this.baseUrl}/api/v1/submits/formId/${formId}`;
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
