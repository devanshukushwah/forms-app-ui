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
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  basicDetails: FormGroup;
  isUpdate: boolean = false;
  isCreate: boolean = false;

  constructor(
    private formService: FormService,
    public navigateService: NavigateService,
    private activeRoute: ActivatedRoute
  ) {
    this.basicDetails = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data) => {
      this.isUpdate = data['isUpdate'];
      this.isCreate = data['isCreate'];
    });
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
}
