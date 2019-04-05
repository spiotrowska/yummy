import { CreateRecipeImagesModel } from './../_models/create-recipe-images.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeImagesService {

	constructor(private http: HttpClient) {}

	createRecipeImages(createRecipeImagesModel: CreateRecipeImagesModel): Observable<string> {
		return this.http.post<string>('recipesImages', createRecipeImagesModel);
	}

	deleteRecipeImages(imagesIds: string[]): Observable<void> {
		let params = new HttpParams();
		imagesIds.forEach((imageId: string) => params = params.append('ids', imageId));
		return this.http.delete<void>(`recipesImages`, { params: params });
	}

}
