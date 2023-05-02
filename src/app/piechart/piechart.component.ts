import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
    this.getAge();
  }
  public pieChartOptions:ChartOptions={
    responsive:true
  }
  public pieChartData:ChartDataSets[]=[
    {
      data:[],
      label:'Age'
      
    }
  ];
  public pieChartType:ChartType='pie';
  public pieChartLegend=true;
  public pieChartLabels:Label[]=[];
 
  public pieChartColors = [{ backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 1)'],
},];

  public age:any[]=[];
  public validation:any[]=[]
  public count=1;
  public contain:any[]=[]
  getAge(){
    this.sharedService.getDetails().subscribe((a:any)=>{
         this.age=a;
         this.age=this.age.map((a:any)=>{
          return a.age;
         })
         this.age=this.age.map(num=>Number(num));
         console.log(this.age);
         this.pieChartLabels=this.age
         this.validation=this.age.map((a:any,index,arr)=>{
    
        console.log("a",a);
        console.log("a index",index);
        
          const count = arr.reduce((acc, cur, idx) => {
            console.log("cur",cur);
            console.log("cur index",idx);
            if (cur === a && idx !== index) {
            
              console.log("acc",acc+1);
              
            return acc + 1;
            }
            return acc;
          },1);
          
          return count;
         })
       console.log(this.validation);
       this.pieChartData[0].data=this.validation
       
         
        
         
    })
  }
}
