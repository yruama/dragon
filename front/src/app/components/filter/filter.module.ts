import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        FilterComponent
    ],
    exports: [FilterComponent]
})
export class FilterModule { }
