import { UnitEnum } from './unit.enum';

export class RecipeIngredientModel {
	ingredientId: string;
	ingredientName: string;
	quantity: number;
	unitName: UnitEnum;
}
