import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  public  sNo=new FormControl('');
  public name = new FormControl('');
  public age = new FormControl('');
  public dob = new FormControl('');
  public address = new FormControl('');
  public phoneNo=new FormControl('');
  public location=new FormControl('');
  public action=new FormControl('');
  public value!:any;
public collect:any;
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

  public input=[this.sNo,this.name,this.age,this.dob,this.address,this.phoneNo,this.location,this.action]

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.details();
    
    
  }

 


  details() {
    this.sharedService.getDetails().subscribe({
     next:(x:any)=> {this.value = x;
   
    },
     error:(error:any)=>{alert("something went wrong")}
    });
  }
  delete(id: any) {
    this.sharedService.delete(id).subscribe({
      next:(x:any)=>{ this.details();},
      error:(error:any)=>{alert("something went wrong")}
    });
    this.details();
  }

  edit(data: any) {
    this.sharedService.edit(data);

    this.router.navigate(['/detail', data]);
  }
  add() {
    this.router.navigate(['/details']);
  }
}
