import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public lockOpening: boolean;
  public pendingAlerts = [];


  constructor(
    public alertController: AlertController
  ) { }

  create(alertParams){
    this.pendingAlerts.push(alertParams)
    if(this.pendingAlerts.length === 1){
      this.showAlert()
    }
    
  }
  async showAlert(){
    if (this.pendingAlerts.length > 0){
      const alert = await this.alertController.create(this.pendingAlerts[0])
      await alert.present();
      await alert.onDidDismiss().then(()=>{
        this.pendingAlerts.shift()
        this.showAlert()
      })
   }
    
  }

  eliminateRemainingAlerts(){
    this.pendingAlerts = []
  }

}
