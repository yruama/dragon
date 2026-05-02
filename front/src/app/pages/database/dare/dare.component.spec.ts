import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DareComponent } from './dare.component';

describe('DareComponent', () => {
  let component: DareComponent;
  let fixture: ComponentFixture<DareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
