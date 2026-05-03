import { Category } from 'src/app/types/category.types';
import { CategoryService } from 'src/app/services/category.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Level } from 'src/app/types/level.types';
import { LevelService } from 'src/app/services/level.service';

interface GameSettings {
  categories:   number[];
  level:        number[];
  playerCount:  number;
  nbQuestion:   number;
}

@Component({
  selector: 'app-truthordare',
  imports: [CommonModule, FormsModule],
  templateUrl: './truthordare.component.html',
  styleUrl: './truthordare.component.scss',
})
export class TruthordareComponent {
  // Couleurs tournantes pour les badges joueurs
  private readonly playerColors = [
    '#2b90f5', '#ffba0d', '#f472b6', '#34d399',
    '#fb923c', '#818cf8', '#f43f5e', '#67e8f9',
    '#22c55e', '#c084fc', '#facc15', '#60a5fa',
  ];
 
  settings: GameSettings = {
    categories:  [],
    level:       [],
    playerCount: 2,
    nbQuestion: 10
  };
 
  // Tableau des prénoms, synchronisé avec playerCount
  players: string[] = ['', ''];
 
  // Remplace par ton service
  categories: Category[] = [];
  level: Level[] = [];

  state: 'settings' | 'ingame' = 'settings';

  constructor(private LevelService: LevelService,
              private CategoryService: CategoryService) {}
 
  async ngOnInit(): Promise<void> {

    this.categories = await this.CategoryService.get();
    this.level = await this.LevelService.get();

    this.syncPlayers();
  }
 
  // — Incrémentation / décrémentation
  incrementPlayers(): void {
    if (this.settings.playerCount < 12) {
      this.settings.playerCount++;
      this.syncPlayers();
    }
  }
 
  decrementPlayers(): void {
    if (this.settings.playerCount > 2) {
      this.settings.playerCount--;
      this.syncPlayers();
    }
  }
 
  // — Saisie directe dans l'input number
  onPlayerCountChange(value: number): void {
    const clamped = Math.min(12, Math.max(2, value || 2));
    this.settings.playerCount = clamped;
    this.syncPlayers();
  }
 
  // — Synchronise le tableau players[] avec playerCount
  private syncPlayers(): void {
    const count = this.settings.playerCount;
    if (count > this.players.length) {
      // Ajoute les slots manquants
      while (this.players.length < count) {
        this.players.push('');
      }
    } else {
      // Retire les slots en trop
      this.players = this.players.slice(0, count);
    }
  }
 
  // — Couleur du badge joueur
  playerColor(index: number): string {
    return this.playerColors[index % this.playerColors.length];
  }
 
  // — Soumission
  onSubmit(): void {

    const payload = {
      categories:  this.settings.categories,
      level:       this.settings.level,
      playerCount: this.settings.playerCount,
      players:     this.players.map(p => p.trim()),
    };
 
    console.log('Partie lancée :', payload);
    // → this.gameService.start(payload).subscribe(...)
  }

  triggerLevel(id: number) {
    const index = this.settings.level.indexOf(id);

    if (index > -1) {
      this.settings.level.splice(index, 1); 
    } else {
      this.settings.level.push(id);
    }
  }

}
