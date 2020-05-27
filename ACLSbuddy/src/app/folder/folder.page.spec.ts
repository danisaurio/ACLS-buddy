import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FolderPage } from './folder.page';
import { Storage } from '@ionic/storage';
import { MockStorage } from 'src/mocks/storage';

describe('FolderPage', () => {
  let component: FolderPage;
  let fixture: ComponentFixture<FolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
      providers: [
        { provide: Storage, useClass: MockStorage }
      ]
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
