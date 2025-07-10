import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ArchivesScreenProps {
  onDateSelect: (date: string) => void;
  onClose: () => void;
}

export default function ArchivesScreen({ onDateSelect, onClose }: ArchivesScreenProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 6)); // July 2025
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateString = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    onDateSelect(dateString);
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <div className="text-sm font-medium text-gray-600">8:23</div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <span className="text-lg">🌙</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-md mx-auto pt-20">
        {/* Calendar Header */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="bg-black text-white p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={handlePrevMonth} className="text-white hover:bg-gray-700">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-lg font-semibold">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <Button variant="ghost" size="sm" onClick={handleNextMonth} className="text-white hover:bg-gray-700">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 mb-6">
              {days.map((day, index) => (
                <div key={index} className="aspect-square">
                  {day && (
                    <Button
                      variant={day === 10 ? "default" : "ghost"}
                      className={`w-full h-full text-sm ${
                        day === 10 
                          ? "bg-green-500 hover:bg-green-600 text-white" 
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => handleDateClick(day)}
                    >
                      {day}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Start Button */}
            <Button 
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
              onClick={() => handleDateClick(10)} // Default to July 10th
            >
              Start
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Left Sidebar with ads */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <Card className="w-32">
          <CardContent className="p-2">
            <div className="space-y-2">
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=80"
                alt="Product 1"
                className="w-full h-16 object-cover rounded"
              />
              <img 
                src="https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=80"
                alt="Product 2"
                className="w-full h-16 object-cover rounded"
              />
              <img 
                src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=80"
                alt="Product 3"
                className="w-full h-16 object-cover rounded"
              />
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=80"
                alt="Product 4"
                className="w-full h-16 object-cover rounded"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right sidebar video */}
      <div className="fixed right-4 bottom-4 hidden lg:block">
        <Card className="w-64 h-32 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-4 h-full flex items-end">
            <div className="text-sm">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">0:05 / 0:07</span>
              </div>
              <div className="text-xs opacity-80">Video content placeholder</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}