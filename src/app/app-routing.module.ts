import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router"
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesStartComponent } from "./recipes/recipes-start/recipes-start.component";
import { RecipesDetailComponent } from "./recipes/recipes-detail/recipes-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { AuthGuard } from "./auth/authgaurd.service";

const appRoutes : Routes = [
    { path : 'recipes', component: RecipesComponent, canActivate: [AuthGuard],
    children:[
        { path:'', component: RecipesStartComponent, canActivate: [AuthGuard]},
        { path:'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
        { path:':id', component: RecipesDetailComponent, canActivate: [AuthGuard]},
        { path:':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard]}
    ]},
    { path : 'shoppinglist', component: ShoppingListComponent, canActivate: [AuthGuard]},
    { path : '', redirectTo: '/signin', pathMatch:'full'},
    { path: 'signup', component : SignupComponent},
    { path: 'signin', component : SigninComponent}
];
    
@NgModule({
    imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
