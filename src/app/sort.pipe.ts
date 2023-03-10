import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';

@Pipe({
  name: 'sort',
  pure: true,
})
export class SortPipe implements PipeTransform {
  transform(list: any[], value: any[], key: string[]): any {
    value.forEach((name: any, index) => {
      if (name) {
        list = list.filter((item) => {
          return (
            item[key[index]]
              .toString()
              .toLowerCase()
              .indexOf(name.toString().toLowerCase()) !== -1
          );
        });
      }
    });

    return list;
  }
}
