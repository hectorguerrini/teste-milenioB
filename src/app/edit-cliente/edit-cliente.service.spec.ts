import { TestBed } from '@angular/core/testing';

import { EditClienteService } from './edit-cliente.service';

describe('EditClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditClienteService = TestBed.get(EditClienteService);
    expect(service).toBeTruthy();
  });
});
