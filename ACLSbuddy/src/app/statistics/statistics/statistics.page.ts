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
        labels: ['Caucasian', 'Native American', 'African American', 'Asian', 'Pacific Islander', 'unespecified'],
        datasets: [{
          data: await this.getRaceFrecuency(),
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
          data: await this.getRhythmFrecuency(),
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
          data: await this.getRoscFrecuency(),
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
          case 1:
            yearsarray[0].push(decValue);
          case 2:
            yearsarray[1].push(decValue);
          case 3:
            yearsarray[2].push(decValue);
          case 4:
            yearsarray[3].push(decValue);
          case 5:
            yearsarray[4].push(decValue);
          case 6:
            yearsarray[5].push(decValue);
          case 7:
            yearsarray[6].push(decValue);
          case 8:
            yearsarray[7].push(decValue);
          default:
            yearsarray[8].push(decValue);
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
    // let genders = [[],[],[]]
    // await this.storage.forEach(value => {
    //   switch(value.gender){
    //     case 'female':
    //       genders[0].push(value.gender)
    //     case 'male':
    //       genders[1].push(value.gender)
    //     default:
    //       genders[2].push(value.gender)
    //   }
    // })
    // let genderfrecuency = []
    // genderfrecuency.push(genders[0].length)
    // genderfrecuency.push(genders[1].length)
    // genderfrecuency.push(genders[2].length)
    // return genderfrecuency
    const count = {
      'female':0,
      'male':0,
      '':0
    }
    await this.storage.forEach( value => {
      count[value.gender] += 1
    })
    return Object.values(count)
  }
  async getRaceFrecuency(){
    let races = [[],[],[],[],[],[],[]] 
    await this.storage.forEach(value =>{
      switch(value.race){
        case 'caucasian':
          races[0].push(value.race)
        case 'native':
          races[1].push(value.race)
        case 'african':
          races[2].push(value.race)
        case 'asian':
          races[3].push(value.race)
        case 'islander':
          races[4].push(value.race)
        default:
          races[5].push(value.race)
      }
    })
    let racesfrecuency=[]
    racesfrecuency.push(races[0].length)
    racesfrecuency.push(races[1].length)
    racesfrecuency.push(races[2].length)
    racesfrecuency.push(races[3].length)
    racesfrecuency.push(races[4].length)
    racesfrecuency.push(races[5].length)
    return racesfrecuency
  }
  async getRhythmFrecuency(){
    let rhythm = [[],[],[],[],[]] 
    await this.storage.forEach(value =>{
      switch(value.rhythm){
        case 'vf':
          rhythm[0].push(value.rhythm)
        case 'pvt':
          rhythm[1].push(value.rhythm)
        case 'asystole':
          rhythm[2].push(value.rhythm)
        case 'pea':
          rhythm[3].push(value.rhythm)
        default:
          rhythm[4].push(value.rhythm)
      }
    })
    let rhythmfrecuency=[]
    rhythmfrecuency.push(rhythm[0].length)
    rhythmfrecuency.push(rhythm[1].length)
    rhythmfrecuency.push(rhythm[2].length)
    rhythmfrecuency.push(rhythm[3].length)
    rhythmfrecuency.push(rhythm[4].length)
    rhythmfrecuency.push(rhythm[5].length)
    return rhythmfrecuency
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
