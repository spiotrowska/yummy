import { UnitEnum } from './../../_models/unit.enum';
import { RecipeModel } from './../../_models/recipe.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-recipe-details-view',
	templateUrl: './recipe-details-view.component.html',
	styleUrls: ['./recipe-details-view.component.less']
})
export class RecipeDetailsViewComponent implements OnInit {
	@Input() recipe: RecipeModel;
	protected UnitEnum = UnitEnum;

	constructor() { }

	ngOnInit() {
	}

}
