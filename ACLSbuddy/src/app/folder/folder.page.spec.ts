import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FolderPage } from './folder.page';
import { By } from '@angular/platform-browser';

describe('FolderPage', () => {
  let component: FolderPage;
  let fixture: ComponentFixture<FolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
    }).compileComponents();
    fixture = TestBed.createComponent(FolderPage);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should listen', () => {
    beforeEach(async() => {
      component.ngOnInit();
      await fixture.whenStable();
    })
    it('to step12input', () => {
      spyOn(component, 'rosc');
      component.aclsService.step12input.next();
      expect(component.rosc).toHaveBeenCalled();
    })
    it('to askrhythm', () => {
      spyOn(component, 'askRhythm');
      component.aclsService.askRhythm.next();
      expect(component.askRhythm).toHaveBeenCalled();
    }) 
  })

});
