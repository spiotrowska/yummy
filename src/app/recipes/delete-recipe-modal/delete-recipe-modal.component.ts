import { NotifierService } from 'angular-notifier';
import { NotificationTypeEnum } from './../../_models/notification-type.enum';
import { RecipesService } from './../../_services/recipes.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-delete-recipe-modal',
	templateUrl: './delete-recipe-modal.component.html',
	styleUrls: ['./delete-recipe-modal.component.less'],
	providers: [RecipesService]
})
export class DeleteRecipeModalComponent implements OnInit {
	@Input() recipeName: string;
	@Input() recipeId: string;

	constructor(
		protected activeModal: NgbActiveModal,
		private recipesService: RecipesService,
		private notificationService: NotifierService) { }

	ngOnInit() {
	}

	protected deleteRecipe() {
		this.recipesService.deleteRecipe(this.recipeId).subscribe(
			() => {
				this.activeModal.close();
				this.notificationService.notify(NotificationTypeEnum.Success, 'Usunięto przepis!');
			}
		);
	}

}
