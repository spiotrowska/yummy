import { DashboardRecipeComponent } from './dashboard-recipe/dashboard-recipe.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { DashboardRecipesComponent } from './dashboard-recipes/dashboard-recipes.component';
import { UserRecipeComponent } from './recipes/user-recipe/user-recipe.component';
import { UserRecipesComponent } from './recipes/user-recipes/user-recipes.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { SettingsComponent } from './settings/settings.component';
import { PrivateComponent } from './private/private.component';
import { PublicComponent } from './public/public.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes/recipes.component';

const appRoutes: Routes = [
	{ path: '', component: PublicComponent, children: [
		{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
		{ path: 'dashboard', children: [
			{ path: '', component: DashboardRecipesComponent },
			{ path: ':id', component: DashboardRecipeComponent }
		] },
		{ path: 'login', component: LoginComponent } ]
	},
	{ path: 'private', component: PrivateComponent, canActivate: [AuthGuard], children: [
		{ path: '', redirectTo: 'recipes', pathMatch: 'full' },
		{ path: 'recipes', children: [
			{ path: '', component: RecipesComponent },
			{ path: ':id', component: RecipeComponent }
		] },
		{ path: 'add-recipe', component: AddRecipeComponent },
		{ path: 'user-recipes', children: [
			{ path: '', component: UserRecipesComponent },
			{ path: ':id', component: UserRecipeComponent },
			{ path: ':id/edit', component: EditRecipeComponent }
		] },
		{ path: 'settings', component: SettingsComponent }
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
