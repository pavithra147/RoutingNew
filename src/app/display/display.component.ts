import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  public name!: string;
  public age!: string;
  public address!: string;
  public phoneNo!: string;
  public location!: string;
  public value!: any;

  public headingArray = [
    'S.No',
    'Name',
    'Age',
    'DOB',
    'Address',
    'PhoneNo',
    'Location',
    'Action',
  ];

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.details();
  }

  details() {
    this.sharedService.getDetails().subscribe({
     next:(x:any)=> {this.value = x},
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
