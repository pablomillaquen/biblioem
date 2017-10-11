import { TestBed, inject } from '@angular/core/testing';

import { ProtocolosService } from './protocolos.service';

describe('ProtocolosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProtocolosService]
    });
  });

  it('should be created', inject([ProtocolosService], (service: ProtocolosService) => {
    expect(service).toBeTruthy();
  }));
});
