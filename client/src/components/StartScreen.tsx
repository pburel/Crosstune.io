import React from 'react';
import { Menu, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SidebarAd from './SidebarAd';

interface StartScreenProps {
  onStartGame: () => void;
}

export default function StartScreen({ onStartGame }: StartScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Button variant="ghost" size="sm">
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>
          <div className="text-sm font-medium text-gray-600">8:59</div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Reveal</span>
            <Button variant="ghost" size="sm">
              <Moon className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-12 gap-6 pt-20">
        {/* Left Sidebar Ad */}
        <div className="col-span-2 hidden lg:block">
          <SidebarAd />
        </div>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8 flex flex-col items-center justify-center">
          <div className="text-center space-y-8">
            {/* CROSSTUNE Logo */}
            <div className="bg-black text-white p-6 rounded-lg inline-block">
              <div className="grid grid-cols-5 gap-1 text-2xl font-bold font-nunito">
                <span className="bg-white text-black px-2 py-1 rounded">C</span>
                <span className="bg-white text-black px-2 py-1 rounded">R</span>
                <span className="bg-white text-black px-2 py-1 rounded">O</span>
                <span className="bg-white text-black px-2 py-1 rounded">S</span>
                <span className="bg-white text-black px-2 py-1 rounded">S</span>
              </div>
              <div className="grid grid-cols-5 gap-1 text-2xl font-bold font-nunito mt-1">
                <span className="bg-white text-black px-2 py-1 rounded">T</span>
                <span className="bg-white text-black px-2 py-1 rounded">U</span>
                <span className="bg-white text-black px-2 py-1 rounded">N</span>
                <span className="bg-white text-black px-2 py-1 rounded">E</span>
                <span className="bg-white text-black px-2 py-1 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </span>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 font-medium">a music crossword!</div>
            
            <div className="text-lg font-semibold text-gray-800">Thursday, July 10, 2025</div>
            
            <Button 
              onClick={onStartGame}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800"
            >
              Start
            </Button>
          </div>
        </div>

        {/* Right Sidebar Ad */}
        <div className="col-span-2 hidden lg:block">
          <SidebarAd isRight />
        </div>
      </div>
    </div>
  );
}
