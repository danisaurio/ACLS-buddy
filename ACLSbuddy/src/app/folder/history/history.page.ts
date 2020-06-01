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

  public valuesArray: Array<{[key: string]: any}> = [];
  public eventtoedit: any;
  public entrycontrol = 0;
  public iconColor

  constructor(
    public eventregister: EventRegisterService,
    public acls: AclsService,
    public storage:Storage,
    public alertController: AlertController,
    public router:Router,
  ) {}

  ngOnInit() { 
    this.valuesArray = []
  }

  async ionViewWillEnter(){
    this.valuesArray = []
    await this.eventregister.storage.forEach((value) =>{
      this.valuesArray.unshift(value);
    })
    this.valuesArray.sort((a, b) => Date.parse(b.start) - Date.parse(a.start))
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
    this.eventregister.removeWholeEvent(p)
    if(this.valuesArray !== undefined){
      this.valuesArray.splice(this.valuesArray.indexOf(p), 1)
    }

  }
  
  showInfoDecision(cpr): string {
    let strToReturn =''
    let name = cpr.initials
    let age = cpr.age
    if (name !== '' && age !== ''){
      strToReturn = name+', '+age+' yo'
    }
    else if (name !== ''){
      strToReturn = name
    }
    else if (age !== ''){
      strToReturn = age+' yo'
    }
    return strToReturn
  }

  selectIcon(cpr): string {
    let complete = "checkmark-done-circle"
    let partial = "checkmark-circle"
    let empty = "close-circle"
    let emptyCount = 0
    Object.values(cpr).forEach(value => {
      if(value === ''){
        emptyCount +=1
      }
    })
    if (emptyCount >= 6){
      this.iconColor = 'danger'
      return empty
    }
    else if (emptyCount >=1){
      this.iconColor = 'warning'
      return partial
    }
    else {
      this.iconColor = 'success'
      return complete
    }
  }
  async opendetails(p: {[key: string]: any}){
    let navigationExtras: NavigationExtras = {
      state: {
        user: p
      }
    };
    await this.router.navigate(['edit-event'], navigationExtras)
    
  } 
}


