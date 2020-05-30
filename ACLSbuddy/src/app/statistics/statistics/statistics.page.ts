import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  
  @ViewChild('barChart') barChart ;

  
  public hide: boolean = true;
  public bars: any;
  public colorArray: any;

  constructor(

  ) {}

  ngOnInit() {
    
  }



  generateColorArray(num) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }


  async registersChart() {
    this.hide = false
    this.generateColorArray(2)
    this.bars = new Chart(await this.barChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Complete', 'Partially/Non complete'],
        datasets: [{
          label: 'Viewers in millions',
          data: this.getRegistersValues(),
          backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {}
    });
  }

  getRegistersValues(){
    let complete = 30
    let incomplete = 50
    let returnarray = [complete,incomplete]
    return returnarray
  }

}
