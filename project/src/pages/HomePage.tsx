import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, Package, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { Product, Category } from '../types';
import { ProductList } from '../components/products/ProductList';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Sample data (remove when connecting to real backend)
  const sampleCategories: Category[] = [
    { _id: '1', name: 'Electronics', description: 'Latest gadgets and devices' },
    { _id: '2', name: 'Clothing', description: 'Fashion and apparel' },
    { _id: '3', name: 'Home & Garden', description: 'Decor and garden supplies' },
    { _id: '4', name: 'Beauty', description: 'Cosmetics and personal care' },
    { _id: '5', name: 'Sports', description: 'Sports equipment and activewear' },
    { _id: '6', name: 'Toys', description: 'Children games and toys' },
    { _id: "7", name: 'Books', description: 'Fiction and non-fiction books' },
    { _id: "8", name: 'Health', description: 'Health and wellness products' },
  ];

  const sampleProducts: Product[] = [
    {
      _id: '1',
      name: 'Wireless Bluetooth Earbuds',
      description: 'High-quality wireless earbuds with noise cancellation',
      price: 79.99,
      stock: 45,
      category: sampleCategories[0],
      images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      rating: 4.5,
      reviews: [{ _id: '101', user: { _id: '201', name: 'John Doe', email: 'john@example.com', role: 'customer', createdAt: '2023-01-01' }, rating: 4, comment: 'Great sound quality!', createdAt: '2023-06-15' }],
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
    },
    {
      _id: '3',
      name: 'Men\'s Casual Shirt',
      description: 'Comfortable cotton shirt for casual wear',
      price: 34.99,
      stock: 78,
      category: sampleCategories[1],
      images: ['https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      rating: 4.2,
      reviews: [{ _id: '103', user: { _id: '203', name: 'Mike Brown', email: 'mike@example.com', role: 'customer', createdAt: '2023-03-01' }, rating: 4, comment: 'Great fit and comfortable!', createdAt: '2023-08-05' }],
      createdAt: '2023-06-20',
    },
    {
      _id: '4',
      name: 'Stainless Steel Water Bottle',
      description: 'Eco-friendly water bottle that keeps drinks cold for 24 hours',
      price: 24.99,
      stock: 120,
      category: sampleCategories[2],
      images: ['https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      rating: 4.6,
      reviews: [{ _id: '104', user: { _id: '204', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'customer', createdAt: '2023-04-01' }, rating: 5, comment: 'Keeps my water cold all day!', createdAt: '2023-09-10' }],
      createdAt: '2023-07-05',
    },
    {
      _id: '5',
      name: 'Organic Face Cream',
      description: 'Natural ingredients for healthy skin',
      price: 42.99,
      stock: 35,
      category: sampleCategories[3],
      images: ['https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      rating: 4.3,
      reviews: [{ _id: '105', user: { _id: '205', name: 'Emily Davis', email: 'emily@example.com', role: 'customer', createdAt: '2023-05-01' }, rating: 4, comment: 'My skin feels amazing!', createdAt: '2023-10-15' }],
      createdAt: '2023-08-10',
    },
    {
      _id: '6',
      name: 'Yoga Mat',
      description: 'Non-slip, eco-friendly yoga mat',
      price: 29.99,
      stock: 60,
      category: sampleCategories[4],
      images: ['https://images.pexels.com/photos/6700295/pexels-photo-6700295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      rating: 4.7,
      reviews: [{ _id: '106', user: { _id: '206', name: 'Alex Wilson', email: 'alex@example.com', role: 'customer', createdAt: '2023-06-01' }, rating: 5, comment: 'Perfect thickness and grip!', createdAt: '2023-11-20' }],
      createdAt: '2023-09-15',
    },
    {
      _id: '7',
      name: 'Building Blocks Set',
      description: 'Educational toy for kids ages 3-8',
      price: 19.99,
      stock: 90,
      category: sampleCategories[5],
      images: ['https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      rating: 4.4,
      reviews: [{ _id: '107', user: { _id: '207', name: 'Lisa Taylor', email: 'lisa@example.com', role: 'customer', createdAt: '2023-07-01' }, rating: 4, comment: 'Kids love it!', createdAt: '2023-12-05' }],
      createdAt: '2023-10-20',
    },
    {
      _id: '8',
      name: 'Wireless Gaming Mouse',
      description: 'Precision gaming with RGB lighting',
      price: 49.99,
      stock: 25,
      category: sampleCategories[0],
      images: ['https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      rating: 4.9,
      reviews: [{ _id: '108', user: { _id: '208', name: 'Tom Green', email: 'tom@example.com', role: 'customer', createdAt: '2023-08-01' }, rating: 5, comment: 'Best gaming mouse I\'ve used!', createdAt: '2024-01-10' }],
      createdAt: '2023-11-25',
    }
  ];

  useEffect(() => {
    // Simulate API calls with sample data
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, these would be API calls
        // const featuredRes = await axios.get('/api/products/featured');
        // const newArrivalsRes = await axios.get('/api/products/new');
        // const categoriesRes = await axios.get('/api/categories');

        // Simulate API response delay and set the data
        setTimeout(() => {
          setFeaturedProducts(sampleProducts.slice(0, 4));
          setNewArrivals(sampleProducts.slice(4, 8));
          setCategories(sampleCategories);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to MegaMart</h1>
            <p className="text-xl mb-6">
              Shop the best products at unbeatable prices. Your one-stop destination for all your needs.
            </p>
            <div className="flex space-x-4">
              <Link to="/products">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Online Shopping"
              className="rounded-lg shadow-lg max-w-full md:max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link to="/categories" className="text-blue-600 hover:text-blue-800 flex items-center">
              <span>View All</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {loading ? (
              [...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 animate-pulse">
                  <div className="h-12 w-12 bg-gray-300 rounded-full mb-3 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
              ))
            ) : (
              categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/categories/${category._id}`}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 text-center"
                >
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{category.description}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="/products?featured=true" className="text-blue-600 hover:text-blue-800 flex items-center">
              <span>View All</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <ProductList products={featuredProducts} loading={loading} />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link to="/products?sort=newest" className="text-blue-600 hover:text-blue-800 flex items-center">
              <span>View All</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <ProductList products={newArrivals} loading={loading} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Why Shop With Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">On all orders over $50</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">100% secure payment</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30 day return policy</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Handpicked just for you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Stay updated with the latest products, exclusive offers, and discounts.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-md focus:outline-none text-gray-900 mb-2 sm:mb-0"
            />
            <Button className="rounded-l-none sm:rounded-l-none sm:rounded-r-md">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};