"use client";

interface ProductInfoProps {
  name: string;
  price: number;
  stock: number;
  category?: string;
  onAddToCart: () => void;
  isNew?: boolean;
  theme?: "light" | "dark"; // support explicite pour le thème
}

export default function ProductInfo({
  name,
  price,
  stock,
  category,
  onAddToCart,
  isNew = false,
  theme = "light", // valeur par défaut
}: ProductInfoProps) {
  const textColorStock =
    stock > 0
      ? theme === "dark"
        ? "text-gray-300"
        : "text-gray-700"
      : "text-red-600";

  const categoryBg =
    theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700";

  const priceColor = theme === "dark" ? "text-blue-400" : "text-blue-600";

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      {/* Info principale */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>

          {isNew && (
            <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Nouveau
            </span>
          )}

          {stock === 0 && (
            <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Rupture
            </span>
          )}
        </div>

        {/* Prix */}
        <p className={`text-2xl md:text-3xl font-extrabold ${priceColor}`}>
          ${price.toFixed(2)}
        </p>

        {/* Stock */}
        <p className={`text-lg ${textColorStock}`}>
          {stock > 0 ? `En stock (${stock})` : "Rupture de stock"}
        </p>

        {/* Bouton Ajouter au panier */}
        <button
          onClick={onAddToCart}
          disabled={stock === 0}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Ajouter au panier
        </button>
      </div>

      {/* Catégorie */}
      {category && (
        <div className="mt-4 text-sm font-medium">
          <span className={`px-3 py-1 rounded-full ${categoryBg}`}>{category}</span>
        </div>
      )}
    </div>
  );
}