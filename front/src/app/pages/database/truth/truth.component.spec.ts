import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruthComponent } from './truth.component';

describe('TruthComponent', () => {
  let component: TruthComponent;
  let fixture: ComponentFixture<TruthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
