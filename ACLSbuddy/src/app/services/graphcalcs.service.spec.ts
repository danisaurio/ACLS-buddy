import { TestBed } from '@angular/core/testing';

import { GraphcalcsService } from './graphcalcs.service';
import { Storage } from '@ionic/storage';
import { MockStorage } from 'src/mocks/storage';


describe('GraphcalcsService', () => {
  let service: GraphcalcsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useClass: MockStorage }
      ]
    });
    service = TestBed.inject(GraphcalcsService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get age frequency', () => {
    it('should have the same total number as total registers', async () =>{
      let returnedarray = await service.getAgesFrecuency()
      let totalElementsArray = 0
      for(let i = 0; i < 10; i++){
        totalElementsArray += returnedarray[i]
      }
      expect(totalElementsArray).toEqual(3)
    })
    it('should return expected values', async() => {
      let returnedarray = await service.getAgesFrecuency()
      expect(returnedarray[0]).toEqual(3)
    })
  })

  describe('get gender frequency', () => {
    it('should have the same total number as total registers', async () =>{
      let returnedarray = await service.getGenderFrecuency()
      let totalElementsAraay = 0
      for(let i = 0; i < 3; i++){
        totalElementsAraay += returnedarray[i]
      }
      expect(totalElementsAraay).toEqual(3)
    })
    it('should return expected values', async() => {
      let returnedarray = await service.getGenderFrecuency()
      expect(returnedarray[0]).toEqual(1)
      expect(returnedarray[1]).toEqual(2)
      expect(returnedarray[2]).toEqual(0)
    })
  })

  describe('get race frequency', () => {
    it('should have the same total number as total registers', async () =>{
      let returnedarray = await service.getRaceFrecuency()
      let totalElementsAraay = 0
      for(let i = 0; i < 6; i++){
        totalElementsAraay += returnedarray[i]
      }
      expect(totalElementsAraay).toEqual(3)
    })
    it('should return expected values', async() => {
      let returnedarray = await service.getRaceFrecuency()
      expect(returnedarray[0]).toEqual(1)
      expect(returnedarray[1]).toEqual(2)
      expect(returnedarray[2]).toEqual(0)
    })
    
  })

  describe('get rhythm frequency', () => {
    it('should have the same total number as total registers', async () =>{
      let returnedarray = await service.getRhythmFrecuency()
      let totalElementsAraay = 0
      for(let i = 0; i < 5; i++){
        totalElementsAraay += returnedarray[i]
      }
      expect(totalElementsAraay).toEqual(3)
    })
    it('should return expected values', async() => {
      let returnedarray = await service.getRhythmFrecuency()
      expect(returnedarray[0]).toEqual(0)
      expect(returnedarray[1]).toEqual(0)
      expect(returnedarray[2]).toEqual(3)
    })
  })

  describe('get rosc frequency', () => {
    it('should have the same total number as total registers', async () =>{
      let returnedarray = await service.getRoscFrecuency()
      let totalElementsAraay = 0
      for(let i = 0; i < 3; i++){
        totalElementsAraay += returnedarray[i]
      }
      expect(totalElementsAraay).toEqual(3)
    })
    it('should return expected values', async() => {
      let returnedarray = await service.getRoscFrecuency()
      expect(returnedarray[0]).toEqual(3)
      expect(returnedarray[1]).toEqual(0)
      expect(returnedarray[2]).toEqual(0)
    })

  })
  it('valid entries should return valid value', async() => {
    let validentries = await service.getValidEntries()
    expect(validentries.length).toEqual(3)
  })
  it('registers values shuld return valid value', async() => {
    let regvaluescomplete = await service.getRegistersValues()
    expect(regvaluescomplete[0]).toEqual(2)
    expect(regvaluescomplete[1]).toEqual(1)
  })
  describe('get projected rate', () => {
    it('should return a number between 0 and 100', async() => {
      let result = await service.getProjectedRate()
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(100)
    })
  })
  describe('get net rate', () => {
    it('should return a number between 0 and 100', async() => {
      let result = await service.getProjectedRate()
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(100)
    })
  })



});
