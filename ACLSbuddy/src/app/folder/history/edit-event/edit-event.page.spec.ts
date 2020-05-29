import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { EditEventPage } from './edit-event.page';
import { MockStorage } from 'src/mocks/storage';
import { HistoryPage } from '../history.page'; 
import { MockHistory } from 'src/mocks/history';
import { Router, ActivatedRoute } from '@angular/router';
import { MockRouter } from 'src/mocks/router';
import { MockActivatedRoute } from 'src/mocks/activatedroute';

describe('EditEventPage', () => {
  let component: EditEventPage;
  let fixture: ComponentFixture<EditEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Storage, useClass: MockStorage },
        { provide: HistoryPage, useClass: MockHistory },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
