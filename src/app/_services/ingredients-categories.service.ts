import { IdNameModel } from './../_models/id-name.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class IngredientsCategoriesService {

	constructor(private http: HttpClient) {}

	getIngredientsCategories(): Observable<IdNameModel[]> {
		return this.http.get<IdNameModel[]>('ingredientsCategories');
	}
}
