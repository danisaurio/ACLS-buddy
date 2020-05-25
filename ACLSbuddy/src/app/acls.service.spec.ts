import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AclsService } from './acls.service';

describe('AclsService', () => {
  let service: AclsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AclsService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('decision', () => {
    describe('step is 0', () =>{
      beforeEach(() => service.step = 0);
      it('should go to step 3 when rhythm is shockeable', () => {
        // act.
        service.decision('isShockeable');
    
        // assert.
        expect(service.step).toEqual(3);
      });
      it('should go to step 10 when rhythm is not shockeable', fakeAsync (() => {
        spyOn(service.askRhythm, 'next');
        service.decision('isNotShockeable');
        expect(service.step).toEqual(10);
        expect(service.disableButton).toBeFalse();
        tick(120000);
        expect(service.askRhythm.next).toHaveBeenCalled();
      }));
    })
    describe('step is 4', () => {
      beforeEach(() => service.step =4);
      it('should go to step 5 when rhythm is shockeable', () => {
        service.decision('isShockeable');
        expect(service.step).toEqual(5);
      })
      it('should go to step 12 when rhythm is not shockeable', () => {
        spyOn(service.step12input, 'next');
        service.decision('isNotShockeable');
        expect(service.step12input.next).toHaveBeenCalled();
      })
    })
    describe('step is 6', () => {
      beforeEach(() => service.step = 6);
      it('should go to step 7 when rhythm is shockeable', () => {
        service.decision('isShockeable');
        expect(service.step).toEqual(7);
      })
      it('should go to step 12 when rhythm is not shockeable', () => {
        spyOn(service.step12input, 'next');
        service.decision('isNotShockeable');
        expect(service.step12input.next).toHaveBeenCalled();
      })
    })
    describe('step is 8', () => {
      beforeEach(()=> service.step = 8)
      it('should go to step 5 when step is 8 and rhythm is shockeable', () => {
        service.decision('isShockeable');
        expect(service.step).toEqual(5);
      })
      it('should go to step 12 when step is 8 and rhythm is not shockeable', () => {
        spyOn(service.step12input, 'next');
        service.decision('isNotShockeable');
        expect(service.step12input.next).toHaveBeenCalled();
      })
    })
    describe('step is 10', () =>{
      beforeEach(()=> service.step = 10)
      it('should go to step 5 when rhythm is shockeable', () => {
        service.decision('isShockeable');
        expect(service.step).toEqual(5);
      })
      it('should go to step 11 when rhythm is not shockeable', fakeAsync(() => {
        spyOn(service.askRhythm, 'next');
        service.decision('isNotShockeable');
        expect(service.step).toEqual(11);
        tick(120000);
        expect(service.askRhythm.next).toHaveBeenCalled();
      }))
    })
    describe('step is 11', () =>{
      beforeEach(()=> service.step = 11)
      it('should go to step 5 when rhythm is shockeable', () => {
        service.decision('isShockeable');
        expect(service.step).toEqual(5);
      })
      it('should go to step 12 when rhythm is not shockeable', () => {
        spyOn(service.step12input, 'next');
        service.decision('isNotShockeable');
        expect(service.step12input.next).toHaveBeenCalled();
      })
    })

  })
  describe('giveShock', () => {
    it('should call step 4 if shock is given in step 3', () =>{
      spyOn(service, 'step4');
      service.giveShock(3);
      expect(service.step4).toHaveBeenCalled();
    })
    it('should call step 6 if shock is given in step 5', () =>{
      spyOn(service, 'step6');
      service.giveShock(5);
      expect(service.step6).toHaveBeenCalled();
    })
    it('should call step 8 if shock is given in step 7', () =>{
      spyOn(service, 'step8');
      service.giveShock(7);
      expect(service.step8).toHaveBeenCalled();
    })
  })
  describe('post-shock functions', () =>{
    it('should wait 2 minutes and ask rhythm in step 4', fakeAsync(() => {
      spyOn(service.askRhythm, 'next');
      service.step4();
      expect(service.step).toEqual(4);
      tick(120000);
      expect(service.askRhythm.next).toHaveBeenCalled();
    }))
    it('should wait 2 minutes, give 1st dose, and ask rhythm in step 6', fakeAsync(() => {
      spyOn(service.askRhythm, 'next');
      service.antiArrDose = 0;
      service.step6();
      expect(service.step).toEqual(6);
      expect(service.doseLido).toEqual('1 - 1.5 mg/kg');
      expect(service.doseAmio).toEqual('300 mg bolus');
      tick(120000);
      expect(service.askRhythm.next).toHaveBeenCalled();
    }))
    it('should change drug dose in step 8', () =>{
      service.antiArrDose = 1;
      service.step8()
      expect(service.doseLido).toEqual('0,5 - 0,75 mg/kg');
      expect(service.doseAmio).toEqual('150 mg');
    })
    it('should wait 2 minutes and ask rhythm in step 8', fakeAsync(() => {
      spyOn(service.askRhythm, 'next');
      service.step8();
      expect(service.step).toEqual(8);
      tick(120000);
      expect(service.askRhythm.next).toHaveBeenCalled();
    }))
   })
   describe('drugAdmin', () => {
     it ('should set selected drug to amio if string = amio', () =>{
       service.drugAdmin('amio');
       expect(service.selectedDrug).toEqual('amio');
     })
     it ('should set selected drug to lido if string = lido', () =>{
      service.drugAdmin('lido');
      expect(service.selectedDrug).toEqual('lido');
    })
   })
   describe('stopPressed', ()=>{
     it('should notify that RCP need to be stopped')
   })
});

