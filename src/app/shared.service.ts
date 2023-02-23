import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
   private subject:BehaviorSubject<string>
   public obs$:Observable<any>
   private sub:BehaviorSubject<string>
   public obser$:Observable<any>
   public formData:any={}
  constructor() {
    this.subject=new BehaviorSubject<string>('');
    this.obs$=this.subject.asObservable();
    this.sub=new BehaviorSubject<string>('');
    this.obser$=this.subject.asObservable();
   }

   sendData(data:string){
     this.subject.next(data);

   }
  get(res:string){
    this.sub.next(res);
  }

 
}
