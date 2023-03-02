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
  public source!: any;
  public user:any;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sources();

  }
  filtering(data:any){
    this.user=this.body.filter((el:{age:number})=>{
      return el.age == data.value.filter;
    })
    console.log(this.user)
    if(this.user.length==0){
      return window.alert("No age");
    }
    
    else{
      return this.body=this.user
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
    this.sources();
  }
}
