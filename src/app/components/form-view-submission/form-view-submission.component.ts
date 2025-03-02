import { Component, Input, OnInit } from '@angular/core';
import { FormField } from '../../common/interface/FormField';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { FormFieldFactoryComponent } from '../form-field-factory/form-field-factory.component';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-form-view-submission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './form-view-submission.component.html',
  styleUrl: './form-view-submission.component.scss',
})
export class FormViewSubmissionComponent implements OnInit {
  @Input() answers: any;
  @Input() formFields: FormField[] = [];
  formGroup: FormGroup<any> = new FormGroup({ temp: new FormControl('') });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.answers) {
      const answersMap = this.answers.reduce((acc: any, obj: any) => {
        acc[obj.fieldId] = obj;
        return acc;
      }, {});

      let myFormGroupObj: any = {};
      for (let key of this.formFields) {
        myFormGroupObj['fieldId_' + key.fieldId] = [
          { value: answersMap[key.fieldId]?.value || '', disabled: true },
        ];
      }
      this.formGroup = this.fb.group(myFormGroupObj);
    }
  }
}
