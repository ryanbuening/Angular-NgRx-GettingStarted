import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

import * as ProductActions from '../state/product.actions';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
	constructor(private actions$: Actions, private productServce: ProductService) { }

	loadProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActions.loadProducts),
			mergeMap(() =>
				this.productServce.getProducts()
					.pipe(
						map(products => ProductActions.loadProductsSuccess({ products })),
						catchError(error => of(ProductActions.loadProductsFailure({ error })))
					)
			),
		);
	});

	updateProduct$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActions.updateProduct),
			concatMap((action) =>
				this.productServce.updateProduct(action.product)
					.pipe(
						map(product => ProductActions.updateProductSuccess({ product })),
						catchError(error => of(ProductActions.updateProductFailure({ error })))
					)
			),
		);
	});

	createProduct$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActions.createProduct),
			concatMap((action) =>
				this.productServce.createProduct(action.product)
					.pipe(
						map(product => ProductActions.createProductSuccess({ product })),
						catchError(error => of(ProductActions.createProductFailure({ error })))
					)
			),
		);
	});

	deleteProduct$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActions.deleteProduct),
			mergeMap((action) =>
				this.productServce.deleteProduct(action.product.id)
					.pipe(
						map(() => ProductActions.deleteProductSuccess({ product: action.product })),
						catchError(error => of(ProductActions.deleteProductFailure({ error })))
					)
			),
		);
	});
}
