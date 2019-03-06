import { AuthUserService } from './../_services/auth-user.service';
import { Router } from '@angular/router';
import { RecipesService } from './../_services/recipes.service';
import { RecipeModel } from './../_models/recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.less'],
	providers: [RecipesService]
})
export class RecipesComponent implements OnInit {
	protected recipes: RecipeModel[];

	constructor(
		private recipesService: RecipesService,
		private router: Router,
		private authUserService: AuthUserService) { }

	ngOnInit() {
		this.getRecipes();
	}

	protected redirectToRecipe(recipeId: string) {
		let recipeUrl: string;
		if (this.authUserService.isUserLogged) {
			recipeUrl = `private/recipes/${recipeId}`;
		} else {
			recipeUrl = `dashboard/${recipeId}`;
		}
		this.router.navigate([recipeUrl]);
	}

	private getRecipes() {
		this.recipesService.getRecipes().subscribe(
			(recipes: RecipeModel[]) => {
				this.recipes = recipes;
			}
		);
	}

}
