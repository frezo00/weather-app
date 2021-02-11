import { Pipe, PipeTransform } from '@angular/core';

// Pipe taken from: https://blog.usejournal.com/angular-optimization-memoized-pipe-functions-in-templates-75f62e16df5a

@Pipe({ name: 'fn' })
export class FnPipe implements PipeTransform {
  transform(value: any, handler: (value: any) => any, context?: any): any {
    if (context) {
      return handler.call(context, value);
    }
    return handler(value);
  }
}
