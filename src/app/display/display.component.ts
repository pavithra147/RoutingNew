import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
   public name!:string;
   public age!:string;
   public address!:string;
   public phoneNo!:string;
   public location!:string;
  
  constructor(private route:ActivatedRoute,private sharedService:SharedService) {
    // this.sharedService.obs$.subscribe((x)=>{
    //    this.name=JSON.stringify(x.name);
    //    this.age=JSON.stringify(x.age);
    //    this.address=JSON.stringify(x.address);
    //    this.phoneNo=JSON.stringify(x.phoneNo);
    //    this.location=JSON.stringify(x.location);
    // })
   }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.name=params['name'];
      this.age=params['age'];
      this.address=params['address'];
      this.phoneNo=params['phoneNo'];
      this.location=params['location'];
     
      
    })
  }

}
