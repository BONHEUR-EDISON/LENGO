// components/product/ProductInfo.tsx
interface ProductInfoProps {
  name: string;
  price: number;
  stock: number;
  category?: string;
  onAddToCart: () => void; // fonction pour ajouter au panier
}

export default function ProductInfo({
  name,
  price,
  stock,
  category,
  onAddToCart,
}: ProductInfoProps) {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <p className="text-xl text-green-600 font-semibold mb-4">${price.toFixed(2)}</p>
        <p className={`mb-4 ${stock > 0 ? "text-gray-700" : "text-red-600"}`}>
          {stock > 0 ? `En stock (${stock})` : "Rupture de stock"}
        </p>
        <button
          className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition"
          disabled={stock === 0}
          onClick={onAddToCart}
        >
          Ajouter au panier
        </button>
      </div>
      {category && <div className="mt-8 text-sm text-gray-500">Catégorie: {category}</div>}
    </div>
  );
}