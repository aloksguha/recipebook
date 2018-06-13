import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/datastorage.service';
import { Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import { AuthService } from '../auth/auth.service';
import { ToasterService } from '../shared/toaster.service';
import { SpinnerService } from '../shared/spinner.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataService: DataStorageService,
              private recipeService : RecipeService,
              public authService : AuthService,
              private tstService: ToasterService,
              private spinnerService : SpinnerService) { }

  ngOnInit() {
  }
 
  onSaveData(){
    console.log(this.authService.istestUser);
    if(this.authService.istestUser){
      this.tstService.showToasterMessage('INFO','Test User is not allowed to save any modification in app !!', 'No' );
    }else{
      this.dataService.storeRecipes().subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
    }
  }

  onFetchData(){
    this.dataService.getRecipes();
  }

  onlogout(){
    this.authService.logoutUser();
  }
 

}
