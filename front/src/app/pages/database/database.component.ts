import { Component, ViewChild } from '@angular/core';

import { Category } from 'src/app/types/category.types';
import { CategoryComponent } from "./category/category.component";
import { CategoryService } from 'src/app/services/category.service';
import { CommonModule } from '@angular/common';
import { Dare } from 'src/app/types/dare.types';
import { DareService } from 'src/app/services/dare.service';
import { FormsModule } from '@angular/forms';
import { Level } from 'src/app/types/level.types';
import { LevelComponent } from "./level/level.component";
import { LevelService } from 'src/app/services/level.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Truth } from 'src/app/types/truth.types';
import { TruthService } from 'src/app/services/truth.service';

@Component({
  selector: 'app-database',
  imports: [ModalComponent, CategoryComponent, LevelComponent, CommonModule, FormsModule],
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss',
})
export class DatabaseComponent {
  level: Level[] = [];
  categories: Category[] = [];

  currentTab = 0;
  @ViewChild('maModal') maModal!: ModalComponent;

  forms: Dare | Truth = {
    DESCRIPTION: '',
    LEVEL: 0,
    CATEGORIES: ''
  }

  constructor(private LevelService: LevelService,
              private CategoryService: CategoryService,
              private TruthService: TruthService,
              private DareService: DareService) {}

  changeTab(tab: number) {
    this.currentTab = tab;
  }

  onClose() {
    console.log("onClose")
  }

  async add() {
    if (this.currentTab === 0) {
      await this.DareService.add(this.forms).then(() => { this.maModal.close() })
    } else if (this.currentTab === 1) {
      await this.TruthService.add(this.forms).then(() => { this.maModal.close() })
    }

    this.forms = {
      DESCRIPTION: '',
      LEVEL: 0,
      CATEGORIES: ''
    }
  }

  async openModal(): Promise<void> {
    this.maModal.open();

    this.level = await this.LevelService.get();
    this.categories = await this.CategoryService.get();
  }

  onCategoriesChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const ids = Array.from(select.selectedOptions).map(o => o.value).join(',');

    this.forms.CATEGORIES = ids;
  }
}
