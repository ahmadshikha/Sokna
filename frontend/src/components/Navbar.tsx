
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  MessageSquare, 
  User, 
  Heart, 
  Menu,
  MapPin,
  ChevronDown
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const categories = [
  { name: 'Vehicles', path: '/products?category=vehicles' },
  { name: 'Property', path: '/products?category=property' },
  { name: 'Electronics', path: '/products?category=electronics' },
  { name: 'Furniture', path: '/products?category=furniture' },
  { name: 'Fashion', path: '/products?category=fashion' },
  { name: 'Services', path: '/products?category=services' },
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Egypt</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Help</span>
              <span>|</span>
              <Link to="/login" className="hover:text-gray-900">Login</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MH</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MarketHub</span>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <Input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button 
                type="submit"
                className="rounded-l-none bg-blue-600 hover:bg-blue-700"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/chat">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </Button>
            </Link>
            
            <Link to="/favorites">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Saved</span>
              </Button>
            </Link>

            <Link to="/add-post">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Sell
              </Button>
            </Link>

            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Categories bar - Desktop */}
        <div className="hidden md:flex items-center space-x-8 py-3 border-t">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">
                  All Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-64 p-4">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {categories.slice(0, 5).map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="text-sm text-gray-600 hover:text-gray-900 whitespace-nowrap"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white absolute left-0 right-0 shadow-lg">
            <div className="p-4 space-y-4">
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="flex">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-r-none border-r-0"
                />
                <Button type="submit" className="rounded-l-none bg-blue-600">
                  <Search className="h-4 w-4" />
                </Button>
              </form>

              {/* Mobile links */}
              <div className="space-y-2">
                <Link to="/add-post" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                  <Plus className="h-4 w-4" />
                  <span>Sell</span>
                </Link>
                <Link to="/chat" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat</span>
                </Link>
                <Link to="/favorites" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                  <Heart className="h-4 w-4" />
                  <span>Saved</span>
                </Link>
              </div>

              {/* Mobile categories */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Categories</h3>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    className="block p-2 text-sm hover:bg-gray-100 rounded"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
