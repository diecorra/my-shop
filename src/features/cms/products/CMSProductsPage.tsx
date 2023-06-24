import { useProductsService } from '@/services/products';
import { ServerError, Spinner } from '@/shared';
import { useEffect } from 'react';
import { CMSProductsList } from './components/CMSProducts.List';
import { CMSProductForm } from './components/CMSProductForm';

export const CMSProductsPage = () => {
  const { state, actions } = useProductsService();

  useEffect(() => {
    actions.getProducts();
  }, []);

  return (
    <div>
      <h1 className="title">CMS</h1>

      {state.pending && <Spinner />}
      {state.error && <ServerError message={state.error} />}

      <CMSProductForm
        activeItem={state.activeItem}
        onClose={actions.resetActiveItem}
        onAdd={actions.addProducts}
        onEdit={actions.editProducts}
      />

      <CMSProductsList
        items={state.products}
        activeItem={state.activeItem}
        onEditItem={actions.setActiveItem}
        onDeleteItem={actions.deleteProducts}
      />

      <button className="btn primary" onClick={() => actions.setActiveItem({})}>
        ADD NEW
      </button>
    </div>
  );
};

export default CMSProductsPage;
