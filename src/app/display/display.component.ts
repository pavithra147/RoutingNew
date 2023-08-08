import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  public sNo = new FormControl('');
  public name = new FormControl('');
  public age = new FormControl('');
  public dob = new FormControl('');
  public address = new FormControl('');
  public phoneNo = new FormControl('');
  public location = new FormControl('');
  public action = new FormControl('');

  public searchForm!:FormGroup;

  
  public value!: any;
  public collect: any;
  public detail: any;
  public headingArray = [
    'SNo',
    'Name',
    'Age',
    'DOB',
    'Address',
    'PhoneNo',
    'Location',
    'Action',
  ];

  public headingForUser = [
    'SNo',
    'Name',
    'Age',
    'DOB',
    'Address',
    'PhoneNo',
    'Location',
  ];

  public input = [
    this.sNo,
    this.name,
    this.age,
    this.dob,
    this.address,
    this.phoneNo,
    this.location,
    this.action,
  ];
   public names:any;
   public photo:any;
  constructor(
    public sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService
  ) {

    // this.searchForm=new FormGroup({
    //   name: new FormControl(),
    //   age:new FormControl(),
    //   dob:new FormControl(),
    //   address:new FormControl(),
    //   phoneNo:new FormControl(),
    //   location:new FormControl()
    // });
  }

  ngOnInit() {
    this.details();
    this.check();
    this.loginDetails();
     this.image();
  }

  loginDetails() {
    this.names = this.sharedService.getLogin();
    
  }

  logOut() {
    this.sharedService.logOut();
    
  }

  image(){
    this.photo= sessionStorage.getItem('img');
  }

  //...........................................
  public admin = false;

  //...................
  check() {

    const role=sessionStorage.getItem('role');
    if(role=="Admin"){
      this.admin=true;
    }
  }

  details() {
    this.sharedService.getDetails().subscribe({
      next: (x: any) => {
        this.value = x;
        console.log(this.value);
        
        
      },
      error: (error: any) => {
        alert('something went wrong');
      },
    });
  }
  delete(id: any) {
    console.log(id);
    
    this.sharedService.delete(id).subscribe({
     next: (x: any) => {
        this.details();
      },
      error: (error: any) => {
        alert('something went wrong');
      },
    });
    this.details();
  }
  // this.sharedService.delete(id).subscribe({
  //   next:(x:any)=>{ this.details();},
  //   error:(error:any)=>{alert("something went wrong")}
  // });
  // this.details();

  edit(data: any) {
    console.log(data);
    this.sharedService.edit(data);
    this.router.navigate(['/detail', data]);
  }
}
