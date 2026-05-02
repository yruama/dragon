import { Component, ViewChild } from '@angular/core';

import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-database',
  imports: [ModalComponent],
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss',
})
export class DatabaseComponent {
  currentTab = 0;
   @ViewChild('maModal') maModal!: ModalComponent;

  changeTab(tab: number) {
    this.currentTab = tab;
  }

  onClose() {
    console.log("onClose")
  }

  add() {
    console.log("add")
  }

  openModal(): void {
    console.log("MODAL : ", this.maModal)
    this.maModal.open();
  }
}
