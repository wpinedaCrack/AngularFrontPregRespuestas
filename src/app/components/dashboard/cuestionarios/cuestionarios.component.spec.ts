import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionariosComponent } from './cuestionarios.component';

describe('CuestionariosComponent', () => {
  let component: CuestionariosComponent;
  let fixture: ComponentFixture<CuestionariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuestionariosComponent]
    });
    fixture = TestBed.createComponent(CuestionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
