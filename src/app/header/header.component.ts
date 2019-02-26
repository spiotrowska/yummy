import { AuthUserService } from './../_services/auth-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
	protected isNavbarCollapsed = true;

	constructor(protected authUserService: AuthUserService) { }

	ngOnInit() {
	}

}
