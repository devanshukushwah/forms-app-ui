import { Routes } from '@angular/router';
import { FormSubmitComponent } from './pages/form-submit/form-submit.component';
import { FormResponsesComponent } from './pages/form-responses/form-responses.component';
import { AuthGuard } from './gaurds/AuthGaurds';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  { path: ':formId', component: FormSubmitComponent },
  {
    path: 'responses/:formId',
    component: FormResponsesComponent,
    canActivate: [AuthGuard],
  },
];
