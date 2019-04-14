import { NotificationTypeEnum } from './../../_models/notification-type.enum';
import { NotifierService } from 'angular-notifier';
import { IngredientModel } from './../../_models/ingredient.model';
import { IdNameModel } from './../../_models/id-name.model';
import { IngredientsCategoriesService } from './../../_services/ingredients-categories.service';
import { IngredientsService } from './../../_services/ingredients.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-add-ingredient-modal',
	templateUrl: './add-ingredient-modal.component.html',
	styleUrls: ['./add-ingredient-modal.component.less'],
	providers: [IngredientsService, IngredientsCategoriesService]
})
export class AddIngredientModalComponent implements OnInit {
	protected ingredientForm: FormGroup;
	protected ingredientCategories: IdNameModel[];

	constructor(
		protected activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private ingredientsService: IngredientsService,
		private ingredientsCategoriesService: IngredientsCategoriesService,
		private notificationService: NotifierService) { }

	ngOnInit() {
		this.buildForm();
		this.getIngredientsCategories();
	}

	protected addIngredient() {
		this.ingredientsService.createIngredient(this.ingredientForm.value).subscribe(
			(ingredient: IngredientModel) => {
				this.activeModal.close();
				this.notificationService.notify(NotificationTypeEnum.Success, 'Dodano składnik!');
			}
		);
	}

	private getIngredientsCategories() {
		this.ingredientsCategoriesService.getIngredientsCategories().subscribe(
			(ingredientCategories: IdNameModel[]) => this.ingredientCategories = ingredientCategories
		);
	}

	private buildForm() {
		this.ingredientForm = this.fb.group({
			name: '',
			ingredientCategoryId: ''
		});
	}

}
