import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { SharedService } from '../shared.service';
import { UserFormGroup } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  token:any;
  name!:string;
  role!:string;
  image!:string;
  loginForm!: UserFormGroup;
  check = false;
  wrappedPromise1$: any;
  id!: number;
  public value!: any;
  constructor(
    private fb: FormBuilder,
    public sharedService: SharedService,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.form();
  
  }
 
 
  form() {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })as UserFormGroup;
  }
  submit() {
      let values={
        emailId:this.loginForm.get('emailId')?.value,
        password:this.loginForm.get('password')?.value
      }
      this.sharedService.postLoginDetails(values).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.token=res.token;
          localStorage.setItem('token',this.token);
          this.name=res.data;
          this.role=res.role;
          this.image=res.image;
          sessionStorage.setItem('userId',res.id);
          sessionStorage.setItem('name',this.name);
          sessionStorage.setItem('role',this.role);
          sessionStorage.setItem('image',this.image);
          this.router.navigate(['/display'])
         
        },
        error: (e) => {
               alert('EmailId and Password are Invalid');
             }
      })
      this.loginForm.reset()
    // this.sharedService.getSignUpDetails().subscribe({
    //   next: (x: any) => {
    //     const emp = x.find((a: any) => {
    //       return (
    //         a.emailId === this.loginForm.value.emailId &&
    //         a.password === this.loginForm.value.password
    //       );
    //     });
    //     if (emp) {
    //       this.authService.login();
    //       console.log('login', this.authService.isLoggedIn);
      
        
          
    //       sessionStorage.setItem('name', emp.userName);

    //       sessionStorage.setItem('role', emp.role);
    //      sessionStorage.setItem('img',emp.imageData);
    //       this.router.navigate(['/display']);
    //     } 
    //    else {
    //       alert('EmailId and Password are invalid');
    //     }
    //   },
    //   error: (e) => {
    //     alert('something went wrong');
    //   },
    // });
  }
    
  }
