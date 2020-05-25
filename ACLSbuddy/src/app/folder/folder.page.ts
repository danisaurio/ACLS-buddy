import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AclsService } from '../acls.service';
import { TimerService } from '../timer.service';
import { AlertController } from '@ionic/angular';
import { timer } from 'rxjs';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(
    private activatedRoute: ActivatedRoute, 
    public alertController: AlertController,
    public aclsService: AclsService, 
    public timerservice:TimerService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.aclsService.askRhythm.subscribe(() => {
        this.askRhythm();
    });
    this.aclsService.step12input.subscribe(() => {
        this.rosc();
    });
  }

  start() {
    this.timerservice.start();
    this.askRhythm();
    this.aclsService.showStopButton = true;
  }

  async askRhythm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: "ios",
      header: 'Is the rhythm shockeable?',
      message: '- Yes: VF or pVT<br>- No: Asystole or PEA',
      buttons: [
        {
          text: 'YES',
          handler: data => {
            this.aclsService.decision('isShockeable');
          }
        },
        {
          text: 'NO',
          handler: data => {
            this.aclsService.decision('isNotShockeable');
          }
        }
      ]
    });
    await alert.present();
  }
  async rosc() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: "ios",
      header: 'Are there signs of return of spontaneous circulation?',
      buttons: [
        {
          text: 'YES',
          handler: data => {
            this.aclsService.step = 12;
            this.timerservice.stop();
          }
        },
        {
          text: 'NO',
          handler: data => {
            this.aclsService.step10();
          }
        }
      ]
    });
    await alert.present();
  }
  async stopButtonPressed(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: "ios",
      header: 'Ending CPR, Are you sure?',
      buttons: [
        {
          text: 'YES',
          handler: data => {
            this.timerservice.stopTwoMinNotification();
            this.timerservice.stop();
            this.gatherPatientData();
          }
        },
        {
          text: 'NO',
        }
      ]
    });
    await alert.present();
  }
  restartValues(){
    this.timerservice.time = "00:00.000";
    this.aclsService.step=0;
    this.aclsService.antiArrDose=0;
    this.aclsService.doseLido = '1 - 1.5 mg/kg';
    this.aclsService.doseAmio = '300 mg bolus';
    this.aclsService.showStopButton = false;
    this.aclsService.selectedDrug = undefined;
  }
  async gatherPatientData(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: "Do you want to enter the patient's information now?",
      buttons: [
          {
            text: 'No',
            handler: () => {
              this.restartValues();
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Yes',
            handler: () => {
              this.restartValues();
              console.log('Confirm Ok');
            }
          }
        ]
      
      })
        await alert.present();
      };    
  }