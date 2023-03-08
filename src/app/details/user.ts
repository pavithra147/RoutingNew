import { FormControl, FormGroup } from "@angular/forms";

export interface User{
   name:string;
   age:string;
   dob:number;
   address:string;
   phoneNo:string;
   location:string;
}

export interface UserFormGroup extends FormGroup{
    value:User;
    controls:{
        name:FormControl;
        age:FormControl;
        address:FormControl;
        phoneNo:FormControl;
        location:FormControl;
    }
}