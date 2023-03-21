import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  @Input() headForEmployee: string[] = [];
  @Input() inputValues: any[] = [];
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
  public admin = false;
  constructor(
    private sharedService: SharedService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sources();
    this.validate();
    
  }

  validate() {
    // this.route.params.subscribe((params) => {
    //   this.collect = params;
    //   //console.log(this.collect.check);

    //   if (this.collect.check === 'Admin') {
    //     this.admin = true;
    //   }
    // });

    const role=sessionStorage.getItem('role');
    if(role=="Admin"){
      this.admin=true;
    }
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
  public indexNumber: any;
  public click=0;

  displayFunction=(title:any)=>{
    console.log(title);
  }
  sort(title: any, index: any) {
    title = title.toLowerCase();
  this.indexNumber=this.head[index].toLowerCase();
  console.log(this.indexNumber);
  console.log(title);

  console.log(this.display);
  // if(title === this.indexNumber){
  
  //     this.display=true;
    

  // }
  
    this.sharedService.getDetails().subscribe({
      next: (a: any) => {
        this.source = a;
      },
      error: (error: any) => {
        alert('something went wrong');
      },
    });

    if (this.item == true) {
      this.body = this.source.sort((a: any, b: any) => {
        console.log(title);
        // console.log(this.indexNumber);
       

      //   if(title === this.indexNumber){
  
      //     this.display=true;
        
    
      // }

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
      // this.display=false
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

      //this.display=true;
    }
  }

  toggle() {
    this.show = !this.show;
  }

  // icon(index:any){
  //  this.display=!this.display;
  // }
}
