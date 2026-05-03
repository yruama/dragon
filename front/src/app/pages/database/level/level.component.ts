import { Component } from '@angular/core';
import { Level } from 'src/app/types/level.types';
import { LevelService } from 'src/app/services/level.service';

@Component({
  selector: 'app-level',
  imports: [],
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss',
})
export class LevelComponent {
  level: Level[] = [];

  constructor(private LevelService: LevelService) {}

  async ngOnInit(): Promise<void> {
    this.level = await this.LevelService.get();

    console.log("Level : ", this.level)
  }
}
