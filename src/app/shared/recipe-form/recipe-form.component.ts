import { RecipeModel } from './../../_models/recipe.model';
import { IngredientsService } from './../../_services/ingredients.service';
import { UnitsService } from './../../_services/units.service';
import { IngredientModel } from './../../_models/ingredient.model';
import { UnitEnum } from './../../_models/unit.enum';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-recipe-form',
	templateUrl: './recipe-form.component.html',
	styleUrls: ['./recipe-form.component.less'],
	providers: [UnitsService, IngredientsService]
})
export class RecipeFormComponent implements OnInit {
	@Input() recipe: RecipeModel;
	@Output() recipeEmitter: EventEmitter<RecipeModel> = new EventEmitter<RecipeModel>();
	protected recipeForm: FormGroup;
	protected UnitEnum = UnitEnum;
	protected units: UnitEnum;
	protected ingredients: IngredientModel[];

	constructor(
		private fb: FormBuilder,
		private unitsService: UnitsService,
		private ingredientsService: IngredientsService) { }

	ngOnInit() {
		this.getUnits();
		this.getIngredients();
		this.buildForm();
		if (this.recipe) {
			this.setRecipeIngredientsValues();
		}
	}

	protected onSave() {
		this.recipeEmitter.emit(this.recipeForm.value);
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
			name: [this.recipe && this.recipe.name || '', [Validators.required]],
			summary: [this.recipe && this.recipe.summary || '', [Validators.required]],
			description: [this.recipe && this.recipe.description || '', [Validators.required]],
			difficultyLevel: [this.recipe && this.recipe.difficultyLevel || ''],
			preparationTime: [this.recipe && this.recipe.preparationTime || ''],
			totalKcal: [this.recipe && this.recipe.totalKcal || ''],
			recipeIngredients: this.fb.array([])
		});
	}

	private buildRecipeIngredientForm(ingredientId?: string, quantity?: number, unit?: UnitEnum): FormGroup {
		return this.fb.group({
			ingredientId: ingredientId || '',
			quantity: quantity || '',
			unit: unit || ''
		});
	}

	private setRecipeIngredientsValues() {
		this.recipe.recipeIngredients.forEach(recipeIngredient => {
			this.recipeIngredientsForm.push(this.buildRecipeIngredientForm(
				recipeIngredient.ingredientId,
				recipeIngredient.quantity,
				recipeIngredient.unitName
			));
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
