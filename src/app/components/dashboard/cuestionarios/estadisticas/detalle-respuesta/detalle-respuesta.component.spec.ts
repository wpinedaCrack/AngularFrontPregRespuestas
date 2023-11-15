import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRespuestaComponent } from './detalle-respuesta.component';

describe('DetalleRespuestaComponent', () => {
  let component: DetalleRespuestaComponent;
  let fixture: ComponentFixture<DetalleRespuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleRespuestaComponent]
    });
    fixture = TestBed.createComponent(DetalleRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
