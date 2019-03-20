import { RecipeRatingsService } from './../../../_services/recipe-ratings.service';
import { JwtUserService } from './../../../_services/jwt-user.service';
import { RecipeRatingModel } from './../../../_models/recipe-rating.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-recipe-rating-form',
	templateUrl: './recipe-rating-form.component.html',
	styleUrls: ['./recipe-rating-form.component.less'],
	providers: [RecipeRatingsService]
})
export class RecipeRatingFormComponent implements OnInit {
	@Input() recipeRating: RecipeRatingModel;
	@Output() deleteEmitter: EventEmitter<string> = new EventEmitter<string>();
	protected currentUserId: string;
	protected isInUpdateMode = false;
	protected recipeRatingHovered: number;
	protected recipeRatingFirstValue: number;
	protected recipeRatingForm: FormGroup;

	constructor(
		private jwtUserService: JwtUserService,
		private recipeRatingsService: RecipeRatingsService,
		private fb: FormBuilder) { }

	ngOnInit() {
		this.currentUserId = this.jwtUserService.currentUser.UserId;
		this.recipeRatingFirstValue = this.recipeRating.rate;
		this.buildForm();
	}

	protected updateRecipeRating() {
		this.recipeRating.comment = this.recipeRatingForm.get('comment').value;
		this.recipeRatingsService.updateRecipeRating(this.recipeRating).subscribe(
			(recipeRating: RecipeRatingModel) => {
				// TODO notification
				this.isInUpdateMode = false;
				this.recipeRatingFirstValue = recipeRating.rate;
			}
		);
	}

	protected deleteRecipeRating() {
		this.recipeRatingsService.deleteRecipeRating(this.recipeRating.id).subscribe(
			() => {
				// TODO notification
				this.deleteEmitter.emit('Deleted');
			}
		);
	}

	protected cancelUpdateMode() {
		this.recipeRatingForm.get('comment').setValue(this.recipeRating.comment);
		this.recipeRatingForm.get('rate').setValue(this.recipeRatingFirstValue);
		this.recipeRatingHovered = null;
		this.isInUpdateMode = !this.isInUpdateMode;
	}

	private buildForm() {
		this.recipeRatingForm = this.fb.group({
			rate: new FormControl(this.recipeRating.rate, Validators.required),
			comment: [this.recipeRating.comment, Validators.required]
		});
	}

}
