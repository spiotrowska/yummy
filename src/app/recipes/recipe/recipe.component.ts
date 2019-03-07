import { UnitEnum } from './../../_models/unit.enum';
import { RecipeModel } from './../../_models/recipe.model';
import { RecipesService } from './../../_services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.less'],
	providers: [RecipesService]
})
export class RecipeComponent implements OnInit {
	protected recipe: RecipeModel;
	protected UnitEnum = UnitEnum;

	constructor(
		private recipesService: RecipesService,
		private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		const recipeId = this.getRecipeIdFromUrl();
		this.getRecipe(recipeId);
	}

	private getRecipe(id: string) {
		this.recipesService.getRecipe(id).subscribe(
			(recipe: RecipeModel) => {
				this.recipe = recipe;
			}
		);
	}

	private getRecipeIdFromUrl(): string {
		return this.activatedRoute.snapshot.paramMap.get('id');
	}

}
