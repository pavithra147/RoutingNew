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
      emailId:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  submit(){
    this.sharedService.getSignUpDetails().subscribe({
      next:(x:any)=>{
        const emp =x.find((a:any)=>{
          return(
            a.emailId === this.loginForm.value.emailId && 
            a.password === this.loginForm.value.password 

           
          )
        });
        if(emp){
         console.log( emp.userName);
        let details={
           userName:emp.userName
         }
          this.sharedService.loginPersonDetails(details).subscribe({
            next:(value)=>{console.log(value);},
            error:(e)=>{
              alert("Something Went Wrong")
            }
            
          })
          this.check=emp.role;
          
          this.router.navigate(['/display',this.check]);
        }
        else if(this.loginForm.value.userName=='Pavithra' && this.loginForm.value.password=='pavi@123'){
          
          this.router.navigate(['/display']);
        }
        else{
          alert("EmailId and Password are invalid");
        }
      },
      error:(e)=>{
        alert("something went wrong");
      }
    });
  }

}
