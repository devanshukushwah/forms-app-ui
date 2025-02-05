import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormSubmitService } from '../../services/form-submit.service';
import { ActivatedRoute } from '@angular/router';
import { Form } from '../../common/interface/Form';
import { CardModule } from 'primeng/card';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormFieldFactoryComponent } from '../../components/form-field-factory/form-field-factory.component';
import { CommonModule } from '@angular/common';
import { ResponseModel } from '../../common/interface/ResponseModel';
import { FormSubmit } from '../../common/interface/FormSubmit';
import { FormAndSubmit } from '../../common/interface/FormAndSubmit';
import { MenuItem } from 'primeng/api';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-form-submission',
  standalone: true,
  imports: [
    HeaderComponent,
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    FormFieldFactoryComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './form-submission.component.html',
  styleUrl: './form-submission.component.scss',
})
export class FormSubmissionComponent {
  subId: string = '';
  form!: Form;
  resformGroup: FormGroup<any> = new FormGroup({ temp: new FormControl('') });
  breadcrumbItems!: MenuItem[];

  constructor(
    private formSubmitService: FormSubmitService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute
  ) {
    const paramId = this.activeRoute.snapshot.paramMap.get('subId');
    if (paramId) {
      this.subId = paramId;

      this.formSubmitService
        .getFormSubmission(this.subId)
        .subscribe((res: ResponseModel<FormAndSubmit>) => {
          if (res && res.data) {
            const answersMap = res.data.submit.answers.reduce(
              (acc: any, obj: any) => {
                acc[obj.fieldId] = obj;
                return acc;
              },
              {}
            );

            let myFormGroupObj: any = {};
            for (let key of res.data.form.formFields) {
              myFormGroupObj['fieldId_' + key.fieldId] = [
                { value: answersMap[key.fieldId]?.value || '', disabled: true },
              ];
            }
            this.resformGroup = this.fb.group(myFormGroupObj);
            this.form = res.data.form;
            this.initBreadcrumb(res.data.form);
          }
        });
    }
  }

  initBreadcrumb(form: Form): void {
    this.breadcrumbItems = [
      { icon: 'pi pi-home', route: '/admin' },
      { label: 'responses', route: '/responses', disabled: true },
    ];
    if (form) {
      this.breadcrumbItems = [
        ...this.breadcrumbItems,
        {
          label: `${form?.formId}`,
          route: `/responses/${form?.formId}`,
        },
        {
          label: `${this.subId}`,
          route: `${this.subId}`,
          disabled: true,
        },
      ];
    }
  }
}
