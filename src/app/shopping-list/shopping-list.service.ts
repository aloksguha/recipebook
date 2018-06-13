import { Ingredients } from "../shared/ingredients.modal";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService{
    ingrediantsChanged = new Subject<Ingredients[]>();
    startedEditing = new Subject<number>();
    ingrediants: Ingredients[] = [
        new Ingredients('Rava', 5),
        new Ingredients('Ghee', 2),
      ] ;

    getIngrediants(){
        return this.ingrediants.slice();
    } 
    
    getIngrediant(index: number){
        return this.ingrediants[index];
    } 

    deleteIngrediant(index: number){
        this.ingrediants.splice(index,1);
        this.ingrediantsChanged.next(this.ingrediants.slice());
    } 

    updateIngrediant(index: number, ingr : Ingredients){
        this.ingrediants[index] = ingr;
        this.ingrediantsChanged.next(this.ingrediants.slice());
    } 

    addIngrediant(ingr : Ingredients){
        this.ingrediants.push(ingr);
        this.ingrediantsChanged.next(this.ingrediants.slice());
    }

    addIngrediants(ingrs : Ingredients[]){

        // its absloutely fine but it'll emit a log events
        // for(let ingr of ingrs){
        //     this.addIngrediant(ingr);       
        // }
        
        
        // its ES6 style to pass all at once
        this.ingrediants.push(...ingrs);
        this.ingrediantsChanged.next(this.ingrediants.slice());
    }


}