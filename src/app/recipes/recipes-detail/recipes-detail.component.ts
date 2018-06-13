import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from '../../shared/datastorage.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  id : number;
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService,
     private route: ActivatedRoute, 
     private router: Router,
     private dataService : DataStorageService) { }

  ngOnInit() {  
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']; 
        this.selectedRecipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  addIngrediantsToShoppingList(){
    this.recipeService.addIngrediantsToShoppingList(this.selectedRecipe.ingrediants);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {'relativeTo':this.route});
  }



  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {'relativeTo':this.route});
  }


}
