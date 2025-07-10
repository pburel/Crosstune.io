import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Puzzle, GameState, GridCell } from '@/types/game';

export function useCrosswordGame() {
  const queryClient = useQueryClient();
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [currentClue, setCurrentClue] = useState<string | null>(null);
  const [playerAnswers, setPlayerAnswers] = useState<Record<string, string>>({});

  // Fetch today's puzzle
  const { data: puzzle, isLoading: puzzleLoading } = useQuery<Puzzle>({
    queryKey: ['/api/puzzle/today'],
  });

  // Fetch game state
  const { data: gameState } = useQuery<GameState | null>({
    queryKey: ['/api/game-state', puzzle?.id],
    enabled: !!puzzle?.id,
  });

  // Create game state mutation
  const createGameStateMutation = useMutation({
    mutationFn: async (data: Partial<GameState>) => {
      const response = await apiRequest('POST', '/api/game-state', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/game-state'] });
    },
  });

  // Update game state mutation
  const updateGameStateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<GameState> }) => {
      const response = await apiRequest('PATCH', `/api/game-state/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/game-state'] });
    },
  });

  // Initialize game state if it doesn't exist
  useEffect(() => {
    if (puzzle && !gameState && !createGameStateMutation.isPending) {
      createGameStateMutation.mutate({
        puzzleId: puzzle.id,
        playerAnswers: {},
        currentClue: null,
        completedWords: [],
        isCompleted: false,
      });
    }
  }, [puzzle, gameState]);

  // Sync local state with game state
  useEffect(() => {
    if (gameState) {
      setPlayerAnswers(gameState.playerAnswers);
      setCurrentClue(gameState.currentClue);
    }
  }, [gameState]);

  const selectCell = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col });
  }, []);

  const selectClue = useCallback((clueId: string) => {
    setCurrentClue(clueId);
    if (gameState) {
      updateGameStateMutation.mutate({
        id: gameState.id,
        updates: { currentClue: clueId },
      });
    }
  }, [gameState, updateGameStateMutation]);

  const updateCell = useCallback((row: number, col: number, letter: string) => {
    const cellKey = `${row}-${col}`;
    const newAnswers = { ...playerAnswers, [cellKey]: letter.toUpperCase() };
    setPlayerAnswers(newAnswers);
    
    if (gameState) {
      updateGameStateMutation.mutate({
        id: gameState.id,
        updates: { playerAnswers: newAnswers },
      });
    }
  }, [playerAnswers, gameState, updateGameStateMutation]);

  const clearCell = useCallback((row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    const newAnswers = { ...playerAnswers };
    delete newAnswers[cellKey];
    setPlayerAnswers(newAnswers);
    
    if (gameState) {
      updateGameStateMutation.mutate({
        id: gameState.id,
        updates: { playerAnswers: newAnswers },
      });
    }
  }, [playerAnswers, gameState, updateGameStateMutation]);

  const getCellValue = useCallback((row: number, col: number): string => {
    const cellKey = `${row}-${col}`;
    return playerAnswers[cellKey] || '';
  }, [playerAnswers]);

  const getClueColor = useCallback((clueId: string): string => {
    const colors: Record<string, string> = {
      '1D': 'bg-game-blue',
      '2A': 'bg-spotify-green',
      '2D': 'bg-spotify-green',
      '3A': 'bg-game-orange',
      '4D': 'bg-game-red',
      '5A': 'bg-game-yellow',
    };
    return colors[clueId] || 'bg-gray-500';
  }, []);

  return {
    puzzle,
    gameState,
    puzzleLoading,
    selectedCell,
    currentClue,
    playerAnswers,
    selectCell,
    selectClue,
    updateCell,
    clearCell,
    getCellValue,
    getClueColor,
  };
}
