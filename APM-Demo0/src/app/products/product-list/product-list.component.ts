import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../product';
import { initializeCurrentProduct } from '../state/product.actions';

@Component({
	selector: 'pm-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
	pageTitle = 'Products';

	@Input() errorMessage: string;
	@Input() displayProductCode: boolean;
	@Input() products: Product[];
	@Input() selectedProduct: Product;

	@Output() displayProductCodeChanged = new EventEmitter<boolean>();
	@Output() initializeNewProduct = new EventEmitter<void>();
	@Output() productWasSelected = new EventEmitter<Product>();

	checkChanged(): void {
		this.displayProductCodeChanged.emit();
	}

	newProduct(): void {
		this.initializeNewProduct.emit();
	}

	productSelected(product: Product): void {
		this.productWasSelected.emit(product);
	}
}
