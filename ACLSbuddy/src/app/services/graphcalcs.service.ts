import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import  *  as  coefs  from  '../stats/national/logical-regression/coefs.json';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';

@Injectable({
  providedIn: 'root'
})
export class GraphcalcsService {

  public survivalRate;
  public regressionCoef;

  constructor(
    public storage: Storage,
  ) { }

  async getRegistersValues(){
    let complete = 0
    let incomplete = 0
    let insideEmpty = 0
    await this.storage.forEach( value => {
      Object.values(value).forEach( innerValue =>{
        if(innerValue === ''){
          insideEmpty +=1
        }
      })
      if(insideEmpty > 0){
        incomplete += 1
      }
      else{
        complete += 1
      }
      insideEmpty = 0
    })
    return [complete, incomplete]
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
    this.survivalRate = this.calcSurvivalRate(rate)
    return [survival, deaths, undetermined]
  }
  calcSurvivalRate(rate){
    this.survivalRate = parseInt(rate.toFixed(2))
    if (!parseInt(rate.toFixed(2))){
      this.survivalRate = 'No data entered'
    }
    return this.survivalRate
  }
  getNationalRegCoef(){
    this.regressionCoef = Object.values(coefs)[0]
    return this.regressionCoef
  }

  async getValidEntries(){
    let validentires =[]
    await this.storage.forEach(value => {
      if(value.age !== '' && value.gender !== '' &&
      value.race !== '' && value.rhythm !== '' &&
      value.rosc !== ''){
        validentires.push(value)
      }
    })
    return validentires
  }

  async getProjectedRate(){
    let probabilityArray =[]
    let regressionCoef = this.getNationalRegCoef()
    let entries = await this.getValidEntries()

    entries.forEach((value) =>{
      let sumCoef = 0
      sumCoef += value.age * regressionCoef.age
      if(value.gender == 'female'){
        sumCoef += regressionCoef.sex_female
      }
      else if(value.gender == 'male'){
        sumCoef += regressionCoef.sex_male
      }
      if(value.rhythm == 'asystole'){
        sumCoef += regressionCoef.rhythm_asystole
      }
      else if(value.rhythm == 'pea'){
        sumCoef += regressionCoef.rhythm_pea
      }
      else if(value.rhythm == 'pvt'){
        sumCoef += regressionCoef.rhythm_pvt
      }
      else if(value.rhythm == 'vf'){
        sumCoef +=  regressionCoef.rhythm_vf
      }
      if(value.race === 'african'){
        sumCoef += regressionCoef.race_african
      }
      else if(value.race === 'asian'){
        sumCoef += regressionCoef.race_asian
      }
      else if(value.race === 'caucasian'){
        sumCoef += regressionCoef.race_caucasian
      }
      else if(value.race === 'islander'){
        sumCoef += regressionCoef.race_islander
      }
      else if(value.race === 'native'){
        sumCoef += regressionCoef.race_native
      }
      let basicPoint = 1/(1+(Math.E ** sumCoef))
      probabilityArray.push(basicPoint)
    })
    let sumofBasicPoints = 0
    probabilityArray.forEach(basicPoint =>{
      sumofBasicPoints += basicPoint
    })
    let average = (sumofBasicPoints/probabilityArray.length)*100
    return average
  }

  async getNetRate(){
    let entires = await this.getValidEntries()
    let survival = 0
    let deaths = 0
    let undetermined = 0
    entires.forEach(value => {
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
    let survRateofValidEntries = this.calcSurvivalRate(rate)
    return survRateofValidEntries
  }

  async returnRatesGraph(){
    await this.getRoscFrecuency()
    let surv = await this.getNetRate()
    let proj = await this.getProjectedRate()
    let colsValues = [surv, proj.toFixed(2)]
    return colsValues 
  }

}





