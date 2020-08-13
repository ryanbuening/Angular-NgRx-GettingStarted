import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Product } from '../product';
import { toggleProductCode } from './product.actions';
import * as ProductActions from './product.actions';

export interface State extends AppState.State {
	products: ProductState;
}

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

// ** Selectors **//

export const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(getProductFeatureState, (state) => state.showProductCode);

export const getCurrentProductId = createSelector(getProductFeatureState, (state) => state.currentProductId);

export const getCurrentProduct = createSelector(
	getProductFeatureState,
	getCurrentProductId,
	(state, currentProductId) => {
		if (currentProductId === 0) {
			return {
				id: 0,
				productName: '',
				productCode: 'New',
				description: '',
				starRating: 0,
			} as Product;
		} else {
			return currentProductId ? state.products.find(product => product.id === currentProductId) : null;
		}
	}
);

export const getProducts = createSelector(getProductFeatureState, (state) => state.products);

export const getError = createSelector(getProductFeatureState, (state) => state.error);

// ** Reducers **//

export const productReducer = createReducer<ProductState>(
	initialState,
	on(ProductActions.toggleProductCode, (state): ProductState => {
		return {
			...state,
			showProductCode: !state.showProductCode
		};
	}),
	on(ProductActions.setCurrentProduct, (state, action): ProductState => {
		return {
			...state,
			currentProductId: action.currentProductId
		};
	}),
	on(ProductActions.clearCurrentProduct, (state): ProductState => {
		return {
			...state,
			currentProductId: null
		};
	}),
	on(ProductActions.initializeCurrentProduct, (state): ProductState => {
		return {
			...state,
			currentProductId: 0
		};
	}),
	on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
		return {
			...state,
			products: action.products,
			error: ''
		};
	}),
	on(ProductActions.loadProductsFailure, (state, action): ProductState => {
		return {
			...state,
			products: [],
			error: action.error
		};
	}),
	on(ProductActions.updateProductSuccess, (state, action): ProductState => {
		return {
			...state,
			products: state.products.map(product => (product.id === action.product.id) ? action.product : product),
			error: ''
		};
	}),
	on(ProductActions.updateProductFailure, (state, action): ProductState => {
		return {
			...state,
			error: action.error
		};
	}),
	on(ProductActions.createProductSuccess, (state, action): ProductState => {
		return {
			...state,
			products: state.products.concat(action.product),
			currentProductId: action.product.id,
			error: ''
		};
	}),
	on(ProductActions.updateProductFailure, (state, action): ProductState => {
		return {
			...state,
			error: action.error
		};
	}),
	on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
		return {
			...state,
			products: state.products.filter(product => product.id !== action.product.id),
			currentProductId: null,
			error: ''
		};
	}),
	on(ProductActions.deleteProductFailure, (state, action): ProductState => {
		return {
			...state,
			error: action.error
		};
	}),
);
