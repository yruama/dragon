import { Pipe, PipeTransform } from '@angular/core';

/**
 * Génère les styles inline d'un tag à partir d'une couleur hex.
 * Usage : {{ category.color | tagStyle }}
 *         [ngStyle]="category.color | tagStyle"
 */
@Pipe({ name: 'tagStyle', standalone: true })
export class TagStylePipe implements PipeTransform {

  transform(hex: string): Record<string, string> {
    const { r, g, b } = this.hexToRgb(hex);
    return {
      'background-color': `rgba(${r}, ${g}, ${b}, 0.13)`,
      'color':            hex,
      'border-color':     `rgba(${r}, ${g}, ${b}, 0.35)`,
    };
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const clean = hex.replace('#', '');
    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16),
    };
  }
}