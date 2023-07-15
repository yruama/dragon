import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private _translate: TranslateService) {}

  async ngOnInit() {
    await new Promise(resolve => setTimeout(resolve, 150)); // Pour attendre l'initialisation des traductions
    const generationItems: MenuItem[] = [];

    generationItems.push({
      label: this._translate.instant('GENERAL.all'),
      routerLink: '/pokedex/'
    })

    for (let index = 1; index < 10; index++) {
      const menuItem: MenuItem = {
        label: this._translate.instant('POKEDEX.' + index.toString() + 'gen'),
        routerLink: '/pokedex/' + index
      }

      generationItems.push(menuItem)
    }

    this.items = [
      {
          label: this._translate.instant('pokedex'),
          icon: 'pi pi-fw pi-map-marker',
          items: generationItems

      },
    ];
   
  }



}
