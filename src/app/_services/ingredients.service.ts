import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IngredientModel } from '../_models/ingredient.model';

@Injectable()
export class IngredientsService {

	constructor(private http: HttpClient) {
	}

	getIngredients(): Observable<IngredientModel[]> {
		return this.http.get<IngredientModel[]>('ingredients');
	}
}
