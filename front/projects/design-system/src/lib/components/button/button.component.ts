import { Component, Input } from '@angular/core';

type ButtonVariant = 'fill' | 'outline';

@Component({
  selector: 'spark-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'fill';
  @Input() disabled = false;
}