import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage{
  
  @ViewChild('registerChart') registerChart;
  @ViewChild('ageChart') ageChart;
  @ViewChild('genderChart') genderChart;
  @ViewChild('raceChart') raceChart;
  @ViewChild('rhythmChart') rhythmChart;
  @ViewChild('roscChart') roscChart;
  @ViewChild('nationalChart') nationalChart;

  
  public info: boolean = false;
  public personal: boolean = true;
  public statistics: boolean = true;
  public national: boolean = true;
  public colorArray: any;

  constructor() {}

  ionViewDidEnter() {
    this.generateColorArray(8)
    this.createRegistersChart();
    this.createPersonalChart();
  }

  selectChart(selectedChart: string){
    if (selectedChart === 'personal'){
      this.info = true;
      this.personal = false;
      this.national = true;
    }
    if (selectedChart === 'national'){
      this.info = true;
      this.personal = true;
      this.national = false;   
    }
  }

  generateColorArray(num) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  async createRegistersChart() {
    let registers = new Chart(await this.registerChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Complete', 'Partially/Non complete'],
        datasets: [{
          label: 'Viewers in millions',
          data: this.getRegistersValues(),
          backgroundColor: this.colorArray, 
          borderColor: 'rgb(38, 194, 129)',
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

  async createPersonalChart(){
    let age = new Chart(await this.ageChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.getAges(),
        datasets: [{
          label: 'Number of patients',
          data: this.getAgesFrecuency(),
          backgroundColor: this.colorArray, 
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                  stepSize: 1
              }
          }]
      }
      }
    });
    let gender = new Chart(await this.genderChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Femenine', 'Masculine'],
        datasets: [{
          data: this.getGenderFrecuency(),
          backgroundColor: this.colorArray, 
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {}
    });
    let race = new Chart(await this.raceChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Caucasian', 'Native American', 'African American', 'Asian', 'Pacific Islander'],
        datasets: [{
          data: this.getRaceFrecuency(),
          backgroundColor: this.colorArray, 
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {}
    });
    let rhythm = new Chart(await this.rhythmChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['VF', 'pVT', 'Asystole', 'PEA'],
        datasets: [{
          data: this.getRhythmFrecuency(),
          backgroundColor: this.colorArray, 
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {}
    });
    let rosc = new Chart(await this.roscChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Yes', 'No'],
        datasets: [{
          data: this.getRoscFrecuency(),
          backgroundColor: this.colorArray, 
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {}
    });
  }

  getAges(){
    return ['30 years', '40 years', '53 years', '60 years']
  }
  getAgesFrecuency(){
    return[5,5,5,5]
  }
  getGenderFrecuency(){
    return [5,7]
  }
  getRaceFrecuency(){
    return[1,3,3,6,7]
  }
  getRhythmFrecuency(){
    return[1,3,3,7]
  }
  getRoscFrecuency(){
    return[4,7]
  }
  getSurvivalRate(){
    let survivals = this.getRoscFrecuency()[0]
    let deaths = this.getRoscFrecuency()[1]
    let rate = (survivals*100)/(survivals+deaths)
    return rate.toFixed(2)
  }

  createNationalChart(){

  }
}
