import { ButtonComponent } from 'projects/design-system/src/public-api';
import { Component } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [HomeRoutingModule, ButtonComponent]
})
export class HomeComponent {

}
