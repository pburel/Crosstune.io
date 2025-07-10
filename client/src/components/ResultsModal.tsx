import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Play, Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  completionTime: string;
  lettersFound: number;
  totalLetters: number;
  lettersRevealed: number;
  onPlaySpotify?: () => void;
  onPlayHarmonie?: () => void;
}

export default function ResultsModal({
  isOpen,
  onClose,
  completionTime,
  lettersFound,
  totalLetters,
  lettersRevealed,
  onPlaySpotify,
  onPlayHarmonie
}: ResultsModalProps) {
  const [nextPuzzleTime, setNextPuzzleTime] = useState("15:11:57");

  useEffect(() => {
    // Calculate time until next puzzle (next day at midnight)
    const updateNextPuzzleTime = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setNextPuzzleTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    if (isOpen) {
      updateNextPuzzleTime();
      const interval = setInterval(updateNextPuzzleTime, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
      <DialogContent className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border">
        <DialogTitle className="sr-only">Puzzle Completion Results</DialogTitle>
        <DialogDescription className="sr-only">
          You've completed today's crossword puzzle. View your results and play other games.
        </DialogDescription>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Congratulations!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              You solved today's puzzle in {completionTime}!
            </p>
          </div>

          {/* Stats */}
          <div className="text-gray-700 dark:text-gray-300">
            <p>
              {lettersFound}/{totalLetters} letters found, {lettersRevealed} revealed
            </p>
          </div>

          {/* Share Button */}
          <Button 
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3"
            onClick={() => {
              // Share functionality
              navigator.share?.({
                title: 'CrossTune Puzzle',
                text: `I solved today's CrossTune puzzle in ${completionTime}! ${lettersFound}/${totalLetters} letters found.`,
                url: window.location.href
              }).catch(() => {
                // Fallback to clipboard
                navigator.clipboard?.writeText(`I solved today's CrossTune puzzle in ${completionTime}! ${lettersFound}/${totalLetters} letters found. ${window.location.href}`);
              });
            }}
          >
            SHARE RESULT
          </Button>

          {/* Next Puzzle Timer */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Next puzzle in
            </p>
            <p className="text-xl font-mono font-bold text-gray-900 dark:text-white">
              {nextPuzzleTime}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Missed yesterday? Visit the{" "}
              <button className="text-blue-600 dark:text-blue-400 underline">
                archive
              </button>
            </p>
          </div>

          {/* Game Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 flex items-center justify-center gap-2"
              onClick={onPlaySpotify}
            >
              <Play size={16} />
              PLAY SPOTIFY
            </Button>
            
            <Button 
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 flex items-center justify-center gap-2"
              onClick={onPlayHarmonie}
            >
              <Heart size={16} />
              PLAY HARMONIE
            </Button>
          </div>

          {/* SoundCloud Attribution */}
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              powered by
            </p>
            <div className="text-sm font-semibold text-orange-500">
              SOUNDCLOUD
            </div>
          </div>

          {/* Song Credits */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Song Credits
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Play size={12} className="text-white ml-0.5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Boys Like Girls - The Great Escape
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2006 album
                  </p>
                </div>
                <button className="text-orange-500 hover:text-orange-600">
                  <Play size={16} />
                </button>
              </div>

              <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Play size={12} className="text-white ml-0.5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    White Iverson
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    by Post Malone
                  </p>
                </div>
                <button className="text-orange-500 hover:text-orange-600">
                  <Play size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}