import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { SignUpDetailsForm } from './employee';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signUpForm!: SignUpDetailsForm;
  public option = ['Employee', 'Admin'];
  public submitt = false;
  public selectedFile:any;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form();
     this.getImage();
  }
img:any;
  getImage(){
    this.sharedService.getSignUpDetails().subscribe((c)=>{
      this.formData=c;
     this.formData=this.formData.map((a:any)=>{
      //console.log(a);
   this.selectedFile=a;
        return a
     })

    
     this.img=this.selectedFile.imageData
    })

  }

  form() {
    this.signUpForm = this.fb.group({
      userName: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: [this.option[0]],
      imageData: ['']
    }) as SignUpDetailsForm;
  }
  imageUpload(event: any) {

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=()=>{ 
      this.signUpForm.patchValue({
        imageData:reader.result
     
      })
      
    }
  
   
  }

  formData:any;

  submit() {
    if (this.signUpForm.valid) {
      this.submitt = true;

      let details={
        userName:this.signUpForm.get('userName')?.value,
        emailId:this.signUpForm.get('emailId')?.value,
        password:this.signUpForm.get('password')?.value,
        role:this.signUpForm.get('role')?.value,
        imageData:this.signUpForm.get('imageData')?.value
      
      };
  
    
    
  
      this.sharedService.signUpDetails(details).subscribe({
        next: (value: any) => {
          console.log(value);
        },
        error: (error: any) => {
          alert('something went wrong');
        },
      });
  
    } else {
      alert('please fill all the details');
    }
  
    this.signUpForm.reset();
  }


}
