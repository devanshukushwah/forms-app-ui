import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ActivatedRoute } from '@angular/router';
import { Form } from '../../common/interface/Form';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormFieldFactoryComponent } from '../../components/form-field-factory/form-field-factory.component';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormField } from '../../common/interface/FormField';
import { FieldInput } from '../../common/interface/FieldInput';
import { FormFieldAnswer } from '../../common/interface/FormFieldAnswer';
import { FormSubmit } from '../../common/interface/FormSubmit';

@Component({
  selector: 'app-form-submit',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    FormFieldFactoryComponent,
    InputTextModule,
    DividerModule,
    ButtonModule,
  ],
  templateUrl: './form-submit.component.html',
  styleUrl: './form-submit.component.scss',
})
export class FormSubmitComponent {
  form: Form | null = null;
  userResponse: FormFieldAnswer[] = [];

  constructor(
    private formService: FormService,
    private activeRoute: ActivatedRoute
  ) {
    const paramId = this.activeRoute.snapshot.paramMap.get('id');

    if (paramId) {
      this.getSubmitForm(paramId);
    }
  }

  getSubmitForm(id: string): void {
    this.formService.getForm(id).subscribe((res) => {
      if (res && res?.data) {
        this.form = res.data;
      }
    });
  }

  handleOnChangeCallback(obj: any): void {
    const field = this.userResponse.find(
      (item) => item.fieldId === obj.fieldId
    );

    if (obj && obj.fieldType === 'input') {
      if (field) {
        field.value = obj.value;
      } else {
        const newField: FormFieldAnswer = {
          fieldId: obj.fieldId,
          attrId: obj.attrId,
          value: obj.value,
        };
        this.userResponse.push(newField);
      }
    }
  }

  handleSubmitForm(): void {
    if (!this.form?.formId) {
      return;
    }

    const formSubmit: FormSubmit = {
      answers: this.userResponse,
      formId: this.form.formId,
    };
    this.formService.submitForm(formSubmit).subscribe((res) => {
      alert('success');
    });
  }
}
