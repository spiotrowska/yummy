import { RecipeModel } from './../../_models/recipe.model';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-recipes-list-view',
	templateUrl: './recipes-list-view.component.html',
	styleUrls: ['./recipes-list-view.component.less']
})
export class RecipesListViewComponent implements OnInit {
	@Input() protected recipes: RecipeModel[];
	@Input() protected recipeUrl: string;

	constructor(private router: Router) {}

	ngOnInit() {
	}

	protected redirectToRecipe(recipeId: string) {
		this.router.navigate([`${this.recipeUrl}/${recipeId}`]);
	}

}
