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
  it('should start on an empty partialDict', ()=>{
    let date = new Date
    service.rcpEventStart(date);
    let partialDictLenght = service.partialDict.size
    expect(partialDictLenght).toEqual(1);
  })
  it('should register current date', async()=>{
    let date = new Date
    service.rcpEventStart(date);
    let partialDictValue = await service.partialDict.get('start')
    expect(partialDictValue).toEqual(date)
  })
  describe('Storage', ()=>{
    it('key must be start time, value partialdict', async()=>{
      let date = new Date
      service.rcpEventStart(date);
      service.rcpEventEnds(new Date)
      const getfromkey = await service.storage.get(date.toString())
      expect(getfromkey).not.toBeNull;
      expect(getfromkey).toEqual(service.partialDict)

    })
  })





});
