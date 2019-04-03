import { environment } from './../../../environments/environment';
import { UnitEnum } from './../../_models/unit.enum';
import { RecipeModel } from './../../_models/recipe.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-recipe-details-view',
	templateUrl: './recipe-details-view.component.html',
	styleUrls: ['./recipe-details-view.component.less']
})
export class RecipeDetailsViewComponent implements OnInit {
	@Input() recipe: RecipeModel;
	protected UnitEnum = UnitEnum;
	protected recipeImagesUrls: string[] = [];

	constructor() { }

	ngOnInit() {
		this.setRecipeImagesUrls();
	}

	private setRecipeImagesUrls() {
		if (this.recipe) {
			this.recipeImagesUrls = this.recipe.recipeImages.map(
				(recipeImageId: string) => `${environment.apiUrl}recipesImages/${recipeImageId}`
			);
		}
	}

}
