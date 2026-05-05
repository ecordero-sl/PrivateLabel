import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailContent } from './email-content';

describe('EmailContent', () => {
  let component: EmailContent;
  let fixture: ComponentFixture<EmailContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
