import { ArgumentsHost, ExceptionFilter, Catch } from '@nestjs/common';
import { DomainException } from '../../domain/exceptions/domain.exception';
import type { Response } from 'express';

@Catch(DomainException)
export class HtppExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = this.mapToHttpStatus(exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      error: {
        code: exception.code,
        message: exception.message,
        metadata: exception.metadata,
      },
    });
  }

  private mapToHttpStatus(exception: DomainException): number {
    const mapping: Record<string, number> = {
      INVALID_EMAIL: 400,
      USER_ALREADY_EXISTS: 409,
      INVALID_CREDENTIALS: 401,
      USER_NOT_FOUND: 404,
      PASSWORD_HASHING_ERROR: 500,
    };
    return mapping[exception.code] || 500;
  }
}
