import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleForm } from './add-article-form';

describe('AddArticleForm', () => {
  let component: AddArticleForm;
  let fixture: ComponentFixture<AddArticleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddArticleForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AddArticleForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
