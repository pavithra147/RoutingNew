import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { CustomerFormGroup } from './customer';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  public formDetails!: CustomerFormGroup;
  public submit = false;
  public values: any;
  public finalOut: []=[];
  public formdata: any;
  public item: any;
  public out!: any;
  public sample!: any;
  b: any;
  //a:any;
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
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z].{4,20}')]],
      age: ['', [Validators.required, Validators.pattern('^[1-9].{1}')]],
      dob: [0, [Validators.required]],
      address: ['', [Validators.required]],
      phoneno: ['', [Validators.required, Validators.pattern('^[6-9].{9}')]],
      location: ['', [Validators.required]],
    }) as CustomerFormGroup;

    this.idFromUrl();
  }

  idFromUrl() {
    this.route.params.subscribe((params) => {
      this.num = params['data'];
      console.log('navigation', this.num);
    });
    if (this.num != undefined) {
      this.editByCheck();
    }
  }

  editByCheck() {
    this.sharedService.getDetails().subscribe({
      next: (b: any) => {
        this.item = b;
        this.item = this.item.map((a: any) => {
          if (a.id == this.num) {
            return a;
          }

          this.item=[{a:10},{b:20}]
          this.finalOut=this.item.map((a:any)=>{
            this.out=a
            
            return a;
          })
          // console.log(this.finalOut);
          // console.log(this.out);
          
          
             
          
          
        });

        //  this.item=this.item.filter((obj:any )=>{'name' in obj }).map((obj:any) =>{obj.name})
        //  console.log(this.item);

        this.formdata = this.item.find((a: any) => {
          //this.out = a;
          return a;

         
        });

        this.formDetails.patchValue({
          name: this.formdata.name,
          age: this.formdata.age,
          dob: this.formdata.dob,
          address: this.formdata.address,
          phoneno: this.formdata.phoneno,
          location: this.formdata.location,
        });
      },
      error: (error: any) => {
        alert('something went wrong');
      },
    });
  }

  onSubmit() {
    if (this.formDetails.valid) {
      this.submit = true;
      let values = {
        name: this.formDetails.get('name')?.value,
        age: this.formDetails.get('age')?.value,
        dob: this.formDetails.get('dob')?.value,
        address: this.formDetails.get('address')?.value,
        phoneno: this.formDetails.get('phoneno')?.value,
        location: this.formDetails.get('location')?.value,
      };

      this.out = values;
      if (this.num != null) {
        this.sharedService.put(this.num, this.out).subscribe({
          next: (value: any) => {},
          error: (error: any) => {
            alert('something went wrong');
          },
        });
        this.router.navigate(['/display']);
      } else {
        this.sharedService.postDetails(values).subscribe({
          next: (value: any) => {},
          error: (error: any) => {
            alert('something went wrong');
          },
        });
        this.router.navigate(['/display']);
      }
    } else {
      alert('Please fill all the details');
    }
  }
}
