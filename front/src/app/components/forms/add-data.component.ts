import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DareService } from 'src/app/services/dare.service';

type TypeItem = 'ACTION' | 'VERITE';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddDataComponent {
  form: FormGroup;

  types: TypeItem[] = ['ACTION', 'VERITE'];

  constructor(private fb: FormBuilder,
              private dareService: DareService
  ) {
    this.form = this.fb.group({
      PHRASE: ['', [Validators.required, Validators.maxLength(500)]],
      TYPE: ['ACTION', Validators.required],
      CATEGORIE: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      TAGS: ['']
    });
  }

  async submit(): Promise<void> {
    if (this.form.invalid) return;

    const value = {
      ...this.form.value,
      TAGS: this.form.value.TAGS
        ? this.form.value.TAGS.split(',').map((t: string) => t.trim())
        : []
    };

    console.log(value);
    await this.dareService.add(value);
  }
}