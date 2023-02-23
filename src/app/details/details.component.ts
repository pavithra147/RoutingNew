import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import  {User, UserFormGroup}  from './user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public  formDetails!:UserFormGroup;
  public submit=false;
  
  constructor(private formBuilder:FormBuilder,private router:Router,private sharedService:SharedService,private route:ActivatedRoute) {

   }
   public name!:string;
   public age!:string;
   public userDetails:any;
   public formData:any ={};
  
   ngOnInit(): void {
    this.form();
    
  }
  form(){
    this.formDetails=this.formBuilder.group({
      name:['',[Validators.required]],
      age:['',[Validators.required]],
      address:['',[Validators.required]],
      phoneNo:['',[Validators.required]],
      location:['',[Validators.required]]
 })as UserFormGroup;  
  }
  onSubmit(){
    if(this.formDetails.valid){
      this.submit=true;
      this.userDetails=[];
      let values={
       name:this.formDetails.get('name')?.value,
       age:this.formDetails.get('age')?.value,
      address:this.formDetails.get('address')?.value,
       phoneNo:this.formDetails.get('phoneNo')?.value,
       location:this.formDetails.get('location')?.value
      }
      this.userDetails.push(values);
      console.log(this.userDetails);
      
      alert("Your details are Submitted");
      this.sharedService.sendData(this.userDetails);
      console.log(this.sharedService.sendData(this.userDetails));
      
      this.router.navigate(['/display']);
     }
     else{
      alert("Please fill all the details")
     }
  }
  // setValue(){
  //   this.formDetails.setValue({
  //     name:this.formDetails.get('name')?.value,
  //     age:this.formDetails.get('age')?.value,
  //     address:this.formDetails.get('address')?.value,
  //     phoneNo:this.formDetails.get('phoneNo')?.value,
  //     location:this.formDetails.get('location')?.value
  //   })
  //   this.sharedService.obser$.subscribe((x)=>{
      
  //     this.collection=JSON.stringify(x);
  //     console.log(this.collection);
    

  //   });
  // }
  public collection!:any;
    
   
  }



