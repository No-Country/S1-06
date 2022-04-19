import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioDesafioComponent } from './inicio-desafio.component';

describe('InicioDesafioComponent', () => {
  let component: InicioDesafioComponent;
  let fixture: ComponentFixture<InicioDesafioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioDesafioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioDesafioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
