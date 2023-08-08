import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
   @Input() messageContent: string | undefined;
  @Input() userName!: string
  @Input() image:any
  @Input() selectedId:string | undefined
  @Input() sender:any=[]
  @Input() receiver:any=[]
  @Input() message:any=[]
  @Input() oldMessage:any=[]
  @Output() messageContentChange = new EventEmitter<string>()
  @Output() sendMessage = new EventEmitter<string>()
  
  constructor(private chatService:ChatService) {
  }

   
  ngOnInit(): void {
  }
  
  send(){
    console.log("msg",this.messageContent);
    this.sendMessage.emit(this.selectedId)
    console.log("component",this.messageContent);
    
    this.messageContentChange.emit(this.messageContent)
  }
   onSubmit(){
    this.send()
   }
}
