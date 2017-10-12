import { TestBed, inject } from '@angular/core/testing';

import { TorpedoService } from './torpedo.service';

describe('TorpedoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TorpedoService]
    });
  });

  it('should be created', inject([TorpedoService], (service: TorpedoService) => {
    expect(service).toBeTruthy();
  }));
});
