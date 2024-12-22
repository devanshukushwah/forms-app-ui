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
import { KeycloakService } from '../../services/keycloak.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
  ],
  templateUrl: './form-submit.component.html',
  styleUrl: './form-submit.component.scss',
})
export class FormSubmitComponent {
  form: Form | null = null;
  resformGroup: FormGroup<any> = new FormGroup({ temp: new FormControl('') });

  constructor(
    private formService: FormService,
    private activeRoute: ActivatedRoute,
    private keycloakService: KeycloakService
  ) {
    const paramId = this.activeRoute.snapshot.paramMap.get('formId');

    if (paramId) {
      this.formService.getForm(paramId).subscribe((res) => {
        if (res && res?.data) {
          this.form = res.data;

          let myFormGroupObj: any = {};
          for (let key of res.data.formFields) {
            myFormGroupObj['fieldId_' + key.fieldId] = new FormControl('');
          }
          this.resformGroup = new FormGroup(myFormGroupObj);
        }
      });
    }
  }

  async handleSubmitForm(): Promise<void> {
    if (!this.form?.formId) {
      return;
    }
    const formSubmit: FormSubmit = {
      answers: this.convertFormGroupToFormFieldAnswers(this.resformGroup),
      formId: this.form.formId,
      email: await this.fetchEmail(),
    };

    this.convertFormGroupToFormFieldAnswers(this.resformGroup);

    this.formService.submitForm(formSubmit).subscribe((res) => {
      alert('success');
    });
  }

  private convertFormGroupToFormFieldAnswers(
    formGroup: FormGroup
  ): FormFieldAnswer[] {
    let formFieldAnswers: FormFieldAnswer[] = [];
    const formGroupValue = formGroup.value;
    for (let item in formGroupValue) {
      console.log(item);
      const fieldId: number = Number.parseInt(item.replace('fieldId_', ''));
      const formFieldAnswer: FormFieldAnswer = {
        fieldId,
        value: formGroupValue[item],
      };
      formFieldAnswers.push(formFieldAnswer);
    }
    return formFieldAnswers;
  }

  async fetchEmail(): Promise<string | null | undefined> {
    const profile = await this.keycloakService.loadUserProfile();
    return profile.email;
  }
}
