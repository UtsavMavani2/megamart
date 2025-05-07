import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Product, Category } from '../types';
import { ProductList } from '../components/products/ProductList';
import { Button } from '../components/ui/Button';

export const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    rating: true,
  });

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState<number>(0);

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
        // const productsRes = await axios.get('/api/products', { params: searchParams });
        // const categoriesRes = await axios.get('/api/categories');

        // Handle category filter from URL
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          setSelectedCategories([categoryParam]);
        }

        // Handle search query from URL
        const searchQuery = searchParams.get('search');
        let filteredProducts = [...sampleProducts];
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query)
          );
        }

        // Handle featured filter
        if (searchParams.get('featured') === 'true') {
          // In a real app, this would be based on a featured flag
          filteredProducts = filteredProducts.slice(0, 4);
        }

        // Simulate API response delay and set the data
        setTimeout(() => {
          setProducts(filteredProducts);
          setCategories(sampleCategories);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const toggleFilter = (filterName: string) => {
    setExpandedFilters({
      ...expandedFilters,
      [filterName]: !expandedFilters[filterName],
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numberValue = parseFloat(value) || 0;
    setPriceRange({
      ...priceRange,
      [type]: numberValue,
    });
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 1000 });
    setMinRating(0);
  };

  // Apply filters
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category._id)) {
      return false;
    }
    
    // Price filter
    if (product.price < priceRange.min || product.price > priceRange.max) {
      return false;
    }
    
    // Rating filter
    if (product.rating < minRating) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Button 
            onClick={() => setShowFilters(!showFilters)} 
            variant="outline" 
            className="w-full flex justify-center items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {/* Filters */}
        <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button 
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Reset All
              </button>
            </div>

            {/* Categories Filter */}
            <div className="mb-6 border-b pb-4">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilter('categories')}
              >
                <h3 className="font-medium">Categories</h3>
                {expandedFilters.categories ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
              
              {expandedFilters.categories && (
                <div className="mt-2 space-y-1">
                  {categories.map(category => (
                    <div key={category._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category._id}`}
                        checked={selectedCategories.includes(category._id)}
                        onChange={() => handleCategoryChange(category._id)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor={`category-${category._id}`} className="ml-2 text-sm text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="mb-6 border-b pb-4">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilter('price')}
              >
                <h3 className="font-medium">Price Range</h3>
                {expandedFilters.price ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
              
              {expandedFilters.price && (
                <div className="mt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="min-price" className="block text-xs text-gray-700 mb-1">
                        Min ($)
                      </label>
                      <input
                        type="number"
                        id="min-price"
                        value={priceRange.min}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                        min="0"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="max-price" className="block text-xs text-gray-700 mb-1">
                        Max ($)
                      </label>
                      <input
                        type="number"
                        id="max-price"
                        value={priceRange.max}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                        min={priceRange.min}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Rating Filter */}
            <div className="mb-4">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilter('rating')}
              >
                <h3 className="font-medium">Rating</h3>
                {expandedFilters.rating ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
              
              {expandedFilters.rating && (
                <div className="mt-2 space-y-1">
                  {[4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center">
                      <input
                        type="radio"
                        id={`rating-${rating}`}
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => handleRatingChange(rating)}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                        {rating}+ Stars
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <ProductList products={filteredProducts} loading={loading} />
        </div>
      </div>
    </div>
  );
};