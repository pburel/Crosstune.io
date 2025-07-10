import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Puzzle } from '@/types/game';

interface CluePanelProps {
  puzzle: Puzzle;
  currentClue: string | null;
  onClueSelect: (clueId: string) => void;
  getClueColor: (clueId: string) => string;
}

export default function CluePanel({ puzzle, currentClue, onClueSelect, getClueColor }: CluePanelProps) {
  const acrossClues = Object.entries(puzzle.clues.across);
  const downClues = Object.entries(puzzle.clues.down);

  const ClueItem = ({ clueId, clueText }: { clueId: string; clueText: string }) => {
    const isActive = currentClue === clueId;
    const colorClass = getClueColor(clueId);

    return (
      <div
        className={cn(
          "flex items-start gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors",
          isActive && "clue-active"
        )}
        onClick={() => onClueSelect(clueId)}
      >
        <span className={cn(colorClass, "text-white px-2 py-1 rounded text-sm font-bold min-w-[2.5rem] text-center")}>
          {clueId}
        </span>
        <span className="text-sm flex-1">{clueText}</span>
      </div>
    );
  };

  return (
    <Card className="shadow-md border border-gray-200 sticky top-24">
      <CardContent className="p-6">
        {/* Across Clues */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Across</h3>
          <div className="space-y-3">
            {acrossClues.map(([clueId, clueText]) => (
              <ClueItem key={clueId} clueId={clueId} clueText={clueText} />
            ))}
          </div>
        </div>

        {/* Down Clues */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-gray-800">Down</h3>
          <div className="space-y-3">
            {downClues.map(([clueId, clueText]) => (
              <ClueItem key={clueId} clueId={clueId} clueText={clueText} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
