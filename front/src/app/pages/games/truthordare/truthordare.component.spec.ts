import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruthordareComponent } from './truthordare.component';

describe('TruthordareComponent', () => {
  let component: TruthordareComponent;
  let fixture: ComponentFixture<TruthordareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruthordareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruthordareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
