import React, { useState } from 'react';
import { SkipBack, Play, Pause, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MusicPlayerProps {
  currentClue: string | null;
}

export default function MusicPlayer({ currentClue }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement actual music playback
  };

  return (
    <div className="space-y-6">
      {/* Current Clue Display */}
      {currentClue && (
        <div className="bg-cyan-100 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="bg-cyan-500 text-white px-2 py-1 rounded text-sm font-bold">
              {currentClue}
            </span>
            <span className="text-sm font-medium">
              {currentClue === '1D' && 'First word of this song title'}
              {currentClue === '2A' && 'Acronym of this song'}
              {currentClue === '2D' && "What's it all about in the..."}
              {currentClue === '3A' && 'Song title & Post Malone...'}
              {currentClue === '4D' && 'First word of this song title'}
              {currentClue === '5A' && 'Artist name'}
            </span>
          </div>
        </div>
      )}

      {/* Music Player Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="lg"
          className="p-3 hover:bg-gray-100 rounded-full"
        >
          <SkipBack className="h-5 w-5 text-gray-600" />
        </Button>
        
        <Button
          onClick={handlePlayPause}
          className="p-4 bg-black text-white rounded-full hover:bg-gray-800"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          className="p-3 hover:bg-gray-100 rounded-full"
        >
          <SkipForward className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </div>
  );
}
