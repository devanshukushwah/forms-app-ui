import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ActivatedRoute } from '@angular/router';
import { ResponsesService } from '../../services/responses.service';
import { FormResponse } from '../../common/interface/FormResponse';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from '../../components/header/header.component';
import { LabelExternalLinkComponent } from '../../components/label-external-link/label-external-link.component';

@Component({
  selector: 'app-form-responses',
  standalone: true,
  imports: [TableModule, HeaderComponent, LabelExternalLinkComponent],
  templateUrl: './form-responses.component.html',
  styleUrl: './form-responses.component.scss',
})
export class FormResponsesComponent {
  formResponses!: FormResponse;

  constructor(
    private responsesService: ResponsesService,
    private activeRoute: ActivatedRoute
  ) {
    const paramId = this.activeRoute.snapshot.paramMap.get('formId');

    if (paramId) {
      this.getResponses(paramId);
    }
  }

  getResponses(formId: string): void {
    this.responsesService.getResponses(formId).subscribe((res) => {
      if (res && res.data) {
        this.formResponses = res.data;
      }
    });
  }
}
