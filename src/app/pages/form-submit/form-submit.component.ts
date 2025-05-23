import { Component, OnInit } from '@angular/core';
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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MiniFooterComponent } from '../../components/mini-footer/mini-footer.component';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { FormSubmitService } from '../../services/form-submit.service';
import { FormViewSubmissionComponent } from '../../components/form-view-submission/form-view-submission.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
    ProgressSpinnerModule,
    MiniFooterComponent,
    MessagesModule,
    FormViewSubmissionComponent,
  ],
  templateUrl: './form-submit.component.html',
  styleUrl: './form-submit.component.scss',
})
export class FormSubmitComponent implements OnInit {
  form: Form | null = null;
  formId: string = '';
  isLoading: boolean = false;
  isFormSubmitted: boolean = false;
  isFormDetailsLoading: boolean = true;

  formGroup: FormGroup<any> = new FormGroup({ temp: new FormControl('') });

  // for already submitted variables
  alreadySubmitMessage: Message[] = [
    { severity: 'info', detail: 'You have already submitted this form' },
  ];
  isAlreadySubmitted: boolean = false;
  answers: FormFieldAnswer[] = [];

  constructor(
    private formService: FormService,
    private activeRoute: ActivatedRoute,
    private keycloakService: KeycloakService,
    private formSubmitService: FormSubmitService,
    private fb: FormBuilder
  ) {
    const param = this.activeRoute.snapshot.paramMap.get('formId');

    if (param) {
      this.formId = param;
    }
  }

  ngOnInit(): void {
    this.getFormDetails();
  }

  getFormDetails(): void {
    this.formService.getFormCached(this.formId).subscribe((res) => {
      if (res && res?.data) {
        this.form = res.data;

        let myFormGroupObj: any = {};
        for (let key of res.data.formFields) {
          myFormGroupObj['fieldId_' + key.fieldId] = [
            null,
            key.required ? Validators.required : null,
          ];
        }
        this.formGroup = this.fb.group(myFormGroupObj);

        if (!this.form?.multipleSubmit) {
          this.fetchAlreadySubmitted();
        } else {
          this.formDetailsLoaded();
        }
      }
    });
  }

  formDetailsLoaded(): void {
    setTimeout(() => {
      this.isFormDetailsLoading = false;
    }, 500);
  }

  fetchAlreadySubmitted(): void {
    this.keycloakService.loadUserProfile().then((userProfile) => {
      if (!userProfile.email) {
        return;
      }

      this.formSubmitService
        .getFormSubmitByFormIdAndEmailThroughJWT(this.formId)
        .subscribe((res) => {
          if (res && res.data) {
            this.isAlreadySubmitted = true;
            this.answers = res.data.answers;
          }
        });
    });
    this.formDetailsLoaded();
  }

  handleSubmitForm(e: Event): void {
    e.preventDefault();
    // return if the event is not trusted
    if (!e.isTrusted) return;

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.startLoading();
    this.keycloakService.loadUserProfile().then((res) => {
      const formSubmit: FormSubmit = {
        answers: this.convertFormGroupToFormFieldAnswers(this.formGroup),
        formId: this.formId,
        email: res.email,
      };
      this.formService.submitForm(formSubmit).subscribe(
        (res) => {
          this.formGroup.disable();
          setTimeout(() => {
            this.isLoading = false;
            this.isFormSubmitted = true;
          }, 500);
        },
        (err) => {
          this.stopLoading();
        }
      );
    });
  }

  private convertFormGroupToFormFieldAnswers(
    formGroup: FormGroup
  ): FormFieldAnswer[] {
    let formFieldAnswers: FormFieldAnswer[] = [];
    const formGroupValue = formGroup.value;
    for (let item in formGroupValue) {
      const fieldId: number = Number.parseInt(item.replace('fieldId_', ''));
      const formFieldAnswer: FormFieldAnswer = {
        fieldId,
        value: formGroupValue[item],
      };
      formFieldAnswers.push(formFieldAnswer);
    }
    return formFieldAnswers;
  }

  startLoading(): void {
    this.isLoading = true;
  }

  stopLoading(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
