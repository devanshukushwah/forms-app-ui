import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpUrlConfigService {
  baseUrl: string = 'http://localhost:8080';

  constructor() {}

  getForm(id: string): string {
    return `${this.baseUrl}/api/v1/forms/${id}`;
  }
}
