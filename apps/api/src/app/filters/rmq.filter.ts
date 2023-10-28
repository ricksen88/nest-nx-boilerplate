import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { RMQError } from 'nestjs-rmq';

@Catch(RMQError)
export class RMQExceptionFilter implements ExceptionFilter {
  catch(exception: RMQError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const arr = exception.message.split(':');
    if (arr.length === 2)
      response.status(+arr[0]).json({
        statusCode: +arr[0],
        message: [arr[1].trim()],
      });
    else
      response.status(500).json({
        statusCode: 500,
        message: [exception.message],
      });
  }
}
