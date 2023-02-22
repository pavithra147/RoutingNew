import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
   private subject:BehaviorSubject<string>
   public obs$:Observable<any>
  constructor() {
    this.subject=new BehaviorSubject<string>('');
this.obs$=this.subject.asObservable();
   }

   sendData(data:string){
     this.subject.next(data);
   }
}
