import { FormControl, FormGroup } from "@angular/forms";

export interface Employee{
    userName:string,
    emailId:string,
    password:string,
    role:string,
    imageData:string
   
}

export interface SignUpDetailsForm extends FormGroup{
    value:Employee;
    controls:{
        userName:FormControl,
        emailId:FormControl,
        password:FormControl,
        role:FormControl,
        imageData:FormControl
    }
}