import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
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
    this.details();
    //this.login()
  }
  details() {
    this.sharedService.getDetails().subscribe({
      next: (x: any) => {
        this.value = x;
      },
      error: (error: any) => {
        alert('something went wrong');
      },
    });
  }

  login() {
    if (this.authService.login() == true) {
      this.router.navigate(['/display']);
    } else if (this.authService.login() == false) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  form() {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  submit() {
    this.sharedService.getSignUpDetails().subscribe({
      next: (x: any) => {
        const emp = x.find((a: any) => {
          return (
            a.emailId === this.loginForm.value.emailId &&
            a.password === this.loginForm.value.password
          );
        });
        if (emp) {
          this.authService.login();
          console.log('login', this.authService.isLoggedIn);
        console.log('img',emp.imageData);
        
          
          sessionStorage.setItem('name', emp.userName);

          sessionStorage.setItem('role', emp.role);
         sessionStorage.setItem('img',emp.imageData);
          this.router.navigate(['/display']);
        } else {
          alert('EmailId and Password are invalid');
        }
      },
      error: (e) => {
        alert('something went wrong');
      },
    });
  }
}
