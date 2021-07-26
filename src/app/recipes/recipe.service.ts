import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipeSelected = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];
    
    // private recipes: Recipe[] = [
    //     new Recipe('Tasty Schnitzel',
    //       'A super-tasty Schnitzel - just awesome!',
    //       'https://cdn.gutekueche.de/upload/rezept/371/1600x900_wiener-schnitzel.jpg',
    //       [
    //           new Ingredient('Meat', 1),
    //           new Ingredient('French Fries', 20)
    //       ]),
    //     new Recipe('Big Fat Burger',
    //       'a simple recipe ofcourse',
    //       'https://www.edeka.de/media/01-rezeptbilder/rezeptbilder-a-d/rez-edeka-burger-the-big-american-rezept-a-d-1-1.jpg',
    //       [
    //         new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 1)
    //       ])
    //   ];

      constructor(private slService: ShoppingListService){}

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice();
      }

      AddIngreidentsToShoppingList(ingredients: Ingredient[]) {
          this.slService.addIngredients(ingredients);

      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}