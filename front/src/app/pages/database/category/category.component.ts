import { Category } from 'src/app/types/category.types';
import { CategoryService } from 'src/app/services/category.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TagStylePipe } from 'src/app/pipe/tag-style.pipe';

@Component({
  selector: 'app-category',
  imports: [TagStylePipe, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  categories: Category[] = [];

  constructor(private CategoryService: CategoryService) {}

  async ngOnInit(): Promise<void> {
    this.categories = await this.CategoryService.get();
  }
}
