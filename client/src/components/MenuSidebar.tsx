import React from 'react';
import { X, Home, Archive, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MenuSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToArchives?: () => void;
}

export default function MenuSidebar({ isOpen, onClose, onNavigateToArchives }: MenuSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white z-50 shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Reveal</span>
              <Button variant="ghost" size="sm" className="p-2">
                <span className="text-lg">🌙</span>
              </Button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-4 mb-8">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-left p-3 hover:bg-gray-100"
            >
              <Home className="h-4 w-4 mr-3" />
              Home
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-left p-3 hover:bg-gray-100"
              onClick={() => {
                onNavigateToArchives?.();
                onClose();
              }}
            >
              <Archive className="h-4 w-4 mr-3" />
              Archives
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-left p-3 hover:bg-gray-100"
            >
              <Users className="h-4 w-4 mr-3" />
              Follow Us
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-left p-3 hover:bg-gray-100"
            >
              <Shield className="h-4 w-4 mr-3" />
              Privacy
            </Button>
          </nav>

          {/* Our Games Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Our Games</h3>
            
            {/* Spots: Guess the Artist */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 border-2 border-white"></div>
                  </div>
                  <span className="text-sm font-medium">4.6M</span>
                </div>
                <h4 className="font-semibold text-sm mb-1">Spots: Guess the Artist</h4>
              </CardContent>
            </Card>

            {/* Hearmonics Music Connections */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="grid grid-cols-4 gap-1 mb-2">
                  <div className="aspect-square bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                    COLD
                  </div>
                  <div className="aspect-square bg-yellow-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                    PLAY
                  </div>
                  <div className="aspect-square bg-green-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                    SOME
                  </div>
                  <div className="aspect-square bg-purple-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                    BODY
                  </div>
                  <div className="aspect-square bg-red-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                    ONCE
                  </div>
                  <div className="aspect-square bg-pink-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                    TOLD
                  </div>
                  <div className="aspect-square bg-indigo-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                    ME
                  </div>
                  <div className="aspect-square bg-teal-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                    THE
                  </div>
                </div>
                <h4 className="font-semibold text-sm">Hearmonics Music Connections</h4>
              </CardContent>
            </Card>
          </div>

          {/* Advertisement Section */}
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="space-y-2">
                  <img 
                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=100"
                    alt="Product 1"
                    className="w-full h-20 object-cover rounded"
                  />
                  <div className="text-xs">
                    <div className="font-semibold">99.90 €</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <img 
                    src="https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=100"
                    alt="Product 2"
                    className="w-full h-20 object-cover rounded"
                  />
                  <div className="text-xs">
                    <div className="font-semibold">79.20 €</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-2">
                  made by fairshala studios
                </div>
                <div className="text-xs text-gray-500">
                  inquiries: company@fairshala-studios.com
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}