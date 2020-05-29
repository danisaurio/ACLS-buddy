import { TestBed } from '@angular/core/testing';
import { EventRegisterService } from './event-register.service';
import { Storage } from '@ionic/storage';
import { MockStorage } from 'src/mocks/storage';


describe('EventRegisterService', () => {
  let service: EventRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useClass: MockStorage }
      ]
    });
    service = TestBed.inject(EventRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('number of elements on partialdict', () => {
    it('should start on an empty partialDict', ()=>{
      let date = new Date
      service.rcpEventStart(date);
      expect(service.partialDict).toBeNull;
    })
    it('should end with 6 elements', ()=>{
      let date = new Date
      service.rcpEventStart(date);
      service.rcpEventEnds(date)
      let partialdictlength = Object.keys(service.partialDict)
      expect(partialdictlength.length).toEqual(6);
    })
  })
  it('should register current date', async()=>{
    let date = new Date
    service.rcpEventStart(date);
    service.rcpEventEnds(date);
    let partialDictValue = await service.partialDict.start
    expect(partialDictValue).toEqual(date)
  })
  describe('Storage', ()=>{
    it('key must be start time, value must be partialdict', async()=>{
      let date = new Date
      service.rcpEventStart(date);
      service.rcpEventEnds(new Date)
      const getfromkey = await service.storage.get(date.toString())
      expect(getfromkey).not.toBeNull;
      expect(getfromkey).toEqual(service.partialDict)

    })
  })





});
