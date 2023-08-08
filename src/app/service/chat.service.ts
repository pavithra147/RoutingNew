import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public baseUrl=environment.apiUrl;
  public title=environment.title;
  public socket!: Socket
  constructor(private http:HttpClient) { }
  public connectSocket() {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('Connected to socket server!');
    });
  }
  public message(id :any,userId: any){
    const data={
      id:id,
      userId:userId
    }
    return this.http.post(`${this.baseUrl}/chat`, data)
  }
  // public chatRoom(id: any){
  //   console.log('id',id);
  //   return this.http.post(`${this.baseUrl}/joinChat`,{id})
  // }
  public retrieveMessages(insertId: any){
    this.socket.emit('initialMessage',insertId)
  }
  public oldMessages(){
    return new Observable((observer)=>{
      this.socket.on('previousMessage',(data)=>{
        console.log("data in service", data);
        observer.next(data)
      })
    })
  }
  public messagesinChatRoom(data: any){
    console.log("service",data.message);
    
    this.socket.emit('messages',data)
  }
  public chatRoom(){
    return new Observable((observer)=>{
    this.socket.on("create", (value)=>{
        console.log("chat Room", value);
        observer.next(value)
      });
      
    })
  }
}
