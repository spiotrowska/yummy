import { RecipeImageModel } from './../../_models/recipe-image.model';
import { RecipeImagesService } from './../../_services/recipe-images.service';
import { CreateRecipeImagesModel } from './../../_models/create-recipe-images.model';
import { RecipeModel } from './../../_models/recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipesService } from './../../_services/recipes.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-edit-recipe',
	templateUrl: './edit-recipe.component.html',
	styleUrls: ['./edit-recipe.component.less'],
	providers: [RecipesService, RecipeImagesService]
})
export class EditRecipeComponent implements OnInit {
	protected recipe: RecipeModel;
	protected recipeImages: RecipeImageModel[];

	constructor(
		private recipesService: RecipesService,
		private recipeImagesService: RecipeImagesService,
		private router: Router,
		private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.getRecipe(this.getRecipeIdFromUrl());
	}

	protected updateRecipe(recipe: RecipeModel) {
		this.recipesService.updateRecipe(recipe, this.recipe.id).subscribe(
			() => {
				this.createRecipeImages();
			}
		);
	}

	private createRecipeImages() {
		const createRecipeImages: CreateRecipeImagesModel = {
			recipeId: this.recipe.id, recipeImages: this.recipeImages };
		this.recipeImagesService.createRecipeImages(createRecipeImages).subscribe(
			() => {
				this.router.navigate(['private/user-recipes']);
			}
		);
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
