import { RecipeRatingModel } from './../../_models/recipe-rating.model';
import { RecipeRatingsService } from './../../_services/recipe-ratings.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-recipe-ratings',
	templateUrl: './recipe-ratings.component.html',
	styleUrls: ['./recipe-ratings.component.less'],
	providers: [RecipeRatingsService]
})
export class RecipeRatingsComponent implements OnInit {
	@Input() recipeId: string;
	@Input() isOnDashboard: boolean;
	protected recipeRatings: RecipeRatingModel[];

	constructor(private recipeRatingsService: RecipeRatingsService) { }

	ngOnInit() {
		this.getRecipeRatings();
	}

	private getRecipeRatings() {
		this.recipeRatingsService.getRecipeRatings(this.recipeId).subscribe(
			(recipeRatings: RecipeRatingModel[]) => {
				this.recipeRatings = recipeRatings;
			}
		);
	}

}
