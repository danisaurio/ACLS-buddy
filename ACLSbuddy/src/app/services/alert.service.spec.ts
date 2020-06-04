import { TestBed, tick, fakeAsync } from '@angular/core/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call 1 alert at a time', async() => {
    spyOn(service.alertController, "create")
    spyOn(service.alertController, "dismiss")
    service.create({buttons: ['OK1']})
    service.create({buttons: ['OK2']}) 
    expect(service.alertController.create).toHaveBeenCalledTimes(1);

  })
  it('should eliminate all values of the array when finish', () =>{
    spyOn(service.alertController, "create")
    service.create({buttons: ['OK1']})
    service.create({buttons: ['OK2']})
    service.eliminateRemainingAlerts()
    expect(service.alertController.create).toHaveBeenCalledTimes(1);
  })

});