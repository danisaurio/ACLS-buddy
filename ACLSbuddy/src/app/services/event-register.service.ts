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
  public starttime: Date;
  public antiarrselected: string = 'Antiarrhythmic';

  constructor(
    public storage: Storage,
  ) { }

  async rcpEventStart(startTime: Date){
   // this.storage.clear();
    this.partialDict= {};
    this.shockDict = [];
    this.epiDict = [];
    this.antiarrDict = [];
    this.starttime = startTime
    this.eventNameStr = this.starttime.toString();
  }
  async rcpEventEnds(endTime: Date){
    this.partialDict['start'] = this.starttime;
    this.partialDict['end'] = endTime;
    this.partialDict['shock'] = this.shockDict;
    this.partialDict['epi'] = this.epiDict;
    this.partialDict['antiarr'] = this.antiarrDict;
    this.partialDict['selecteddrug'] = this.antiarrselected;
    this.partialDict['initials'] ='';
    this.partialDict['age']='';
    this.partialDict['gender']='';
    this.partialDict['race']='';
    this.partialDict['rhythm']='';
    this.partialDict['rosc']='';
    this.partialDict['key'] = this.eventNameStr
    await this.storage.set(this.eventNameStr, this.partialDict);
  }
  schockEvent(shockTime: Date){
    this.shockDict.push(shockTime)
  }
  drugEvent(drug: string, drugTime: Date){
    if (drug === 'epi'){
      this.epiDict.push(drugTime)
    }
    if(drug === 'Amiodarone' || drug === 'Lidocaine'){
      this.antiarrDict.push(drugTime)
    }
  }
  removeWholeEvent(event){
    this.storage.remove(event.key)
  }
  async returnStorgeEntry(){
    return this.storage.get(this.eventNameStr)
  }

}

