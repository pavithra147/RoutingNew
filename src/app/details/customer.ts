import { FormControl, FormGroup } from "@angular/forms";

export interface Customer{
    name:string;
    age:string;
    dob:number;
    address:string;
    phoneno:string;
    location:string;
 }
 
 export interface CustomerFormGroup extends FormGroup{
     value:Customer;
     controls:{
         name:FormControl;
         age:FormControl;
         address:FormControl;
         phoneno:FormControl;
         location:FormControl;
     }
 }