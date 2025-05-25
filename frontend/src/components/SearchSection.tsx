
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Filter } from "lucide-react";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  return (
    <div className="container mx-auto px-4 -mt-10 relative z-10">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-blue-500 rounded-xl"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 rounded-xl">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vehicles">Vehicles</SelectItem>
              <SelectItem value="property">Property</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="services">Services</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="pl-10 h-12 border-gray-200 focus:border-blue-500 rounded-xl">
                <SelectValue placeholder="All Syria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cairo">Damascus</SelectItem>
                <SelectItem value="alexandria">Aleppo</SelectItem>
                <SelectItem value="giza">Homs</SelectItem>
                <SelectItem value="sharm">Latakia</SelectItem>
                <SelectItem value="hurghada">Hama</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="h-12 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm text-gray-600">Popular searches:</span>
          {['iPhone', 'Car', 'Apartment', 'Laptop', 'Furniture'].map((term) => (
            <button
              key={term}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors duration-200"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
