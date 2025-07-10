export interface GridCell {
  letter: string;
  number?: number;
  hasNumber?: boolean;
  isBlocked?: boolean;
}

export interface Clue {
  id: string;
  text: string;
  direction: 'across' | 'down';
  startRow: number;
  startCol: number;
  length: number;
  answer: string;
}

export interface Puzzle {
  id: number;
  title: string;
  date: string;
  grid: (GridCell | null)[][];
  clues: {
    across: Record<string, string>;
    down: Record<string, string>;
  };
  solutions: Record<string, string>;
}

export interface GameState {
  puzzleId: number;
  playerAnswers: Record<string, string>;
  currentClue: string | null;
  completedWords: string[];
  isCompleted: boolean;
  selectedCell: { row: number; col: number } | null;
}

export interface MusicPlayerState {
  isPlaying: boolean;
  currentTrack: string | null;
  currentTime: number;
  duration: number;
}
