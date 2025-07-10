import { puzzles, gameStates, type Puzzle, type InsertPuzzle, type GameState, type InsertGameState } from "@shared/schema";

export interface IStorage {
  // Puzzle operations
  getPuzzle(id: number): Promise<Puzzle | undefined>;
  getTodaysPuzzle(): Promise<Puzzle | undefined>;
  createPuzzle(puzzle: InsertPuzzle): Promise<Puzzle>;
  
  // Game state operations
  getGameState(puzzleId: number): Promise<GameState | undefined>;
  createGameState(gameState: InsertGameState): Promise<GameState>;
  updateGameState(id: number, updates: Partial<GameState>): Promise<GameState | undefined>;
}

export class MemStorage implements IStorage {
  private puzzles: Map<number, Puzzle>;
  private gameStates: Map<number, GameState>;
  private currentPuzzleId: number;
  private currentGameStateId: number;

  constructor() {
    this.puzzles = new Map();
    this.gameStates = new Map();
    this.currentPuzzleId = 1;
    this.currentGameStateId = 1;
    
    // Initialize with a sample puzzle
    this.initializeSamplePuzzle();
  }

  private initializeSamplePuzzle() {
    const samplePuzzle: Puzzle = {
      id: 1,
      title: "Music Crossword",
      date: "Thursday, July 10, 2025",
      grid: [
        [null, { letter: "", number: 1, hasNumber: true }, null, { letter: "", number: 2, hasNumber: true }, { letter: "A" }, { letter: "U" }, { letter: "S" }, { letter: "T" }, { letter: "I" }],
        [{ letter: "", number: 3, hasNumber: true }, { letter: "A" }, { letter: "R" }, { letter: "D" }, null, { letter: "T" }, { letter: "I" }, { letter: "N" }, { letter: "N" }],
        [null, { letter: "R" }, null, { letter: "R" }, null, { letter: "I" }, { letter: "T" }, { letter: "T" }, { letter: "E" }],
        [null, { letter: "B" }, null, { letter: "A" }, null, { letter: "N" }, { letter: "G" }, { letter: "S" }, null],
        [null, { letter: "A" }, null, { letter: "I" }, null, null, null, null, null],
        [{ letter: "", number: 5, hasNumber: true }, { letter: "A" }, { letter: "L" }, { letter: "T" }, { letter: "N" }, { letter: "P" }, { letter: "E" }, { letter: "P" }, { letter: "A" }],
        [null, null, null, { letter: "O" }, null, null, null, null, null]
      ],
      clues: {
        across: {
          "2A": "Acronym of this song",
          "3A": "Song title & Post Malone...",
          "5A": "Artist name"
        },
        down: {
          "1D": "First word of this song title",
          "2D": "What's it all about in the...",
          "4D": "First word of this song title"
        }
      },
      solutions: {
        "1D": "ARBA",
        "2A": "AUSTIN",
        "2D": "ARTI",
        "3A": "HARD",
        "4D": "AITO",
        "5A": "SALTNPEPA"
      }
    };
    
    this.puzzles.set(1, samplePuzzle);
  }

  async getPuzzle(id: number): Promise<Puzzle | undefined> {
    return this.puzzles.get(id);
  }

  async getTodaysPuzzle(): Promise<Puzzle | undefined> {
    // For now, return the first puzzle as today's puzzle
    return this.puzzles.get(1);
  }

  async createPuzzle(insertPuzzle: InsertPuzzle): Promise<Puzzle> {
    const id = this.currentPuzzleId++;
    const puzzle: Puzzle = { ...insertPuzzle, id };
    this.puzzles.set(id, puzzle);
    return puzzle;
  }

  async getGameState(puzzleId: number): Promise<GameState | undefined> {
    return Array.from(this.gameStates.values()).find(
      (gameState) => gameState.puzzleId === puzzleId
    );
  }

  async createGameState(insertGameState: InsertGameState): Promise<GameState> {
    const id = this.currentGameStateId++;
    const gameState: GameState = { 
      ...insertGameState, 
      id,
      currentClue: insertGameState.currentClue ?? null,
      isCompleted: insertGameState.isCompleted ?? false
    };
    this.gameStates.set(id, gameState);
    return gameState;
  }

  async updateGameState(id: number, updates: Partial<GameState>): Promise<GameState | undefined> {
    const gameState = this.gameStates.get(id);
    if (!gameState) return undefined;
    
    const updatedGameState = { ...gameState, ...updates };
    this.gameStates.set(id, updatedGameState);
    return updatedGameState;
  }
}

export const storage = new MemStorage();
