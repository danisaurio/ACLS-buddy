import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class GraphcalcsService {

  constructor(
    public storage: Storage,
  ) { }

  getSurvivalRate(){
    let survivals = this.getRoscFrecuency()[0]
    let deaths = this.getRoscFrecuency()[1]
    let rate = (survivals*100)/(survivals+deaths)
    let truncated = rate.toFixed(2)
    return truncated
  }

  getRegistersValues(){
    let complete = 30
    let incomplete = 50
    let returnarray = [complete,incomplete]
    return returnarray
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
    const count = {
      'caucasian':0,
      'native':0,
      'african':0,
      'asian':0,
      'islander':0,
      '':0
    }
    await this.storage.forEach( value => {
      count[value.race] += 1
    })
    return Object.values(count)
  }
  async getRhythmFrecuency(){
    const count = {
      'vf':0,
      'pvt':0,
      'asystole':0,
      'pea':0,
      '':0
    }
    await this.storage.forEach( value => {
      count[value.rhythm] += 1
    })
    return Object.values(count)
  }
  async getRoscFrecuency(){
    const count = {
      'roscyes':0,
      'roscno':0,
      '':0
    }
    await this.storage.forEach( value => {
      count[value.rhythm] += 1
    })
    return Object.values(count)
  }

}

