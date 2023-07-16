import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonsUserListComponent } from './pokemons-user-list.component';

describe('PokemonsUserListComponent', () => {
  let component: PokemonsUserListComponent;
  let fixture: ComponentFixture<PokemonsUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonsUserListComponent]
    });
    fixture = TestBed.createComponent(PokemonsUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
