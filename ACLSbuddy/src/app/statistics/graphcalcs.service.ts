import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class GraphcalcsService {

  public survivalRate:number;

  constructor(
    public storage: Storage,
  ) { }

  getRegistersValues(){
    let complete = 30
    let incomplete = 50
    let returnarray = [complete,incomplete]
    return returnarray
  }

  async getAgesFrecuency(){
    let to20 = 0
    let to30 = 0
    let to40 = 0
    let to50 = 0
    let to60 = 0
    let to70 = 0
    let to80 = 0
    let to90 = 0
    let morethan90 =0
    let yearsNotSpecified = 0
    let getvalues = []
    await this.storage.forEach((value) => {
      getvalues.push(value.age)
      if (value.age === '' || value.age === null){
        yearsNotSpecified += 1
      }
      else{
        let decValue = Math.trunc(parseInt(value.age)/10)
        switch(decValue){
          case 0:
            to20 +=1
            break;
          case 1:
            to20 +=1
            break;
          case 2:
            to30 +=1
            break;
          case 3:
            to40 +=1
            break;
          case 4:
            to50 +=1
            break;
          case 5:
            to60 +=1
            break;
          case 6:
            to70 +=1
            break;
          case 7:
            to80 +=1
            break;
          case 8:
            to90 +=1
            break;
          default:
            morethan90 +=1
            break;
        }
      }
    })
    return [to20, to30, to40, to50, to60, to70, to80, to90, morethan90, yearsNotSpecified]
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
    let survival = 0
    let deaths = 0
    let undetermined = 0
    await this.storage.forEach((value) => {
      switch(value.rosc){
        case "roscyes":
          survival += 1;
          break;
        case "roscno":
          deaths += 1;
          break;
        default:
          undetermined += 1;
          break;
      }
    })
    let rate = (survival*100)/(survival+deaths)
    this.survivalRate = parseInt(rate.toFixed(2))
    return [survival, deaths, undetermined]
  }
}


