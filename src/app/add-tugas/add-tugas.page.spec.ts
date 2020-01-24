import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTugasPage } from './add-tugas.page';

describe('AddTugasPage', () => {
  let component: AddTugasPage;
  let fixture: ComponentFixture<AddTugasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTugasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTugasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
