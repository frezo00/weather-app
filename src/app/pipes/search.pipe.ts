import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform(items: any[] | null, searchValue: string, key?: string, searchLen = 0): any[] {
    if (!items?.length || searchValue?.length < searchLen) {
      return [];
    }
    return items.filter(item => new RegExp(searchValue, 'gi').test(key ? item[key] : item));
  }
}
