import { IngredientModel } from './ingredient.model';
import { RecipeRatingModel } from './recipe-rating.model';

export class RecipeModel {
	id: string;
	name: string;
	summary: string;
	description: string;
	userId: string;
	userFullName: string;
	ingredients: IngredientModel[];
	difficultyLevel: number;
	preparationTime: number;
	totalKcal: number;
	recipesRatings: RecipeRatingModel[];
}
