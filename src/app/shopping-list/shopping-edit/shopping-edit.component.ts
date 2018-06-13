import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredients } from '../../shared/ingredients.modal';
import { ShoppingListService } from '../shopping-list.service';

import { FormsModule }   from '@angular/forms';
import { NgForm }   from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription :  Subscription;
  editMode : boolean = false;
  editedItemIndex : number;
  editedItem : Ingredients;
  constructor(private service : ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.service.startedEditing
    .subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.service.getIngrediant(this.editedItemIndex);
        this.slForm.setValue({
          name : this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  resetFormAndValues(){
    this.slForm.reset();
    this.editMode = false;
  }

  onAddItem(form: NgForm){
    const val = form.value;
    if(this.editMode){
      this.service.updateIngrediant(this.editedItemIndex, new Ingredients(val.name, val.amount) );
    }else{
      this.service.addIngrediant(new Ingredients(val.name, val.amount) );
    }
    this.editMode = false;
    form.reset();
  }

  onDeleteItem(){
    this.service.deleteIngrediant(this.editedItemIndex);
    this.resetFormAndValues();
  }
}
