import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class EventRegisterService {

  private eventNameStr: string;
  public partialDict: {[key: string]: any};
  public shockDict: Array<Date>;
  public epiDict: Array<Date>;
  public antiarrDict: Array<Date>;

  constructor(
    public storage: Storage,
  ) { }

  async rcpEventStart(startTime: Date){
    this.partialDict= {};
    this.shockDict = new Array;
    this.epiDict = new Array;
    this.antiarrDict = new Array;
    this.eventNameStr = startTime.toString();
  }
  async rcpEventEnds(endTime: Date){
    this.partialDict['start'] = this.eventNameStr;
    this.partialDict['end'] = endTime;
    this.partialDict['shock'] = this.shockDict;
    this.partialDict['epi'] = this.epiDict;
    this.partialDict['antiarr'] = this.antiarrDict;
    await this.storage.set(this.eventNameStr, this.partialDict);
    this.allevents();
  }
  schockEvent(shockTime: Date){
    this.shockDict.push(shockTime)
  }
  drugEvent(drug: string, drugTime: Date){
    if (drug === 'epi'){
      this.epiDict.push(drugTime)
    }
    if(drug === 'amio' || drug === 'lido'){
      this.antiarrDict.push(drugTime)
    }
  }
  async allevents(){
    console.log(await this.storage.get(this.eventNameStr));

  }

}

