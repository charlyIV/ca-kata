import { Component, EventEmitter, Input, Output } from '@angular/core';
import categoriesDb from '../../../datas/categories.json';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  imports: [FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Input() cartTotal: number = 0;
  @Output() filterBycategory: EventEmitter<string> = new EventEmitter();
  selectedCategory: string = '';
  categories: string[] = categoriesDb;

  selectCategory() {
    this.filterBycategory.emit(this.selectedCategory);
  }
}
