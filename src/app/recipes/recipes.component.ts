import { AuthUserService } from './../_services/auth-user.service';
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

	constructor(private recipesService: RecipesService) { }

	ngOnInit() {
		this.getRecipes();
	}

	private getRecipes() {
		this.recipesService.getRecipes().subscribe(
			(recipes: RecipeModel[]) => {
				this.recipes = recipes;
			}
		);
	}

}
