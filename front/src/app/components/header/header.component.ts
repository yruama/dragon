import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isConnected = false;

  constructor(private GlobalService: GlobalService,
              public AuthGuardService: AuthGuardService
  ) {}

  	async ngOnInit(): Promise<void> {
      this.GlobalService.userConnected$.subscribe((userConnected) => {
        this.isConnected = userConnected;
      });
    }
}
