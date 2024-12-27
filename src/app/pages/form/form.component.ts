import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormService } from '../../services/form.service';
import { Form } from '../../common/interface/Form';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavigateService } from '../../core/navigate.service';
import { ResponseModel } from '../../common/interface/ResponseModel';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormFieldFactoryComponent } from '../../components/form-field-factory/form-field-factory.component';
import { FormField } from '../../common/interface/FormField';
import { FormFieldEditFactoryComponent } from '../../components/form-field-edit-factory/form-field-edit-factory.component';
import { CardAddButtonComponent } from '../../components/card-add-button/card-add-button.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    HeaderComponent,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    CommonModule,
    FormFieldEditFactoryComponent,
    CardAddButtonComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  basicDetails: FormGroup;
  isUpdate: boolean = false;
  isCreate: boolean = false;
  fieldformGroup: FormGroup<any> = new FormGroup({ temp: new FormControl('') });
  formFields: FormField[] = [];
  formId: string;

  constructor(
    private formService: FormService,
    public navigateService: NavigateService,
    private activeRoute: ActivatedRoute
  ) {
    this.formId = this.activeRoute.snapshot.paramMap.get('formId') || '';
    this.basicDetails = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.activeRoute.data.subscribe((data) => {
      this.isUpdate = data['isUpdate'];
      this.isCreate = data['isCreate'];
      if (this.isUpdate) {
        this.handleUpdate();
      }
    });
  }

  private handleUpdate(): void {
    if (this.formId) {
      this.formService
        .getForm(this.formId)
        .subscribe((res: ResponseModel<Form>) => {
          if (res && res.success) {
            this.basicDetails.patchValue({
              title: res.data.title,
              description: res.data.description,
            });

            let myFormGroupObj: any = {};
            for (let key of res.data.formFields) {
              myFormGroupObj['fieldId_' + key.fieldId] = new FormControl('');
            }
            this.fieldformGroup = new FormGroup(myFormGroupObj);

            this.formFields = res.data.formFields;
          }
        });
    }
  }

  handleBasicDetailSubmit(): void {
    const form: Form = this.basicDetails.value;
    this.formService.addForm(form).subscribe((res: ResponseModel<string>) => {
      this.resetBasicDetailForm();
      if (res && res.success) {
        this.navigateService.navigateToFormByFormId(res.data);
      }
    });
  }

  resetBasicDetailForm(): void {
    this.basicDetails.reset();
  }

  handleAddCardButton(): void {
    const formField: FormField = {
      attributes: [{ attr: 'title', value: '', attrId: 0, sqc: 0 }],
      fieldType: 'input',
      fieldId: 0,
      formId: this.formId,
    };

    this.formFields.push(formField);
  }
}
