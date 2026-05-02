import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements AfterViewInit, OnDestroy {

  @Input() title  = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() closed = new EventEmitter<void>();

  @ViewChild('dialogRef') private dialogRef!: ElementRef<HTMLDialogElement>;

  private get dialog(): HTMLDialogElement {
    return this.dialogRef.nativeElement;
  }

  ngAfterViewInit(): void {
    // Ferme si clic sur le backdrop (clic direct sur <dialog>)
    this.dialog.addEventListener('click', this.onBackdropClick);
  }

  ngOnDestroy(): void {
    this.dialog.removeEventListener('click', this.onBackdropClick);
  }

  open(): void {
    this.dialog.showModal();
  }

  close(): void {
    this.dialog.close();
    this.closed.emit();
  }

  // Natif : Échap déclenche 'cancel' → on redirige vers close()
  onCancel(event: Event): void {
    event.preventDefault(); // empêche la fermeture native pour passer par close()
    this.close();
  }

  private onBackdropClick = (event: MouseEvent): void => {
    if (event.target === this.dialog) {
      this.close();
    }
  };
}