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
      const gameState = await storage.updateGameState(id, updates);
      if (!gameState) {
        return res.status(404).json({ message: "Game state not found" });
      }
      res.json(gameState);
    } catch (error) {
      res.status(500).json({ message: "Failed to update game state" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
