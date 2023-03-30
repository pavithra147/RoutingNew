import { Component, OnInit } from '@angular/core';
import { left, right } from '@popperjs/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public age:any[]=[];
  public validation:any[]=[];
  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
    this.getAge();
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { 
      yAxes: [{
       
         scaleLabel: {
            display: true,
            labelString: 'Age'
           
         },
         ticks:{
         min:0,
         stepSize:2

         }
      }],
      xAxes:[{
       
        scaleLabel:{
          display:true,
          labelString:"Number of people in mentioned age"
        }
      }]
   }
  };
  public barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Age',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }
  ];
  public barChartType:ChartType = 'bar';
  public barChartLegend = true;
  public barChartLabels: Label[] = [];

  public count=1;
  getAge(){
    this.sharedService.getDetails().subscribe((a:any)=>{
         this.age=a;
         this.age=this.age.map((a:any)=>{
          return a.age;
         })
         this.age=this.age.map(num=>Number(num));
         console.log(this.age);
         this.barChartData[0].data=this.age
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
       this.barChartLabels=this.validation;
         
        
         
    })
  }

}
