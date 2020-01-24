import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JadwalPage } from './jadwal.page';

describe('JadwalPage', () => {
  let component: JadwalPage;
  let fixture: ComponentFixture<JadwalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JadwalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JadwalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
