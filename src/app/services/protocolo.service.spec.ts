import { TestBed, inject } from '@angular/core/testing';

import { ProtocoloService } from './protocolo.service';

describe('ProtocoloService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProtocoloService]
    });
  });

  it('should be created', inject([ProtocoloService], (service: ProtocoloService) => {
    expect(service).toBeTruthy();
  }));
});
