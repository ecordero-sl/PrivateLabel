import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConfig } from './new-config';

describe('NewConfig', () => {
  let component: NewConfig;
  let fixture: ComponentFixture<NewConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
