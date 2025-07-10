import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
});

export const puzzles = pgTable("puzzles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  grid: jsonb("grid").notNull(), // 2D array of the crossword grid
  clues: jsonb("clues").notNull(), // Object with across and down clues
  solutions: jsonb("solutions").notNull(), // Object with correct answers
});

export const gameStates = pgTable("game_states", {
  id: serial("id").primaryKey(),
  puzzleId: integer("puzzle_id").references(() => puzzles.id).notNull(),
  playerAnswers: jsonb("player_answers").notNull(), // Player's current answers
  currentClue: text("current_clue"),
  completedWords: jsonb("completed_words").notNull(), // Array of completed word IDs
  isCompleted: boolean("is_completed").default(false),
  startTime: timestamp("start_time").defaultNow(),
  completionTime: timestamp("completion_time"),
  timeTaken: integer("time_taken"), // Time in seconds
  hintsUsed: integer("hints_used").default(0),
  lettersRevealed: integer("letters_revealed").default(0),
});

export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  totalPuzzlesCompleted: integer("total_puzzles_completed").default(0),
  totalTimePlayed: integer("total_time_played").default(0), // Total time in seconds
  averageCompletionTime: integer("average_completion_time").default(0), // Average time in seconds
  currentStreak: integer("current_streak").default(0),
  longestStreak: integer("longest_streak").default(0),
  totalHintsUsed: integer("total_hints_used").default(0),
  totalLettersRevealed: integer("total_letters_revealed").default(0),
  lastPlayedDate: timestamp("last_played_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  condition: text("condition").notNull(), // JSON string describing unlock condition
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  achievementId: integer("achievement_id").references(() => achievements.id).notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

export const insertPuzzleSchema = createInsertSchema(puzzles).omit({
  id: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertGameStateSchema = createInsertSchema(gameStates).omit({
  id: true,
});

export const insertUserStatsSchema = createInsertSchema(userStats).omit({
  id: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPuzzle = z.infer<typeof insertPuzzleSchema>;
export type Puzzle = typeof puzzles.$inferSelect;
export type InsertGameState = z.infer<typeof insertGameStateSchema>;
export type GameState = typeof gameStates.$inferSelect;
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
export type UserStats = typeof userStats.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
export type UserAchievement = typeof userAchievements.$inferSelect;
