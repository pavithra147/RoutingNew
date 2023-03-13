import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  public values: any;
  public finalOut: any;
  public formdata: any;
  public item: any;
  public out!: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {}

  public num: any;
  ngOnInit(): void {
    this.form();
  }

  form() {
    this.formDetails = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern('^[A-Za-z].{5,20}')]],
      age: ['', [Validators.required,Validators.pattern('^[1-9].{1}')]],
      dob:[ 0,[Validators.required]],
      address: ['', [Validators.required]],
      phoneNo: ['', [Validators.required,Validators.pattern('^[6-9].{9}')]],
      location: ['', [Validators.required]],
    }) as UserFormGroup;

    this.idFromUrl();
  }

  idFromUrl() {
    this.route.params.subscribe((params) => {
      this.num = params['data'];
      console.log("navigation",this.num);
    });
    if (this.num != undefined) {
      this.editByCheck();
    }
  }

  editByCheck() {
    this.sharedService.getDetails().subscribe( {
      next:(x:any)=>{this.item = x;
      this.item = this.item.filter((a: any) => {
        if (a.id == this.num) {
          return a;
        }
      });
      this.formdata = this.item.map((a: any) => {
        this.out = a;
        return a;
      });

      this.formDetails.patchValue({
        name: this.out.name,
        age: this.out.age,
        dob:this.out.dob,
        address: this.out.address,
        phoneNo: this.out.phoneNo,
        location: this.out.location,
      });
    },
    error:(error:any)=>{
      alert("something went wrong")
    }
    })

  
  
  }

  onSubmit() {
    if (this.formDetails.valid) {
      this.submit = true;
      let values = {
        name: this.formDetails.get('name')?.value,
        age: this.formDetails.get('age')?.value,
        dob:this.formDetails.get('dob')?.value,
        address: this.formDetails.get('address')?.value,
        phoneNo: this.formDetails.get('phoneNo')?.value,
        location: this.formDetails.get('location')?.value,
      };

      this.out = values;
      if (this.num != null) {
        this.sharedService.put(this.num, this.out).subscribe({
          next:(value:any)=>{},
          error:(error:any)=>{alert("something went wrong")}
        });
        this.router.navigate(['/display']);
      }
      else{
        this.sharedService.postDetails(values).subscribe( {
          next:(value:any)=>{},
          error:(error:any)=>{alert("something went wrong")}
          
        });
        this.router.navigate(['/display']);
      }

     
    } else {
      alert('Please fill all the details');
    }
  }
}














