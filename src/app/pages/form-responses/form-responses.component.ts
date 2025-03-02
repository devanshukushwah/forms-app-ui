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
import { ButtonModule } from 'primeng/button';
import { NavigateService } from '../../core/navigate.service';
import { DateColumnComponent } from '../../components/date-column/date-column.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { MenuItem } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-form-responses',
  standalone: true,
  imports: [
    TableModule,
    HeaderComponent,
    CommonModule,
    ButtonModule,
    DateColumnComponent,
    BreadcrumbComponent,
    SkeletonModule,
  ],
  templateUrl: './form-responses.component.html',
  styleUrl: './form-responses.component.scss',
})
export class FormResponsesComponent implements OnInit {
  formSubmits!: FormSubmit[];
  formId: string;
  totalRecords: number = 0; // Total number of records (for pagination)
  isLoading: boolean = false; // To show loading indicator
  pageSize: number = 10; // Number of rows per page
  breadcrumbItems!: MenuItem[];
  totalPages = 1;

  constructor(
    private responsesService: ResponsesService,
    private activeRoute: ActivatedRoute,
    private navigateService: NavigateService
  ) {
    this.formId = this.activeRoute.snapshot.paramMap.get('formId') || '';
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { icon: 'pi pi-home', route: '/admin' },
      { label: 'responses', route: '/responses', disabled: true },
      {
        label: this.formId,
        route: `/responses/${this.formId}`,
        disabled: true,
      },
    ];

    this.getResponses(this.formId, 0, this.pageSize);
  }

  getResponses(formId: string, page: number, size: number): void {
    this.isLoading = true;
    this.responsesService
      .getResponses(formId, { page, size })
      .subscribe((res) => {
        if (res && res?.data && res?.data?.responses?.content) {
          this.formSubmits = res.data.responses.content;
          this.totalRecords = res.data.responses.totalElements; // Set total number of records
          this.totalPages = res.data.responses.totalPages; // Set total number of pages
          this.isLoading = false; // Hide loading indicator
        }
      });
  }

  onPageChange(event: any) {
    // Handle page change event from PrimeNG table
    const { first, rows } = event;
    const page = first / rows; // Calculate page number (0-based)
    this.getResponses(this.formId, page, rows);
  }

  viewResponse(subId: string) {
    // Redirect to response details page
    this.navigateService.navigateToSubmission(subId);
  }
}
