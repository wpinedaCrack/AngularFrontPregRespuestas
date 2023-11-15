import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarNombreComponent } from './ingresar-nombre.component';

describe('IngresarNombreComponent', () => {
  let component: IngresarNombreComponent;
  let fixture: ComponentFixture<IngresarNombreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresarNombreComponent]
    });
    fixture = TestBed.createComponent(IngresarNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
