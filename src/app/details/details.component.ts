import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
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
 public item:any;
  public out!: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  public num: any;
  ngOnInit(): void {
    this.form();
    this.idFromUrl();
    this.getFromServer();
  }

  form() {
    this.formDetails = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      location: ['', [Validators.required]],
    }) as UserFormGroup;

    if (this.sharedService.table == false) {
      this.route.params.subscribe((params) => {
        this.num = params['data'];
      });
      // this.num = this.sharedService.index;
      this.sharedService.getDetails().subscribe((x) => {
        this.values = x;
        this.finalOut = this.values.filter((a: any) => {
          if (a.id == this.num) return a;
        });
       
        this.formdata = this.finalOut.map((a: any) => {
          this.out = a;
          console.log(this.out);

          return a.name;
        });

        this.formDetails.patchValue({
          name: this.out.name,
          age: this.out.age,
          address: this.out.address,
          phoneNo: this.out.phoneNo,
          location: this.out.location,
        });
      });

     
      //   this.item = this.values[this.num];
      // console.log(this.item);

      //    this.values = this.values[this.num.data];

      //  console.log(this.values);

      // this.formDetails.patchValue({
      //   name: this.values.name,
      //   age: this.values.age,
      //   address: this.values.address,
      //   phoneNo: this.values.phoneNo,
      //   location: this.values.location,
      // });
     }
     

  }

  idFromUrl(){
    this.route.params.subscribe((params) => {
      this.num = params['data'];
      console.log(this.num)
    });
  }

  getFromServer(){
    this.sharedService.getDetails().subscribe((x) => {
      this.values = x;
      console.log(this.values)

    })
  }

  editByCheck(){
    this.sharedService.getDetails().subscribe((x) => {
      this.item = x;
      console.log("kjh",this.item)

    })
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
      //   this.sharedService.editData(this.num, this.out);
     
        this.out = values;
        this.sharedService.put(this.num, this.out).subscribe();
     
       } 
      else {
        // this.sharedService.sendData(values);
        this.sharedService.postDetails(values).subscribe();
      
     }
      this.router.navigate(['/display']);
    } else {
      alert('Please fill all the details');
    }
  }
}
