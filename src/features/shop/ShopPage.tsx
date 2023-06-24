import { Product } from '@/model/product';
import { useCart, useCartPanel } from '@/services/cart';
import { ServerError, Spinner } from '@/shared/';
import { useEffect, useState } from 'react';
import { pb } from '../../pocketbase';
import { ProductCard } from './components/ProductCard';
import { useProductsService } from '@/services/products';

export const ShopPage = () => {
  const openCartPanel = useCartPanel((state) => state.openOverlay);
  const addToCart = useCart((state) => state.addToCart);

  const { actions, state } = useProductsService();

  useEffect(() => {
    actions.getProducts();
  }, []);

  return (
    <div>
      <h1 className="title">SHOP</h1>
      {state.pending && <Spinner />}
      {state.error && <ServerError />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
        {state.products.map((p) => {
          return (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={() => {
                openCartPanel();
                addToCart(p);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShopPage;
