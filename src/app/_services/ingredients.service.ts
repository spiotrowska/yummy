import { IngredientModel } from './../_models/ingredient.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class IngredientsService {

	constructor(private http: HttpClient) {
	}

	getIngredients(): Observable<IngredientModel[]> {
		return this.http.get<IngredientModel[]>('ingredients');
	}

	getIngredientsSearcher(phrase: string): Observable<IngredientModel[]> {
		return this.http.get<IngredientModel[]>('ingredients/searcher', { params: { phrase: phrase }})
			.map(response => response);
	}
}
