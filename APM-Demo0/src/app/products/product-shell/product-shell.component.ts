import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state';
import { ProductPageActions } from '../state/actions';

@Component({
	templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

	products$: Observable<Product[]>;
	selectedProduct$: Observable<Product>;
	displayProductCode$: Observable<boolean>;
	errorMessage$: Observable<string>;

	constructor(private store: Store<State>) { }

	ngOnInit(): void {
		this.store.dispatch(ProductPageActions.loadProducts());
		this.products$ = this.store.select(getProducts);
		this.errorMessage$ = this.store.select(getError);
		this.selectedProduct$ = this.store.select(getCurrentProduct);
		this.displayProductCode$ = this.store.select(getShowProductCode);
	}

	checkChanged(): void {
		this.store.dispatch(ProductPageActions.toggleProductCode());
	}

	newProduct(): void {
		this.store.dispatch(ProductPageActions.initializeCurrentProduct());
	}

	productSelected(product: Product): void {
		this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product.id }));
	}

	deleteProduct(product: Product): void {
		this.store.dispatch(ProductPageActions.deleteProduct({ product }));
	}

	saveProduct(product: Product): void {
		this.store.dispatch(ProductPageActions.createProduct({ product }));
	}

	updateProduct(product: Product): void {
		this.store.dispatch(ProductPageActions.updateProduct({ product }));
	}

	clearProduct(): void {
		this.store.dispatch(ProductPageActions.clearCurrentProduct());
	}
}
