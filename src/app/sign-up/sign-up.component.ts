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
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public  signUpForm!:SignUpDetailsForm;
  public  option=['Employee','Admin'];
  public submitt=false;
  public img:any;

  selectedFile!: ImageSnippet;
  constructor(private fb:FormBuilder,private sharedService:SharedService,private http:HttpClient) { }
public image!:File
  ngOnInit(): void {
    this.form();
   // this.getImage();
  }
 
  getImage(){
    this.sharedService.getSignUpDetails().subscribe((c)=>{
      this.img=c;
     this.img=this.img.find((a:any)=>{
      console.log(a);
      
        return a.file
     })
      
     console.log(this.img);
    })
    
  }
  
  form(){
    this.signUpForm= this.fb.group({
      userName :['',[Validators.required]],
      emailId:['',[Validators.required]],
      password:['',[Validators.required]],
      role:[this.option[0]],
      file:[this.image],
      fileSource:['']
    })as SignUpDetailsForm
  }
  imageUpload(event:any){
     this.image =event.target.files[0];
     console.log(this.image);
     console.log(this.image.name);
     this.signUpForm.patchValue({
       fileSource:this.image
       
     })
     
  }
 
  submit(){
        if(this.signUpForm.valid){
          this.submitt=true;
          let details={
            userName:this.signUpForm.get('userName')?.value,
            emailId:this.signUpForm.get('emailId')?.value,
            password:this.signUpForm.get('password')?.value,
            role:this.signUpForm.get('role')?.value,
            file:this.signUpForm.get('fileSource')?.value
            
          };

            
          
         
 
         this.sharedService.signUpDetails(details).subscribe({
          next:(value:any)=> {console.log(value);
          },
          error:(error:any)=> {alert("something went wrong")}
         });
         const formData=new FormData();
         formData.append('file',this.signUpForm.get('fileSource')?.value)
        
         this.http.post("http://localhost:3000/img",formData).subscribe((x)=>{console.log(x)});
         

        }
        else{
          alert("please fill all the details");
        }
        this.signUpForm.reset();
  }
 

  
}


