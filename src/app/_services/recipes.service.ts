import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeModel } from '../_models/recipe.model';

@Injectable()
export class RecipesService {

	constructor(private http: HttpClient) {
	}

	getRecipes(): Observable<RecipeModel[]> {
		return this.http.get<RecipeModel[]>('recipes');
	}

	getUserRecipes(): Observable<RecipeModel[]> {
		return this.http.get<RecipeModel[]>('recipes/users/current');
	}

	getRecipe(id: string): Observable<RecipeModel> {
		return this.http.get<RecipeModel>(`recipes/${id}`);
	}

	createRecipe(recipe: RecipeModel): Observable<RecipeModel> {
		return this.http.post<RecipeModel>('recipes', recipe);
	}

	updateRecipe(recipe: RecipeModel, recipeId: string): Observable<RecipeModel> {
		return this.http.put<RecipeModel>(`recipes/${recipeId}`, recipe);
	}

	deleteRecipe(id: string): Observable<RecipeModel> {
		return this.http.delete<RecipeModel>(`recipes/${id}`);
	}
}
