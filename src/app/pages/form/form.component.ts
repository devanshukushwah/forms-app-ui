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
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { MenuItem } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';

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
    BreadcrumbComponent,
    CheckboxModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  basicDetails: FormGroup;
  isUpdate: boolean = false;
  isCreate: boolean = false;
  fieldformGroup: FormGroup<any> = new FormGroup({ temp: new FormControl('') });
  formFields: FormField[] = [];
  formId: string;
  breadcrumbItems!: MenuItem[];
  isLoading: boolean = false;

  constructor(
    private formService: FormService,
    public navigateService: NavigateService,
    private activeRoute: ActivatedRoute
  ) {
    this.formId = this.activeRoute.snapshot.paramMap.get('formId') || '';
    this.basicDetails = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      multipleSubmit: new FormControl(false),
    });

    this.activeRoute.data.subscribe((data) => {
      this.isUpdate = data['isUpdate'];
      this.isCreate = data['isCreate'];
      if (this.isUpdate) {
        this.handleUpdate();
      }
    });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { icon: 'pi pi-home', route: '/admin' },
      {
        label: this.isCreate ? 'Create form' : 'Edit form',
        route: '/form',
        disabled: true,
      },
    ];
  }

  private handleUpdate(): void {
    if (this.formId) {
      this.startLoading();
      this.formService.getForm(this.formId).subscribe(
        (res: ResponseModel<Form>) => {
          if (res && res.success) {
            this.basicDetails.patchValue({
              ...res.data,
            });

            let myFormGroupObj: any = {};
            for (let key of res.data.formFields) {
              myFormGroupObj['fieldId_' + key.fieldId] = new FormControl('');
            }
            this.fieldformGroup = new FormGroup(myFormGroupObj);

            this.formFields = res.data.formFields;
          }
          this.stopLoading();
        },
        () => {
          this.stopLoading();
        }
      );
    }
  }

  handleBasicDetailSubmit(): void {
    this.startLoading();
    this.formService.addForm(this.basicDetails.value).subscribe(
      (res: ResponseModel<string>) => {
        if (res && res.success) {
          this.basicDetails.reset();
          this.navigateService.navigateToFormEdit(res.data);
        }
        this.stopLoading();
      },
      () => {
        this.stopLoading();
      }
    );
  }

  handleEditBasicDetailSubmit(): void {
    this.startLoading();
    this.formService.putForm(this.formId, this.basicDetails.value).subscribe(
      (res: ResponseModel<Form>) => {
        if (res && res.success) {
          this.navigateService.navigateToFormEdit(res.data.formId);
          this.basicDetails.markAsPristine(); // Mark form as pristine
          this.basicDetails.markAsUntouched(); // Mark form as untouched
          this.basicDetails.updateValueAndValidity(); // Update form validity
        }
        this.stopLoading();
      },
      () => {
        this.stopLoading();
      }
    );
  }

  handleAddCardButton(): void {
    const formField: FormField = {
      attributes: [],
      fieldType: 'input',
      fieldTitle: '',
      fieldId: 0,
      formId: this.formId,
      required: false,
    };

    this.formFields.push(formField);
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
