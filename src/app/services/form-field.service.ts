import { Injectable } from '@angular/core';
import { HttpUrlConfigService } from '../core/http-url-config.service';
import { HttpClient } from '@angular/common/http';
import { FormField } from '../common/interface/FormField';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormFieldService {
  constructor(
    private httpUrlConfig: HttpUrlConfigService,
    private http: HttpClient
  ) {}

  putFormField(
    formId: string,
    fieldId: number,
    formField: FormField
  ): Observable<any> {
    return this.http.put(
      this.httpUrlConfig.putFormField(formId, fieldId),
      formField
    );
  }

  postFormField(formId: string, formField: FormField): Observable<any> {
    const postAttributes = formField.attributes.map((attr) => {
      const obj: any = { ...attr };
      delete obj.attrId;
      return obj;
    });
    const obj: any = { ...formField };
    delete obj.fieldId;
    obj.attributes = postAttributes;
    return this.http.post(this.httpUrlConfig.postFormField(formId), obj);
  }
}
