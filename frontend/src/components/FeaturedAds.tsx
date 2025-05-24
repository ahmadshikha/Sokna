
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Heart } from "lucide-react";

const featuredAds = [
  {
    id: 1,
    title: "iPhone 15 Pro Max - Brand New",
    price: "EGP 45,000",
    location: "New Cairo, Cairo",
    timeAgo: "2 hours ago",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    featured: true,
    category: "Electronics"
  },
  {
    id: 2,
    title: "Mercedes C-Class 2020",
    price: "EGP 850,000",
    location: "Zamalek, Cairo",
    timeAgo: "5 hours ago",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
    featured: true,
    category: "Vehicles"
  },
  {
    id: 3,
    title: "Modern Apartment for Rent",
    price: "EGP 8,000/month",
    location: "Maadi, Cairo",
    timeAgo: "1 day ago",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    featured: false,
    category: "Property"
  },
  {
    id: 4,
    title: "Gaming Laptop RTX 4070",
    price: "EGP 35,000",
    location: "Alexandria",
    timeAgo: "3 hours ago",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    featured: false,
    category: "Electronics"
  },
  {
    id: 5,
    title: "Leather Sofa Set - Like New",
    price: "EGP 12,000",
    location: "Heliopolis, Cairo",
    timeAgo: "6 hours ago",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    featured: false,
    category: "Furniture"
  },
  {
    id: 6,
    title: "Nike Air Jordan Sneakers",
    price: "EGP 3,500",
    location: "Giza",
    timeAgo: "4 hours ago",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    featured: false,
    category: "Fashion"
  }
];

const FeaturedAds = () => {
  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured Listings
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the best deals and premium listings in your area
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredAds.map((ad, index) => (
          <Card
            key={ad.id}
            className={`group overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer border-0 bg-white animate-fade-in hover:scale-105`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="relative">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {ad.featured && (
                <Badge className="absolute top-3 left-3 bg-yellow-500 text-black font-semibold">
                  Featured
                </Badge>
              )}
              <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors duration-200">
                <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
              </button>
              <div className="absolute bottom-3 left-3">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  {ad.category}
                </Badge>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {ad.title}
              </h3>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-blue-600">
                  {ad.price}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {ad.location}
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {ad.timeAgo}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
          View All Listings
        </button>
      </div>
    </div>
  );
};

export default FeaturedAds;
