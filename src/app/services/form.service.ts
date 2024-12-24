import { Injectable } from '@angular/core';
import { HttpUrlConfigService } from '../core/http-url-config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormSubmit } from '../common/interface/FormSubmit';
import { Form } from '../common/interface/Form';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(
    private httpUrlConfig: HttpUrlConfigService,
    private http: HttpClient
  ) {}

  getForm(id: string): Observable<any> {
    return this.http.get(this.httpUrlConfig.getForm(id));
  }

  submitForm(body: FormSubmit): Observable<any> {
    return this.http.post(this.httpUrlConfig.submitForm(body.formId), body);
  }

  getAdminForms(): Observable<any> {
    return this.http.get(this.httpUrlConfig.getAdminForms());
  }

  addForm(form: Form): Observable<any> {
    return this.http.post(this.httpUrlConfig.addForm(), form);
  }
}
