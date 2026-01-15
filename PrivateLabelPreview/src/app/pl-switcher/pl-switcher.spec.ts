import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlSwitcher } from './pl-switcher';

describe('PlSwitcher', () => {
  let component: PlSwitcher;
  let fixture: ComponentFixture<PlSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlSwitcher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlSwitcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
