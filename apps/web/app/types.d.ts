type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  responseObject: T;
  message: string;
};
