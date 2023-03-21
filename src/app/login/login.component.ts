import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm!:FormGroup;
   check=false;
 id!:number
  constructor(private fb:FormBuilder,public sharedService:SharedService,private router:Router,private authService:AuthServiceService) { }

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
          this.authService.login();
         console.log( this.authService.login());
         
          
         console.log( emp.userName);
         console.log( emp.id);
        sessionStorage.setItem('name',emp.userName)
            
         sessionStorage.setItem('role',emp.role)
        //  this.check=emp.role;
          
          // this.router.navigate(['/display',this.check]);
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
