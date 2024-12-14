import { Injectable } from '@angular/core';
import { HttpUrlConfigService } from '../core/http-url-config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
