import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AclsService } from '../acls.service';
import { TimerService } from '../timer.service';
import { AlertController } from '@ionic/angular';


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
    this.aclsService.doShock.subscribe(() => {
        this.doShock();

    });
    this.aclsService.askRhythm.subscribe(() => {
        this.askRhythm();
    });
    this.aclsService.step12input.subscribe(() => {
        this.rosc();
    });
  }

  start() {
    this.aclsService.startTimer();
    this.askRhythm();
  }

  async doShock() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: "ios",
      header: 'SHOCK!',
      message: 'click OK when done',
      buttons: [
        {
          text: 'OK',
        }
      ]
    });
    await alert.present();
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
            this.aclsService.decision('y');
          }
        },
        {
          text: 'NO',
          handler: data => {
            this.aclsService.decision('n');
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
            this.aclsService.messageToDisplay = "<h1>Well done!<h1><br><p>Do post-cardiac arrest care</p>";
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


  

}
