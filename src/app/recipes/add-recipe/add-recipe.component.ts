import { Router } from '@angular/router';
import { RecipeModel } from './../../_models/recipe.model';
import { RecipesService } from './../../_services/recipes.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-add-recipe',
	templateUrl: './add-recipe.component.html',
	styleUrls: ['./add-recipe.component.less'],
	providers: [RecipesService]
})
export class AddRecipeComponent implements OnInit {
	protected recipeForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private recipesService: RecipesService,
		private router: Router
	) { }

	ngOnInit() {
		this.buildForm();
	}

	protected createRecipe(recipe: RecipeModel) {
		this.recipesService.createRecipe(recipe).subscribe(
			(data: RecipeModel) => {
				this.router.navigate(['private/user-recipes']);
			}
		);
	}

	protected get recipeIngredientsForm(): FormArray {
		return <FormArray>this.recipeForm.get('recipeIngredients');
	}

	protected addRecipeIngredient(): void {
		this.recipeIngredientsForm.push(this.buildRecipeIngredient());
	}

	protected removeRecipeIngredient(i: number): void {
		this.recipeIngredientsForm.removeAt(i);
	}

	private buildForm() {
		this.recipeForm = this.fb.group({
			name: ['', [Validators.required]],
			summary: ['', [Validators.required]],
			description: ['', [Validators.required]],
			difficultyLevel: [''],
			preparationTime: [''],
			totalKcal: [''],
			recipeIngredients: this.fb.array([])
		});
	}

	private buildRecipeIngredient(): FormGroup {
		return this.fb.group({
			ingredientId: '',
			quantity: '',
			unit: ''
		});
	}

}
