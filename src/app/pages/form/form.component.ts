import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Form } from '../../common/interface/Form';
import { FormField } from '../../common/interface/FormField';
import { ResponseModel } from '../../common/interface/ResponseModel';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CardAddButtonComponent } from '../../components/card-add-button/card-add-button.component';
import { FieldCardComponent } from '../../components/cards/field-card/field-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NavigateService } from '../../core/navigate.service';
import { FormFieldService } from '../../services/form-field.service';
import { FormService } from '../../services/form.service';

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
    CardAddButtonComponent,
    BreadcrumbComponent,
    CheckboxModule,
    FieldCardComponent,
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
    private activeRoute: ActivatedRoute,
    private formFieldService: FormFieldService
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
        },
        () => {}
      );
    }
  }

  handleBasicDetailSubmit(): void {
    this.startLoading();
    if (this.isCreate) {
      this.formService.addForm(this.basicDetails.value).subscribe(
        (res: ResponseModel<string>) => {
          if (res && res.success) {
            this.stopLoading();
            setTimeout(() => {
              this.navigateService.navigateToFormEdit(res.data);
            }, 1000);
          }
        },
        () => {
          this.stopLoading();
        }
      );
    } else {
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

  deleteFormField(idx: any): void {
    this.formFields.splice(idx, 1);
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
