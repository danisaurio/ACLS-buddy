import { Injectable } from '@angular/core';
import { TimerService } from './timer.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AclsService {

  private step;
  public doShock: BehaviorSubject<boolean>;

  constructor(
    public timerservice:TimerService) {
      this.doShock = new BehaviorSubject(false);
    }

  startTimer() {
    this.timerservice.start();
  }
  decision(string){
    if (this.step == undefined) {
      if (string == 'y'){
        this.step = 3;
        this.doShock.next(true);
      }
      else{
        this.step = 10;
        this.step10();
      }
    }
    console.log(string);
  }
  step10(){
    
  }

  }
