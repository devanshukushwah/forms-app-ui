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
import { MessageService } from 'primeng/api';
import { CopyClipboardService } from '../../core/copy-clipboard.service';
import { DateColumnComponent } from '../../components/date-column/date-column.component';

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
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  forms!: Form[];
  totalRecords: number = 0; // Total number of records (for pagination)
  loading: boolean = false; // To show loading indicator
  pageSize: number = 10; // Number of rows per page

  constructor(
    private formService: FormService,
    public navigateService: NavigateService,
    private copyClipboardService: CopyClipboardService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAdminForms(0, this.pageSize);
  }

  getAdminForms(page: number, size: number): void {
    this.loading = true;
    const pageRequest: PageRequest = { page, size };

    this.formService.getAdminForms(pageRequest).subscribe((res) => {
      if (res && res?.data && res?.data?.content) {
        this.forms = res.data.content;
        this.totalRecords = res.data.totalElements; // Set total number of records
        this.loading = false; // Hide loading indicator
      }
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
}
