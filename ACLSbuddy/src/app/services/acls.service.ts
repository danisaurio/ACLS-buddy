import { Injectable } from '@angular/core';
import { TimerService } from './timer.service';
import { Subject } from 'rxjs';
import { EventRegisterService } from './event-register.service';


@Injectable({
  providedIn: 'root'
})
export class AclsService {

  public step:number = 0;
  public askRhythmSubject: Subject<void>;
  public step12inputSubject: Subject<void>;
  public disableButton: Boolean;
  public showStopButton;
  public antiArrDose: number = 0;
  public doseLido = '1 - 1.5 mg/kg';
  public doseAmio = '300 mg bolus';
  public selectedDrug = 'noSelected';


  constructor(
    public timerservice:TimerService,
    public eventresgister: EventRegisterService
    ) {
      this.step12inputSubject = new Subject();
      this.askRhythmSubject = new Subject();
    }
  decision(string){
    if (this.step === 0) {
      if (string === 'isShockeable'){
        this.step3();
        return;
      }
      else{
        this.step10();
        return;
      }
    }
    if(this.step===4){
      if(string==='isShockeable'){
        this.step5();
        return;
      }
      else{
        this.step12();
        return;
      }
    }
    if(this.step===6){
      if(string==='isShockeable'){
        this.step7();
        return;
      }
      else{
        this.step12();
        return;
      }
    }
    if(this.step===8){
      if(string==='isShockeable'){
        this.step5();
        return;
      }
      else{
        this.step12();
        return;
      }
    }
    if (this.step === 10){
      if (string === 'isShockeable'){
        this.step5();
        return;
      }
      else{
        this.step11();
        return;
      }
    }
    if (this.step === 11){
      if (string === 'isShockeable'){
        this.step5();
        return;
      }
      else{
        this.step12();
        return;
      }
    }
  }
  step3(){
    this.step=3
  }
  step5(){
    this.step=5
  }
  step7(){
    this.step=7
  }
  async step4(){
    this.step = 4;
    const shouldContinue = await this.timerservice.twoMinNotification();
    if (await shouldContinue === true){
      this.askRhythmSubject.next();
    }
  }
  async step6(){
    this.disableButton = false;
    this.step = 6;
    const shouldContinue = await this.timerservice.twoMinNotification();
    if (await shouldContinue === true){
      this.askRhythmSubject.next();
    }   
  }
  async step8(){
    if (this.antiArrDose !== 0){
      this.doseLido = '0,5 - 0,75 mg/kg'
      this.doseAmio = '150 mg'
    }
    this.antiArrDose += this.antiArrDose+1;
    this.disableButton = false;
    this.step = 8;
    const shouldContinue = await this.timerservice.twoMinNotification();
    if (shouldContinue === true){
      this.askRhythmSubject.next();
    }  
  }
  async step10(){
    this.disableButton = false;
    this.step = 10;
    const shouldContinue = await this.timerservice.twoMinNotification();
    if (shouldContinue === true){
      this.askRhythmSubject.next();
    }  
  }
  async step11(){
    this.step = 11;
    const shouldContinue = await this.timerservice.twoMinNotification();
    if (shouldContinue === true){
      this.askRhythmSubject.next();
    } 
  }
  step12(){
    let endByFlowchart = new Date;
    this.eventresgister.rcpEventEnds(endByFlowchart)
    this.step12inputSubject.next();
  }
  giveShockConfirmation(step: number){
    let schockTime = new Date;
    this.eventresgister.schockEvent(schockTime);
    if (step === 3){
      this.step4();
    }
    if (step === 5){
      this.step6();
    }
    if (step === 7){
      this.step8()
    }
  }
  drugAdmin(drug: string){
    if (drug === 'Amiodarone' || drug === 'Lidocaine'){
      this.selectedDrug = drug;
      this.eventresgister.antiarrselected = drug;
    }
    let drugAdminTime = new Date;
    this.eventresgister.drugEvent(drug, drugAdminTime);
    this.disableButton = true;
  }
  shockeableRhythmsStep(step){
    if (step === 3 || step === 5 || step === 7){
      return true;
    }
    else {
      return false;
    }
  }
  }
