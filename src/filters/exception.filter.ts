import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from 'src/errors/ErrorResponse';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log('Request Body:', request.body);

    if (exception instanceof ErrorResponse) {
      console.log('Custom ErrorResponse caught');
      console.log(exception)
      response.status(exception.errorCode).json({
        errorCode: exception.errorCode,
        devMessage: exception.devMessage,
        data: exception.data ?? request.body, 
      });
    } else if (exception instanceof HttpException) {
      // Handle standard HttpException (e.g., thrown by NestJS internally)
      console.log('Standard HttpException caught');
      const status = exception.getStatus();
      const errorResponse = exception.getResponse();
      response.status(status).json({
        errorCode: status,
        devMessage: errorResponse['message'] || 'An error occurred',
        data: request.body, 
      });
    } else {
      // Fallback for unexpected exceptions
      console.error('Unexpected Exception:', exception);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
        devMessage: 'Internal server error',
        data: null,
      });
    }
  }
}
