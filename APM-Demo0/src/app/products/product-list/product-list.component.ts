import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { Store } from '@ngrx/store';
import { State, getShowProductCode, getCurrentProduct, getProducts, getError } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';
import { Observable } from 'rxjs';

@Component({
	selector: 'pm-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
	pageTitle = 'Products';

	products$: Observable<Product[]>;
	selectedProduct$: Observable<Product>;
	displayProductCode$: Observable<boolean>;
	errorMessage$: Observable<string>;

	constructor(private store: Store<State>) { }

	ngOnInit(): void {

		this.products$ = this.store.select(getProducts);

		this.errorMessage$ = this.store.select(getError);

		this.store.dispatch(ProductActions.loadProducts());

		this.selectedProduct$ = this.store.select(getCurrentProduct);

		this.displayProductCode$ = this.store.select(getShowProductCode);
	}

	checkChanged(): void {
		// this.displayCode = !this.displayCode;

		this.store.dispatch(ProductActions.toggleProductCode());
	}

	newProduct(): void {
		// this.productService.changeSelectedProduct(this.productService.newProduct());

		this.store.dispatch(ProductActions.initializeCurrentProduct());
	}

	productSelected(product: Product): void {
		// this.productService.changeSelectedProduct(product);

		this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
	}

}
