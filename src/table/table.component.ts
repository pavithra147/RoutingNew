import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  phoneno = new FormControl('');
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
  public Arrowtoggle = 'fas fa-arrow-down';

  @ViewChild('arrow') arrows: ElementRef | undefined;

  constructor(
    private sharedService: SharedService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}


 public searchForm!:FormGroup
  ngOnInit() {
    this.sources();
    this.validate();

    
  }

 public array:any[]=[];
 public keys:any;
  searchFilter(values:any,index:any,body:any){
  // console.log("values",this.inputValues[index].value);
   this.keys = this.body.map((obj:any) => Object.keys(obj))[0];
// console.log(this.keys);

// console.log("key",this.keys[index]);
 
   
   this.array.push(values);
 //  console.log(this.array);
   this.sharedService.getDetails().subscribe({
    next: (x: any) => {this.source = x;
    
     
    this.inputValues.forEach((x:any,index)=>{
     // console.log("name",x);
    // console.log( this.inputValues[index].value);
      
      if( x){
        this.source=this.source.filter((item:any)=>{
          console.log('thing',item[this.keys[index]]);
       //   console.log('index',item[this.keys[index]].toString().toLowerCase().
          //indexOf(x.toString().toLowerCase()));
          
          return(
            item[this.keys[index]].toString().toLowerCase().
            indexOf( x.toString().toLowerCase())!== -1
          )
        })
      }
    })
   // console.log(this.source);
    
  return this.source},
    error: (error: any) => {
      alert('something went wrong');
    },
  });
   
  }

  validate() {
    // this.route.params.subscribe((params) => {
    //   this.collect = params;
    //   //console.log(this.collect.check);

    //   if (this.collect.check === 'Admin') {
    //     this.admin = true;
    //   }
    // });

    const role = sessionStorage.getItem('role');
    if (role == 'Admin') {
      this.admin = true;
    }
  }
  public collection: any;
  filtering(data: any, title: any) {
    title = title.toLowerCase();
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
  public display: any;
  public item = false;
  public indexNumber: any;
  public arrow: any;
  public object: any;

  // up(title:any,index:any){

  // this.indexNumber=this.head.find((a:any)=>{
  //   if(title==a){
  //     return title;
  //   }
  // })
  // this.collect=this.indexNumber
  // if(this.collect == this.indexNumber){
  //   this.Arrowtoggle='fas fa-arrow-down'
  // }

  // }

  down(title: any, index: any) {
    this.indexNumber = this.head.map((a: any) => {
      if (title == a) {
        return this.object[index];
      }
    });
    console.log(this.indexNumber);
    this.display = this.indexNumber;
    console.log('down', this.display);
  }

  // arrowToggle(title:any,index:any){

  //   this.indexNumber=this.head.map((a:any)=>{
  //     if(title==a && (this.Arrowtoggle='fas fa-arrow-down') ){
  //       this.Arrowtoggle='fas fa-arrow-up';
  //       console.log(this.Arrowtoggle);
  //     }
  //     else{
  //       this.Arrowtoggle='fas fa-arrow-down'
  //       console.log(this.Arrowtoggle);

  //     }
  //   })

  //}
  sort(title: any, index: any) {
    title = title.toLowerCase();

    this.indexNumber = this.head.find((a: any) => {
      if (title == a.toLowerCase()) {
        return title;
      }
    });
    this.collect = this.indexNumber;

    this.sharedService.getDetails().subscribe({
      next: (a: any) => {
        this.source = a;
      },
      error: (error: any) => {
        alert('something went wrong');
      },
    });

    if (this.collect == this.indexNumber) {
      if (this.item == true && this.Arrowtoggle == 'fas fa-arrow-up') {
        this.body = this.source.sort((a: any, b: any) => {
          // console.log(title);

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
        this.Arrowtoggle = 'fas fa-arrow-down';
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
        this.Arrowtoggle = 'fas fa-arrow-up';
      }
    }
  }

  toggle() {
    this.show = !this.show;
  }
}
