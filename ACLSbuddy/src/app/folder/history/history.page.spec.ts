import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
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
      expect(component.valuesArray.length).toEqual(3)
    })
    it('should have size-1 after delete', () => {
      component.ngOnInit()
      component.removeValue(component.valuesArray[0]) 
      expect(component.valuesArray.length).toEqual(2)
    }) 
  })
  it('should pass selected event to next page', async(() => {
    spyOn(component, 'opendetails')
    let selected = fixture.debugElement.nativeElement.querySelector('ion-label.keys');
    selected.click()
    fixture.detectChanges()
    expect(component.opendetails).toHaveBeenCalledWith(component.valuesArray[0])

  }))


});
