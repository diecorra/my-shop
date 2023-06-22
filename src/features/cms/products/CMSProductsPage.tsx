import { Product } from '@/model/product';
import { get } from '@/services/products/products.api';
import { useReducer } from 'react';

export interface ProductsState {
  products: Product[];
  pending: boolean;
}

export type ProductsGetSuccess = {
  type: 'productsGetSuccess';
  payload: Product[];
};

export type Pending = {
  type: 'pending';
  payload: boolean;
};

export type ProductsActions = Pending | ProductsGetSuccess;

function productsReducer(state: ProductsState, action: ProductsActions) {
  switch (action.type) {
    case 'pending':
      return { ...state, pending: action.payload };
    case 'productsGetSuccess':
      return { pending: false, products: action.payload };
  }

  return state;
}

export const initialState: ProductsState = { pending: false, products: [] };

export const CMSProductsPage = () => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  async function getProductsHandler() {
    dispatch({ type: 'pending', payload: true });
    const res = await get();
    dispatch({ type: 'productsGetSuccess', payload: res.items });
  }

  return (
    <div>
      <h1 className="title">CMS</h1>
      Pagina prodotti
      <hr className="my-8" />
      {state.pending && <div>Loading..</div>}
      <button className="btn primary" onClick={getProductsHandler}>
        GET
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default CMSProductsPage;
