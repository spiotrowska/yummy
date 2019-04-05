import { NotifierService } from 'angular-notifier';
import { NotificationTypeEnum } from './../../_models/notification-type.enum';
import { RecipeImagesService } from './../../_services/recipe-images.service';
import { CreateRecipeImagesModel } from './../../_models/create-recipe-images.model';
import { RecipeImageModel } from './../../_models/recipe-image.model';
import { Router } from '@angular/router';
import { RecipeModel } from './../../_models/recipe.model';
import { RecipesService } from './../../_services/recipes.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-add-recipe',
	templateUrl: './add-recipe.component.html',
	styleUrls: ['./add-recipe.component.less'],
	providers: [RecipesService, RecipeImagesService]
})
export class AddRecipeComponent implements OnInit {
	protected recipeImages: RecipeImageModel[];

	constructor(
		private recipesService: RecipesService,
		private recipeImagesService: RecipeImagesService,
		private router: Router,
		private notificationService: NotifierService) { }

	ngOnInit() {
	}

	protected createRecipe(recipe: RecipeModel) {
		this.recipesService.createRecipe(recipe).subscribe(
			(data: RecipeModel) => {
				this.createRecipeImages(data.id);
				this.notificationService.notify(NotificationTypeEnum.Success, 'Dodano przepis!');
				this.router.navigate(['private/user-recipes']);
			}
		);
	}

	protected createRecipeImages(recipeId: string) {
		const createRecipeImages: CreateRecipeImagesModel = {
			recipeId: recipeId, recipeImages: this.recipeImages };
		this.recipeImagesService.createRecipeImages(createRecipeImages).subscribe(() => {});
	}

}
