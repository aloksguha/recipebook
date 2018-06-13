import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../shared/ingredients.modal';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediants: Ingredients[];
  subscription : Subscription;
  constructor(private slservice  : ShoppingListService) { } 

  ngOnInit() {
    this.ingrediants = this.slservice.getIngrediants();
    this.subscription = this.slservice.ingrediantsChanged.subscribe(
      (changedingrediants: Ingredients[]) => {
        this.ingrediants = changedingrediants;
      }
    );
    }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }  

  onEditItem(index: number){
    this.slservice.startedEditing.next(index);
  }
} 
