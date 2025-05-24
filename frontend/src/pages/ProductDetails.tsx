
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { 
  Heart, 
  Share2, 
  Flag, 
  MapPin, 
  Calendar, 
  Eye,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link } from 'react-router-dom';

const mockProduct = {
  id: 1,
  title: "Honda Civic 2020 - Excellent Condition",
  price: "320,000",
  location: "New Cairo, Cairo",
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  category: "Vehicles",
  condition: "Used - Excellent",
  description: "Well-maintained Honda Civic 2020 in excellent condition. Only 45,000 km driven. Full service history available. Non-smoking owner. Recently serviced with new tires. Perfect for daily commuting.",
  features: [
    "Automatic transmission",
    "Air conditioning",
    "Power steering",
    "Electric windows",
    "Airbags",
    "ABS brakes"
  ],
  seller: {
    name: "Ahmed Hassan",
    avatar: "A",
    memberSince: "2021",
    totalAds: 12,
    rating: 4.8
  },
  stats: {
    views: 234,
    favorites: 18,
    postedDate: "2 days ago"
  }
};

const relatedProducts = [
  {
    id: 2,
    title: "Honda Accord 2019",
    price: "280,000",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Toyota Camry 2021",
    price: "380,000",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Nissan Altima 2020",
    price: "310,000",
    image: "/placeholder.svg"
  }
];

const ProductDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === mockProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? mockProduct.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-gray-700">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{mockProduct.category}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={mockProduct.images[currentImageIndex]}
                  alt={mockProduct.title}
                  className="w-full h-96 object-cover"
                />
                
                {mockProduct.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {mockProduct.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Image thumbnails */}
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {mockProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Product Info */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {mockProduct.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {mockProduct.stats.postedDate}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {mockProduct.stats.views} views
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={isFavorited ? 'text-red-500' : ''}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-blue-600">
                  {mockProduct.price} EGP
                </span>
                <div className="flex space-x-2">
                  <Badge>{mockProduct.category}</Badge>
                  <Badge variant="outline">{mockProduct.condition}</Badge>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                {mockProduct.location}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {mockProduct.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {mockProduct.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Seller Info */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Seller Information</h3>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {mockProduct.seller.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{mockProduct.seller.name}</h4>
                  <p className="text-sm text-gray-500">
                    Member since {mockProduct.seller.memberSince}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total ads:</span>
                  <span>{mockProduct.seller.totalAds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span>{mockProduct.seller.rating}/5</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Seller
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </Card>

            {/* Safety Tips */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Safety Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Meet in a public place</li>
                <li>• Check the item before payment</li>
                <li>• Bring a friend if possible</li>
                <li>• Trust your instincts</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.title}</h3>
                    <span className="text-lg font-bold text-blue-600">
                      {product.price} EGP
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
