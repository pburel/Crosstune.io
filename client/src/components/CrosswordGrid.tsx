import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { Puzzle } from '@/types/game';

interface CrosswordGridProps {
  puzzle: Puzzle;
  selectedCell: { row: number; col: number } | null;
  currentClue: string | null;
  onCellClick: (row: number, col: number) => void;
  onCellInput: (row: number, col: number, letter: string) => void;
  onCellClear: (row: number, col: number) => void;
  getCellValue: (row: number, col: number) => string;
  getClueColor: (clueId: string) => string;
}

export default function CrosswordGrid({
  puzzle,
  selectedCell,
  currentClue,
  onCellClick,
  onCellInput,
  onCellClear,
  getCellValue,
  getClueColor
}: CrosswordGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;
      
      if (e.key.match(/[a-zA-Z]/)) {
        onCellInput(selectedCell.row, selectedCell.col, e.key.toUpperCase());
        e.preventDefault();
      } else if (e.key === 'Backspace') {
        onCellClear(selectedCell.row, selectedCell.col);
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, onCellInput, onCellClear]);

  const getClueNumberColor = (row: number, col: number): string => {
    const cell = puzzle.grid[row]?.[col];
    if (!cell || !cell.hasNumber) return '';
    
    // Map cell positions to clue IDs based on the design
    const clueMap: Record<string, string> = {
      '0-1': '1D',
      '0-3': '2A',
      '1-0': '3A',
      '5-0': '5A',
    };
    
    const cellKey = `${row}-${col}`;
    const clueId = clueMap[cellKey];
    
    if (clueId) {
      const colorClass = getClueColor(clueId).replace('bg-', 'text-');
      return colorClass;
    }
    
    return 'text-gray-600';
  };

  return (
    <div className="relative mx-auto" style={{ width: '400px', height: '400px' }}>
      {/* Vinyl Record Background */}
      <div className="absolute inset-0 vinyl-record rounded-full shadow-2xl">
        {/* Record grooves */}
        <div className="vinyl-grooves inset-4 border-gray-600"></div>
        <div className="vinyl-grooves inset-8 border-gray-700"></div>
        <div className="vinyl-grooves inset-12 border-gray-600"></div>
        
        {/* Center label */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-game-red rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-black rounded-full"></div>
        </div>
      </div>

      {/* Crossword Grid Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          ref={gridRef}
          className="grid grid-cols-9 gap-px bg-white/20 p-4 rounded-lg backdrop-blur-sm"
          tabIndex={0}
        >
          {puzzle.grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (!cell) {
                return (
                  <div 
                    key={`${rowIndex}-${colIndex}`} 
                    className="w-8 h-8 bg-transparent"
                  />
                );
              }

              const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
              const cellValue = getCellValue(rowIndex, colIndex) || cell.letter;
              const numberColor = getClueNumberColor(rowIndex, colIndex);

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={cn(
                    "w-8 h-8 bg-white border border-gray-300 flex items-center justify-center text-xs font-bold cursor-pointer relative transition-colors",
                    "hover:bg-blue-100",
                    isSelected && "bg-blue-200 border-blue-400"
                  )}
                  onClick={() => onCellClick(rowIndex, colIndex)}
                >
                  {cell.hasNumber && cell.number && (
                    <span className={cn("crossword-cell-number", numberColor)}>
                      {cell.number}
                    </span>
                  )}
                  <span className="text-black">{cellValue}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
