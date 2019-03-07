import { RecipeIngredientModel } from './recipe-ingredient.model';
import { RecipeRatingModel } from './recipe-rating.model';

export class RecipeModel {
	id: string;
	name: string;
	summary: string;
	description: string;
	userId: string;
	userFullName: string;
	recipeIngredients: RecipeIngredientModel[];
	difficultyLevel: number;
	preparationTime: number;
	totalKcal: number;
	averageRate: number;
	recipesRatings: RecipeRatingModel[];
}
