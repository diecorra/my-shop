import { Product } from '@/model/product';

interface ProductCardProps {
  product: Partial<Product>;
  onAddToCart: () => void;
}

export const ProductCard = (props: ProductCardProps) => {
  const { product: p } = props;
  return (
    <div
      key={p.id}
      className="bg-white text-black shadow-2xl rounded-xl overflow-hidden"
    >
      {p.img && (
        <img src={p.img} alt={p.name} className="h-64 w-full object-cover" />
      )}
      <div className="flex justify-between items-center p-3 text-xl font-bold">
        <div>{p.name}</div>
        <div>€{p.cost}</div>
      </div>
      <p className="p-3">{p.description}</p>
      <button
        className="bg-sky-600 text-white hover:bg-sky-800 transition w-full text-center font-bold p-3"
        onClick={() => props.onAddToCart()}
      >
        ADD TO CART
      </button>
    </div>
  );
};
