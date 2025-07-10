import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { X, Trophy, Clock, Target, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { UserStats, UserAchievement, Achievement } from "@shared/schema";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

interface UserProgress {
  stats: UserStats;
  recentGames: any[];
  achievements: UserAchievement[];
}

export default function StatsModal({ isOpen, onClose, userId }: StatsModalProps) {
  const { data: userProgress, isLoading } = useQuery<UserProgress>({
    queryKey: ['/api/stats/user', userId],
    enabled: isOpen && userId > 0,
  });

  const { data: allAchievements } = useQuery<Achievement[]>({
    queryKey: ['/api/achievements'],
    enabled: isOpen,
  });

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border">
          <DialogTitle>Your Statistics</DialogTitle>
          <DialogDescription>Loading your progress...</DialogDescription>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const stats = userProgress?.stats;
  const achievements = userProgress?.achievements || [];
  const unlockedAchievementIds = new Set(achievements.map(a => a.achievementId));

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border max-h-[80vh] overflow-y-auto">
        <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your Statistics
        </DialogTitle>
        <DialogDescription className="text-gray-600 dark:text-gray-400 mb-6">
          Track your crossword puzzle progress and achievements
        </DialogDescription>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X size={20} />
        </button>

        <div className="space-y-6">
          {/* Main Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              <Trophy className="mx-auto mb-2 text-blue-600" size={24} />
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {stats?.totalPuzzlesCompleted || 0}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-300">
                Puzzles Completed
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
              <Zap className="mx-auto mb-2 text-green-600" size={24} />
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                {stats?.currentStreak || 0}
              </div>
              <div className="text-sm text-green-600 dark:text-green-300">
                Current Streak
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
              <Clock className="mx-auto mb-2 text-yellow-600" size={24} />
              <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                {stats?.averageCompletionTime ? formatTime(stats.averageCompletionTime) : '--'}
              </div>
              <div className="text-sm text-yellow-600 dark:text-yellow-300">
                Average Time
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
              <Target className="mx-auto mb-2 text-purple-600" size={24} />
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {stats?.longestStreak || 0}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-300">
                Best Streak
              </div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Detailed Statistics
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Time Played</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {stats?.totalTimePlayed ? formatTime(stats.totalTimePlayed) : '0s'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Hints Used</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {stats?.totalHintsUsed || 0}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Letters Revealed</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {stats?.totalLettersRevealed || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Achievements ({achievements.length}/{allAchievements?.length || 0})
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              {allAchievements?.map((achievement) => {
                const isUnlocked = unlockedAchievementIds.has(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      isUnlocked
                        ? 'bg-gold-50 border-gold-200 dark:bg-gold-900/20 dark:border-gold-700'
                        : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-medium ${
                            isUnlocked ? 'text-gold-900 dark:text-gold-100' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {achievement.name}
                          </h4>
                          {isUnlocked && (
                            <Badge variant="secondary" className="text-xs">
                              Unlocked
                            </Badge>
                          )}
                        </div>
                        <p className={`text-sm ${
                          isUnlocked ? 'text-gold-700 dark:text-gold-200' : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}