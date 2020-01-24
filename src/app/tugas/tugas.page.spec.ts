import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TugasPage } from './tugas.page';

describe('TugasPage', () => {
  let component: TugasPage;
  let fixture: ComponentFixture<TugasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TugasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TugasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
