import { UnitEnum } from './unit.enum';

export interface RecipeIngredientModel {
	ingredientId: string;
	ingredientName: string;
	quantity: number;
	unitName: UnitEnum;
}
