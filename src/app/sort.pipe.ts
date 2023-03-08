import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';

@Pipe({
  name: 'sort',
  pure:true
})
export class SortPipe implements PipeTransform {

//   transform(value: any[],search:string): any[]{

//    if(!search){
//     return value
//    }
//    return value.filter(a=>{
//     const name=a.name.toLowerCase().includes(search.toLowerCase())
//     const age=a.age.toString().includes(search)
//     const dob=a.dob.toString().includes(search)
//     const address=a.dob.toLowerCase().includes(search.toLowerCase())
//     const phoneNo=a.phoneNo.toString().includes(search)
//     const location=a.location.toLowerCase().includes(search.toLowerCase())
//     return(name && age && dob && address && phoneNo && location)
//    })
// }

transform(list: any[], value: string[], key: string[]): any {
  value.forEach((name:any, index) => {
    
    
    if (name){
      
      list = list.filter((item) => {
      
        return (item[key[index]]
          .toString()
          .toLowerCase()
          .indexOf(name.toString().toLowerCase()) !== -1)
      });
     
    }
  });
  
  return list;
}


}
