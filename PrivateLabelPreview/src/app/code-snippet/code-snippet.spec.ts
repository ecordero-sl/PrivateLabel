import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSnippet } from './code-snippet';

describe('CodeSnippet', () => {
  let component: CodeSnippet;
  let fixture: ComponentFixture<CodeSnippet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeSnippet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeSnippet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
