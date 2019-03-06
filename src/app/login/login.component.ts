import { AuthUserService } from './../_services/auth-user.service';
import { LoginUserModel } from './../_models/login-user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less'],
	providers: [AuthService]
})
export class LoginComponent implements OnInit {
	private loginForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private route: Router,
		private authService: AuthService,
		private authUserService: AuthUserService) { }

	ngOnInit() {
		this.buildForm();
	}

	private buildForm(): void {
		this.createLoginForm();
	}

	private createLoginForm(): void {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(4)]]
		});
	}

	protected login(user: LoginUserModel) {
		this.authService.authenticateUser(user).subscribe(
			(token: string) => {
				this.authUserService.authorizeUser(token);
				this.redirectToRecipes();
			}
		);
	}

	private redirectToRecipes() {
		this.route.navigate(['/private/recipes']);
	}

}
