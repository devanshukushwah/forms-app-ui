export interface ResponseModel<T> {
  data: T;
  errorMessage: string;
  isAppException: boolean;
  message: string;
  statusCode: number;
  success: boolean;
}
