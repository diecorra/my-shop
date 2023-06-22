import { Product } from '@/model/product';
import { ProductsActions } from './products.actions';

export interface ProductsState {
  products: Product[];
  pending: boolean;
  error: string | null;
  activeItem: Partial<Product> | null;
}

export const initialState: ProductsState = {
  products: [],
  pending: false,
  error: null,
  activeItem: null,
};

export function productsReducer(state: ProductsState, action: ProductsActions) {
  const { type, payload } = action;

  switch (type) {
    case 'pending':
      return { ...state, pending: payload };
    case 'productsGetSuccess':
      return { ...state, pending: false, error: null, products: payload };
    case 'productsDeleteSuccess':
      return {
        ...state,
        products: state.products.filter((item) => item.id !== payload),
        error: null,
        pending: false,
        activeItem: state.activeItem?.id === payload ? null : state.activeItem,
      };
    case 'productsAddSuccess':
      return {
        ...state,
        products: [...state.products, payload],
        activeItem: null,
        error: null,
        pending: false,
      };
    case 'productsEditSuccess':
      return {
        ...state,
        products: [
          ...state.products.map((item) =>
            item.id === payload.id ? payload : item
          ),
        ],
        error: null,
        pending: false,
      };
    case 'productsSetActive':
      return { ...state, activeItem: payload };
    case 'pending':
      return { ...state, pending: payload, error: null };
    case 'error':
      return { ...state, pending: false, error: payload };
  }

  return state;
}
