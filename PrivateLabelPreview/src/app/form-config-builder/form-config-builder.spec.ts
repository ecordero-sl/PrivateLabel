import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfigBuilder } from './form-config-builder';

describe('FormConfigBuilder', () => {
  let component: FormConfigBuilder;
  let fixture: ComponentFixture<FormConfigBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormConfigBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConfigBuilder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
