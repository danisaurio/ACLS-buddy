import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MockStorage } from 'src/mocks/storage';
import { HistoryPage } from './history.page';
import { Router } from '@angular/router';
import { MockRouter } from 'src/mocks/router';

describe('HistoryPage', () => {
  let component: HistoryPage;
  let fixture: ComponentFixture<HistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Storage, useClass: MockStorage },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('valuesArray', ()=>{
    it('should be the same size as storage', async() => {
      component.ngOnInit()
      component.ionViewWillEnter()
      expect(component.valuesArray.length).toEqual(3)
    })
    it('should have size-1 after delete', () => {
      component.ngOnInit()
      component.ionViewWillEnter()
      component.removeValue(component.valuesArray[0]) 
      expect(component.valuesArray.length).toEqual(2)
    }) 
  })
  it('should pass selected event to next page', async(() => {
    spyOn(component, 'opendetails')
    component.ionViewWillEnter()
    fixture.detectChanges()
    let selected = fixture.debugElement.nativeElement.querySelector('ion-label.keys');
    selected.click()
    expect(component.opendetails).toHaveBeenCalledWith(component.valuesArray[0])

  }))
  it ('should show info from the corresponding event', () => {
    let key = new Date('Thu May 28 2020 15:21:16 GMT-0700 (Pacific Daylight Time)').toString()
    let cpr = component.storage.get(key)
    let result = component.showInfoDecision(cpr)
    expect(result).toEqual('A, 1 yo')

  })
  it('should display correct icon', () => {
    let key = new Date('Thu May 28 2020 15:21:16 GMT-0700 (Pacific Daylight Time)').toString()
    let cpr = component.storage.get(key)
    let result = component.selectIcon(cpr)
    expect(result).toEqual("checkmark-done-circle")
  })


});
