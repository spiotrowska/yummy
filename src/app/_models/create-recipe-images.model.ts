import { RecipeImageModel } from './recipe-image.model';

export interface CreateRecipeImagesModel {
	recipeId: string;
	recipeImages: RecipeImageModel[];
}
