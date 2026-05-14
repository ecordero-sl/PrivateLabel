import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewControls } from './preview-controls';

describe('PreviewControls', () => {
  let component: PreviewControls;
  let fixture: ComponentFixture<PreviewControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
