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
     
      let values={
       name:this.formDetails.get('name')?.value,
       age:this.formDetails.get('age')?.value,
      address:this.formDetails.get('address')?.value,
       phoneNo:this.formDetails.get('phoneNo')?.value,
       location:this.formDetails.get('location')?.value
      }
      console.log(values)
     
     this.sharedService.sendData(values);
      
      
      this.router.navigate(['/display']);
     }
     else{
      alert("Please fill all the details")
     }
  }
  public value:any;
  setValue(){
  this.sharedService.obs$.subscribe((x)=>{
  this.value=x;
  this.formDetails.patchValue({
    name:this.value.name,
    age:this.value.age,
    address:this.value.address,
    phoneNo:this.value.phoneNo,
    location:this.value.location
  })
  console.log(this.formDetails)
  })
    
  }
 
  }



