import { ActivatedRoute } from '@angular/router';
import { RecipesService } from './../_services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../_models/recipe.model';

@Component({
	selector: 'app-dashboard-recipe',
	templateUrl: './dashboard-recipe.component.html',
	styleUrls: ['./dashboard-recipe.component.less'],
	providers: [RecipesService]
})
export class DashboardRecipeComponent implements OnInit {
	protected recipe: RecipeModel;

	constructor(
		private recipesService: RecipesService,
		private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.getRecipe(this.getRecipeIdFromUrl());
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
