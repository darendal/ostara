import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../service/product/product.service';
import {Product} from '../models/product';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Product[];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('tagInput', { static: true }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: true }) matAutocomplete: MatAutocomplete;


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(p => {
      this.products = p;
    });
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this._remainingTags().slice()));
  }

  add(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value).trim()) {
        this.tags.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(this.tags);

    return this.allTags
      .filter(tag => tag.toLowerCase().startsWith(filterValue))
      .filter((e) => !this.tags.includes(e));

  }

  private _remainingTags(): string[] {
    if (!this.tags || !this.tags.length) {
      return this.allTags;
    }
    return this.allTags.filter(e => !this.tags.includes(e));
  }

}
