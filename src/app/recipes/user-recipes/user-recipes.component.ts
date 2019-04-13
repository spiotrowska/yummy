import { RecipesService } from './../../_services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { RecipeModel } from './../../_models/recipe.model';

@Component({
	selector: 'app-user-recipes',
	templateUrl: './user-recipes.component.html',
	styleUrls: ['./user-recipes.component.less'],
	providers: [RecipesService]
})
export class UserRecipesComponent implements OnInit {
	protected userRecipes: RecipeModel[];
	protected searchButtonClicked = false;

	constructor(private recipesService: RecipesService) { }

	ngOnInit() {
		this.getUserRecipes();
	}

	private getUserRecipes() {
		this.recipesService.getUserRecipes().subscribe(
			(userRecipes: RecipeModel[]) => {
				this.userRecipes = userRecipes;
			}
		);
	}

}
