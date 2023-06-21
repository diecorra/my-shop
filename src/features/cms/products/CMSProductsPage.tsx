import { Product } from '@/model/product';
import { pb } from '@/pocketbase';
import { useReducer } from 'react';

function productsReducer(state: any, action: any) {
  switch (action.type) {
    case 'pending':
      return { ...state, pending: action.payload };
    case 'getProductsSuccess':
      return { pending: false, products: action.payload };
  }

  return state;
}

export const initialState = { pending: false, products: [] };

export const CMSProductsPage = () => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  async function getProductsHandler() {
    dispatch({ type: 'pending', payload: true });
    const res = await pb.collection('products').getList<Product>();
    dispatch({ type: 'getProductsSuccess', payload: res.items });
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
