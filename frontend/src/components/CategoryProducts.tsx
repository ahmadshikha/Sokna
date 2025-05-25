
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Heart } from "lucide-react";
import { Link } from 'react-router-dom';

const mockProductsByCategory = {
  vehicles: [
    {
      id: 1,
      title: "Honda Civic 2020 - Excellent Condition",
      price: "320,000",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
      condition: "Used - Excellent",
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Toyota Corolla 2019",
      price: "280,000",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400",
      condition: "Used - Good",
      date: "1 day ago"
    },
    {
      id: 3,
      title: "BMW X3 2021",
      price: "650,000",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
      condition: "Used - Excellent",
      date: "3 hours ago"
    },
    {
      id: 4,
      title: "Mercedes C-Class 2018",
      price: "450,000",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400",
      condition: "Used - Good",
      date: "5 hours ago"
    },
    {
      id: 5,
      title: "Nissan Altima 2020",
      price: "290,000",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400",
      condition: "Used - Excellent",
      date: "1 day ago"
    }
  ],
  property: [
    {
      id: 6,
      title: "Modern Apartment for Rent",
      price: "8,000/month",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      condition: "Furnished",
      date: "1 day ago"
    },
    {
      id: 7,
      title: "Villa for Sale in New Cairo",
      price: "2,500,000",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
      condition: "New",
      date: "2 days ago"
    },
    {
      id: 8,
      title: "Studio Apartment",
      price: "4,500/month",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      condition: "Furnished",
      date: "3 days ago"
    },
    {
      id: 9,
      title: "Commercial Office Space",
      price: "15,000/month",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
      condition: "Unfurnished",
      date: "4 hours ago"
    },
    {
      id: 10,
      title: "Penthouse with Nile View",
      price: "25,000/month",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
      condition: "Luxury",
      date: "6 hours ago"
    }
  ],
  electronics: [
    {
      id: 11,
      title: "iPhone 14 Pro Max 256GB",
      price: "45,000",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      condition: "Used - Good",
      date: "1 day ago"
    },
    {
      id: 12,
      title: "Gaming Laptop RTX 4070",
      price: "35,000",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      condition: "Used - Excellent",
      date: "3 hours ago"
    },
    {
      id: 13,
      title: "Samsung 65\" 4K Smart TV",
      price: "18,000",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      condition: "Used - Good",
      date: "2 days ago"
    },
    {
      id: 14,
      title: "iPad Air 2022",
      price: "22,000",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      condition: "Used - Excellent",
      date: "5 hours ago"
    },
    {
      id: 15,
      title: "Canon DSLR Camera",
      price: "12,500",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
      condition: "Used - Good",
      date: "1 day ago"
    }
  ],
  furniture: [
    {
      id: 16,
      title: "Modern Sofa Set - 3+2+1",
      price: "12,500",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
      condition: "Used - Excellent",
      date: "3 days ago"
    },
    {
      id: 17,
      title: "Dining Table with 6 Chairs",
      price: "8,000",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400",
      condition: "Used - Good",
      date: "2 days ago"
    },
    {
      id: 18,
      title: "King Size Bed with Mattress",
      price: "6,500",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
      condition: "Used - Excellent",
      date: "1 day ago"
    },
    {
      id: 19,
      title: "Office Desk Setup",
      price: "4,200",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400",
      condition: "Used - Good",
      date: "4 hours ago"
    },
    {
      id: 20,
      title: "Wardrobe 3 Doors",
      price: "5,800",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      condition: "Used - Excellent",
      date: "6 hours ago"
    }
  ],
  fashion: [
    {
      id: 21,
      title: "Nike Air Jordan Sneakers",
      price: "3,500",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      condition: "Used - Good",
      date: "4 hours ago"
    },
    {
      id: 22,
      title: "Designer Leather Jacket",
      price: "2,800",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      condition: "Used - Excellent",
      date: "1 day ago"
    },
    {
      id: 23,
      title: "Vintage Rolex Watch",
      price: "15,000",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400",
      condition: "Used - Good",
      date: "2 days ago"
    },
    {
      id: 24,
      title: "Summer Dress Collection",
      price: "800",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
      condition: "Used - Excellent",
      date: "3 days ago"
    },
    {
      id: 25,
      title: "Designer Handbag",
      price: "4,200",
      location: "Damascus",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
      condition: "Used - Good",
      date: "5 hours ago"
    }
  ]
};

const categories = [
  { key: 'vehicles', name: 'Vehicles', icon: '🚗' },
  { key: 'property', name: 'Houses', icon: '🏠' },
  { key: 'electronics', name: 'Electronics', icon: '📱' },
  { key: 'furniture', name: 'Furniture', icon: '🛋️' },
  { key: 'fashion', name: 'Fashion', icon: '👕' }
];

const CategoryProducts = () => {
  const renderProductCard = (product: any) => (
    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <Link to={`/product/${product.id}`}>
        <div className="relative h-48">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4">
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
          
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {product.date}
          </div>
        </div>
      </Link>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50">
      {categories.map((category) => (
        <div key={category.key} className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{category.icon}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {category.name}
              </h2>
            </div>
            <Link to={`/products?category=${category.key}`}>
              <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-300">
                View More
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {mockProductsByCategory[category.key as keyof typeof mockProductsByCategory]?.map(renderProductCard)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryProducts;
