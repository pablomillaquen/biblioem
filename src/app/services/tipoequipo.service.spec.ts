import { TestBed, inject } from '@angular/core/testing';

import { TipoequipoService } from './tipoequipo.service';

describe('TipoequipoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoequipoService]
    });
  });

  it('should be created', inject([TipoequipoService], (service: TipoequipoService) => {
    expect(service).toBeTruthy();
  }));
});
