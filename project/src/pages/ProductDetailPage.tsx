import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, ChevronRight, ArrowLeft, Check } from 'lucide-react';
import { Product, Category } from '../types';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  // Sample data (remove when connecting to real backend)
  const sampleCategories: Category[] = [
    { _id: '1', name: 'Electronics', description: 'Latest gadgets and devices' },
    { _id: '2', name: 'Clothing', description: 'Fashion and apparel' },
    { _id: '3', name: 'Home & Garden', description: 'Decor and garden supplies' },
    { _id: '4', name: 'Beauty', description: 'Cosmetics and personal care' },
    { _id: '5', name: 'Sports', description: 'Sports equipment and activewear' },
    { _id: '6', name: 'Toys', description: 'Children games and toys' },
  ];

  const sampleProducts: Product[] = [
    {
      _id: '1',
      name: 'Wireless Bluetooth Earbuds',
      description: 'High-quality wireless earbuds with noise cancellation. These earbuds feature the latest Bluetooth technology, delivering crystal-clear sound quality and deep bass. With active noise cancellation, you can enjoy your music without any distractions. The earbuds come with a charging case that provides up to 24 hours of total battery life. They\'re also water-resistant, making them perfect for workouts and outdoor activities.',
      price: 79.99,
      stock: 45,
      category: sampleCategories[0],
      images: [
        'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/3394654/pexels-photo-3394654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      rating: 4.5,
      reviews: [
        { _id: '101', user: { _id: '201', name: 'John Doe', email: 'john@example.com', role: 'customer', createdAt: '2023-01-01' }, rating: 4, comment: 'Great sound quality!', createdAt: '2023-06-15' },
        { _id: '102', user: { _id: '202', name: 'Jane Smith', email: 'jane@example.com', role: 'customer', createdAt: '2023-02-01' }, rating: 5, comment: 'Amazing battery life and the noise cancellation works perfectly.', createdAt: '2023-07-10' },
        { _id: '103', user: { _id: '203', name: 'Mike Brown', email: 'mike@example.com', role: 'customer', createdAt: '2023-03-01' }, rating: 4, comment: 'Very comfortable to wear for long periods. Audio quality is excellent!', createdAt: '2023-08-05' }
      ],
      createdAt: '2023-06-01',
    },
    {
      _id: '2',
      name: 'Ultra HD Smart TV 55"',
      description: 'Crystal clear 4K display with smart features',
      price: 599.99,
      stock: 15,
      category: sampleCategories[0],
      images: ['https://images.pexels.com/photos/6186440/pexels-photo-6186440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      rating: 4.8,
      reviews: [{ _id: '102', user: { _id: '202', name: 'Jane Smith', email: 'jane@example.com', role: 'customer', createdAt: '2023-02-01' }, rating: 5, comment: 'Amazing picture quality!', createdAt: '2023-07-10' }],
      createdAt: '2023-05-15',
    }
  ];

  useEffect(() => {
    // Simulate API call with sample data
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await axios.get(`/api/products/${id}`);

        // Simulate API response delay
        setTimeout(() => {
          const foundProduct = sampleProducts.find(p => p._id === id);
          if (foundProduct) {
            setProduct(foundProduct);
            setSelectedImage(foundProduct.images[0]);
          }
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && product && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-8">
              <div className="bg-gray-300 rounded-lg h-96 w-full mb-4"></div>
              <div className="flex space-x-2 mb-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="h-20 w-20 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-6"></div>
              <div className="h-32 bg-gray-300 rounded mb-6"></div>
              <div className="h-10 bg-gray-300 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex text-sm text-gray-600">
          <li className="flex items-center">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
          </li>
          <li className="flex items-center">
            <Link to="/products" className="hover:text-blue-600">Products</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
          </li>
          <li className="flex items-center">
            <Link to={`/categories/${product.category._id}`} className="hover:text-blue-600">
              {product.category.name}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
          </li>
          <li className="text-gray-900 font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row">
        {/* Product Images */}
        <div className="md:w-1/2 md:pr-8">
          <div className="mb-4 rounded-lg overflow-hidden bg-white border">
            <img 
              src={selectedImage || product.images[0]} 
              alt={product.name} 
              className="w-full h-96 object-contain"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`h-20 w-20 border-2 rounded overflow-hidden flex-shrink-0 ${
                    selectedImage === image ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-transparent'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating.toFixed(1)} ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="text-2xl font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className={`h-3 w-3 rounded-full mr-2 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {product.stock > 0 && (
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="p-2 w-16 text-center border-y border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                  className="p-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <div className="flex space-x-4 mb-8">
            <Button 
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="flex items-center"
              fullWidth
            >
              {addedToCart ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Product Details</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <span className="font-medium">Category:</span> {product.category.name}
              </li>
              <li>
                <span className="font-medium">SKU:</span> {product._id.substring(0, 8).toUpperCase()}
              </li>
              <li>
                <span className="font-medium">Added:</span> {new Date(product.createdAt).toLocaleDateString()}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        {product.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'fill-current' : 'stroke-current fill-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">{review.user.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Review Form would go here (when user is authenticated) */}
      </div>
    </div>
  );
};