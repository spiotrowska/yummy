import { Router } from '@angular/router';
import { RecipeModel } from './../../_models/recipe.model';
import { RecipesService } from './../../_services/recipes.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-add-recipe',
	templateUrl: './add-recipe.component.html',
	styleUrls: ['./add-recipe.component.less'],
	providers: [RecipesService]
})
export class AddRecipeComponent implements OnInit {

	constructor(
		private recipesService: RecipesService,
		private router: Router) { }

	ngOnInit() {
	}

	protected createRecipe(recipe: RecipeModel) {
		this.recipesService.createRecipe(recipe).subscribe(
			(data: RecipeModel) => {
				this.router.navigate(['private/user-recipes']);
			}
		);
	}

}
