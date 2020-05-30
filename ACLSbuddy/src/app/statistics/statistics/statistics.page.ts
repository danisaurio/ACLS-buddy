import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';

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
  public colorArray: any = [];

  constructor(
    public storage:Storage,
  ) {}

  ionViewDidEnter() {
    this.createRegistersChart();
    this.createPersonalChart();
    this.generateColorArray()
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

  generateColorArray() {
    this.colorArray.push('rgb(0,139,139)')
    this.colorArray.push('rgb(40,162,40)')
    this.colorArray.push('rgb(36,161,89)')
    this.colorArray.push('rgb(1,152,117)')
    this.colorArray.push('rgb(109,136,145)')
    this.colorArray.push('rgb(75,119,190)')
    this.colorArray.push('rgb(25,120,212)')
    this.colorArray.push('rgb(0,127,170)')
    this.colorArray.push('rgb(42,122,176)')
    this.colorArray.push('rgb(52,56,94)')
    this.colorArray.push('rgb(0,128,128)')
    this.colorArray.push('rgb(211,211,211)')
  }

  async createRegistersChart() {
    let registers = new Chart(await this.registerChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Complete', 'Partially/Non complete'],
        datasets: [{
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
        labels: ['20 or less yo', 
          '21 - 30 yo', 
          '31 - 40 yo', 
          '41 - 50 yo', 
          '51 - 60 yo', 
          '61 - 70 yo', 
          '71 - 80 yo', 
          '81 - 90 yo', 
          '91+ yo', 
          'Not specified'],
        datasets: [{
          label: 'Number of patients',
          data: await this.getAgesFrecuency(),
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
        labels: ['Femenine', 'Masculine', 'Unespecified'],
        datasets: [{
          data: await this.getGenderFrecuency(),
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

  async getAgesFrecuency(){
    let yearsarray = [[],[],[],[],[],[],[],[],[],[]]
    let yearsNotSpecified = []
    let getvalues = []
    await this.storage.forEach((value) => {
      getvalues.push(value.age)
      if (value.age === '' || value.age === null){
        yearsNotSpecified.push('')
      }
      else{
        let decValue = Math.trunc(parseInt(value.age)/10)
        switch(decValue){
          case 0:
            yearsarray[0].push(decValue);
            break;
          case 1:
            yearsarray[0].push(decValue);
            break;
          case 2:
            yearsarray[1].push(decValue);
            break;
          case 3:
            yearsarray[2].push(decValue);
            break;
          case 4:
            yearsarray[3].push(decValue);
            break;
          case 5:
            yearsarray[4].push(decValue);
            break;
          case 6:
            yearsarray[5].push(decValue);
            break;
          case 7:
            yearsarray[6].push(decValue);
            break;
          case 8:
            yearsarray[7].push(decValue);
            break;
          default:
            yearsarray[8].push(decValue);
            break;
        }
      }
    })
    let valuetoreturn = []
    valuetoreturn.push(yearsarray[0].length)
    valuetoreturn.push(yearsarray[1].length)
    valuetoreturn.push(yearsarray[2].length)
    valuetoreturn.push(yearsarray[3].length)
    valuetoreturn.push(yearsarray[4].length)
    valuetoreturn.push(yearsarray[5].length)
    valuetoreturn.push(yearsarray[6].length)
    valuetoreturn.push(yearsarray[7].length)
    valuetoreturn.push(yearsarray[8].length)
    valuetoreturn.push(yearsNotSpecified.length)
    return valuetoreturn
  }

  async getGenderFrecuency(){
    let men = []
    let women = []
    let unespecified = []
    await this.storage.forEach((value => {
      if(value.gender === 'female'){
        women.push(value.gender)
      }
      else if(value.gender === 'male'){
        men.push(value.gender)
      }
      else{
        unespecified.push(value.gender)
      }
    }))
    console.log(unespecified)
    return [women.length, men.length, unespecified.length]
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
