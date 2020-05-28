import { Component, OnInit } from '@angular/core';
import { EventRegisterService } from 'src/app/event-register.service';
import { HistoryPage } from '../history.page';
import { ActivatedRoute, Router } from '@angular/router';

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



}
