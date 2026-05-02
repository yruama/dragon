import { Router, RouterOutlet } from "@angular/router";

import { Component } from "@angular/core";
import { GlobalService } from "./services/global/global.service";
import { LoaderComponent } from "./components/loader/loader.component";
import { LoaderService } from "./services/loader/loader.service";
import { UserService } from "./services/user/user.service";

@Component({
	imports:[RouterOutlet, LoaderComponent],
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    standalone: true
})
export class AppComponent {
	title = "Dragon";
	isLoading = false;

	constructor(
		public GlobalService: GlobalService,
		private UserService: UserService,
		private Router: Router,
		private LoaderService: LoaderService
	) {
		this.GlobalService.appLoading = true;
	}

	ngOnInit(): void {
		/* gestion loader */
		this.LoaderService.isLoading$.subscribe((isLoading) => {
			this.isLoading = isLoading;
		});

		/* check connexion */
		if (localStorage.getItem("token")) {
			// On catch un token, on vérifie qu'il est bon
			this.UserService.getByToken().subscribe({
				next: () => { },
				error: (err) => {
					console.error("[SignIn] : ", err)
					localStorage.removeItem('token');
					this.Router.navigate(['/users/sign-in'])
				},
				complete: () => { }
			})
		}


	}
}
