import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStat } from './dialog-stat';

describe('DialogStat', () => {
  let component: DialogStat;
  let fixture: ComponentFixture<DialogStat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogStat],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogStat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
