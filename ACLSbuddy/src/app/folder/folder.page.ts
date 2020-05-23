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
    this.aclsService.doShock.subscribe((show) => {
      if (show) {
        this.shockalert();
      }
    });
  }

  start() {
    this.aclsService.startTimer();
    this.shockeable();
  }

  async shockalert() {
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

  async shockeable() {
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


  

}
