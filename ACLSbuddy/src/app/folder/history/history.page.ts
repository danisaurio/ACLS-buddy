import { Component, OnInit } from '@angular/core';
import { EventRegisterService } from 'src/app/event-register.service';
import { AclsService } from 'src/app/acls.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  public valuesArray: Array<{[key: string]: any}>;
  public eventtoedit: any;

  constructor(
    public eventregister: EventRegisterService,
    public acls: AclsService,
    public storage:Storage,
    public alertController: AlertController,
    public route:Router,
  ) { }


  ngOnInit() { 
    this.valuesArray = [];
    this.eventregister.storage.forEach((value) =>{
      this.valuesArray.unshift(value);
    })
  }
  async deleteRegister(p: {[key: string]: any}){
    const alert = await this.alertController.create({
      mode: "ios",
      header: 'Are you sure you want to delete this entry?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'YES',
          handler: async() => {
            this.removeValue(p)
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
  removeValue(p: {[key: string]: any}){
    let valuetodelete = p.start
    this.eventregister.storage.remove(valuetodelete.toString());
    this.valuesArray.splice(this.valuesArray.indexOf(p), 1)
  }
  async opendetails(p: {[key: string]: any}){
    let navigationExtras: NavigationExtras = {
      state: {
        user: p
      }
    };
    await this.route.navigate(['edit-event'], navigationExtras)
    
  } 

}

