export interface RecipeRatingModel {
	id: string;
	recipeId: string;
	rate: number;
	comment: string;
	userId: string;
	userFullName: string;
}
