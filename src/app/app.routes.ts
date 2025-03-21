import { Routes } from '@angular/router';
import { FormSubmitComponent } from './pages/form-submit/form-submit.component';
import { FormResponsesComponent } from './pages/form-responses/form-responses.component';
import { AuthGuard } from './gaurds/AuthGaurds';
import { AdminComponent } from './pages/admin/admin.component';
import { FormComponent } from './pages/form/form.component';
import { FormSubmissionComponent } from './pages/form-submission/form-submission.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: FormComponent,
    canActivate: [AuthGuard],
    data: { isCreate: true },
  },
  {
    path: 'edit/:formId',
    component: FormComponent,
    canActivate: [AuthGuard],
    data: { isUpdate: true },
  },
  {
    path: 'f/:formId',
    component: FormSubmitComponent,
	canActivate: [AuthGuard],
  },
  {
    path: 'responses/:formId',
    component: FormResponsesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'submission/:subId',
    component: FormSubmissionComponent,
    canActivate: [AuthGuard],
  },
];
