import { 
  users, puzzles, gameStates, userStats, achievements, userAchievements,
  type User, type InsertUser, type Puzzle, type InsertPuzzle, 
  type GameState, type InsertGameState, type UserStats, type InsertUserStats,
  type Achievement, type InsertAchievement, type UserAchievement, type InsertUserAchievement
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // Puzzle operations
  getPuzzle(id: number): Promise<Puzzle | undefined>;
  getTodaysPuzzle(): Promise<Puzzle | undefined>;
  createPuzzle(puzzle: InsertPuzzle): Promise<Puzzle>;
  
  // Game state operations
  getGameState(puzzleId: number): Promise<GameState | undefined>;
  createGameState(gameState: InsertGameState): Promise<GameState>;
  updateGameState(id: number, updates: Partial<GameState>): Promise<GameState | undefined>;
  
  // User statistics operations
  getUserStats(userId: number): Promise<UserStats | undefined>;
  createUserStats(userStats: InsertUserStats): Promise<UserStats>;
  updateUserStats(userId: number, updates: Partial<UserStats>): Promise<UserStats | undefined>;
  
  // Achievement operations
  getAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: number): Promise<UserAchievement[]>;
  unlockAchievement(userId: number, achievementId: number): Promise<UserAchievement>;
  
  // Progress operations
  getUserProgress(userId: number): Promise<{
    stats: UserStats;
    recentGames: GameState[];
    achievements: UserAchievement[];
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getPuzzle(id: number): Promise<Puzzle | undefined> {
    const [puzzle] = await db.select().from(puzzles).where(eq(puzzles.id, id));
    return puzzle || undefined;
  }

  async getTodaysPuzzle(): Promise<Puzzle | undefined> {
    // For now, return puzzle with id 1 as today's puzzle
    // In a real app, you'd select based on date
    const [puzzle] = await db.select().from(puzzles).where(eq(puzzles.id, 1));
    return puzzle || undefined;
  }

  async createPuzzle(insertPuzzle: InsertPuzzle): Promise<Puzzle> {
    const [puzzle] = await db
      .insert(puzzles)
      .values(insertPuzzle)
      .returning();
    return puzzle;
  }

  async getGameState(puzzleId: number): Promise<GameState | undefined> {
    const [gameState] = await db
      .select()
      .from(gameStates)
      .where(eq(gameStates.puzzleId, puzzleId));
    return gameState || undefined;
  }

  async createGameState(insertGameState: InsertGameState): Promise<GameState> {
    const [gameState] = await db
      .insert(gameStates)
      .values({
        ...insertGameState,
        currentClue: insertGameState.currentClue ?? null,
        isCompleted: insertGameState.isCompleted ?? false
      })
      .returning();
    return gameState;
  }

  async updateGameState(id: number, updates: Partial<GameState>): Promise<GameState | undefined> {
    const [gameState] = await db
      .update(gameStates)
      .set(updates)
      .where(eq(gameStates.id, id))
      .returning();
    return gameState || undefined;
  }

  // User statistics operations
  async getUserStats(userId: number): Promise<UserStats | undefined> {
    const [stats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
    return stats || undefined;
  }

  async createUserStats(insertUserStats: InsertUserStats): Promise<UserStats> {
    const [stats] = await db
      .insert(userStats)
      .values(insertUserStats)
      .returning();
    return stats;
  }

  async updateUserStats(userId: number, updates: Partial<UserStats>): Promise<UserStats | undefined> {
    const [stats] = await db
      .update(userStats)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userStats.userId, userId))
      .returning();
    return stats || undefined;
  }

  // Achievement operations
  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async getUserAchievements(userId: number): Promise<UserAchievement[]> {
    return await db.select().from(userAchievements).where(eq(userAchievements.userId, userId));
  }

  async unlockAchievement(userId: number, achievementId: number): Promise<UserAchievement> {
    const [userAchievement] = await db
      .insert(userAchievements)
      .values({ userId, achievementId })
      .returning();
    return userAchievement;
  }

  // Progress operations
  async getUserProgress(userId: number): Promise<{
    stats: UserStats;
    recentGames: GameState[];
    achievements: UserAchievement[];
  }> {
    // Get or create user stats
    let stats = await this.getUserStats(userId);
    if (!stats) {
      stats = await this.createUserStats({ 
        userId,
        totalPuzzlesCompleted: 0,
        totalTimePlayed: 0,
        averageCompletionTime: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalHintsUsed: 0,
        totalLettersRevealed: 0,
        lastPlayedDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Get recent games (last 10)
    const recentGames = await db
      .select()
      .from(gameStates)
      .where(eq(gameStates.puzzleId, 1)) // For now, just get games for puzzle 1
      .orderBy(desc(gameStates.startTime))
      .limit(10);

    // Get user achievements
    const userAchievements = await this.getUserAchievements(userId);

    return {
      stats,
      recentGames,
      achievements: userAchievements
    };
  }
}

// Initialize sample data for the database
async function initializeSampleData() {
  try {
    // Check if sample puzzle already exists
    const existingPuzzle = await db.select().from(puzzles).where(eq(puzzles.id, 1));
    
    if (existingPuzzle.length === 0) {
      const samplePuzzle: InsertPuzzle = {
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

      await db.insert(puzzles).values(samplePuzzle);
      console.log("Sample puzzle initialized in database");
    }

    // Initialize sample achievements
    const existingAchievements = await db.select().from(achievements);
    if (existingAchievements.length === 0) {
      const sampleAchievements: InsertAchievement[] = [
        {
          name: "First Steps",
          description: "Complete your first crossword puzzle",
          icon: "🎯",
          condition: JSON.stringify({ type: "puzzles_completed", value: 1 })
        },
        {
          name: "Speed Demon",
          description: "Complete a puzzle in under 3 minutes",
          icon: "⚡",
          condition: JSON.stringify({ type: "completion_time", value: 180 })
        },
        {
          name: "Perfect Score",
          description: "Complete a puzzle without using any hints",
          icon: "⭐",
          condition: JSON.stringify({ type: "no_hints", value: true })
        },
        {
          name: "Streak Master",
          description: "Complete 7 puzzles in a row",
          icon: "🔥",
          condition: JSON.stringify({ type: "streak", value: 7 })
        },
        {
          name: "Music Lover",
          description: "Complete 10 music-themed puzzles",
          icon: "🎵",
          condition: JSON.stringify({ type: "puzzles_completed", value: 10 })
        }
      ];

      await db.insert(achievements).values(sampleAchievements);
      console.log("Sample achievements initialized in database");
    }
  } catch (error) {
    console.error("Error initializing sample data:", error);
  }
}

export const storage = new DatabaseStorage();

// Initialize sample data when the module loads
initializeSampleData();
