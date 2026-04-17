import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Curtain } from './curtain';

describe('Curtain', () => {
  let component: Curtain;
  let fixture: ComponentFixture<Curtain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Curtain],
    }).compileComponents();

    fixture = TestBed.createComponent(Curtain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
