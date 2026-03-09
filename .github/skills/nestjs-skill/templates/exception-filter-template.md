# Exception Filter Template

Use for uniform API errors and stable machine-readable responses.

```ts
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const payload = {
      code: this.resolveCode(exception),
      message: this.resolveMessage(exception),
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(payload);
  }

  private resolveCode(exception: unknown): string {
    return exception instanceof HttpException ? 'HTTP_ERROR' : 'INTERNAL_ERROR';
  }

  private resolveMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      return typeof body === 'string' ? body : 'Request failed';
    }
    return 'Unexpected error';
  }
}
```

## Notes

- Keep raw stack traces out of API responses.
- Add correlation id when available.
- Map domain errors to explicit transport status.
