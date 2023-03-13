import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public  signUpForm!:FormGroup;
  public  option=['Employee','Admin'];
  public submitt=false;
  constructor(private fb:FormBuilder,private sharedService:SharedService) { }

  ngOnInit(): void {
    this.form();
  }
  form(){
    this.signUpForm= this.fb.group({
      userName :['',[Validators.required]],
      emailId:['',[Validators.required]],
      password:['',[Validators.required]],
      role:[this.option[0]]
    })
  }
  submit(){
        if(this.signUpForm.valid){
          this.submitt=true;
          let details={
            userName:this.signUpForm.get('userName')?.value,
            emailId:this.signUpForm.get('emailId')?.value,
            password:this.signUpForm.get('password')?.value,
            role:this.signUpForm.get('role')?.value
          };
         this.sharedService.signUpDetails(details).subscribe({
          next:(value:any)=> {},
          error:(error:any)=> {alert("something went wrong")}
         });

        }
        else{
          alert("please fill all the details");
        }
        this.signUpForm.reset();
  }

}
