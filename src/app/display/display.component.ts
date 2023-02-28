import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    'Address',
    'PhoneNo',
    'Location',
    'Action',
  ];

 
  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe(params=>{
    //   this.name=params['name'];
    //   this.age=params['age'];
    //   this.address=params['address'];
    //   this.phoneNo=params['phoneNo'];
    //   this.location=params['location'];

    // })
    this.details();
    
  }

  details() {
    // this.sharedService.obs$.subscribe((x) => {
    //   this.value = x;
    // });
    this.sharedService.getDetails().subscribe(x=>{
      this.value=x;
    })
  }

 // delete(item: any) {
    // let index: number = this.value.indexOf[item];
    // if (index !== -1) {
    //   this.value.splice(index, 1);
    // }}
 delete(id:any){
 
    this.sharedService.delete(id).subscribe();
    this.details();
  }

  edit(data: any) {
    
    this.sharedService.edit(data);
  
    this.router.navigate(['/detail',data])
  }
  add() {
    this.sharedService.add();
    this.router.navigate(['/details']);
  }
}
