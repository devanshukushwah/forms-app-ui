import { Injectable } from '@angular/core';
import { HttpUrlConfigService } from '../core/http-url-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormSubmitService {
  constructor(
    private httpUrlConfig: HttpUrlConfigService,
    private http: HttpClient
  ) {}

  getFormSubmission(subId: string): Observable<any> {
    return this.http.get(this.httpUrlConfig.getFormSubmission(subId));
  }

  getFormSubmitByFormIdAndEmailThroughJWT(formId: string): Observable<any> {
    return this.http.get(
      this.httpUrlConfig.getFormSubmitByFormIdAndEmailThroughJWT(formId)
    );
  }
}
