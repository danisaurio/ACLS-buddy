import { Component, OnInit } from '@angular/core';
import { EventRegisterService } from 'src/app/event-register.service';
import { AclsService } from 'src/app/acls.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  public valuesArray: Array<any>;


  constructor(
    public eventregister: EventRegisterService,
    public acls: AclsService,
    public storage:Storage,
    public alertController: AlertController
  ) { }

  ngOnInit() { 
    this.valuesArray = new Array<Map<string, any>>();
    this.eventregister.storage.forEach((value, key) =>{
      this.valuesArray.unshift(value);
      console.log(value);
    })
  }
  opendetails(p: Map<string, any>){
    console.log(p)
  } 
  async deleteRegister(p: Map<string, any>){
    const alert = await this.alertController.create({
      mode: "ios",
      header: 'Are you sure you want to delete this entry?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'YES',
          handler: async() => {
            let valuetodelete = p.get('start')
            this.eventregister.storage.remove(valuetodelete.toString());
            const alert = await this.alertController.create({
              header: 'Confirmation',
              message: 'Register deleted',
              buttons: [{
                text: 'OK',
                handler: () => {this.ngOnInit();}
              }]
            });
            await alert.present();
          }
        },
        {
          text: 'NO',
        }
      ]
    });
    await alert.present();
  } 

}

