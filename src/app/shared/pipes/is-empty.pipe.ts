import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isEmpty',
})
export class IsEmptyPipe implements PipeTransform {
  transform(value: any): any {
    if (value === null || value === '' || value === undefined) {
      return '-';
    }
    return value;
  }
}
