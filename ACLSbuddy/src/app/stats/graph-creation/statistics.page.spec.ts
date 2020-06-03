import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { StatisticsPage } from './statistics.page';
import { Storage } from '@ionic/storage';
import { MockStorage } from 'src/mocks/storage';
import { MockNavController } from 'src/mocks/navcontroller';
import { ChildrenOutletContexts, Router, ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/mocks/activatedroute';
import { MockRouter } from 'src/mocks/router';


describe('StatisticsPage', () => {
  let component: StatisticsPage;
  let fixture: ComponentFixture<StatisticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Storage, useClass: MockStorage },
        { provide: NavController, useClass: MockNavController },
        { provide: ChildrenOutletContexts },
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
    expect(component.personal).toEqual(true)
    expect(component.patient).toEqual(false)
  })
  it('show national and no personal', () => {
    component.selectChart('national')
    expect(component.patient).toEqual(true)
    expect(component.personal).toEqual(false)
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
