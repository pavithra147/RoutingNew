import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class LikeService {
 
  public socket!:Socket
  constructor() {
    
   }

   public connectSocket() {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('Connected to socket server!');
    });
  }
   sendCount(count:number,id:any){
    console.log(count,id);
    
    this.socket.emit('likes', count,id)
   }

   getCount(){
    return new Observable((observer:any)=>{
      this.socket.on('likes',(count)=>{
        observer.next(count)
      })
    })
   }
}
