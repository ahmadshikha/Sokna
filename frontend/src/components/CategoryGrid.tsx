
import React from 'react';
import { Card } from "@/components/ui/card";
import { Car, Home, Smartphone, Sofa, Shirt, Wrench, Gamepad2, Heart } from "lucide-react";

const categories = [
  { name: 'Vehicles', icon: Car, count: '12,543', color: 'bg-blue-500', bgColor: 'bg-blue-50' },
  { name: 'Property', icon: Home, count: '8,721', color: 'bg-green-500', bgColor: 'bg-green-50' },
  { name: 'Electronics', icon: Smartphone, count: '15,632', color: 'bg-purple-500', bgColor: 'bg-purple-50' },
  { name: 'Furniture', icon: Sofa, count: '4,891', color: 'bg-orange-500', bgColor: 'bg-orange-50' },
  { name: 'Fashion', icon: Shirt, count: '9,234', color: 'bg-pink-500', bgColor: 'bg-pink-50' },
  { name: 'Services', icon: Wrench, count: '6,567', color: 'bg-indigo-500', bgColor: 'bg-indigo-50' },
  { name: 'Hobbies', icon: Gamepad2, count: '3,455', color: 'bg-red-500', bgColor: 'bg-red-50' },
  { name: 'Health', icon: Heart, count: '2,123', color: 'bg-emerald-500', bgColor: 'bg-emerald-50' },
];

const CategoryGrid = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Browse by Category
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover thousands of items across all categories
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Card
            key={category.name}
            className={`p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-0 ${category.bgColor} hover:scale-105 animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-center">
              <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <category.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">
                {category.count} ads
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
