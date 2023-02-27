import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() head:string[]=[];
  @Input() body:any[]=[];
  @Output() delete=new EventEmitter<string>();
  @Output() edit=new EventEmitter<string>(); 
  constructor() { }

  ngOnInit() {
  }
  deleted(item:any){
  this.delete.emit(item)
  }
  editable(item:any){
   this.edit.emit(item)
  }

}
