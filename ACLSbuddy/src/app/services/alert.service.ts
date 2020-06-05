import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private pendingAlerts = [];


  constructor(
    public alertController: AlertController
  ) { }

  async create(alertParams){
    this.pendingAlerts.unshift(alertParams)
    if(this.pendingAlerts.length === 1){
      await this.showAlert()
    } 
  }
  private async showAlert(){
    if (this.pendingAlerts.length > 0){
      const alert = await this.alertController.create(this.pendingAlerts[0])
      await alert.present();
      await alert.onDidDismiss().then(()=>{
        this.pendingAlerts.pop()
        this.showAlert()
      })
   }
    
  }

  eliminateRemainingAlerts(){
    this.pendingAlerts = []
  }

}
