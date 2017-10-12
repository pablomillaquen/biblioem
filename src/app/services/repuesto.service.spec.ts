import { TestBed, inject } from '@angular/core/testing';

import { RepuestoService } from './repuesto.service';

describe('RepuestoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepuestoService]
    });
  });

  it('should be created', inject([RepuestoService], (service: RepuestoService) => {
    expect(service).toBeTruthy();
  }));
});
