import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { StatisticsPage } from './statistics.page';
import { Storage } from '@ionic/storage';
import { MockStorage } from 'src/mocks/storage';
import { MockNavController } from 'src/mocks/navcontroller';
import { ChildrenOutletContexts, Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { MockChildrenOutletContexts } from 'src/mocks/childrenoutletcontexts';
import { MockActivatedRoute } from 'src/mocks/activatedroute';
import { RouterTestingModule } from '@angular/router/testing'; 
import { MockRouter } from 'src/mocks/router';



describe('StatisticsPage', () => {
  let component: StatisticsPage;
  let fixture: ComponentFixture<StatisticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: Storage, useClass: MockStorage },
        { provide: NavController, useClass: MockNavController },
        { provide: ChildrenOutletContexts, useClass: MockChildrenOutletContexts },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
describe('should show just 1 set of statistics',() => {
  it('show personal and no national', () => {
    component.selectChart('personal')
    expect(component.national).toEqual(true)
    expect(component.personal).toEqual(false)
  })
  it('show national and no personal', () => {
    component.selectChart('national')
    expect(component.personal).toEqual(true)
    expect(component.national).toEqual(false)
  })
})
describe('should create graphs', () =>{
  beforeEach(async()=>{
    fixture.detectChanges()
    await component.createRegistersChart()
  })
  it('age', ()=>{
    expect(component.registers).not.toBe(null)
  })
  it('gender', ()=>{
    expect(component.gender).not.toBe(null)
  })
  it('race', ()=>{
    expect(component.race).not.toBe(null)
  })
  it('rhythm', ()=>{
    expect(component.rhythm).not.toBe(null)
  })
  it('rosc', ()=>{
    expect(component.rosc).not.toBe(null)
  })
})

});
