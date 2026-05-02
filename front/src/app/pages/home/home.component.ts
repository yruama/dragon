import { ButtonComponent, ContentComponent } from 'projects/design-system/src/public-api';

import { AddDataComponent } from 'src/app/components/forms/add-data.component';
import { Component } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [HomeRoutingModule, ButtonComponent, ContentComponent, AddDataComponent]
})
export class HomeComponent {

}
