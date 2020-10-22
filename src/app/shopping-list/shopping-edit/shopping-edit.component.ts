import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);

      this.shoppingForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIng = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIng);
    }
    else {
      this.shoppingListService.addIngredient(newIng);
    }
    this.onClear();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete() {
    if (confirm(`Delete ${this.editedItem.name}(${this.editedItem.amount})?`)) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
