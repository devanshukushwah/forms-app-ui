import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ActivatedRoute } from '@angular/router';
import { Form } from '../../common/interface/Form';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormFieldFactoryComponent } from '../../components/form-field-factory/form-field-factory.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-form-submit',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    FormFieldFactoryComponent,
    InputTextModule,
  ],
  templateUrl: './form-submit.component.html',
  styleUrl: './form-submit.component.scss',
})
export class FormSubmitComponent {
  form: Form | null = null;

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
      console.log(res);
      if (res && res?.data) {
        this.form = res.data;
      }
    });
  }
}
