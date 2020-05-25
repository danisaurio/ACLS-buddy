import { TestBed, fakeAsync, tick, async } from '@angular/core/testing';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start clock instance', fakeAsync(() => {
    service.start();
    tick(1000);
    expect(service.time).toEqual('00:00:01.000')
    service.stop();
  }))
  it('should stop clock instance', fakeAsync(() => {
    service.start();
    tick(1000);
    service.stop();
    tick(1000);
    expect(service.time).toEqual('00:00:01.000')
  }))
  it('should restart clock instance', fakeAsync(() => {
    service.start();
    tick(1000);
    service.reset();
    expect(service.time).toEqual('00:00.000')
  }))
  it('should wait 2 minutes', fakeAsync(async() => {
    const response = service.twoMinNotification();
    tick(120000);
    await expectAsync(response).toBeResolvedTo(true);
  }))
  it('should stop twoMinNotification', fakeAsync(async() => {
    const response = service.twoMinNotification();
    service.stopTwoMinNotification();
    tick(120000);
    await expectAsync(response).toBeResolvedTo(false);
  }))


});
