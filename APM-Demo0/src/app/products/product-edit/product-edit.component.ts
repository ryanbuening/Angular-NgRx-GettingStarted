import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
	selector: 'pm-product-edit',
	templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, OnChanges {
	pageTitle = 'Product Edit';

	@Input() selectedProduct: Product;
	@Input() errorMessage: string;

	@Output() create = new EventEmitter<Product>();
	@Output() update = new EventEmitter<Product>();
	@Output() delete = new EventEmitter<Product>();
	@Output() clearCurrent = new EventEmitter<void>();

	productForm: FormGroup;

	// Use with the generic validation message class
	displayMessage: { [key: string]: string } = {};
	private validationMessages: { [key: string]: { [key: string]: string } };
	private genericValidator: GenericValidator;

	constructor(private fb: FormBuilder, private productService: ProductService) {

		// Defines all of the validation messages for the form.
		// These could instead be retrieved from a file or database.
		this.validationMessages = {
			productName: {
				required: 'Product name is required.',
				minlength: 'Product name must be at least three characters.',
				maxlength: 'Product name cannot exceed 50 characters.'
			},
			productCode: {
				required: 'Product code is required.'
			},
			starRating: {
				range: 'Rate the product between 1 (lowest) and 5 (highest).'
			}
		};

		// Define an instance of the validator for use with this form,
		// passing in this form's set of validation messages.
		this.genericValidator = new GenericValidator(this.validationMessages);
	}


	ngOnInit(): void {
		// Define the form group
		this.productForm = this.fb.group({
			productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			productCode: ['', Validators.required],
			starRating: ['', NumberValidators.range(1, 5)],
			description: ''
		});

		// Watch for value changes for validation
		this.productForm.valueChanges.subscribe(
			() => this.displayMessage = this.genericValidator.processMessages(this.productForm)
		);
	}

	ngOnChanges(changes: SimpleChanges): void {
		// patch form with value from the store
		if (changes.selectedProduct) {
			const product = changes.selectedProduct.currentValue as Product;
			this.displayProduct(product);
		}
	}

	// Also validate on blur
	// Helpful if the user tabs through required fields
	blur(): void {
		this.displayMessage = this.genericValidator.processMessages(this.productForm);
	}

	displayProduct(product: Product | null): void {
		if (product) {
			// Reset the form back to pristine
			this.productForm.reset();

			// Display the appropriate page title
			if (product.id === 0) {
				this.pageTitle = 'Add Product';
			} else {
				this.pageTitle = `Edit Product: ${product.productName}`;
			}

			// Update the data on the form
			this.productForm.patchValue({
				productName: product.productName,
				productCode: product.productCode,
				starRating: product.starRating,
				description: product.description
			});
		}
	}

	cancelEdit(product: Product): void {
		// Redisplay the currently selected product
		// replacing any edits made
		this.displayProduct(product);
	}

	deleteProduct(): void {

		if (this.selectedProduct && this.selectedProduct.id) {
			if (confirm(`Really delete the product: ${this.selectedProduct.productName}?`)) {
				// this.productService.deleteProduct(product.id).subscribe({
				// 	next: () => this.store.dispatch(ProductPageActions.clearCurrentProduct()),
				// 	error: err => this.errorMessage = err
				// });
				// this.store.dispatch(ProductPageActions.deleteProduct({ product }));
				this.delete.emit(this.selectedProduct);
			}
		} else {
			// No need to delete, it was never saved
			// this.store.dispatch(ProductPageActions.clearCurrentProduct());
			this.clearCurrent.emit();
		}
	}

	saveProduct(originalProduct: Product): void {
		if (this.productForm.valid) {
			if (this.productForm.dirty) {
				// Copy over all of the original product properties
				// Then copy over the values from the form
				// This ensures values not on the form, such as the Id, are retained
				const product = { ...originalProduct, ...this.productForm.value };

				if (product.id === 0) {
					// this.store.dispatch(ProductPageActions.createProduct({ product }));
					this.create.emit(product);
				} else {
					// this.store.dispatch(ProductPageActions.updateProduct({ product }));
					this.update.emit(product);
				}
			}
		}
	}

}
