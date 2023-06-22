import { Product } from '@/model/product';
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

      <div className="mt-12">
        <table className="table-auto w-full hover">
          <thead>
            <tr>
              <th className="text-left">PRODUCTS</th>
              <th className="text-left">IMAGE</th>
              <th>COST</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {state.products.map((item: Product) => {
              return (
                <tr
                  key={item.id}
                  onClick={() => {
                    actions.setActiveItem(item);
                  }}
                >
                  <td>{item.name}</td>
                  <td>
                    {item.tmb && (
                      <img
                        src={item.tmb}
                        alt={item.name}
                        className="h-16 rounded-xl"
                      />
                    )}
                  </td>
                  <td className="text-center">€{item.cost}</td>
                  <td className="text-center cursor-pointer">
                    <i
                      className="fa fa-trash"
                      onClick={(e) => {
                        actions.deleteProducts(item.id);
                        e.stopPropagation();
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <pre>{JSON.stringify(state.activeItem, null, 2)}</pre>
    </div>
  );
};

export default CMSProductsPage;
