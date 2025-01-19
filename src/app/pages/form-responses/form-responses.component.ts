import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ActivatedRoute } from '@angular/router';
import { ResponsesService } from '../../services/responses.service';
import { FormResponse } from '../../common/interface/FormResponse';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from '../../components/header/header.component';
import { LabelExternalLinkComponent } from '../../components/label-external-link/label-external-link.component';
import { CommonModule } from '@angular/common';
import { PageRequest } from '../../common/interface/PageRequest';
import { FormSubmit } from '../../common/interface/FormSubmit';

@Component({
  selector: 'app-form-responses',
  standalone: true,
  imports: [
    TableModule,
    HeaderComponent,
    LabelExternalLinkComponent,
    CommonModule,
  ],
  templateUrl: './form-responses.component.html',
  styleUrl: './form-responses.component.scss',
})
export class FormResponsesComponent implements OnInit {
  formSubmits!: FormSubmit[];
  formId: string;
  totalRecords: number = 0; // Total number of records (for pagination)
  loading: boolean = false; // To show loading indicator
  pageSize: number = 10; // Number of rows per page

  constructor(
    private responsesService: ResponsesService,
    private activeRoute: ActivatedRoute
  ) {
    this.formId = this.activeRoute.snapshot.paramMap.get('formId') || '';
  }

  ngOnInit(): void {
    this.getResponses(this.formId, 0, this.pageSize);
  }

  getResponses(formId: string, page: number, size: number): void {
    this.loading = true;
    this.responsesService
      .getResponses(formId, { page, size })
      .subscribe((res) => {
        if (res && res?.data && res?.data?.responses?.content) {
          this.formSubmits = res.data.responses.content;
          this.totalRecords = res.data.responses.totalElements; // Set total number of records
          this.loading = false; // Hide loading indicator
        }
      });
  }

  onPageChange(event: any) {
    // Handle page change event from PrimeNG table
    const { first, rows } = event;
    const page = first / rows; // Calculate page number (0-based)
    this.getResponses(this.formId, page, rows);
  }
}
