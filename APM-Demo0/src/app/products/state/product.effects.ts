import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { ProductPageActions, ProductApiActions } from './actions';

import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
	constructor(private actions$: Actions, private productServce: ProductService) { }

	loadProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductPageActions.loadProducts),
			mergeMap(() =>
				this.productServce.getProducts()
					.pipe(
						map(products => ProductApiActions.loadProductsSuccess({ products })),
						catchError(error => of(ProductApiActions.loadProductsFailure({ error })))
					)
			),
		);
	});

	updateProduct$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductPageActions.updateProduct),
			concatMap((action) =>
				this.productServce.updateProduct(action.product)
					.pipe(
						map(product => ProductApiActions.updateProductSuccess({ product })),
						catchError(error => of(ProductApiActions.updateProductFailure({ error })))
					)
			),
		);
	});

	createProduct$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductPageActions.createProduct),
			concatMap((action) =>
				this.productServce.createProduct(action.product)
					.pipe(
						map(product => ProductApiActions.createProductSuccess({ product })),
						catchError(error => of(ProductApiActions.createProductFailure({ error })))
					)
			),
		);
	});

	deleteProduct$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductPageActions.deleteProduct),
			mergeMap((action) =>
				this.productServce.deleteProduct(action.product.id)
					.pipe(
						map(() => ProductApiActions.deleteProductSuccess({ product: action.product })),
						catchError(error => of(ProductApiActions.deleteProductFailure({ error })))
					)
			),
		);
	});
}
