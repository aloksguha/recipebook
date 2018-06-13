import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipes.model";
import 'rxjs/add/operator/map'
import { AuthService } from "../auth/auth.service";
import { SpinnerService } from "./spinner.service";

@Injectable()
export class DataStorageService {
    constructor(private http: Http, 
        private recipeService: RecipeService,
        private authservice : AuthService,
        private spinnerService: SpinnerService){

    }

    storeRecipes(){
        const token = this.authservice.getToken();
        return this.http.put(
            'https://recipe-shopping-udemy.firebaseio.com/recipes.json?auth='+token,
            this.recipeService.getRecipes()
         );
    }

    getRecipes(){
        const token = this.authservice.getToken();
        return this.http.get(
            'https://recipe-shopping-udemy.firebaseio.com/recipes.json?auth='+token
        ).map(
            (response : Response) =>{
                const recipes : Recipe[] = response.json();
                for(let recipe of recipes){
                    if(!recipe['ingrediants']){
                        recipe['ingrediants'] = [];
                    }
                }
                return recipes;
            }
        )
        
        .subscribe(
            (recipes : Recipe[]) => {
                this.recipeService.updateRecipes(recipes);
            }
        );
    }

}