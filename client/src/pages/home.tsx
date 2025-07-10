import React, { useState } from 'react';
import StartScreen from '@/components/StartScreen';
import GameScreen from '@/components/GameScreen';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen">
      {!gameStarted ? (
        <StartScreen onStartGame={handleStartGame} />
      ) : (
        <GameScreen />
      )}
    </div>
  );
}
