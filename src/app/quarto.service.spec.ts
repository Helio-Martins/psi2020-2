import { TestBed } from '@angular/core/testing';

import { QuartoService } from './quarto.service';

describe('QuartoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuartoService = TestBed.get(QuartoService);
    expect(service).toBeTruthy();
  });
});
