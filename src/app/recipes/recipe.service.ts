import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      "Test recipe",
      "just a test",
      "https://i1.wp.com/www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg?fit=1200%2C879&ssl=1",
      [
        new Ingredient("Chicken", 1),
        new Ingredient("Rice", 10)
      ]
    ),
    new Recipe(
      "Test recipe number 2",
      "just another test",
      "https://i1.wp.com/www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg?fit=1200%2C879&ssl=1",
      [
        new Ingredient("Pork", 1),
        new Ingredient("Chilli", 10),
        new Ingredient("Noodles", 10)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    // use slice to send copy, not reference
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
