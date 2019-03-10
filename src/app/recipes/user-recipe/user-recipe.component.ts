import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from './../../_services/recipes.service';
import { UnitEnum } from './../../_models/unit.enum';
import { RecipeModel } from './../../_models/recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-user-recipe',
	templateUrl: './user-recipe.component.html',
	styleUrls: ['./user-recipe.component.less'],
	providers: [RecipesService]
})
export class UserRecipeComponent implements OnInit {
	protected recipe: RecipeModel;
	protected UnitEnum = UnitEnum;

	constructor(
		private recipesService: RecipesService,
		private activatedRoute: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.getRecipe(this.getRecipeIdFromUrl());
	}

	protected redirectToEditRecipe() {
		this.router.navigate([`private/user-recipes/${this.recipe.id}/edit`]);
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
