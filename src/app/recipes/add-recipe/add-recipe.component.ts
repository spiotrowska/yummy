import { IngredientModel } from './../../_models/ingredient.model';
import { IngredientsService } from './../../_services/ingredients.service';
import { UnitEnum } from './../../_models/unit.enum';
import { Router } from '@angular/router';
import { RecipeModel } from './../../_models/recipe.model';
import { RecipesService } from './../../_services/recipes.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UnitsService } from './../../_services/units.service';

@Component({
	selector: 'app-add-recipe',
	templateUrl: './add-recipe.component.html',
	styleUrls: ['./add-recipe.component.less'],
	providers: [RecipesService, UnitsService, IngredientsService]
})
export class AddRecipeComponent implements OnInit {
	protected recipeForm: FormGroup;
	protected UnitEnum = UnitEnum;
	protected units: UnitEnum;
	protected ingredients: IngredientModel[];

	constructor(
		private fb: FormBuilder,
		private recipesService: RecipesService,
		private router: Router,
		private unitsService: UnitsService,
		private ingredientsService: IngredientsService
	) { }

	ngOnInit() {
		this.getUnits();
		this.getIngredients();
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
		this.recipeIngredientsForm.push(this.buildRecipeIngredientForm());
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

	private buildRecipeIngredientForm(): FormGroup {
		return this.fb.group({
			ingredientId: '',
			quantity: '',
			unit: ''
		});
	}

	private getUnits() {
		this.unitsService.getUnits().subscribe(
			(units: UnitEnum) => {
				this.units = units;
			}
		);
	}

	private getIngredients() {
		this.ingredientsService.getIngredients().subscribe(
			(ingredients: IngredientModel[]) => {
				this.ingredients = ingredients;
			}
		);
	}

}
