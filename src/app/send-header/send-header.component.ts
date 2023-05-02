import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-header',
  templateUrl: './send-header.component.html',
  styleUrls: ['./send-header.component.css']
})
export class SendHeaderComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  makeApiRequest(){
    const token=localStorage.getItem('token')
    const httpOptions={
      headers:new HttpHeaders({
        'Authorization':`Bearer ${token}`
      })
    }
    this.http.get('/details',httpOptions).subscribe(res=>{
      console.log(res
        )
      
    })
  }

}
