import React, { useState } from 'react';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface RevealMenuProps {
  onRevealSquare: () => void;
  onRevealWord: () => void;
  onRevealPuzzle: () => void;
  hasSelectedCell: boolean;
  hasCurrentClue: boolean;
}

export default function RevealMenu({ 
  onRevealSquare, 
  onRevealWord, 
  onRevealPuzzle,
  hasSelectedCell,
  hasCurrentClue 
}: RevealMenuProps) {
  const [showPuzzleAlert, setShowPuzzleAlert] = useState(false);

  const handleRevealPuzzle = () => {
    setShowPuzzleAlert(true);
  };

  const confirmRevealPuzzle = () => {
    onRevealPuzzle();
    setShowPuzzleAlert(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <span className="text-sm text-gray-600">Reveal</span>
            <ChevronDown className="h-3 w-3 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem 
            onClick={onRevealSquare}
            disabled={!hasSelectedCell}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Square
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={onRevealWord}
            disabled={!hasCurrentClue}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Word
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleRevealPuzzle}
            className="flex items-center gap-2"
          >
            <EyeOff className="h-4 w-4" />
            Puzzle
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showPuzzleAlert} onOpenChange={setShowPuzzleAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reveal Entire Puzzle?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reveal the entire puzzle? This will show all answers and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRevealPuzzle}>
              Yes, Reveal Puzzle
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}