import { useProductsService } from '@/services/products';
import { ServerError, Spinner } from '@/shared';
import { useEffect } from 'react';

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

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default CMSProductsPage;
