import { Component, OnInit } from '@angular/core';
import { GenerationService } from 'src/app/services/generation/generation.service';
import { PokelistService } from 'src/app/services/pokelist/pokelist.service';
import { Pokelist } from 'src/app/types/pokelist.types';

@Component({
  selector: 'app-modal-list',
  templateUrl: './modal-list.component.html',
  styleUrls: ['./modal-list.component.scss']
})
export class ModalListComponent implements OnInit {

  pokelist: Pokelist = {
    NAME: '',
    IMAGE: 'image',
    GENERATION_ID: 0,
  }

  generations: any = [];

  constructor(private _generation: GenerationService,
              private _pokelist: PokelistService) {}

  async ngOnInit() {
    const generationData = await this._generation.getGenerations();

    console.log("generationData => ", generationData)

    if (generationData.status === 'success') {
      this.generations = generationData.result;
      this.generations.forEach((_generation: any) => {
        _generation.NAME = `${_generation.NAME} - (${_generation.MIN} - ${_generation.MAX})`
      });
      console.log("Generations : ", this.generations)
    }
  }

  createList() {
    this._pokelist.addPokeList(this.pokelist);
    console.log("Pokelist : ", this.pokelist)
  }

}
