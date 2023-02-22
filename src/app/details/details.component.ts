import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public  formDetails!:FormGroup;
  public submit=false;
  constructor(private formBuilder:FormBuilder,private router:Router,private sharedService:SharedService) { }

  ngOnInit(): void {
    this.formDetails=this.formBuilder.group({
         name:['',[Validators.required]],
         age:['',[Validators.required]],
         address:['',[Validators.required]],
         phoneNo:['',[Validators.required]],
         location:['',[Validators.required]]
    })

    
  }
  onSubmit(){
    if(this.formDetails.valid){
      this.submit=true;
      const name=this.formDetails.get('name')?.value;
      const age=this.formDetails.get('age')?.value;
      const address=this.formDetails.get('address')?.value;
      const phoneNo=this.formDetails.get('phoneNo')?.value;
      const location=this.formDetails.get('location')?.value;
       alert("Your details are Submitted");
       this.sharedService.sendData(this.formDetails.value);
 this.router.navigate(['/display',name,age,address,phoneNo,location]);
     }
     else{
      alert("Please fill all the details")
     }
  }

}
