import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {this.ingredients = ingredients});
    console.log(this.ingredients)
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

}
