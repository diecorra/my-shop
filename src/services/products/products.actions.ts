import { Product } from '@/model/product';

export type ProductsGetSuccess = {
  type: 'productsGetSuccess';
  payload: Product[];
};

export type ProductsDeleteSuccess = {
  type: 'productsDeleteSuccess';
  payload: string;
};

export type ProductsAddSuccess = {
  type: 'productsAddSuccess';
  payload: Product;
};

export type ProductsEditSuccess = {
  type: 'productsEditSuccess';
  payload: Product;
};

export type ProductsSetActive = {
  type: 'productsSetActive';
  payload: Partial<Product> | null;
};

export type Error = {
  type: 'error';
  payload: string;
};

export type Pending = {
  type: 'pending';
  payload: boolean;
};

export type ProductsActions =
  | Pending
  | ProductsGetSuccess
  | ProductsDeleteSuccess
  | ProductsAddSuccess
  | ProductsEditSuccess
  | ProductsSetSuccess
  | Error
  | Pending;
