import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SidebarAdProps {
  isRight?: boolean;
}

export default function SidebarAd({ isRight = false }: SidebarAdProps) {
  const leftSidebarItems = [
    {
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150",
      alt: "Professional studio setup with equipment",
      price: "841.50 €",
      originalPrice: "919.00 €",
      badge: "SALE",
      badgeColor: "bg-game-red"
    },
    {
      image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150",
      alt: "Acoustic guitar in natural lighting",
      price: "995.00 €"
    },
    {
      image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150",
      alt: "Close-up of piano keys in black and white",
      price: "78.25 €"
    }
  ];

  const rightSidebarItems = [
    {
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150",
      alt: "Collection of vintage vinyl records",
      price: "599.00 €",
      badge: "En ligne",
      badgeColor: "bg-spotify-green"
    },
    {
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150",
      alt: "Professional DJ turntable with vinyl record",
      price: "919.00 €",
      badge: "En stock",
      badgeColor: "bg-spotify-green"
    },
    {
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150",
      alt: "Vintage radio with classic design",
      price: "78.25 €"
    },
    {
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150",
      alt: "Crossword puzzle grid with pencil",
      price: "299.00 €"
    }
  ];

  const items = isRight ? rightSidebarItems : leftSidebarItems;

  return (
    <Card className="shadow-md border border-gray-200">
      <CardContent className="p-4">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index}>
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.alt}
                  className="w-full h-24 object-cover rounded-lg"
                />
                {item.badge && (
                  <div className={`absolute bottom-2 left-2 ${item.badgeColor} text-white text-xs px-2 py-1 rounded`}>
                    {item.badge}
                  </div>
                )}
              </div>
              <div className="text-sm mt-2">
                <div className="font-semibold">{item.price}</div>
                {item.originalPrice && (
                  <div className="text-gray-500 line-through">{item.originalPrice}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {!isRight && (
          <div className="mt-4 text-center">
            <div className="text-sm font-medium mb-2">Cliquez ici pour plus d'information</div>
            <div className="text-xs text-gray-500 mb-2">Ne manquez pas ce contenu de notre annonceur.</div>
            <Button className="bg-vinyl-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
              En savoir plus
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
