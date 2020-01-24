import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailkegiatanPage } from './detailkegiatan.page';

describe('DetailkegiatanPage', () => {
  let component: DetailkegiatanPage;
  let fixture: ComponentFixture<DetailkegiatanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailkegiatanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailkegiatanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
