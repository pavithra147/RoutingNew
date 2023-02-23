import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
   public value!:any;
   formData:any={}
  constructor(private route:ActivatedRoute,private sharedService:SharedService,private router:Router) {
   
   }

  ngOnInit(): void {
    // this.route.params.subscribe(params=>{
    //   this.name=params['name'];
    //   this.age=params['age'];
    //   this.address=params['address'];
    //   this.phoneNo=params['phoneNo'];
    //   this.location=params['location'];
     
      
    // })
    this.details();
   
  }

  details(){
    this.sharedService.obs$.subscribe((x)=>{
      this.value=x
      console.log(this.value);
   })
  }
  
  delete(){
    this.value=[];

    }
    
    edit(){
     
      this.sharedService.get(this.value);
      
      this.router.navigate(['/details'])
    
     
      
    }
  }


