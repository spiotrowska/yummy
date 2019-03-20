import { CreateRecipeRatingModel } from './../_models/create-recipe-rating.model';
import { RecipeRatingModel } from './../_models/recipe-rating.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeRatingsService {

	constructor(private http: HttpClient) {}

	getRecipeRatings(recipeId: string): Observable<RecipeRatingModel[]> {
		return this.http.get<RecipeRatingModel[]>(`recipesRatings/${recipeId}`);
	}

	updateRecipeRating(recipeRating: RecipeRatingModel): Observable<RecipeRatingModel> {
		return this.http.put<RecipeRatingModel>(`recipesRatings/${recipeRating.id}`, recipeRating);
	}

	deleteRecipeRating(recipeRatingId: string) {
		return this.http.delete(`recipesRatings/${recipeRatingId}`);
	}

	createRecipeRating(createRecipeRatingModel: CreateRecipeRatingModel): Observable<RecipeRatingModel> {
		return this.http.post<RecipeRatingModel>('recipesRatings', createRecipeRatingModel);
	}

}
