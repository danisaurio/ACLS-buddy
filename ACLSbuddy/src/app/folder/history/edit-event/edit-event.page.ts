import { Component, OnInit } from '@angular/core';
import { EventRegisterService } from 'src/app/event-register.service';
import { HistoryPage } from '../history.page';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AclsService } from 'src/app/acls.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {
  public eventtoedit: any;

  constructor(
    public eventregister: EventRegisterService,
    public history: HistoryPage,
    private route: ActivatedRoute, 
    private router: Router,
    public aclsService: AclsService,
    public alertController: AlertController,
  ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras) {
        this.eventtoedit = this.router.getCurrentNavigation().extras.state.user;
      }
    });
  }

  ngOnInit() {
    console.log(this.eventtoedit)
  }

  async deleteButton(){
    const alert = await this.alertController.create({
      id: 'deletedataalert',
      header: "Do you want to delete this entry? This action can't be undone",
      backdropDismiss: false,
      buttons: [
          {
            text: 'No',
          }, 
          {
            text: 'Yes',
            handler: async () => {
              this.history.removeValue(this.eventtoedit)
              await this.router.navigate(['folder/history'])
            }
          }
        ]
      })
      await alert.present();
      }; 
}
