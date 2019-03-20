import { DeleteRecipeModalComponent } from './../../recipes/delete-recipe-modal/delete-recipe-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from './../../_services/recipes.service';
import { RecipeModel } from './../../_models/recipe.model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-user-recipe',
	templateUrl: './user-recipe.component.html',
	styleUrls: ['./user-recipe.component.less'],
	providers: [RecipesService]
})
export class UserRecipeComponent implements OnInit {
	protected recipe: RecipeModel;

	constructor(
		private recipesService: RecipesService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private modalService: NgbModal) { }

	ngOnInit() {
		this.getRecipe(this.getRecipeIdFromUrl());
	}

	protected redirectToEditRecipe() {
		this.router.navigate([`private/user-recipes/${this.recipe.id}/edit`]);
	}

	protected openRecipeDeleteModal() {
		const modal = this.modalService.open(DeleteRecipeModalComponent, { backdrop: 'static' });
		modal.componentInstance.recipeName = this.recipe.name;
		modal.componentInstance.recipeId = this.recipe.id;
		modal.result
			.then(() => {
				this.router.navigate([`private/user-recipes`]);
			})
			.catch(() => {});
	}

	private getRecipe(id: string) {
		this.recipesService.getRecipe(id).subscribe(
			(recipe: RecipeModel) => {
				this.recipe = recipe;
			}
		);
	}

	private getRecipeIdFromUrl(): string {
		return this.activatedRoute.snapshot.paramMap.get('id');
	}

}
