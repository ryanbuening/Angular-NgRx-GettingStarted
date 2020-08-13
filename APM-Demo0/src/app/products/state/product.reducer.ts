import { ProductApiActions, ProductPageActions } from './actions';
import { Product } from '../product';
import { createReducer, on } from '@ngrx/store';

export interface ProductState {
	showProductCode: boolean;
	currentProductId: number | null;
	products: Product[];
	error: string;
}

const initialState: ProductState = {
	showProductCode: true,
	currentProductId: null,
	products: [],
	error: ''
};

// ** Reducers **//

export const productReducer = createReducer<ProductState>(
	initialState,
	on(ProductPageActions.toggleProductCode, (state): ProductState => {
		return {
			...state,
			showProductCode: !state.showProductCode
		};
	}),
	on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
		return {
			...state,
			currentProductId: action.currentProductId
		};
	}),
	on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
		return {
			...state,
			currentProductId: null
		};
	}),
	on(ProductPageActions.initializeCurrentProduct, (state): ProductState => {
		return {
			...state,
			currentProductId: 0
		};
	}),
	on(ProductApiActions.loadProductsSuccess, (state, action): ProductState => {
		return {
			...state,
			products: action.products,
			error: ''
		};
	}),
	on(ProductApiActions.loadProductsFailure, (state, action): ProductState => {
		return {
			...state,
			products: [],
			error: action.error
		};
	}),
	on(ProductApiActions.updateProductSuccess, (state, action): ProductState => {
		return {
			...state,
			products: state.products.map(product => (product.id === action.product.id) ? action.product : product),
			error: ''
		};
	}),
	on(ProductApiActions.updateProductFailure, (state, action): ProductState => {
		return {
			...state,
			error: action.error
		};
	}),
	on(ProductApiActions.createProductSuccess, (state, action): ProductState => {
		return {
			...state,
			products: state.products.concat(action.product),
			currentProductId: action.product.id,
			error: ''
		};
	}),
	on(ProductApiActions.updateProductFailure, (state, action): ProductState => {
		return {
			...state,
			error: action.error
		};
	}),
	on(ProductApiActions.deleteProductSuccess, (state, action): ProductState => {
		return {
			...state,
			products: state.products.filter(product => product.id !== action.product.id),
			currentProductId: null,
			error: ''
		};
	}),
	on(ProductApiActions.deleteProductFailure, (state, action): ProductState => {
		return {
			...state,
			error: action.error
		};
	}),
);
