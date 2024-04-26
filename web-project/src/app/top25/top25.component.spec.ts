import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top25Component } from './top25.component';

describe('Top25Component', () => {
  let component: Top25Component;
  let fixture: ComponentFixture<Top25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top25Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Top25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
