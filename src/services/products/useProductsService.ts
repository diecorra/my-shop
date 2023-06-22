import { useReducer } from 'react';
import { initialState, productsReducer } from './products.reducer';
import * as ProductsApi from './products.api';
import { Product } from '@/model/product';

export function useProductsService() {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  async function getProducts() {
    dispatch({ type: 'pending', payload: true });
    try {
      const res = await ProductsApi.get();
      dispatch({ type: 'productsGetSuccess', payload: res.items });
    } catch (error) {
      dispatch({ type: 'error', payload: 'Products not loaded' });
    }
  }

  async function deleteProducts(id: string) {
    dispatch({ type: 'pending', payload: true });
    try {
      await ProductsApi.remove(id);
      dispatch({ type: 'productsDeleteSuccess', payload: id });
    } catch (error) {
      dispatch({ type: 'error', payload: 'Products not deleted' });
    }
  }

  async function addProducts(product: Partial<Product>) {
    dispatch({ type: 'pending', payload: true });
    try {
      const res = await ProductsApi.add(product);
      dispatch({ type: 'productsAddSuccess', payload: res });
    } catch (error) {
      dispatch({ type: 'error', payload: 'Products not added' });
    }
  }

  async function editProducts(product: Partial<Product>) {
    dispatch({ type: 'pending', payload: true });
    try {
      const res = await ProductsApi.edit(product);
      dispatch({ type: 'productsEditSuccess', payload: res });
    } catch (error) {
      dispatch({ type: 'error', payload: 'Products not edited' });
    }
  }

  function setActiveItem(product: Product | {}) {
    dispatch({ type: 'productsSetActive', payload: product });
  }

  function resetActiveItem() {
    dispatch({ type: 'productsSetActive', payload: null });
  }

  return {
    actions: {
      getProducts,
      deleteProducts,
      addProducts,
      editProducts,
      setActiveItem,
      resetActiveItem,
    },
    state,
  };
}
