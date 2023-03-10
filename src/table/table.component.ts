import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  name = new FormControl('');
  ageNo = new FormControl('');
  dob = new FormControl();
  address = new FormControl('');
  phoneNo = new FormControl('');
  location = new FormControl('');
 
  @Input() inputValues:any[]=[];
  @Input() head: string[] = [];
  @Input() body: any[] = [];
  public page: number = 1;
  public count: number = 0;
  tableSize: number = 5;
  public filter!: string;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  public source!: any;
  public user: any;
  public age: any;
  public show = false;
  public collect: any;

  constructor(private sharedService: SharedService,private http:HttpClient) {}

  ngOnInit() {
    this.sources();

   
  }
  public collection: any;
  filtering(data: any, title: any) {
    title = title.toLowerCase();

    // this.user=this.body.filter((el)=>{
    //   title=title;
    //    return el[title] == data.value.filter;
    //   })
    //   console.log(data.value);

    // if(this.user.length==0){
    //   return this.body=this.source;
    // }

    // else{
    //   return this.body=this.user;
    // }
    console.log(this.collect);

    // this.collect.forEach((name:any,index)=>{
    //   if(name){
    //     console.log(index);

    //     this.body=this.body.filter((item)=>{
    //       console.log(item[title]);

    //       return (item[title].toString().toLowerCase()
    //       .indexOf(name.toString().toLowerCase())!==-1)
    //     })
    //   }
    // });
    // return this.body;
  }

  sources() {
    this.sharedService.getDetails().subscribe({
      next: (x: any) => (this.source = x),
      error: (error: any) => {
        alert('something went wrong');
      },
    });
  }
  deleted(item: any) {
    this.delete.emit(item);
  }
  editable(item: any) {
    this.edit.emit(item);
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  public display = true;
  public item = false;
  sort(title: any, index: any) {
    title = title.toLowerCase();
    console.log(title);
   
  
    this.sharedService.getDetails().subscribe({
      next: (a: any) => {this.source = a
        
      },
      error: (error: any) => {
        alert('something went wrong');
      },
    });

    if (this.item == true) {
      this.body = this.source.sort((a: any, b: any) => {
      
        console.log(title);

      

        const nameA = a[title];
        const nameB = b[title];

        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }
        return 0;
      });

      this.item = false;
    } else {
      this.body = this.source.sort((a: any, b: any) => {
        const nameA = a[title];
        const nameB = b[title];

        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }

        return 0;
      });
      this.item = true;
      //  if(index==title[index]){
      //   this.display=true;
      //  }
    }
  }

  toggle() {
    this.show = !this.show;
  }

  // icon(index:any){
  //  this.display=!this.display;
  // }
 
 
}
