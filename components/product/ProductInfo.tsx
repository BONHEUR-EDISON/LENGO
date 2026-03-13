"use client";

interface ProductInfoProps {
  name: string;
  price: number;
  stock: number;
  category?: string;
  onAddToCart: () => void;
}

export default function ProductInfo({
  name,
  price,
  stock,
  category,
  onAddToCart,
}: ProductInfoProps) {
  return (
    <div className="flex flex-col justify-between h-full">

      <div>
        <h1 className="text-3xl font-bold mb-4">{name}</h1>

        <p className="text-2xl font-semibold text-green-600 mb-4">
          ${price.toFixed(2)}
        </p>

        <p
          className={`mb-6 ${
            stock > 0 ? "text-gray-700" : "text-red-600"
          }`}
        >
          {stock > 0 ? `En stock (${stock})` : "Rupture de stock"}
        </p>

        <button
          onClick={onAddToCart}
          disabled={stock === 0}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Ajouter au panier
        </button>
      </div>

      {category && (
        <div className="mt-8 text-sm text-gray-500">
          Catégorie : {category}
        </div>
      )}
    </div>
  );
}