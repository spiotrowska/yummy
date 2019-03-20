import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../_models/recipe.model';
import { RecipesService } from '../_services/recipes.service';

@Component({
	selector: 'app-dashboard-recipes',
	templateUrl: './dashboard-recipes.component.html',
	styleUrls: ['./dashboard-recipes.component.less'],
	providers: [RecipesService]
})
export class DashboardRecipesComponent implements OnInit {
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
