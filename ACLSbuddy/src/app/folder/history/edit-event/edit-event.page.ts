import { Component, OnInit, ElementRef } from '@angular/core';
import { EventRegisterService } from 'src/app/event-register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AclsService } from 'src/app/acls.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {
  public eventtoedit: any;
  public initials: string
  public age: number;
  public gender: string;
  public race: string;
  public rhythm: string;
  public rosc: string;


  constructor(
    public eventregister: EventRegisterService,
    private route: ActivatedRoute, 
    private router: Router,
    public aclsService: AclsService,
    public alertController: AlertController,
    public htmlelement: ElementRef,
  ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras) {
        this.eventtoedit = this.router.getCurrentNavigation().extras.state.user;
      }
    });
  }

  ngOnInit() {
    this.initials = this.eventtoedit.initials
    this.age = this.eventtoedit.age
    this.gender = this.eventtoedit.gender
    this.race = this.eventtoedit.race
    this.rhythm = this.eventtoedit.rhythm
    this.rosc = this.eventtoedit.rosc

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
              this.eventregister.removeWholeEvent(this.eventtoedit)
              await this.router.navigate(['folder/history'])
            }
          }
        ]
      })
      await alert.present();
      }; 

  async saveButton(){

    this.eventtoedit.initials =  this.initials
    this.eventtoedit.age = this.age
    this.eventtoedit.gender = this.gender
    this.eventtoedit.race = this.race
    this.eventtoedit.rhythm = this.rhythm
    this.eventtoedit.rosc =this.rosc

    await this.eventregister.storage.set(this.eventtoedit.key, this.eventtoedit)
    await this.router.navigate(['folder/history'])

  }
}
