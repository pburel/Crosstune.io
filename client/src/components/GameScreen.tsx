import React, { useState } from 'react';
import { Menu, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CrosswordGrid from './CrosswordGrid';
import CluePanel from './CluePanel';
import MusicPlayer from './MusicPlayer';
import SidebarAd from './SidebarAd';
import MenuSidebar from './MenuSidebar';
import RevealMenu from './RevealMenu';
import { useCrosswordGame } from '@/hooks/useCrosswordGame';
import { Skeleton } from '@/components/ui/skeleton';

interface GameScreenProps {
  onNavigateToArchives?: () => void;
}

export default function GameScreen({ onNavigateToArchives }: GameScreenProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const {
    puzzle,
    gameState,
    puzzleLoading,
    selectedCell,
    currentClue,
    selectCell,
    selectClue,
    updateCell,
    clearCell,
    getCellValue,
    getClueColor,
    revealSquare,
    revealWord,
    revealPuzzle,
  } = useCrosswordGame();

  if (puzzleLoading || !puzzle) {
    return (
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
            <div className="text-sm font-medium text-gray-600">8:59</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Thursday, July 10</span>
              <RevealMenu
                onRevealSquare={revealSquare}
                onRevealWord={revealWord}
                onRevealPuzzle={revealPuzzle}
                hasSelectedCell={!!selectedCell}
                hasCurrentClue={!!currentClue}
              />
              <Button variant="ghost" size="sm">
                <Moon className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-4 grid grid-cols-12 gap-6">
          <div className="col-span-2 hidden lg:block">
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Skeleton className="w-96 h-96 rounded-full mx-auto" />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>
          <div className="text-sm font-medium text-gray-600">8:59</div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Thursday, July 10</span>
            <RevealMenu
              onRevealSquare={revealSquare}
              onRevealWord={revealWord}
              onRevealPuzzle={revealPuzzle}
              hasSelectedCell={!!selectedCell}
              hasCurrentClue={!!currentClue}
            />
            <Button variant="ghost" size="sm">
              <Moon className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-12 gap-6">
        {/* Left Sidebar Ad */}
        <div className="col-span-2 hidden lg:block">
          <SidebarAd />
        </div>

        {/* Main Game Area */}
        <div className="col-span-12 lg:col-span-6">
          <CrosswordGrid
            puzzle={puzzle}
            selectedCell={selectedCell}
            currentClue={currentClue}
            onCellClick={selectCell}
            onCellInput={updateCell}
            onCellClear={clearCell}
            getCellValue={getCellValue}
            getClueColor={getClueColor}
          />
          
          <MusicPlayer currentClue={currentClue} />
        </div>

        {/* Right Sidebar - Clues */}
        <div className="col-span-12 lg:col-span-4">
          <CluePanel
            puzzle={puzzle}
            currentClue={currentClue}
            onClueSelect={selectClue}
            getClueColor={getClueColor}
          />
        </div>
      </div>

      {/* Menu Sidebar */}
      <MenuSidebar 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigateToArchives={onNavigateToArchives}
      />
    </div>
  );
}
