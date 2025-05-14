import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { NameRequiredError } from '../core/domain/error/NameRequiredError';
import { DomainError } from '../core/base/domain-error';
import { RoomNotFoundError } from '../core/domain/error/RoomNotFoundError';
import { InvalidTalkTimeError } from '../core/domain/error/InvalidTalkTimeError';
import { TalkOverlapError } from '../core/domain/error/TalkOverlapError';
import { UserNotFoundError } from '../core/domain/error/UserNotFoundError';
import { UserAlreadyExistsError } from '../core/domain/error/UserAlreadyExistsError';
import { WrongEmailFormatError } from '../core/domain/error/WrongEmailFormatError';
import { WrongPasswordFormatError } from '../core/domain/error/WrongPasswordFormatError';

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = ctx.getResponse();

    const status = this.mapErrorTypeToStatusCode(exception);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }

  private mapErrorTypeToStatusCode(exception: DomainError): number {
    if (
      exception instanceof NameRequiredError ||
      exception instanceof InvalidTalkTimeError ||
      exception instanceof TalkOverlapError
    ) {
      return HttpStatus.BAD_REQUEST;
    }
    if (exception instanceof RoomNotFoundError) {
      return HttpStatus.NOT_FOUND;
    }
    if (exception instanceof UserNotFoundError) {
      return HttpStatus.NOT_FOUND;
    }
    if (exception instanceof UserAlreadyExistsError) {
      return HttpStatus.CONFLICT;
    }
    if (exception instanceof WrongEmailFormatError) {
      return HttpStatus.BAD_REQUEST;
    }
    if (exception instanceof WrongPasswordFormatError) {
      return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
