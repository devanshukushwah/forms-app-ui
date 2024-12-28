import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ResponseModel } from '../common/interface/ResponseModel';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error); // Rethrow the error for further handling if needed
      })
    );
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      this.messageService.add({
        severity: 'error',
        summary: 'Network',
        detail: 'Network Error',
      });
    }

    const res: ResponseModel<String> = error.error;

    if (error.status == 401) {
      this.messageService.add({
        severity: 'error',
        summary: 'Unauthorized',
        detail: 'Please login to continue.',
      });
    } else if (!res.success && res.isAppException) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: res.errorMessage,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An unexpected error occurred.',
      });
    }
  }
}
