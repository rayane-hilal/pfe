import React from 'react'

const ProductCard = ({ watch, onAddToCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={watch.images[0] || '/placeholder-watch.jpg'}
          alt={watch.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-watch.jpg'
          }}
        />
        {watch.discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            -{watch.discountPercentage}%
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {watch.brand}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {watch.name}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(watch.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-600">
              ({watch.reviewCount})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(watch.price)}
            </span>
            {watch.originalPrice && watch.originalPrice > watch.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(watch.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onAddToCart(watch)}
          disabled={watch.stock === 0}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            watch.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {watch.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>

        <div className="mt-2 text-xs text-gray-500 text-center">
          {watch.stock > 0 ? `${watch.stock} in stock` : 'Currently unavailable'}
        </div>
      </div>
    </div>
  )
}

export default ProductCard