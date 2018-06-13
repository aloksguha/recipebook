import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/datastorage.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  @Output() onSelectRecipeFromUi = new EventEmitter<Recipe>();
  recipes: Recipe[];
  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService : DataStorageService) {
  }

  ngOnInit() {
    this.dataService.getRecipes();
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipesChangedEvent.subscribe(
      (newrecipes: Recipe[]) => {
        this.recipes = newrecipes;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { 'relativeTo': this.route });
  }
}
