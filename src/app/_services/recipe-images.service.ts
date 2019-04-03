import { CreateRecipeImagesModel } from './../_models/create-recipe-images.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeImagesService {

	constructor(private http: HttpClient) {}

	createRecipeImages(createRecipeImagesModel: CreateRecipeImagesModel): Observable<string> {
		return this.http.post<string>('recipesImages', createRecipeImagesModel);
	}

}
