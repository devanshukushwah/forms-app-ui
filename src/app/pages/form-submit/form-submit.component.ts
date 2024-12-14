import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-submit',
  standalone: true,
  imports: [],
  templateUrl: './form-submit.component.html',
  styleUrl: './form-submit.component.scss',
})
export class FormSubmitComponent {
  title = '';

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
    this.formService.getForm(id).subscribe((data) => {
      console.log(data);
    });
  }
}
