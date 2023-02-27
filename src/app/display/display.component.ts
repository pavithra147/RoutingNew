import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
   
   public headingArray=['S.No','Name','Age','Address','PhoneNo','Location','Action'];
  
  @ViewChild('form') forms!:NgForm;
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
      
     
    })
 
  }
  
  delete(item:any){
    console.log(item);
    console.log(this.value.index);
    console.log(this.value[item])
    let index:number=this.value.indexOf[item]
    if(index !== -1){
      this.value.splice(index,1);
    }

    }
    
    edit(data:any){
      console.log(data);
      // this.sharedService.get(this.value);
      
      this.router.navigate(['/details'])
     //this.forms.setValue(data);
    
    
      
    }
  
   
   
  }


