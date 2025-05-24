
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Filter, 
  Grid, 
  List, 
  Heart, 
  MapPin, 
  Search,
  SlidersHorizontal
} from "lucide-react";
import { Link } from 'react-router-dom';

const mockProducts = [
  {
    id: 1,
    title: "Honda Civic 2020 - Excellent Condition",
    price: "320,000",
    location: "New Cairo, Cairo",
    image: "/placeholder.svg",
    category: "Vehicles",
    condition: "Used - Excellent",
    date: "2 days ago",
    featured: true
  },
  {
    id: 2,
    title: "iPhone 14 Pro Max 256GB",
    price: "45,000",
    location: "Maadi, Cairo",
    image: "/placeholder.svg",
    category: "Electronics",
    condition: "Used - Good",
    date: "1 day ago",
    featured: false
  },
  {
    id: 3,
    title: "Modern Sofa Set - 3+2+1",
    price: "12,500",
    location: "Heliopolis, Cairo",
    image: "/placeholder.svg",
    category: "Furniture",
    condition: "Used - Excellent",
    date: "3 days ago",
    featured: false
  }
];

const categories = [
  'All Categories',
  'Vehicles',
  'Property',
  'Electronics',
  'Furniture',
  'Fashion',
  'Services'
];

const conditions = [
  'All Conditions',
  'New',
  'Used - Excellent',
  'Used - Good',
  'Used - Fair'
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: categoryFromUrl ? categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1) : 'All Categories',
    condition: 'All Conditions',
    priceMin: '',
    priceMax: '',
    location: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    if (categoryFromUrl) {
      setFilters(prev => ({
        ...prev,
        category: categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1)
      }));
    }
  }, [categoryFromUrl]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Filter products based on selected category
  const filteredProducts = mockProducts.filter(product => {
    if (filters.category === 'All Categories') return true;
    return product.category.toLowerCase() === filters.category.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {filters.category === 'All Categories' ? 'Browse Products' : `${filters.category} Products`}
            </h1>
            <p className="text-gray-600">Found {filteredProducts.length} results</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="p-6 sticky top-24">
              <h3 className="font-semibold mb-4">Filters</h3>
              
              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search products..." className="pl-10" />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range (EGP)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      placeholder="Min"
                      value={filters.priceMin}
                      onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                    />
                    <Input 
                      placeholder="Max"
                      value={filters.priceMax}
                      onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                    />
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Condition</label>
                  <Select value={filters.condition} onValueChange={(value) => handleFilterChange('condition', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Enter location"
                      className="pl-10"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </div>
            </Card>
          </div>

          {/* Products Grid/List */}
          <div className="lg:col-span-3">
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <Link to={`/product/${product.id}`} className="block">
                    <div className={viewMode === 'list' ? 'flex' : ''}>
                      <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'h-48'}`}>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        {product.featured && (
                          <Badge className="absolute top-2 left-2 bg-orange-500">
                            Featured
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                        
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl font-bold text-blue-600">
                            {product.price} EGP
                          </span>
                          <Badge variant="outline">{product.condition}</Badge>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {product.location}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{product.category}</span>
                          <span>{product.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
