import { Routes } from '@angular/router';
import { FormSubmitComponent } from './pages/form-submit/form-submit.component';
import { FormResponsesComponent } from './pages/form-responses/form-responses.component';

export const routes: Routes = [
  { path: ':formId', component: FormSubmitComponent },
  { path: 'responses/:formId', component: FormResponsesComponent },
];
