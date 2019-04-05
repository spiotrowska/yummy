import { NotifierService } from 'angular-notifier';
import { NotificationTypeEnum } from './../../../_models/notification-type.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeRatingModel } from './../../../_models/recipe-rating.model';
import { CreateRecipeRatingModel } from './../../../_models/create-recipe-rating.model';
import { RecipeRatingsService } from './../../../_services/recipe-ratings.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-add-recipe-rating-form',
	templateUrl: './add-recipe-rating-form.component.html',
	styleUrls: ['./add-recipe-rating-form.component.less'],
	providers: [RecipeRatingsService]
})
export class AddRecipeRatingFormComponent implements OnInit {
	@Input() recipeId: string;
	@Output() recipeRatingEmitter: EventEmitter<RecipeRatingModel> = new EventEmitter<RecipeRatingModel>();
	protected recipeRate = 0;
	protected recipeRatingHovered: number;
	protected commentForm: FormGroup;

	constructor(
		private recipeRatingsService: RecipeRatingsService,
		private fb: FormBuilder,
		private notificationService: NotifierService) { }

	ngOnInit() {
		this.buildCommentForm();
	}

	protected createRecipeRating() {
		const createRecipeRatingModel: CreateRecipeRatingModel = {
			recipeId: this.recipeId,
			rate: this.recipeRate,
			comment: this.commentForm.value['comment']
		};
		this.recipeRatingsService.createRecipeRating(createRecipeRatingModel).subscribe(
			(recipeRating) => {
				this.recipeRatingEmitter.emit(recipeRating);
				this.clearControls();
				this.notificationService.notify(NotificationTypeEnum.Success, 'Dodano ocenę!');
			}
		);
	}

	private buildCommentForm() {
		this.commentForm = this.fb.group({
			comment: ['', Validators.required]
		});
	}

	private clearControls() {
		this.recipeRate = 0;
		this.recipeRatingHovered = 0;
		this.commentForm.reset();
	}

}
