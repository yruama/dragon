import { Component } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { User } from 'src/app/types/user';
import { UserService } from 'src/app/services/user.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [HomeRoutingModule]
})
export class HomeComponent {

    constructor(private user: UserService) {}

    async addMel() {
        let u: User = {
            EMAIL: "Melissa",
            USERNAME: "Mal Absolu",
            PASSWORD: "melissa"
        }
        await this.user.signUp(u).subscribe();
    }
}
