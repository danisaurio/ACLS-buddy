import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AclsService } from '../services/acls.service';
import { TimerService } from '../services/timer.service';
import { EventRegisterService } from '../services/event-register.service';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public bannercolor: string;
  public bannermessage: string;

  constructor(
    private activatedRoute: ActivatedRoute, 
    public alertService: AlertService,
    public aclsService: AclsService, 
    public timerservice:TimerService,
    public eventregister: EventRegisterService,
    public router: Router,
    ) { }

    ngOnInit() {
      this.folder = this.activatedRoute.snapshot.paramMap.get('id');
      if(this.folder === 'CPR'){
        this.timerservice.timeoutTime = 120000
        this.bannercolor = 'success'
        this.bannermessage = 'CPR'
        this.eventregister.setPatientInitials('')
      }
      else{
        this.folder = this.folder+' mode'
        this.timerservice.timeoutTime = 4000
        this.bannercolor = "secondary"
        this.bannermessage = 'demo'
        this.eventregister.setPatientInitials('DEMO')
        this.demoModeAlert()
      }
      this.aclsService.askRhythmSubject.subscribe(() => {
          this.askRhythm();
      });
      this.aclsService.step12inputSubject.subscribe(() => {
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
      await this.alertService.create({
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

    }
    async rosc() {
      await this.alertService.create({
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
    }
    async stopButtonPressed(){
      
      this.alertService.create({
        header: 'Ending CPR, Are you sure?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'YES',
            handler: async() => {
              this.timerservice.stopTwoMinNotification();
              this.alertService.eliminateRemainingAlerts();
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

    }

    async gatherPatientData(){
      this.alertService.create({
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
    }
    demoModeAlert(){
      this.alertService.create({
        header: 'Welcome to the demo mode!',
        message: 'In this demo, the times are reduced so you can navigate the interface faster and get familiar with it before an actual CPR event. The information gathered in demo mode will be registered in History with \'Demo\' as the patient\'s name. You may delete this registers any time',
        buttons: ['OK']
      })
    } 

    restartValues(){
      this.timerservice.reset();
      this.aclsService.step=0;
      this.aclsService.antiArrDose=0;
      this.aclsService.doseLido = '1 - 1.5 mg/kg';
      this.aclsService.doseAmio = '300 mg bolus';
      this.aclsService.showStopButton = false;
      this.eventregister.antiarrselected = 'Antiarrhythmic';
      this.eventregister.patientInitials = '';
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
  