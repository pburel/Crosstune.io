import React, { useState } from 'react';
import StartScreen from '@/components/StartScreen';
import GameScreen from '@/components/GameScreen';
import ArchivesScreen from '@/components/ArchivesScreen';

type Screen = 'start' | 'game' | 'archives';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [selectedDate, setSelectedDate] = useState<string>('Thursday, July 10, 2025');

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  const handleNavigateToArchives = () => {
    setCurrentScreen('archives');
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setCurrentScreen('game');
  };

  const handleBackToStart = () => {
    setCurrentScreen('start');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'start':
        return <StartScreen onStartGame={handleStartGame} />;
      case 'game':
        return <GameScreen onNavigateToArchives={handleNavigateToArchives} />;
      case 'archives':
        return <ArchivesScreen onDateSelect={handleDateSelect} onClose={handleBackToStart} />;
      default:
        return <StartScreen onStartGame={handleStartGame} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
}
