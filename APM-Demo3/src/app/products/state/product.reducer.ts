import * as fromProduct from './product.actions';
import { IProduct } from '../product';

// State for this feature (Product)
export interface State {
  product: ProductState;
}

// Slice of the feature state
// (0) Add the slice of state
export interface ProductState {
  showProductCode: boolean;
  products: IProduct[]
}

// (0) Set its initial state
export const initialState: ProductState = {
  showProductCode: false,
  products: []
};

// Change to the appropriate action
export function reducer(state = initialState, action: fromProduct.ProductStateAction): ProductState {

  // (0) Ensure the full object is returned
  switch (action.type) {
    case fromProduct.ProductStateActionTypes.ToggleProductCode: {
      return { ...state, showProductCode: action.payload };
    }

    // (7) Add the new action types
    case fromProduct.ProductStateActionTypes.LoadProductsSuccess: {
      return { ...state, products: action.payload }
    }

    default: {
      return state;
    }
  }
}
