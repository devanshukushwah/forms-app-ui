import { Component } from '@angular/core';
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
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  basicDetails: FormGroup;

  constructor(private formService: FormService) {
    this.basicDetails = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  handleBasicDetailSubmit(): void {
    const form: Form = this.basicDetails.value;
    this.formService.addForm(form).subscribe((res) => {
      this.resetBasicDetailForm();
    });
  }

  resetBasicDetailForm(): void {
    this.basicDetails.reset();
  }
}
