import React, { useState } from 'react'
import Header from './components/Header/Header'
import ProductList from './components/ProductList/ProductList'
import Cart from './components/Cart/Cart'

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (watch) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === watch._id)

      if (existingItem) {
        // Increase quantity if item already in cart
        if (existingItem.quantity < watch.stock) {
          return prevCart.map(item =>
            item._id === watch._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
        return prevCart // Don't add if at stock limit
      } else {
        // Add new item to cart
        return [...prevCart, { ...watch, quantity: 1 }]
      }
    })
  }

  const updateCartQuantity = (watchId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(watchId)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item._id === watchId
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item
      )
    )
  }

  const removeFromCart = (watchId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== watchId))
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main>
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Les Montres
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover the finest collection of luxury watches
            </p>
            <p className="text-lg opacity-90">
              From classic timepieces to modern masterpieces
            </p>
          </div>
        </div>

        <ProductList onAddToCart={addToCart} />
      </main>

      <Cart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  )
}

export default App
