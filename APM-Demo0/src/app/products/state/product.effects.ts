import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { mergeMap, map } from 'rxjs/operators';

import * as ProductActions from '../state/product.actions';

@Injectable()
export class ProductEffects {
	constructor(private actions$: Actions, private productServce: ProductService) { }

	loadProducts$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActions.loadProducts),
			mergeMap(() =>
				this.productServce.getProducts().pipe(
					map(products => ProductActions.loadProductsSuccess({ products })),
					// catchError(error => of(FeatureActions.actionFailure({ error })))
				)
			),
		);
	});
}
