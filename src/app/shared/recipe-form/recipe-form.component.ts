import { AddIngredientModalComponent } from './../../ingredients/add-ingredient-modal/add-ingredient-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { RecipeImageModel } from './../../_models/recipe-image.model';
import { RecipeModel } from './../../_models/recipe.model';
import { IngredientsService } from './../../_services/ingredients.service';
import { UnitsService } from './../../_services/units.service';
import { IngredientModel } from './../../_models/ingredient.model';
import { UnitEnum } from './../../_models/unit.enum';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry } from 'ngx-file-drop';

@Component({
	selector: 'app-recipe-form',
	templateUrl: './recipe-form.component.html',
	styleUrls: ['./recipe-form.component.less'],
	providers: [UnitsService, IngredientsService]
})
export class RecipeFormComponent implements OnInit {
	@Input() recipe: RecipeModel;
	@Output() recipeEmitter: EventEmitter<RecipeModel> = new EventEmitter<RecipeModel>();
	@Output() photosEmitter: EventEmitter<RecipeImageModel[]> = new EventEmitter<RecipeImageModel[]>();
	@Output() deletedPhotoIdsEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();
	protected recipeForm: FormGroup;
	protected recipeImagesForm: FormGroup;
	protected UnitEnum = UnitEnum;
	protected units: UnitEnum;
	protected ingredients: IngredientModel[];
	protected photos: { file: UploadFile, isDefault: boolean }[] = [];
	private deletedPhotoIds: string[] = [];

	constructor(
		private fb: FormBuilder,
		private unitsService: UnitsService,
		private ingredientsService: IngredientsService,
		private modalService: NgbModal) { }

	ngOnInit() {
		this.getUnits();
		this.buildForm();
		if (this.recipe) {
			this.setRecipeIngredientsValues();
		}
	}

	protected onSave() {
		this.emitRecipe();
		this.emitRecipeImages();
		this.deletedPhotoIdsEmitter.emit(this.deletedPhotoIds);
	}

	protected dropped(event: UploadEvent) {
		event.files.forEach((file) => {
			this.photos.push({ file: file, isDefault: false });
		});
	}

	protected get recipeIngredientsForm(): FormArray {
		return <FormArray>this.recipeForm.get('recipeIngredients');
	}

	protected addRecipeIngredient() {
		this.recipeIngredientsForm.push(this.buildRecipeIngredientForm());
	}

	protected removeRecipeIngredient(i: number) {
		this.recipeIngredientsForm.removeAt(i);
	}

	protected addToDeletedImageIds(index: number, id: string) {
		this.recipe.recipeImages.splice(index, 1);
		this.deletedPhotoIds.push(id);
	}

	protected search = (phrase$: Observable<string>) =>
		phrase$.switchMap(term => this.ingredientsService.getIngredientsSearcher(term))

	protected formatter = (ingredient: {name: string}) => ingredient.name;

	protected openAddRecipeIngredientModal() {
		this.modalService.open(AddIngredientModalComponent);
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
		this.recipeImagesForm = this.fb.group({
			photoDefaultIndex: ''
		});
	}

	private buildRecipeIngredientForm(ingredientId?: string, ingredientName?: string, quantity?: number, unit?: UnitEnum): FormGroup {
		return this.fb.group({
			ingredientId: { id: ingredientId, name: ingredientName } || '',
			quantity: quantity || '',
			unit: unit || ''
		});
	}

	private setRecipeIngredientsValues() {
		this.recipe.recipeIngredients.forEach(recipeIngredient => {
			this.recipeIngredientsForm.push(this.buildRecipeIngredientForm(
				recipeIngredient.ingredientId,
				recipeIngredient.ingredientName,
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

	private emitRecipe() {
		this.recipeForm.value.recipeIngredients = this.recipeForm.value.recipeIngredients
			.map(ingredient => ({
				ingredientId: ingredient.ingredientId.id,
				quantity: ingredient.quantity,
				unit: ingredient.unit
			}));
		this.recipeEmitter.emit(this.recipeForm.value);
	}

	private emitRecipeImages() {
		const recipeImages: RecipeImageModel[] = [];
		this.photos.forEach((photo, index) => {
			const fileEntry = photo.file.fileEntry as FileSystemFileEntry;
			fileEntry.file((file: File) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					recipeImages.push({
						content: reader.result.toString().replace(/^data:(.*;base64,)?/, ''),
						isDefault: this.isImageDefault(index),
						contentType: reader.result.toString().match(/data:(.*);/)[1]
					});
				};
			});
		});
		this.photosEmitter.emit(recipeImages);
	}

	private isImageDefault(index: number): boolean {
		return index === this.recipeImagesForm.value['photoDefaultIndex'];
	}

}
