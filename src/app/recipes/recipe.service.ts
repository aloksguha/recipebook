import { Recipe } from "./recipes.model";
import { Injectable, OnInit } from "@angular/core";
import { Ingredients } from "../shared/ingredients.modal";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/datastorage.service";

@Injectable()
export class RecipeService implements OnInit{
    recipesChangedEvent = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService, 
       ){

    }

    ngOnInit(){
        //this.dataService.getRecipes();
    }

    private recipes: Recipe[] = [
        new Recipe('Gulab Jamun', 
        'Fav Indian Dessert', 'https://du7ybees82p4m.cloudfront.net/56a288e117d3f8.50310584.jpg?width=910&height=512',
        [
            new Ingredients("Mava", 10),
            new Ingredients("Sugar", 2)
        ]),
        new Recipe('Kala Jamun', 'Fav Indian Black Dessert', 'https://cdn.awesomecuisine.com/wp-content/uploads/2009/06/kala_jamun.jpg',
        [
            new Ingredients("Mava", 10),
            new Ingredients("Sugar", 2),
            new Ingredients("Kala color", 1)
        ]),
        new Recipe('Samosa', 'Fav Indian Black Dessert', 'https://tfv.goodblogscdn.com/sites/www.theflamingvegan.com/post_images/cropped/1291.jpg',
        [
            new Ingredients("Maida", 5),
            new Ingredients("Potato", 20)
        ])

        
      ];


    addRecipe(newrecipe: Recipe){
        this.recipes.push(newrecipe);
        this.recipesChangedEvent.next(this.recipes.slice())
    }

    updateRecipe(index: number, newrecipe: Recipe){
        this.recipes[index] = newrecipe;
        this.recipesChangedEvent.next(this.recipes.slice())
    }

    updateRecipes(newrecipes: Recipe[]){
        this.recipes = newrecipes;
        this.recipesChangedEvent.next(this.recipes.slice())
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChangedEvent.next(this.recipes.slice())
    }

    getRecipes(){
        return this.recipes.slice();
    }  

    getRecipe(id: number){
        return this.recipes.slice()[id];
    }  

    addIngrediantsToShoppingList(ingredients: Ingredients[]){
        this.slService.addIngrediants(ingredients);
    }
}