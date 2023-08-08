import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ChatService } from '../service/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css'],
})
export class ChatComponentComponent implements OnInit {
  public registerDetail: any;
  public userId: any;
  public insertedId: any;
  public messageContents!: string;
  public message: any = [];
  public chatMessage: any = [];
  public oldMessages: any = [];
  select: string | undefined;
  public display = false;
  public show = true;
  public userName!: string;
  public image: any;
  public sender: any = [];
  public senderMessage: any = [];
  public receiver: any = [];
  public receiverMessage: any = [];
  constructor(
    private sharedService: SharedService,
    private chatService: ChatService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.chatService.connectSocket();
    this.signUp();
    
  }
  signUp() {
    this.userId = sessionStorage.getItem('userId');
    console.log(this.userId);
    this.sharedService
      .registerDetailExceptUserId(this.userId)
      .subscribe((ans) => {
        console.log("accounts",ans);
        this.registerDetail = ans;
      });
  }
  userChat(user: any) {
    this.display = true;
    this.show = false;
    this.select = user._id;
    this.userName = user.userName;
    this.image = user.imageData;
    this.chatService.message(user._id, this.userId).subscribe((ans: any) => {
      this.insertedId = ans.insertedId;
      console.log('insert', this.insertedId);

      this.chatService.retrieveMessages(this.insertedId);
      this.chatService.oldMessages().subscribe((val) => {
        this.senderMessage = [];
        this.receiverMessage = [];
        this.oldMessages = val;
        // this.oldMessages = this.oldMessages.map((msg: any) => {
        //   console.log(msg.message);
        //   return msg.message;
        // });
        // console.log('msegss', this.oldMessages);
        // this.message = this.oldMessages;
         this.oldMessages = this.oldMessages.map((msg:any)=>{
          
          console.log("message",msg.message);
          
            if(this.userId === msg.senderId){
              this.senderMessage.push(msg.message)
              console.log("sender",this.senderMessage);
            } 
            else{
              this.receiverMessage.push(msg.message)
              console.log("receiver",this.receiverMessage)
            }
            
            
          })
          // this.senderMessage = []
          // console.log("after",this.senderMessage);
          // this.receiverMessage =  []
          // console.log("after receiver", this.receiverMessage);
          
      });

    });
  }
  messageContentChange(value: string) {
    console.log("value",value);
    
    this.messageContents = value;
    console.log("content",this.messageContents);
    
  }
  sendMessage(id: any) {
   
    console.log("check",this.messageContents);
    
    console.log('Selected User ID:', this.select);
    console.log('Send Message User ID:', id);
    console.log('message', this.messageContents);
    console.log('userId', this.userId);

    const data = {
      roomId: this.insertedId,
      senderId: this.userId,
      receiveId: this.select,
      message: this.messageContents,
    };
    console.log(data);

    this.chatService.messagesinChatRoom(data);
    this.chatService.chatRoom().subscribe((res: any) => {
      console.log(res);

      this.message = res;
      console.log('chat', this.message);
      this.senderMessage=[]
      this.message = this.message.map((message: any) => {
        if(this.userId === message.senderId){
          console.log("send",message.message);
           this.senderMessage.push(message.message)
         return this.senderMessage
        }
       
      });
      console.log('org', this.senderMessage);
    });
  }
}
