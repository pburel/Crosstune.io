import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameStateSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get today's puzzle
  app.get("/api/puzzle/today", async (req, res) => {
    try {
      const puzzle = await storage.getTodaysPuzzle();
      if (!puzzle) {
        return res.status(404).json({ message: "No puzzle found for today" });
      }
      res.json(puzzle);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch puzzle" });
    }
  });

  // Get specific puzzle
  app.get("/api/puzzle/:id", async (req, res) => {
    try {
      const puzzleId = parseInt(req.params.id);
      const puzzle = await storage.getPuzzle(puzzleId);
      if (!puzzle) {
        return res.status(404).json({ message: "Puzzle not found" });
      }
      res.json(puzzle);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch puzzle" });
    }
  });

  // Get game state for a puzzle
  app.get("/api/game-state/:puzzleId", async (req, res) => {
    try {
      const puzzleId = parseInt(req.params.puzzleId);
      const gameState = await storage.getGameState(puzzleId);
      res.json(gameState);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch game state" });
    }
  });

  // Create new game state
  app.post("/api/game-state", async (req, res) => {
    try {
      const gameStateData = insertGameStateSchema.parse(req.body);
      const gameState = await storage.createGameState(gameStateData);
      res.json(gameState);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid game state data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create game state" });
    }
  });

  // Update game state
  app.patch("/api/game-state/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      // If completing the puzzle, update completion time and stats
      if (updates.isCompleted && !updates.completionTime) {
        updates.completionTime = new Date();
        
        // Calculate time taken
        const gameState = await storage.getGameState(parseInt(req.params.id));
        if (gameState?.startTime) {
          const timeTaken = Math.floor((updates.completionTime.getTime() - new Date(gameState.startTime).getTime()) / 1000);
          updates.timeTaken = timeTaken;
          
          // Update user stats (for now using hardcoded userId = 1)
          const userId = 1;
          const userStats = await storage.getUserStats(userId);
          
          if (userStats) {
            const newCompletedCount = (userStats.totalPuzzlesCompleted || 0) + 1;
            const newTotalTime = (userStats.totalTimePlayed || 0) + timeTaken;
            const newAverageTime = Math.floor(newTotalTime / newCompletedCount);
            
            await storage.updateUserStats(userId, {
              totalPuzzlesCompleted: newCompletedCount,
              totalTimePlayed: newTotalTime,
              averageCompletionTime: newAverageTime,
              lastPlayedDate: new Date(),
              updatedAt: new Date()
            });
          }
        }
      }
      
      const gameState = await storage.updateGameState(id, updates);
      if (!gameState) {
        return res.status(404).json({ message: "Game state not found" });
      }
      res.json(gameState);
    } catch (error) {
      res.status(500).json({ message: "Failed to update game state" });
    }
  });

  // User statistics routes
  app.get('/api/stats/user/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  app.get('/api/achievements', async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  app.get('/api/achievements/user/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userAchievements = await storage.getUserAchievements(userId);
      res.json(userAchievements);
    } catch (error) {
      console.error("Error fetching user achievements:", error);
      res.status(500).json({ message: "Failed to fetch user achievements" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
