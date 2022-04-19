import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugarDesafioComponent } from './jugar-desafio.component';

describe('JugarDesafioComponent', () => {
  let component: JugarDesafioComponent;
  let fixture: ComponentFixture<JugarDesafioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugarDesafioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JugarDesafioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
