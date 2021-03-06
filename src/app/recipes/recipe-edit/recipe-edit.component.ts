import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id : number;
  editMode : boolean = false;
  recipeForm : FormGroup;
  constructor(private route : ActivatedRoute, 
    private recipeService: RecipeService,
   private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null; 
        this.initForm();
      }
    );
  }

  onAddIngrediant(){
    (<FormArray>this.recipeForm.get('ingrediants')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      })
    );
  }

  onDeleteIngr(index: number){
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
  }

  getControls() {  
    return (<FormArray>this.recipeForm.get('ingrediants')).controls;  
  }

  private initForm(){
    let recipeName = '';
    let recipeDesc = '';
    let recipeImagePath = '';
    let recipeIngrediants = new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDesc = recipe.description;
      recipeImagePath = recipe.imagePath;
      if(recipe['ingrediants']){
        for(let ingr of recipe.ingrediants){
          recipeIngrediants.push(
            new FormGroup({
              'name': new FormControl(ingr.name, Validators.required),
              'amount': new FormControl(ingr.amount, 
                [Validators.required,
                 Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          )
        }
      }
    
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingrediants': recipeIngrediants
    })

  }

  onCancel(){
    this.router.navigate(['../'],{'relativeTo':this.route})
  }

  onReset(){
    this.recipeForm.reset({
      'name': ''
    });
  }

  onSubmit(){

    //use this or simple next one
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingrediants'] )
    // if(this.editMode){
    //   this.recipeService.updateRecipe(this.id, newRecipe)
    // }else{
    //   this.recipeService.addRecipe(newRecipe)
    // }

    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.router.navigate(['../'],{'relativeTo':this.route})

   // console.log(this.recipeForm);

  }

}
