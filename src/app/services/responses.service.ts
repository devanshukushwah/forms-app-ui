import { Injectable } from '@angular/core';
import { HttpUrlConfigService } from '../core/http-url-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsesService {
  constructor(
    private httpUrlConfig: HttpUrlConfigService,
    private http: HttpClient
  ) {}

  getResponses(formId: string): Observable<any> {
    return this.http.get(this.httpUrlConfig.getResponses(formId));
  }
}
