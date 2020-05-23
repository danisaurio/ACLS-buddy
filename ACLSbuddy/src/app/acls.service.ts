import { Injectable } from '@angular/core';
import { TimerService } from './timer.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { FolderPage } from './folder/folder.page';

@Injectable({
  providedIn: 'root'
})
export class AclsService {

  public step:number = 0;
  public askRhythm: Subject<void>;
  public step12input: Subject<void>;
  public stopButtonPressed: Subject<void>;
  public disableButton: Boolean;
  public showStopButton;
  public antiArrDose: number = 0;
  public doseLido = '1 - 1.5 mg/kg';
  public doseAmio = '300 mg bolus';
  public selectedDrug = undefined;


  constructor(
    public timerservice:TimerService,
    ) {
      this.step12input = new Subject();
      this.askRhythm = new Subject();
      this.stopButtonPressed = new Subject();
    }

  startTimer() {
    this.timerservice.start();
  }
  stopTimer() {
    this.timerservice.stop();

  }
  decision(string){
    if (this.step === 0) {
      if (string === 'y'){
        this.step3();
        return;
      }
      else{
        this.step10();
        return;
      }
    }
    if(this.step===4){
      if(string==='y'){
        this.step5();
        return;
      }
      else{
        this.step12();
        return;
      }
    }
    if(this.step===6){
      if(string==='y'){
        this.step7();
        return;
      }
      else{
        this.step12();
        return;
      }
    }
    if(this.step===8){
      if(string==='y'){
        this.step5();
        return;
      }
      else{
        this.step12();
        return;
      }
    }
    if (this.step === 10){
      if (string === 'y'){
        this.step5();
        return;
      }
      else{
        this.step11();
        return;
      }
    }
    if (this.step === 11){
      if (string === 'y'){
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
    await this.timerservice.twoMinNotification();
    this.askRhythm.next();   
  }
  async step6(){
    this.disableButton = false;
    this.step = 6;
    await this.timerservice.twoMinNotification();
    this.askRhythm.next();   
  }
  async step8(){
    if (this.antiArrDose !== 0){
      this.doseLido = '0,5 - 0,75 mg/kg'
      this.doseAmio = '150 mg'
    }
    this.antiArrDose += this.antiArrDose+1;
    this.disableButton = false;
    this.step = 8;
    await this.timerservice.twoMinNotification();
    this.askRhythm.next();  
  }
  async step10(){
    this.disableButton = false;
    this.step = 10;
    await this.timerservice.twoMinNotification();
    this.askRhythm.next();  
  }
  async step11(){
    this.step = 11;
    await this.timerservice.twoMinNotification();
    this.askRhythm.next();  
  }
  step12(){
    this.step12input.next();
  }
  giveShock(step){
    console.log(step)
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
  stopPressed(){
    this.stopButtonPressed.next();
  }
  drugAdmin(string){
    this.disableButton = true;
    if (string == 'amio' || string == 'lido'){
      this.selectedDrug = string;
    }
    
  }

  }
