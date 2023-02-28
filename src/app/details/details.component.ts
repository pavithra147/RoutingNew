import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, SelectControlValueAccessor, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { User, UserFormGroup } from './user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  public formDetails!: UserFormGroup;
  public submit = false;
 public values:any;
 public item!:any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private route:ActivatedRoute,
    private http:HttpClient
  ) {}

  public num: any;
  ngOnInit(): void {
    this.form();
    if (this.sharedService.table == false) {
      this.route.params.subscribe((params)=>{
         this.num=params['data'];
         console.log(this.num);
        })
        //this.num = this.sharedService.index;
         this.sharedService.detailsToEdit(this.num).subscribe((x)=>{this.values=x;
          console.log(this.values[this.num])
       
        });
      //  this.values= this.sharedService.get();
      //  console.log(this.values);
      //  this.values = this.values[this.num];
     
    

    
      this.formDetails.setValue({
        name: this.values.name,
        age: this.values.age,
        address: this.values.address,
        phoneNo: this.values.phoneNo,
        location: this.values.location,
      });
    
    }
    
  }


 

  form() {
    this.formDetails = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      location: ['', [Validators.required]],
    }) as UserFormGroup;

    // if (this.sharedService.table == false) {
    //   this.route.params.subscribe((params)=>{
    //      this.num=params['data'];
    //      console.log(this.num);
    //     })
    //     // this.num = this.sharedService.index;
    //      this.sharedService.getDetails().subscribe(x=>{this.values=x;
    //       console.log(this.values);
    //     //   this.item = this.values[this.num];
    //     // console.log(this.item);
    //     });
        
    // //    this.values = this.values[this.num.data];
     
    // //  console.log(this.values);
    // if(this.num===this.values.id)
    //   this.formDetails.patchValue({
    //     name: this.values[this.num].name,
    //     age: this.values[this.num].age,
    //     address: this.values[this.num].address,
    //     phoneNo: this.values[this.num].phoneNo,
    //     location: this.values[this.num].location,
    //   });
    // }
  }
  onSubmit() {
    if (this.formDetails.valid) {
      this.submit = true;
      let values = {
        name: this.formDetails.get('name')?.value,
        age: this.formDetails.get('age')?.value,
        address: this.formDetails.get('address')?.value,
        phoneNo: this.formDetails.get('phoneNo')?.value,
        location: this.formDetails.get('location')?.value,
      };

      if (this.sharedService.table == false) {
        this.sharedService.editData(this.num.data, values);
      } else {
        this.sharedService.sendData(values);
         this.sharedService.postDetails(values).subscribe();
      }
      this.router.navigate(['/display']);
    } else {
      alert('Please fill all the details');
    }
  }
}
