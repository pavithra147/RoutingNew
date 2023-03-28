import { FormControl, FormGroup } from "@angular/forms";

export interface User{
    emailId:"string",
    password:"string"
}

export interface UserFormGroup extends FormGroup{
    value:User;
    controls:{
        emailId:FormControl,
        password:FormControl
    }
}