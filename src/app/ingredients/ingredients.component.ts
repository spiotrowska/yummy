import { IngredientModel } from './../_models/ingredient.model';
import { IngredientsService } from './../_services/ingredients.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-ingredients',
	templateUrl: './ingredients.component.html',
	styleUrls: ['./ingredients.component.less'],
	providers: [IngredientsService]
})
export class IngredientsComponent implements OnInit {
	protected ingredients: IngredientModel[];

	constructor(private ingredientsService: IngredientsService) {
	}

	ngOnInit() {
		this.getIngredients();
	}

	private getIngredients() {
		this.ingredientsService.getIngredients().subscribe(
			(ingredients: IngredientModel[]) => {
				this.ingredients = ingredients;
			}
		);
	}

}
