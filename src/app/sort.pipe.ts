import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';

@Pipe({
  name: 'sort',
  pure:true
})
export class SortPipe implements PipeTransform {

  transform(value: any[],filter:string): any[]{

    value.sort((a:any,b:any)=>{
      if(a[filter] > b[filter]){
       
        return 1;

      }
      if(a[filter] < b[filter]){
       
        return -1;
      }
      return 0;
    })
  return value;
  } 
   
}
