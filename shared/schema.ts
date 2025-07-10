import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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
});

export const insertPuzzleSchema = createInsertSchema(puzzles).omit({
  id: true,
});

export const insertGameStateSchema = createInsertSchema(gameStates).omit({
  id: true,
});

export type InsertPuzzle = z.infer<typeof insertPuzzleSchema>;
export type Puzzle = typeof puzzles.$inferSelect;
export type InsertGameState = z.infer<typeof insertGameStateSchema>;
export type GameState = typeof gameStates.$inferSelect;
