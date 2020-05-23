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
  public disableButton: Boolean;
  public showStopButton;

  constructor(
    public timerservice:TimerService,
    ) {
      this.doShock = new Subject();
      this.step12input = new Subject();
      this.askRhythm = new Subject()
    }

  startTimer() {
    this.timerservice.start();
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
  drugAdmin(string){
    this.disableButton = true;
  }

  }
