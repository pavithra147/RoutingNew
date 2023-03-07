import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() head: string[] = [];
  @Input() body: any[] = [];
  public page: number = 1;
  public count: number = 0;
  tableSize: number = 5;
  public filter!: string;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  public source!:any;
  public user:any;
  public age:any;
  public show=false;
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
   this.sources();
   
  }
 
  filtering(data:any , title:any){
     title=title.toLowerCase();
    this.user=this.body.filter((el)=>{
      title=title;
       return el[title] == data.value.filter;
      }) 
    if(this.user.length==0){
      return this.body=this.source;
    }
   
    else{
      return this.body=this.user;
    }
  }
  
  sources() {
    this.sharedService.getDetails().subscribe((x) => {
      this.source = x;
     
      
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
public item=false;
  sort(title:any){
    title=title.toLowerCase();
    this.sharedService.getDetails().subscribe((a:any)=>{
    this.source=a;
    
    if(this.item==true){
    this.body=this.source.sort((a:any,b:any)=>{
       const nameA = a[title]; 
  const nameB = b[title];
        
        if(nameA > nameB){
          return -1;
        }
        return 0;
      })
      this.item=false;
    }
    else{
      this.body=this.source.sort((a:any,b:any)=>{
        const nameA = a[title]; 
   const nameB = b[title];
        if(nameA < nameB){
          return -1;
        }
       
         return 0;
       })
       this.item=true;
   }
    })
  }
  toggle(){
    this.show=!this.show;
  }

}


