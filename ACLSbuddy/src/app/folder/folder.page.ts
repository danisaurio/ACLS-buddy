import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AclsService } from '../acls.service';
import { TimerService } from '../timer.service';
import { AlertController } from '@ionic/angular';
import { EventRegisterService } from '../event-register.service';


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
    public timerservice:TimerService,
    public eventregister: EventRegisterService,
    public router: Router,
    ) { }

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
      const startTime = new Date;
      this.eventregister.rcpEventStart(startTime);
    }
    async askRhythm() {
      const alert = await this.alertController.create({
        id: 'askRhythmAlert',
        mode: "ios",
        header: 'Is the rhythm shockeable?',
        message: '- Yes: VF or pVT<br>- No: Asystole or PEA',
        backdropDismiss: false,
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
        id: 'roscAlert',
        mode: "ios",
        header: 'Are there signs of return of spontaneous circulation?',
        backdropDismiss: false,
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
        id: 'stoplert',
        mode: "ios",
        header: 'Ending CPR, Are you sure?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'YES',
            handler: async() => {
              this.timerservice.stopTwoMinNotification();
              this.timerservice.stop();
              const endTime = new Date();
              await this.eventregister.rcpEventEnds(endTime);
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

    async gatherPatientData(){
      const alert = await this.alertController.create({
        id: 'patientDataAlert',
        header: "Do you want to enter the patient's information now?",
        backdropDismiss: false,
        buttons: [
            {
              text: 'No',
              handler: () => {
                this.restartValues();
              }
            }, {
              text: 'Yes',
              handler: () => {
                this.restartValues();
                this.editInformationInmediately();
              }
            }
          ]
        
        })
          await alert.present();
    } 

    restartValues(){
      this.timerservice.reset();
      this.aclsService.step=0;
      this.aclsService.antiArrDose=0;
      this.aclsService.doseLido = '1 - 1.5 mg/kg';
      this.aclsService.doseAmio = '300 mg bolus';
      this.aclsService.showStopButton = false;
      this.eventregister.antiarrselected = 'Antiarrhythmic';
    }
    async editInformationInmediately(){
      let event = await this.eventregister.returnStorgeEntry()
      let navigationExtras: NavigationExtras = {
        state: {
          user: event
        }
      };
      await this.router.navigate(['edit-event'], navigationExtras)
    }
  }
  