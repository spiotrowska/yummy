import { PrivateComponent } from './private/private.component';
import { PublicComponent } from './public/public.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AuthGuard } from './_guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes/recipes.component';

const appRoutes: Routes = [
	{ path: '', component: PublicComponent, children: [
		{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
		{ path: 'dashboard', component: DashboardComponent },
		{ path: 'login', component: LoginComponent } ]
	},
	{ path: 'private', component: PrivateComponent, canActivate: [AuthGuard], children: [
		{ path: '', redirectTo: 'recipes', pathMatch: 'full' },
		{ path: 'recipes', component: RecipesComponent },
		{ path: 'ingredients', component: IngredientsComponent }
	] }
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
