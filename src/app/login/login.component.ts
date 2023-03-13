import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm!:FormGroup;
   check=false;
  constructor(private fb:FormBuilder,private sharedService:SharedService,private router:Router) { }

  ngOnInit(): void {
    this.form();
  }

  form(){
    this.loginForm= this.fb.group({
      userName :['',[Validators.required]],
      emailId:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  submit(){
    this.sharedService.getSignUpDetails().subscribe({
      next:(x:any)=>{
        const emp =x.find((a:any)=>{
          return(
            a.userName === this.loginForm.value.userName &&
            a.emailId === this.loginForm.value.emailId && 
            a.password === this.loginForm.value.password 

           
          )
        });
        if(emp){
         console.log(emp.role);
         
          this.check=emp.role;
          
          this.router.navigate(['/display',this.check]);
        }
        else if(this.loginForm.value.userName=='Pavithra' && this.loginForm.value.password=='pavi@123'){
          
          this.router.navigate(['/display']);
        }
        else{
          alert("User not found");
        }
      },
      error:(e)=>{
        alert("something went wrong");
      }
    });
  }

}
