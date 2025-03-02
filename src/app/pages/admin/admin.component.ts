import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormService } from '../../services/form.service';
import { Form } from '../../common/interface/Form';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NavigateService } from '../../core/navigate.service';
import { LabelExternalLinkComponent } from '../../components/label-external-link/label-external-link.component';
import { PageRequest } from '../../common/interface/PageRequest';
import { first } from 'rxjs';
import { BadgeModule } from 'primeng/badge';
import { MenuItem, MessageService } from 'primeng/api';
import { CopyClipboardService } from '../../core/copy-clipboard.service';
import { DateColumnComponent } from '../../components/date-column/date-column.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ExportService } from '../../services/export.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeaderComponent,
    TableModule,
    CommonModule,
    ButtonModule,
    DialogModule,
    LabelExternalLinkComponent,
    BadgeModule,
    DateColumnComponent,
    BreadcrumbComponent,
    SkeletonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  forms!: Form[];
  totalRecords: number = 0; // Total number of records (for pagination)
  isLoading: boolean = true; // To show loading indicator
  pageSize: number = 10; // Number of rows per page
  breadcrumbItems!: MenuItem[];
  totalPages: number = 1;
  constructor(
    private formService: FormService,
    public navigateService: NavigateService,
    private copyClipboardService: CopyClipboardService,
    private messageService: MessageService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.getAdminForms(0, this.pageSize);
    this.breadcrumbItems = [
      { icon: 'pi pi-home', route: '/admin' },
      { label: 'My form', route: '/admin', disabled: true },
    ];
  }

  getAdminForms(page: number, size: number): void {
    this.isLoading = true;
    const pageRequest: PageRequest = { page, size };

    this.formService.getAdminForms(pageRequest).subscribe((res) => {
      if (res && res.success && res?.data) {
        this.forms = res.data.content || [];
        this.totalRecords = res.data.totalElements; // Set total number of records
        this.totalPages = res.data.totalPages; // Set total number of pages
      }
      this.isLoading = false; // Hide loading indicator
    });
  }

  onPageChange(event: any) {
    // Handle page change event from PrimeNG table
    const { first, rows } = event;
    const page = first / rows; // Calculate page number (0-based)
    this.getAdminForms(page, rows);
  }

  copyToClipboard(formId: string): void {
    this.copyClipboardService.copyShareFormLink(formId);
    this.messageService.add({
      severity: 'success',
      summary: 'Share',
      detail: 'Copied to clipboard',
    });
  }

  handleExport(formId: string): void {
    this.exportService.exportForm(formId).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${formId}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Download failed:', error);
      }
    );
  }
}
