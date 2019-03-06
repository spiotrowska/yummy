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

	getRecipe(id: string): Observable<RecipeModel> {
		return this.http.get<RecipeModel>(`recipes/${id}`);
	}
}
