import { Injectable } from '@angular/core';
import { TimerService } from './timer.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { FolderPage } from './folder/folder.page';

@Injectable({
  providedIn: 'root'
})
export class AclsService {

  public step:number;
  public doShock: Subject<void>;
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
      this.doShock = new Subject();
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
    if (this.step === undefined) {
      if (string === 'y'){
        this.step3();
        return;
      }
      else{
        this.step10();
        return;
      }
    }
    if(this.step===3){
      if(string==='y'){
        this.step5();
        return;
      }
      else{
        this.step12();
        return;
      }
    }
    if(this.step===5){
      if(string==='y'){
        this.step7();
        return;
      }
      else{
        this.step12();
        return;
      }
    }
    if(this.step===7){
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
  async step3(){
    this.doShock.next();
    this.step = 3;
    await this.timerservice.twoMinNotification();
    this.askRhythm.next();   
  }
  async step5(){
    this.disableButton = false;
    this.doShock.next();
    this.step = 5;
    await this.timerservice.twoMinNotification();
    this.askRhythm.next();   
  }
  async step7(){
    if (this.antiArrDose !== 0){
      this.doseLido = '0,5 - 0,75 mg/kg'
      this.doseAmio = '150 mg'
    }
    this.antiArrDose += this.antiArrDose+1;
    this.disableButton = false;
    this.doShock.next();
    this.step = 7;
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
