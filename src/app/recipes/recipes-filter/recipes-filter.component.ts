import { RecipesService } from './../../_services/recipes.service';
import { RecipeModel } from './../../_models/recipe.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-recipes-filter',
	templateUrl: './recipes-filter.component.html',
	styleUrls: ['./recipes-filter.component.less']
})
export class RecipesFilterComponent implements OnInit {
	@Input() show: boolean;
	@Output() recipesEmitter: EventEmitter<RecipeModel[]> = new EventEmitter<RecipeModel[]>();
	protected recipesFilterForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private recipesService: RecipesService) { }

	ngOnInit() {
		this.buildForm();
	}

	protected getRecipes() {
		const phrase = this.recipesFilterForm.get('phrase').value;
		if (phrase.length > 2) {
			this.recipesService.getRecipesByFilters(phrase).subscribe(
				(recipes: RecipeModel[]) => this.recipesEmitter.emit(recipes)
			);
		}
	}

	private buildForm() {
		this.recipesFilterForm = this.fb.group({
			phrase: ''
		});
	}

}
