import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePokedexComponent } from './profile-pokedex.component';

describe('ProfilePokedexComponent', () => {
  let component: ProfilePokedexComponent;
  let fixture: ComponentFixture<ProfilePokedexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePokedexComponent]
    });
    fixture = TestBed.createComponent(ProfilePokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
