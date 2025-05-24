
import React from 'react';
import { Users, ShoppingBag, MapPin, Star } from "lucide-react";

const stats = [
  { icon: Users, label: "Active Users", value: "2.5M+", color: "text-blue-600" },
  { icon: ShoppingBag, label: "Total Listings", value: "150K+", color: "text-green-600" },
  { icon: MapPin, label: "Cities Covered", value: "25+", color: "text-purple-600" },
  { icon: Star, label: "Success Rate", value: "95%", color: "text-yellow-600" },
];

const StatsSection = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Millions
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join Egypt's largest marketplace community
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center animate-fade-in`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 ${stat.color} bg-white/10 rounded-2xl flex items-center justify-center`}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
